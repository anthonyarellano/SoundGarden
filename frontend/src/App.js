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
import UserProfile from "./components/UserProfile";
import PageNotFound from "./components/404Page";
import Player from "./components/Player";
import DiscoverPage from "./components/DiscoverPage";

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
              <Player />
            </Route>
            <Route path="/users/:userId">
              <Navigation isLoaded={isLoaded} />
              <UserProfile />
              <Player />
            </Route>
            <Route path="/">
              <Navigation isLoaded={isLoaded} />
              <PageNotFound />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
