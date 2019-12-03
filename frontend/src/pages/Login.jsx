import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import "../style/login.style.css";
import "../assets/js/plugins/nucleo/css/nucleo.css";
import "../assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css"


//We will need to install and import axios
class Login extends Component {
  constructor(props) {
    //Necessary for class components
    super(props);
    console.log(props);

    //binding this TODO: Convert class components to hooks
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //Setting the default state
    this.state = {
      email: "",
      password: "",
      redirectTo: "/dashboard",
      loginError: "",
      isLoading: false
      //below added by Irelis
      /*firstName: "",
      lastName: ""*/
    };
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    this.setState({ isLoading: true });
    //This allows us to exchange the default behavior for our custom behavior
    event.preventDefault();
    //firstName and lastName added by Irelis
    const { email, password } = this.state;
    const user = {
      email,
      password
      //below added by Irelis
      /*firstName,
      lastName*/
    };

    this.props.login("/users/login", user, data => {
      if (data.success) {
        this.setState({
          email: "",
          password: "",
          isLoading: false
          //below added by Irelis
          /*firstName: "",
          lastName: ""*/
        });

        console.log(`Successfully logged in! ${JSON.stringify(data)}`);

        this.props.history.push("/dashboard");
      } else {
        this.setState({
          email: "",
          password: "",
          //below added til isLoading by Irelis
          /*firstName: "",
          lastName: "",*/
          isLoading: false,
          loginError: data.message
        });
        //this.props.history.push("/login");
      }
    });
  }
  /* axios.post("/users/login", user).then(response => {
      if (response.data.success) {
        this.setState({
          email: "",
          password: "",
          isLoading: false
        });

        console.log(`Finished! ${JSON.stringify(response.data)}`);
        //redirect to login page
        this.props.history.push("/dashboard");
      } else {
        this.setState({
          email: "",
          password: "",
          isLoading: false,
          loginError: response.data.message
        });
        this.props.history.push("/login");
      }
    }); */

  /* this.props.login(this.state.email, this.state.password, () => {
      this.setState({ redirectTo: "/dashboard" });
    }); */
  //this.setState({ redirectTo: "/dashboard" });
  //if (this.props.loggedIn) console.log("Logged in!");
  //this.setState({ redirectTo: "/dashboard" });
  //window.location = "/dashboard";
  //TODO: Refill values -maybe add values from response into componentWillMount

  //window.location = "/users/login";

  //This is the user object we will send to the server
  /* const user = {
      email: this.state.email,
      password: this.state.password
    }; */

  //console.log(user);

  //Later add post requests using axios
  /* axios.post("http://localhost:3001/users/login", user).then(res => {
      console.log(res.data);
      window.location = "/dashboard";
      //TODO: if we failed to login
      this.setState({
        username: "",
        password: ""
      });
    }); */

  //Later we will want to user <Redirect> and this.redirectTo (custom)

  //Later try adding transparency for the forms?
  render() {
    if (this.props.loggedIn)
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    return (

      <div className="login-view-container">

        <div className="triangle-bottomright"></div>
        <div className="login-container">
          <h1>Login</h1>

          <div className="login-input-container">

            <br />
          </div>
          {this.state.loginError ? <p>{this.state.loginError}</p> : null}
          <form
            onSubmit={e => this.onSubmit(e)}
            className="login-form-container"
          >
            <div className="form-group">
              <div className="input-group input-group-alternative">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="form-control"
                  value={this.state.email}
                  onChange={e => this.onChange(e)}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group input-group-alternative">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                </div>
                <input
                  class="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={this.state.password}
                  onChange={e => this.onChange(e)}
                />
              </div>
            </div>
            <div className="login-input-container">
              <input type="submit" value="Login" className="btn btn-primary my-4" />
            </div>
            <div className="line1"> </div>
            <p></p>
            <h6>Or log in with</h6>
            <div className="login-input-container">
              <input type="submit" value="Google" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
