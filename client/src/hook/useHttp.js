import { useState } from "react";
import axios from "axios";
const useHttp = () => {
  const [error, setError] = useState(null);
  const resResults = async (method, data, link, getData, token) => {
    try {
      let res;
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      if (method === "get" || method === "delete") {
        res = await axios[method](`http://localhost:5000${link}`, {
          headers,
        });
      } else {
        res = await axios[method](`http://localhost:5000${link}`, data, {
          headers,
        });
      }

      if (getData) {
        getData(res.data);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  return {
    resResults,
    error,
  };
};
export default useHttp;
