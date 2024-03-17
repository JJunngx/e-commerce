import axios from "axios";
const useHttp = () => {
  const resResults = async (method, data, link, getData, token) => {
    try {
      let res;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (method === "get") {
        res = await axios(`https://server-asm3-ax3r.onrender.com${link}`, {
          headers,
        });
      } else {
        res = await axios[method](
          `https://server-asm3-ax3r.onrender.com${link}`,
          data,
          {
            headers,
          }
        );
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
