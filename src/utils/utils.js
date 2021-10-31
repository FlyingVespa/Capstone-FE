// import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const URL = process.env.REACT_APP_API_URL;
// const helper = useSelector((s) => s.helper.activeStep);
// const dispatch = useDispatch
// export const handleNext = () => {
//     dispatch({ type: "SET_ACTIVE_STEP", payload: helper + 1 });
//   };

//  export const handlePrev = () => {
//     dispatch({ type: "SET_ACTIVE_STEP", payload: helper - 1 });

// export const regsiterBusiness = (payload) => {
//   axios({
//     method: "POST",
//     url: `${URL}/business`,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data:  JSON.stringify(payload),
//   })
//     .then((res) => {
//       JSON.stringify(res.payload);
//       console.log("Success, Regsitered", res);
//     })
//     .catch((err) => console.log(err));
// };
