import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import UserPage from './components/UserPage';
import createBlog from './components/createBlog';
import AllBlogs from './components/all_blogs';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/register"} component={Register} />
          <Route exact path={"/userpage"} component={UserPage} />
          <Route exact path={"/new-blog"} component={createBlog} />
          <Route exact path={"/blogs"} component={AllBlogs} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
