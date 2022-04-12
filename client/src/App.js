import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import UserPage from './components/UserPage';
import createBlog from './components/CreateBlog';
import Blogs from './components/Blogs';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/register"} component={Register} />
          <Route exact path={"/userpage"} component={UserPage} />
          <Route exact path={"/new-blog"} component={createBlog} />
          <Route exact path={"/blogs"} component={Blogs} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
