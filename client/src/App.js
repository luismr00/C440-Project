import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import UserPage from './components/UserPage';
import BlogPage from './components/BlogPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/register"} component={Register} />
          <Route exact path={"/userpage"} component={UserPage} />
          <Route exact path={"/blog"} component={BlogPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
