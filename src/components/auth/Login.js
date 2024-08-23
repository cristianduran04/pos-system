import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { auth } from '../../api/auth';
import {TITLES} from "../../utils/constants"
import styles from "./Login.module.scss"
import { useAuth } from '../../hooks/useAuth';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './Login.form';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  
  const authCtrl = new auth();
  const {user} = useAuth();
  const {login} = useAuth()
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formkValue)=>{
      try {
        const response = await authCtrl.login(formkValue)
        login(response.jwt)
        navigate("/")
      } catch (error) {
        console.error("login error: ", error)
      }
    }
  })

  const loginFun = async ()=>{
    try {
      
    } catch (error) {
      console.error("login error: ",error)
    }
  }

  

  return (
    <>
      <Container className={styles.container}>
          <h1>
            Bienvenido a {TITLES.APP_TITLE}
          </h1>
          <Container className={styles.form}>
            <form onSubmit={formik.handleSubmit}>
            <TextField
              placeholder='usuario'
              type='text'
              name='identifier'
              value={formik.values.identifier}
              error={formik.values.identifier}
              onChange={formik.handleChange}
            />
            <TextField
              placeholder='contraseña'
              name='password'
              type='password'
              value={formik.values.password}
              error={formik.errors.password}
              onChange={formik.handleChange}
            />
            <Button
              variant='contained'
              color='primary'
              type='submit'
            >
              Iniciar Sesion
            </Button>
            </form>
          </Container>
          
      </Container>
    </>
  );
};

export default Login;
