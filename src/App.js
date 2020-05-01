import React, { useContext, useState } from "react";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import { GlobalProvider, GlobalContext } from "./context/GlobalState";

function App() {
  const { page } = useContext(GlobalContext);
  const [viewRoute, setViewRoute] = useState("SIGNUP");

  var pageView;
  console.log("App Rendered");

  return (
    <GlobalProvider>
      <GlobalContext.Consumer>
        {(values) => <Routing page={values.page} />}
      </GlobalContext.Consumer>
    </GlobalProvider>
  );

  function Routing(props) {
    console.log('props.page: ' + props.page);
    switch (props.page) {
      case "SIGNUP": {
        return <SignUp />;
      }
      default:
        return <Footer />;
    }
  }
}

export default App;
