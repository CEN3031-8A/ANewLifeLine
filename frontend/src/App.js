import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import history from "./history";
import NavBar from "./components/navbar.component";

import Home from "./pages/Home";
import MainMenu from "./pages/Extra";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Protected from "./components/ExampleProtectedRoute";
import Calendar from "./components/Calendar";

import AuthenticatedComponent from "./components/AuthenticatedComponent";
class App extends Component {
    constructor(props) {
        super(props);

        this.getUser = this.getUser.bind(this);
        this.login = this.login.bind(this);
        this.verify = this.verify.bind(this);
        this.logout = this.logout.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        this.state = {
            loggedIn: false,
            user: {}
        };
    }

    getUser() {
        axios.get("/users/").then(response => {
            console.log("Get user response: ");
            console.log("This is the get response.data: " + response.data);
            if (response.data) {
                console.log("Get User: There is a user saved in the server session: ");

                this.setState({
                    loggedIn: response.data.loggedIn,
                    user: response.data
                });
            } else {
                console.log("Get user: no user");
                this.setState({
                    loggedIn: false,
                    user: null
                });
            }
        });
    }

    login(route, user, cb) {
        console.log(user);
        //in production a .catch(err => console.log(err)) should be implemented
        axios.post(route, user).then(response => {
            //set own state and execute the callback
            if (response.data.success) {
                this.setState({
                    loggedIn: true
                });

                //console.log(`Successfully logged in! ${JSON.stringify(response.data)}`);
            }
            cb(response.data);
        });
    }

    verify(route, cb) {
        axios.get(route).then(response => {
            //on success res.data has: success, message, user.name, user.email, user.logggedIn
            if (!response.data.success) {
                this.setState({
                    loggedIn: response.data.user.loggedIn
                });
            } else {
                this.setState({
                    user: response.data.user,
                    loggedIn: response.data.user.loggedIn
                });
            }
            cb(response.data);
        });
    }
    logout(route) {
        axios.post(route).then(response => {
            console.log(response.data);
            if (response.data.success) {
                this.setState({
                    loggedIn: false,
                    user: {}
                });
                console.log("Logout was successful!");
                window.location = "/users/login";
            } else {
                console.log("Logout out failed - server error");
            }
        });
    }

    updateUser(user) {
        console.log(this.state.loggedIn);
        this.setState({ loggedIn: user.loggedIn, user: user });
    }

   updateUser(user, firstName, lastName, education, employment, institution) {
        //console.log(this.state.loggedIn);
        //console.log('firstName: ' + firstName);
        if (firstName != "")
        {
            user.firstName = firstName;
        }
        if (lastName != "")
        {
          user.lastName = lastName;
        }
        if (education != "")
        {
            user.education = education;
        }
        if (employment != "")
        {
            user.employment = employment;
        }
        if (institution != "")
        {
            user.institution = institution;
        }

        this.setState({ loggedIn: user.loggedIn, user: user });

    axios.put("/dashboard", user)
    .then(res => console.log("Object successfully updated: ", res.data))
	.catch((error) => console.log(error));
        
        /*axios.put("/user_profiles", user).then(response => {
            console.log('PUTTING...');
            if (response.data.success) {
              console.log('RESPONSE.DATA.SUCCESS');
              this.setState({
                name: "",
                email: "",
                password: "",
                password2: "",
                //below til registerErrors added by Irelis
                lastName: "",
                firstName: "",
                registerErrors: [],
                isLoading: false
              });
      
              console.log(`Finished! ${JSON.stringify(response.data)}`);
              //redirect to login page
              this.props.history.push("/login");
            } else {
              console.log('RESPONSE.DATA.FAIL');
              this.setState({
                password: "",
                password2: "",
                isLoading: false,
                registerErrors: response.data.message
              });
              console.log(JSON.stringify(this.state.registerErrors));
            }
    });*/

    console.log(user);
}

    componentDidMount() {
        //this.getUser();
    }
    render() {
        return (
            <Router history={history}>
            <NavBar
        user={this.state.user}
        loggedIn={this.state.loggedIn}
        updateUser={this.updateUser}
        logout={this.logout}
        />
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/mainmenu" component={MainMenu} />
        <Route path="/users/register" component={Register} />
        <Route
        path="/users/login"
        render={() => (
        <Login login={this.login} loggedIn={this.state.loggedIn} />
    )}
        />
        <AuthenticatedComponent verify={this.verify}>
    <Route
        path="/dashboard"
        render={() => (
            console.log('CALLING DASHBOARD...'),
        <Dashboard
        loggedIn={this.state.loggedIn}
        user={this.state.user}
        userUpdate = {this.updateUser}
        />
    )}
        />
        <Route path="/protected" component={Protected} />
        <Route path="/calendar" component={Calendar} />
        </AuthenticatedComponent>
        </Switch>
        </Router>
    );
    }
}

export default App;