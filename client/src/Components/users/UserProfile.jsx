import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import NavBar from '../../Components/NavBar';
// import "../../css/Profile.css";
// import "../../css/EditProfile.css";
// import {
//   Image,
//   Video,
//   Transformation,
//   CloudinaryContext
// } from "cloudinary-react";
// import cloudinary from "cloudinary-core";
// const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: "tutelage" });

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fireRedirect: false
    };
  }


componentWillMount = () => {
  this.isUser();
}

  render() {
    const {
      // handleInput,
      // classes,
      // submitLoginForm,
      // username,
      // password,
      user,
      loggedIn
    } = this.props;
    const {fireRedirect} = this.state;
    // let user = { ...user };

    if(fireRedirect){
      return(<Redirect to="/" />)
    }

    return (
      <React.Fragment>
      <NavBar/>
      <div id="user-profile" className="margin">
        <div className="background-banner">
          <div className="color-sq2" />
          <div id="user-banner">
            {/* <div className="user-pic-info">


              <div className="image-crop margin">
                <Link to={`/users/${user.username}/edit`} title="Click to edit Profile.">
                  {currentUser.public_id ? (
                    <Image
                      className="img-profile"
                      cloudName="tutelage"
                      publicId={currentUser.public_id + ".jpg"}
                      crop="scale"
                    width="300"
                    />
                  ) : (

                      <img
                        src={currentUser.imgurl}
                        alt="profile picture"
                        className="img-profile"
                      />)}
                </Link>
              </div> */}

            <div id="user-basic-info">
              <div>
                <h1 className="user-header-name">
                  <strong>{`${user.firstname} ${user.lastname}`}</strong>
                </h1>
              </div>
            </div>
          </div>
          {/* <Link to={`/users/${user.username}/edit`} > 
              <button className="button-size submit" id="editButton" >Edit</button>
            </Link> */}
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default UserProfile;
