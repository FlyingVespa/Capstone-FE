// const initialState = {
//   formBusiness: {
//     _id: "",
//     email: "",
//     password: "",
//     url: "",
//     basic: {
//       name: "",
//       category: "",
//       username: "",
//     },
//     contact: {
//       email: "s",
//       tel: "",
//       cell: "",
//       insta: "",
//       whatsapp: "",
//       twitter: "",
//     },
//     times: {
//       monday: { trading: true, open: "09:15", closed: "16:00" },
//       tuesday: { trading: true, open: "09:15", closed: "16:00" },
//       wednesday: { trading: true, open: "09:15", closed: "16:00" },
//       thursday: { trading: true, open: "09:15", closed: "16:00" },
//       friday: { trading: true, open: "09:00", closed: "17:00" },
//       saturday: { trading: true, open: "09:15", closed: "16:00" },
//       sunday: { trading: true, open: "09:15", closed: "16:00" },
//       public: { trading: true, open: "09:15", closed: "16:00" },
//     },
//     info: {
//       services: "",
//       bio: "",
//       shipping: "",
//       img_log: "",
//       img_banner: "",
//       img_user: "",
//     },
//   },
//   selected: null,
//   showPassword: false,
//   user: "",
//   loading: false,
// };

// export const appReducer = (state = initialState, action) => {
//   console.log(action);
//   switch (action.type) {
//     case "SELECT_BUSINESS":
//       return {
//         ...state,
//         selected: action.payload,
//       };
//     // case "REG_FORM_BUSSINESS":
//     //   return { ...state, formBusiness: action.payload };
//     case "REG_BUSINESS_FIELD":
//       return {
//         ...state,
//         formBusiness: {
//           ...state.formBusiness,
//           [action.payload.field]: {
//             ...action.payload.data,
//           },
//         },
//       };
//     case "SHOW_PASSWORD":
//       return {
//         ...state,
//         showPassword: action.payload,
//       };
//     case "SET_USER_DATA":
//       return {
//         ...state,
//         formBusiness: [...state.user, action.payload],
//       };
//     case "SET_LOADING":
//       return {
//         ...state,
//         loading: action.payload,
//       };

//     default:
//       return state;
//   }
// };
