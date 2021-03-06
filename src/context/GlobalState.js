import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
const initialState = {
  page: "SIGNUP",
  user: {
    username: "",
    email: "",
    password: "",
  },
};
//creating context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function signUpSubmitted(username, email, password, func) {
    dispatch({
      type: "SIGNUP_SUBMITTED",
      payload: { username: username, email: email, password: password },
      callback: func
    });
  }
  function signUpSuccess(sessionToken, objectId) {
    dispatch({
      type: "SIGNUP_SUCCESS",
      payload: { sessionToken: sessionToken, objectId: objectId },
    });
  }
  function navigateTo(page) {
    dispatch({
      type: 'NAVIGATE',
      payload: page
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        page: state.page,
        signUpSubmitted,
        signUpSuccess,
        navigateTo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
