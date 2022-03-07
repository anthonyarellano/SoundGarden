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
      {isLoaded && (
        <>
          <Switch>
            <Route exact path="/">
              <SplashPage />
            </Route>
            <Route path="/login">
              <Navigation isLoaded={isLoaded} />
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <Navigation isLoaded={isLoaded} />
              <SignupFormPage />
            </Route>
            <Route path="/upload">
              <Navigation isLoaded={isLoaded} />
              <UploadPage />
            </Route>
            <Route path="/users/:userId">
              {/* todo ADD USER PROFILE COMPONENT*/}
              <Navigation isLoaded={isLoaded} />
              <h1>Welcome to user profile</h1>
            </Route>
            <Route path="/discover">
              {/* todo ADD DISCOVER PAGE COMPONENT */}
              <Navigation isLoaded={isLoaded} />
              <h1>Welcome to discover page</h1>
            </Route>
            <Route path="/">
              <Navigation isLoaded={isLoaded} />
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
