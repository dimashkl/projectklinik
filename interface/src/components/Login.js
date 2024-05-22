import React from "react";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
//import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { LoginUser, reset } from "../features/authSlice";

const Login = () => {

      const [email,setEmail] = useState("");
      const [password,setPassword] = useState("");
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const {user, isError, isSuccess, isLoading, message} = useSelector(
        (state) => state.auth
      );

      useEffect(()=>{
        if(user || isSuccess){
          navigate("/admin");
        }
        dispatch(reset());
      },[user, isSuccess, dispatch, navigate]);

      const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({ email, password }));
      };

        return (
            <form onSubmit={Auth}>
              <div className="auth-wrapper">
                <div className="auth-inner">
                  <h3>Sign In</h3>
                  <div className="mb-3">
                    <label>Email address</label>
                    <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    </div>

                    <div className="mb-3">
                      <label>Password</label>
                      <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      />
                    </div>
                        <div className="d-grid">
                        {isError && <p className="has-text-centered" style={{color: "red"}}>{message}</p>}
                          <Button type="submit" className="btn btn-primary">
                          {isLoading ? 'Loading...' : "Login"}
                          </Button>
                          </div>
                          <p className="forgot-password text-center">
                            Forgot <a href="/Sign-in">password?</a>
                            </p>
                            </div>
                            </div>
                            </form>
        );
      }

      export default Login;
    