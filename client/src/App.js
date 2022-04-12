import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import UserPage from './components/UserPage';
import CreateBlog from './components/CreateBlog';
import Blogs from './components/Blogs';
import Blog from './components/Blog';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/register"} component={Register} />
          <Route exact path={"/userpage"} component={UserPage} />
          <Route exact path={"/new-blog"} component={CreateBlog} />
          <Route exact path={"/blogs"} component={Blogs} />
          <Route exact path={"/blog-comments"} component={Blog} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
