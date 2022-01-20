import jwt from 'jwt-decode'
import axios from "axios";
const API_URL = "http://localhost:5000/api/";

const register = async (id_company, username, email, password) => {
    try {
        const response = await axios.post(API_URL + 'signup', {id_company, username, email, password})
        return response.data
    } catch (err) {
        console.log(err)
    }
};

const login = async (mail, password) => {
    const response = await axios
    .post(API_URL + "login", {
        mail,
        password,
    });
    console.log(response)
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  };


const logout = () => {
    localStorage.removeItem("user");
    // localStorage.removeItem("score");
};

const getCurrentUser = () => {
    const token = localStorage.getItem("user");
    const userDecoded = jwt(token)
    return userDecoded
};


const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
  };
  
  export default AuthService