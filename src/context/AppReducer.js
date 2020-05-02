import { parseInit, userSignUp } from "../services/parse";

export default (state, action) => {
  switch (action.type) {
    case "SIGNUP_SUBMITTED":
      console.log("SIGNUP_SUBMITED action in AppReducer");
      console.log(action.payload);
      console.log("1: calling initializeParse()");
      initializeParse();
      console.log("2: calling userSignUp()");
      userSignUp(action.payload, action.callback); // payload { username: "", email: "", password: "" }
      return {
        ...state,
        user: action.payload,
        view: "FOOTER",
      };
    case "SIGNUP_SUCCESS":
      console.log("SIGNUP_SUCCESS action in AppReducer");
      console.log(action.payload);
      return state;
    case "NAVIGATE":
      console.log('NAVIGATE to ' + action.payload)
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

function initializeParse() {
  parseInit();
  console.log("parseInit() completed");
}
