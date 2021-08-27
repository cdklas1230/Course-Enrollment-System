import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginDialog from "./components/dialogs/LoginDialog";
import MenuBar from "./components/MenuBar";
import AllCourses from "./components/views/AllCourses";
import EnrolledCourses from "./components/views/EnrolledCourses";

export default function App() {
  return (
    // 动态更新页面
    <Router> 
      <div>
        <MenuBar />
        
        <hr />

        <Switch>
          <Route exact path="/">
            <AllCourses />
          </Route>
          <Route path="/enrolled_courses">
            <EnrolledCourses />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
