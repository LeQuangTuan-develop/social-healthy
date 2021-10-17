import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Question from "./pages/question/Question";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const {user} = useContext(AuthContext)

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>
        <Route path="/profile/:doctorId">
          {user ? <Profile /> : <Register />}
        </Route>
        <Route path="/question">
          {user ? <Question /> : <Login />}
        </Route>
        <Route path="/">
          {user ? <Home /> : <Login />}
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
