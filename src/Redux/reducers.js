const initialState = {
  formBusiness: {
    basic: {
      businesName: "",
      category: "",
      accEmail: "",
      delivery: "",
      password: "",
      username: "",
    },

    contact: {
      email: "1",
      tel: "",
      cell: "1",
      insta: "",
      whatsapp: "",
      twitter: "",
    },
    times: {
      monday: { trading: true, open: "09:15", closed: "16:00" },
      tuesday: { trading: true, open: "", closed: "" },
      wednesday: { trading: true, open: "", closed: "" },
      thursday: { trading: false, open: "", closed: "" },
      friday: { trading: true, open: "09:00", closed: "17:00" },
      saturday: { trading: true, open: "", closed: "" },
      sunday: { trading: false, open: "", closed: "" },
      public: { trading: true, open: "", closed: "" },
    },
    location: {
      country: "",
      region: "",
      city: "",
      zip: "",
      address: "",
      serviceArea: [],
    },
  },
  selected: null,
};

export const appReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "SELECT_BUSINESS":
      return {
        ...state,
        selected: action.payload,
      };
    // case "REG_FORM_BUSSINESS":
    //   return { ...state, formBusiness: action.payload };
    case "REG_BUSINESS_FIELD":
      return {
        ...state,
        formBusiness: {
          ...state.formBusiness,
          [action.payload.field]: {
            ...action.payload.data,
          },
        },
      };

    default:
      return state;
  }
};
