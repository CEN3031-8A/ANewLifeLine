import React from "react";
import { Redirect } from "react-router-dom";
import "../style/dashboard.style.css";

class Dashboard extends React.Component {

  test() {
    console.log("Called")
  }
  constructor(props) {
    //Necessary for class components

    super(props);
    this.state = {
      firstName: "",
      lastName: "",
    };
    //this.addInformation = this.addInformation.bind(this);
  }

  addInformation(firstName, lastName) {
    /*this.setState({
      firstName: "",
      lastName: "",
      //const val1 = this.firstName;
      //const val2 = this.lastName;*/

    console.log('name: ' + firstName + ' ' + lastName);

    //this.updateUser(user, firstName, lastName);

    this.setState({
      firstName: firstName,
      lastName: lastName
    })
  };

  render() {
    const { loggedIn, user } = this.props;
    return (
      <>
        {loggedIn ? (
          <div className="dashboard-view-container">
            <div className="dashboard-background-polygon">
              <img src={require('../assets/BackgroundPolygon.png')} />
            </div>
            <div className="dashboard-container">
              <div className="card bg">
                <p></p>
                <h1>My Account</h1>
                <h5>Hello, {user.name}!</h5>
                <div className="card-body">


                  <div className="form-group">
                    <label className="form-control-label" htmlFor="input-username">Username</label>
                    <div className="input-group input-group-alternative">
                      <div className="input-group-prepend">

                        <span className="input-group-text"><i className="ni ni-circle-08"></i></span>
                      </div>
                      <input type="text" id="input-username" className="form-control form-control-alternative"
                        placeholder="Username" value={user.name}></input>
                    </div>
                  </div>


                  <div className="form-group">
                  <label className="form-control-label" htmlFor="input-username">Email</label>
                    <div className="input-group input-group-alternative">
                      <div className="input-group-prepend">

                        <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                      </div>
                      <input type="text" id="input-username" className="form-control form-control-alternative"
                    placeholder="Username" value={user.email}></input>
                    </div>
                  </div>

                  <div className="form-group">
                  <label className="form-control-label" htmlFor="input-username">First Name</label>
                    <div className="input-group input-group-alternative">
                      <div className="input-group-prepend">

                        <span className="input-group-text"><i className="ni ni-circle-08"></i></span>
                      </div>
                      <input type="text" id="input-firstname" name="getFirst" className="form-control form-control-alternative"
                    placeholder="First" value={this.firstName}
                    ref={(firstName) => firstName = firstName}></input>
                    </div>
                  </div>

                  <div className="form-group">
                  <label className="form-control-label" htmlFor="input-username">Last Name</label>
                    <div className="input-group input-group-alternative">
                      <div className="input-group-prepend">

                        <span className="input-group-text"><i className="ni ni-circle-08"></i></span>
                      </div>
                      <input type="text" id="input-firstname" name="getFirst" className="form-control form-control-alternative"
                    placeholder="First" value={this.firstName}
                    ref={(firstName) => firstName = firstName}></input>
                    </div>
                  </div>

                  <div className="form-group">
                  <label className="form-control-label" htmlFor="input-username">Education</label>
                    <div className="input-group input-group-alternative">
                      <div className="input-group-prepend">

                        <span className="input-group-text"><i className="ni ni-hat-3"></i></span>
                      </div>
                      <input type="text" id="input-education" name="getEdu" className="form-control form-control-alternative"
                    placeholder="Education" value={user.education}
                    ref={(education) => education = education}></input>
                    </div>
                  </div>
                  
                  <label className="form-control-label" htmlFor="input-username">Employment Informatiion</label>
                  <textarea rows="4" class="form-control form-control-alternative" placeholder="(This information will not be public)"></textarea>
                  <div class="form-group focused">
                    <label className="form-control-label" htmlFor="input-username">Institutional Information</label>
                    <textarea rows="4" class="form-control form-control-alternative" placeholder="(This information will not be public)"></textarea>
                  </div>
                  <p></p>
                </div>
                <button className="btn btn-primary" type="button" onClick={() => this.addInformation(document.getElementById('input-firstname').value, document.getElementById('input-lastname').value)}>
                  <i>Edit</i>
                </button>
              </div>
            </div>
          </div>
        ) : (
            <Redirect to="/users/login" />
          )}
      </>
    );
    /* is user.property coming from the databse or not */
  }

};

export default Dashboard;