import { parseInit, userSignUp } from "../services/parse";

export default (state, action) => {
  switch (action.type) {
    case "SIGNUP_SUBMITTED":
      console.log("SIGNUP_SUBMITED action in AppReducer");
      console.log(action.payload);
      console.log("calling initializeParse");
      initializeParse();
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
    default:
      return state;
  }
};

function initializeParse() {
  parseInit();
  console.log("parseInit() completed");
}
