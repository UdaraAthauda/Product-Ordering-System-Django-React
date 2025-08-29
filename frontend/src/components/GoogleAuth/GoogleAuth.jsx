import {useContext} from "react";
import { GoogleLogin } from "@react-oauth/google";
import api from "@/api";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER } from "@/constants";
import { toaster } from "../ui/toaster";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function GoogleAuth() {
  const navigate = useNavigate();
  const {setIsAuthenticated} = useContext(AuthContext)

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await api.post("auth/google/login/", {
        token: credentialResponse.credential,
      });

      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      localStorage.setItem(USER, res.data.user?.email)
      setIsAuthenticated(true)

      toaster.create({
        title: "Login Successful",
        description: "You have been logged in with Google.",
        type: "success",
        closable: true,
        duration: 5000,
      });

      navigate("/");

    } catch (error) {
      console.error("Google login error:", error);

      toaster.create({
        title: "Login Failed",
        description: "Google login was unsuccessful. Please try again.",
        type: "error",
        closable: true,
        duration: Infinity,
      });
    }
  };

  return (
    <>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          toaster.create({
            title: "Login Failed",
            description: "Google login was unsuccessful. Please try again.",
            type: "error",
            closable: true,
            duration: Infinity,
          });
        }}
      />
    </>
  );
}
