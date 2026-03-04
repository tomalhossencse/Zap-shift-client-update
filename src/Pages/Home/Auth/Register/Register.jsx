import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import Swal from "sweetalert2";
import useAxios from "../../../../hooks/useAxios";
import LoginIcon from "@mui/icons-material/Login";
import { LoadingButton } from "@mui/lab";
import TextField from "@mui/material/TextField";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // console.log("register", location);

  const { registerUser, updateUserProfile } = useAuth();

  const axiosSecure = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    try {
      setLoading(true);

      const { email, password, name } = data;
      const photo = data.photo[0];

      // 1. register user
      await registerUser(email, password);

      // 2. upload img to imgbb

      const formData = new FormData();
      formData.append("image", photo);

      const img_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host}`;

      const imgRes = await axios.post(img_api_url, formData);
      const photoURL = imgRes.data.data.url;

      // 3. Save user to Database
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL,
      };

      await axiosSecure.post("/users", userInfo);

      // 4. update profile
      const userProfile = {
        displayName: name,
        photoURL,
      };
      await updateUserProfile(userProfile);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(location.state || "/");
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="card bg-base-100 w-full max-w-sm shrink-0">
        <h3 className="text-4xl font-black pl-6">Create an Account</h3>
        <p className="pl-8">Register with ZapShift</p>
        <form onSubmit={handleSubmit(handleRegister)} className="card-body">
          <fieldset className="fieldset gap-4">
            {/* name */}
            <TextField
              label="Name"
              type="name"
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
            <TextField
              type="email"
              label="Email"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email Required!</p>
            )}
            {/* password */}
            <TextField
              type="password"
              label="Password"
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
            <LoadingButton
              loading={loading}
              loadingPosition="end"
              type="submit"
              variant="contained"
              endIcon={<LoginIcon />}
              fullWidth
              color="warning"
            >
              Register
            </LoadingButton>
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
