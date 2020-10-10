import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Index from './layouts/Index.jsx';
import './css/bootstrap.min.css'
import './css/index.css'
import './css/common.css'
import './css/dashboard.css'
import './css/font-awesome-4.7.0/css/font-awesome.min.css'
import './css/login.css'
import Login from './layouts/Login.jsx';
import AdminsHomePage from './layouts/AdminsHomePage';
import StudentHomePage from './layouts/StudentHomePage';
import TeacherHomePage from './layouts/TeacherHomePage'

function App() {
    return (
        <Router>
            <Switch>

                <Route path="/loginStudent">
                    <Login loginType="student"/>
                </Route>
                <Route path="/loginTeacher">
                    <Login loginType="teacher"/>
                </Route>
                <Route path="/loginAdmin">
                    <Login loginType="admin"/>
                </Route>


                <Route path="/adminshomepage">
                    <AdminsHomePage/>
                </Route>
                <Route path="/studenthomepage">
                    <StudentHomePage/>
                </Route>
                <Route path="/teacherhomepage">
                    <TeacherHomePage/>
                </Route>
                <Route path="/">
                    <Index/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
