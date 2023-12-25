import axios from "axios";
import { useState, useEffect } from "react";
import { useAppSelector } from "../app/store";
import { Chart } from "react-google-charts";

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
    ?.map((record) => [new Date(record.date), record.weight])
    .sort((a, b) => {
      const dateA = a[0] instanceof Date ? a[0].getTime() : 0;
      const dateB = b[0] instanceof Date ? b[0].getTime() : 0;
      return dateA - dateB;
    }) as (number | Date)[][];

  return (
    <div>
      <form onSubmit={saveWeight}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={currentDate}
          placeholder="Date"
        />
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight"
        />
        <button type="submit">Save</button>
      </form>

      {/* Check if chartData is defined before using it */}
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
  );
};

export default WeightTracker;
