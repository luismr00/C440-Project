import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import CreateBlog from './components/CreateBlog';
import Blogs from './components/Blogs';
import Blog from './pages/Blog';
import UserBlogs from './components/UserBlogs';
import MutualFollowers from './components/MutualFollowers';
import UserPage from './pages/UserPage';
import Search from './pages/Search';
import Hobbies from './pages/Hobbies';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/register"} component={Register} />
          <Route exact path={"/userpage"} component={UserPage} />
          <Route exact path={"/new-blog"} component={CreateBlog} />
          {/* <Route exact path={"/blogs"} component={Blogs} /> */}
          <Route exact path={"/blog/:id"} component={Blog} />
          <Route exact path={"/user-blogs"} component={UserBlogs} />
          <Route exact path={"/mutual-followers"} component={MutualFollowers} />
          <Route exact path={"/search"} component={Search} />
          <Route exact path={"/hobbies"} component={Hobbies} />
          <Route exact path={"/profile/:username"} component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
