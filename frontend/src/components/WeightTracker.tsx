import axios from "axios";
import { useState, useEffect } from "react";
import { useAppSelector } from "../app/store";
import { Chart } from "react-google-charts";
import "../css/WeightTracker.css";

import { BsCalendar2DateFill } from "react-icons/bs";
import { FaWeight } from "react-icons/fa";

interface WeightRecord {
  date: string;
  weight: number;
  user: string;
  _v: number;
  _id: string;
}

const WeightTracker = () => {
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const [weightRecord, setWeightRecord] = useState<WeightRecord[]>();
  const user = useAppSelector((state) => state.Authentication.user);
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const getWeightRecord = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get("weight/get_record", config);
      setWeightRecord(response.data);
    };

    getWeightRecord();
  }, []);

  const saveWeight = async (e: React.FormEvent) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      "weight/add",
      {
        date: date,
        weight: weight,
      },
      config
    );
    setWeightRecord((prevWeightRecord) => {
      const updatedWeightRecord = prevWeightRecord
        ? [...prevWeightRecord, response.data]
        : [response.data];
      return updatedWeightRecord;
    });
  };

  // Transform weightRecord array into a format suitable for the LineChart
  const chartData = weightRecord
    ?.map((record) => {
      return [
        new Intl.DateTimeFormat("en-US", {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }).format(new Date(record.date)),
        record.weight,
      ];
    })
    .sort((a, b) => {
      const dateA = new Date(a[0]).getTime();
      const dateB = new Date(b[0]).getTime();
      return dateA - dateB;
    }) as (string | number)[][];

  console.log("ChartData", chartData);

  const formatDateTime = (dateTimeString: string) => {
    const dateTime = new Date(dateTimeString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = dateTime.toLocaleDateString(undefined, options);
    const formattedTime = dateTime.toLocaleTimeString();
    return { date: formattedDate, time: formattedTime };
  };

  return (
    <div className="weight-tracking-component">
      <form onSubmit={saveWeight} className="weight-collection-form">
        <p>Track your progress!</p>
        <p>Enter your weight and date.</p>
        <div>
          <BsCalendar2DateFill />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={currentDate}
            placeholder="Date"
          />
        </div>
        <div>
          <FaWeight />
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight"
          />
        </div>
        <button type="submit">Save</button>
      </form>
      <div className="weight-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Weight</th>
              {/* <th>Time</th> */}
            </tr>
          </thead>
          <tbody>
            {weightRecord
              ?.sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
              .map((data, index) => (
                <tr key={index}>
                  <td>{formatDateTime(data.date).date}</td>
                  <td>{String(data.weight)}</td>
                  {/* <td>{formatDateTime(data.date).time}</td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="weight-chart">
        {chartData ? (
          <Chart
            chartType="LineChart"
            data={[["Date", "Weight"], ...chartData]} // Include headers in the chart data
            width="100%"
            height="400px"
            legendToggle
          />
        ) : (
          <div>Loading chart data...</div>
        )}
      </div>
    </div>
  );
};

export default WeightTracker;
