import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { UploadPage } from "./components/UploadPage";
import SplashPage from "./components/SplashPage";
import "./index.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
          <Route exact path="/">
            <SplashPage />
          </Route>
      {isLoaded && (
        <>
          <Navigation isLoaded={isLoaded} />
          <Switch>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/upload">
              <UploadPage />
            </Route>
            <Route path="/users/:userId">
              {/* todo ADD USER PROFILE COMPONENT*/}
              <h1>Welcome to user profile</h1>
            </Route>
            <Route path="/discover">
              {/* todo ADD DISCOVER PAGE COMPONENT */}
              <h1>Welcome to discover page</h1>
            </Route>
            <Route path="/">
              <h1>404 page not found</h1>
              <img src={require("./404gif.gif")} ></img>
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
