import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import UserPage from './components/UserPage';

function App() {
  return (
    // <div className="App">
    //   <Login />
    // </div>
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/register"} component={Register} />
          <Route exact path={"/userpage"} component={UserPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
