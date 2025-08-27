import Cookies from "universal-cookie";
import axios from "axios";

const cookie = new Cookies();
const baseUrl = "http://127.0.0.1:8000/api";
function getAuthConfig() {
  return {
    headers: {
      Authorization: `Bearer ${cookie.get("Bearer")}`,
    },
  };
}
export const searchApi = (type,data) => axios.post(`${baseUrl}/${type}/search?title=${data}`,
    {}, getAuthConfig());
