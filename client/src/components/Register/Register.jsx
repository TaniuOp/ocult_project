// Import de validaciones del Form 
import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authservice";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

import './Register.css'

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [id_company, setIdCompany] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  const required = value => {
    if (!value) {
      return (
        <div className="alert" role="alert">
          ¡Debes completar todos los campos!
        </div>
      );
    }
  }

  const validateCaptchaF = () => {
    let user_captcha = document.getElementById('user_captcha_input').value;
    if (validateCaptcha(user_captcha) == true) {
      console.log('Captcha Matched');
      if (checkBtn.current.context._errors.length === 0) {
        AuthService.register(id_company, username, email, password)
          .then((response) => setMessage(response.data.message))
          .then(setSuccessful(true))
          .then(navigate('/login'))
          .catch((error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setMessage(resMessage);
            setSuccessful(false);
          })
      }
    }
    else {
      alert('Captcha incorrecto');
      document.getElementById('user_captcha_input').value = "";
    }
  }


  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          Debe ser un correo válido.
        </div>
      );
    }
  };

  const vpassword = (value) => {
    if (value.length < 10 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          La contraseña debe tener al menos 10 caracteres.
        </div>
      );
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  },[]);


  const onChangeIdCompany = (e) => {
    const id_company = e.target.value;
    setIdCompany(id_company);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
    validateCaptchaF()
  };


  return (
    <div className="container">
      <div className="div_form">

        <img src="../assets/icons/LogoLightOcult.png" alt="logoOcult" className='logoForm' />

        <Form onSubmit={handleSubmit} ref={form} className="formItself">
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="id_company">ID de Empresa</label>
                <Input
                  type="text"
                  className="form-control"
                  name="id_company"
                  value={id_company}
                  onChange={onChangeIdCompany}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Nombre</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <p className='idinfo'>El id de tu empresa debe ser proporcionado por tu responsable</p>
              <div className="form-group">
          <div>
            <LoadCanvasTemplate />
          </div>
          <div className="col mt-3">
            <div><input placeholder="Enter Captcha Value" id="user_captcha_input" name="user_captcha_input" type="text"></input></div>
          </div>
          
          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}


          <CheckButton style={{ display: "none" }} ref={checkBtn} />
                <button className="btn">Registro</button>
              </div>
            </div>
          )}


        </Form>
      </div>
    </div>
  );
}
export default Register;