import axios from "axios";
const useHttp = () => {
  const resResults = async (method, data, link, getData, token) => {
    try {
      let res;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (method === "get") {
        res = await axios(`http://localhost:5000${link}`, { headers });
      } else {
        res = await axios[method](`http://localhost:5000${link}`, data, {
          headers,
        });
      }
      if (getData) {
        getData(res.data);
      }
    } catch (error) {}
  };

  return {
    resResults,
  };
};
export default useHttp;
