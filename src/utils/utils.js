import Axios from "axios";
import { useNavigate } from "react-router";

const navigate = useNavigate;
const URL = process.env.REACT_APP_API_URL;

export const logoutUser = () => {
  console.log("cl");
  try {
    const response = Axios.get(`${URL}/auth/logout`, { withCredentials: true });
    if (response.ok) {
      console.log("LOGOUT success");
      navigate("/business");
    }
  } catch (error) {}
};
