import { useEffect } from "react";
import { useAppSelector } from "../app/store";
import axios from "axios";

const History = () => {
  const user = useAppSelector((state) => state.Authentication.user);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    };
    const getDietHistory = async () => {
      const response = await axios.get("/history/get", config);
      console.log(response.data);
    };
    getDietHistory();
  });
  return <div></div>;
};

export default History;
