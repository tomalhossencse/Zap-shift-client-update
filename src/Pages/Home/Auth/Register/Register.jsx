import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import Swal from "sweetalert2";
import useAxios from "../../../../hooks/useAxios";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("register", location);
  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = (data) => {
    const email = data.email;
    const password = data.password;
    const photo = data.photo[0];
    const name = data.name;

    registerUser(email, password)
      .then(() => {
        // console.log(res.user);
        // store the img and get  the photo url

        // 1. prepare photo for imgbb
        const formData = new FormData();
        formData.append("image", photo);

        // 2. upload the imgBB using Axios
        const img_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host}`;
        axios.post(img_api_url, formData).then((res) => {
          // console.log("after img upload", res.data.data.url);

          const photoURL = res.data.data.url;

          // create user in the data base send database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("users created");
            }
          });

          // update user profile
          const userProfile = {
            displayName: name,
            photoURL,
          };
          updateUserProfile(userProfile)
            .then((res) => {
              console.log(res);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Profile Updated Succesfully!",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(location.state || "/");
            })
            .catch((error) => {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: error.message,
                showConfirmButton: false,
                timer: 1500,
              });
              console.log(error);
            });
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
    console.log("after register : ", data.photo[0]);
  };
  return (
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="card bg-base-100 w-full max-w-sm shrink-0">
        <h3 className="text-4xl font-black pl-6">Create an Account</h3>
        <p className="pl-8">Register with ZapShift</p>
        <form onSubmit={handleSubmit(handleRegister)} className="card-body">
          <fieldset className="fieldset">
            {/* name */}
            <label className="label">Name</label>
            <input
              type="name"
              className="input"
              placeholder="Name"
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name Required!</p>
            )}
            {/* photo */}
            <label className="label">Photo</label>
            <input
              type="file"
              className="file-input"
              placeholder="Photo"
              {...register("photo", { required: true })}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Photo Required!</p>
            )}
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email Required!</p>
            )}
            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 8,
                pattern:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password Required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be 8 characters or longers
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must contain at least one uppercase letter, one
                lowercase letter, one number, and one special character.
              </p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary mt-4">Register</button>
          </fieldset>
          <p className="text-center">
            Already have an Account{" "}
            <Link
              to={"/login"}
              state={location?.state}
              className="text-blue-600"
            >
              Login
            </Link>
          </p>
        </form>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
