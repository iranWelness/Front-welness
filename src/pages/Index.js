import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { Box } from '@material-ui/core';
import logo from '../assets/images/ezgif-2-be875f80ec84.gif';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
  logo: {
    height: "100vh",
    width: 456,
    margin: "0 auto",
    maxWidth: "100vw"
  },
  root: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    backgroundColor: "#080c29",
    display: "flex",
    justifyContent: "center"
  },
  logoWrapper: {

  },

});

const Index = () => {
  const classes = useStyles();
  const [login, setLogin] = useState();
  const [content, setContent] = useState(
    <Box className={classes.root}>
      <img className={classes.logo} src={logo} alt="logo" />
    </Box>
  );
  const checkLogin = () => {
    if (localStorage.getItem("jwt") === null || localStorage.getItem("jwt") === "") {
      setLogin(false)
    } else {
      axios.get('https://tame-rose-clownfish-ring.cyclic.app/api/v1/users/checkLogin', { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } })
        .then(res => {
          setLogin(true)
        })
        .catch(err => {
          setLogin(false)
        })
    }
  }
  useEffect(() => {
    checkLogin()
  }, [])
  useEffect(() => {
    setTimeout(() => {
      if (login === false) {
        setContent(<Redirect to={"/login"} />)
      } else if (login === true) {
        setContent(<Redirect to={"/profile"} />)
      } else {
        setContent(
          <Box className={classes.root}>
            <img className={classes.logo} src={logo} alt="logo" />
          </Box>
        )
      }
    }, 1000)
  }, [login])
  return (content)
};
export default Index;