import React, { useContext, useState } from "react";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import { GlobalProvider, GlobalContext } from "./context/GlobalState";
import Home from "./components/Home";

function App() {
  const { page } = useContext(GlobalContext);

  console.log("App Rendered");

  return (
    <GlobalProvider>
      <GlobalContext.Consumer>
        {(values) => <Routing page={values.page} />}
      </GlobalContext.Consumer>
    </GlobalProvider>
  );

  function Routing(props) {
    console.log('Current state.page: ' + props.page);
    switch (props.page) {
      case "SIGNUP": {
        return <SignUp />;
      }
      case "HOME": {
        return <Home />
      }
      default:
        return <Footer />;
    }
  }
}

export default App;
