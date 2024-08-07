import "./LoginForm.css";
import React, { useState,useContext } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { validateEmail, validatePassword } from "../../../utils/validation/input-validation";
import { TbDog } from "react-icons/tb";
import fetchLoginInfo from "../../../api/auth/login/fetchLoginInfo";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import  {UserContext}  from "../../../context/auth/UserContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const {login}=useContext(UserContext);


  const navigate = useNavigate();

  const mutation = useMutation(fetchLoginInfo, {
    
    onSuccess: (data) => {
      const { access_token } = data;
      login(access_token);
      
      navigate("/home");
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  const handlePasswordVisibility = (e) => {
    e.preventDefault(); 
    setPasswordVisibility((isPasswordVisible) => !isPasswordVisible);
  };

  const handleEmailChange = (event) => {
    const input = event.target.value;
    const errorMessage = validateEmail(input);
    setEmail(input);

    if (errorMessage) {
      setEmailError(errorMessage);
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event) => {
    const input = event.target.value;
    const errorMessage = validatePassword(input);
    setPassword(input);

    if (errorMessage) {
      setPasswordError(errorMessage);
    } else {
      setPasswordError("");
    }
  };

  const handleSumbit = (event) => {
    event.preventDefault(); 
    if (isInputValid) {
      mutation.mutate({ email, password });
    }
  };

  const isInputValid = () => {
    return !(emailError && passwordError);
  };

  return (
    <div className="login-container">
      <div className="card-shadow"></div>
      <div className="login">
        <h4 className="login_header">
          Login <TbDog />{" "}
        </h4>
        <form>
          <div className="input_container">
            <label className="label_input" htmlFor="email">
              Email Address
            </label>
            <input
              className="text_input"
              type="text"
              id="email"
              value={email}
              onChange={(e) => handleEmailChange(e)}
            />
            {emailError ? (
              <span className="error-message">{emailError}</span>
            ) : (
              ""
            )}
          </div>
          <div className="input_container">
            <label className="label_input" htmlFor="password">
              Password
            </label>
            <div className="password_input_container">
              <input
                className="text_input"
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => handlePasswordChange(e)}
              />
              <button
                onClick={(event) => handlePasswordVisibility(event)}
                className="password-icon"
              >
                {isPasswordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
            {passwordError ? (
              <span className="error-message">{passwordError}</span>
            ) : (
              ""
            )}
          </div>
          <input
            type="submit"
            value="Submit"
            className="btn"
            onClick={(event) => handleSumbit(event)}
          />
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
