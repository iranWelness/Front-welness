import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, ButtonBase, Snackbar, InputAdornment, IconButton } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useDispatch } from "react-redux";
import { hideNav } from '../../actions';
import logo from '../../assets/images/LogoNoShadow.png';
import FontSize from '../../components/FontSize';

const useStyles = makeStyles({
    header: { height: 250, maxHeight: "40vh", backgroundColor: "#c4dffaad", fontSize: FontSize(1), },
    headerTitle: {
        color: "#465b92",
        fontWeight: "bold",
        fontSize: FontSize(1.2),
        // textShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px  #ffffffd1",
        textAlign: "center",
        borderRadius: 20,
    },
    headSubText: {
        textAlign: "center",
        marginBottom: 25,
        marginTop: 10,
        color: "#2f416788",
    },
    body: {
        padding: "0px",
        margin: "30px auto 0 auto",
        borderRadius: 20,
        width: "95%",
        maxWidth: 600,
    },
    inputRoot: {
        fontSize: FontSize(.9),
        borderRadius: 15,
        background: "#c4dffaad",
        border: "1px solid #bbd7f2",
        color: "#2f4167",
        "& input": {
            padding: 10,
            height: 42,
            textAlign: "center",
        }
    },
    passwordRoot: {
        fontSize: FontSize(.9),
        borderRadius: 15,
        textAlign: "center",
        background: "#c4dffaad",
        border: "1px solid #bbd7f2",
        color: "#2f4167",
        "& input": {
            padding: 10,
            height: 42,
            marginLeft: 60,
            textAlign: "center",
        },
    },
    labelRoot: {
        fontWeight: "bold",
        fontSize: FontSize(1.2),
        color: "#485c93",
        textShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px  #ffffffd1",
        "&$labelFocused": {
            marginBottom: 10
        }
    },
    loginButton: {
        width: 289,
        height: 57,
        margin: 15,
        borderRadius: 15,
        // background: "linear-gradient(126deg, rgba(73,94,149,1) 0%, rgba(87,108,164,1) 100%)",
        background: "#08afe4",
        fontSize: "1.1em",
        // boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
        fontWeight: "bold",
        color: "#fff"
    },
    signupButton: {
        width: 285,
        height: 52,
        borderRadius: 15,
        fontWeight: "bold",
        fontSize: FontSize(1.05),
        border: "2px solid rgba(73,94,149,1)",
        color: "rgba(73,94,149,1)",
        // boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
    },
    forgotPassword: {
        color: "#2f416788",
        // textShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px  #ffffffd1",
        fontSize: FontSize(1.1),
        textAlign: "center",
        // fontWeight: "bold"
    },
});


const Login = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [logedIn, setLogedIn] = useState("");
    const [admin, setAdmin] = useState(false);
    const [specialist, setSpecialist] = useState(false);
    const [openSnack, setOpenSnack] = React.useState(false);
    const [snackType, setSnackType] = React.useState("");
    const [snackMessage, setSnackMessage] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const dispatch = useDispatch()
    const classes = useStyles();

    const handleClickShowPassword = () => {
        setShowPassword(showPassword => !showPassword)
    }

    useEffect(() => {
        dispatch(hideNav())
    }, [])

    const loginAction = () => {
        axios.post('https://tame-rose-clownfish-ring.cyclic.app/api/v1/users/login', { phone: phone, password: password })
            .then(function (response) {
                localStorage.setItem('userid', response.data.user._id);
                localStorage.setItem('jwt', response.data.token);
                if (response.data.user.userType === 'admin') {
                    setAdmin(true)
                }
                if (response.data.user.userType === 'specialist') {
                    setSpecialist(true)
                }
                setLogedIn(true);
                setOpenSnack(true);
                setSnackType("success")
                setSnackMessage("test")
                setTimeout(() => {
                    // window.location.reload(false);
                }, 500);
                console.log('page to reload')

            })
            .catch(function (error) {
                // console.log(error);
                setSnackType("error")
                setSnackMessage("خطا در لاگین")
                setOpenSnack(true)
                if (error.response.status === 401) {
                    localStorage.removeItem('jwt')
                    setSnackMessage("نام کاربری یا رمزعبور اشتباه است")
                }
            });
    }
    if (logedIn) {
        if (admin) {
            return <Redirect to='/admin/panel-selection' />
        } else if (specialist) {
            return <Redirect to='/panel-selection' />
        } else {
            return <Redirect to='/profile' />
        }
    }

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    return (
        <Grid container direction="column" className={classes.root}>
            <Grid item container justify="center" alignContent="flex-start" className={classes.header}>
                <img style={{ width: 230 }} src={logo} alt="" />

            </Grid>
            <Grid item container className={classes.body} justify="center">

                <form>
                    <Typography className={classes.headerTitle} variant={'h5'}>ورود به پنل کاربری </Typography>
                    <p className={classes.headSubText}>جهت ورود اطلاعات کاربری خود را وارد نمایید </p>
                    <Grid item style={{ width: "100%", marginBottom: 20, display: "flex", justifyContent: "center" }} >
                        <TextField id="phone" style={{ width: 289 }}
                            value={phone}
                            placeholder="شماره‌همراه"
                            variant="filled"
                            onChange={e => setPhone(e.target.value)}
                            InputProps={{
                                classes: { root: classes.inputRoot },
                                disableUnderline: true,
                            }}
                            InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                    focused: classes.labelFocused
                                }
                            }}
                        />
                    </Grid>
                    <Grid item style={{ width: "100%", marginBottom: 50, display: "flex", justifyContent: "center" }}>
                        <TextField
                            placeholder="گذرواژه"
                            variant="filled"
                            id="password"
                            style={{ width: 289 }}
                            InputProps={{
                                classes: { root: classes.passwordRoot },
                                disableUnderline: true,
                                endAdornment:
                                    <InputAdornment position="end" >
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                            onChange={e => setPassword(e.target.value)}
                            InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                    focused: classes.labelFocused
                                }
                            }}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password" />
                    </Grid>
                    <Grid item style={{ width: "100%", }}>
                        <ButtonBase onClick={loginAction} className={classes.loginButton}>ورود</ButtonBase>
                    </Grid>
                    {/* <Grid item style={{ width: "100%", marginBottom: 15, display: "flex", justifyContent: "center" }}>
                        <ButtonBase component={Link} to="/signup" className={classes.signupButton}>ثبت‌نام</ButtonBase>
                    </Grid> */}

                    <Grid item style={{ textAlign: "center" }}>
                        <ButtonBase component={Link} to="/signup" className={classes.forgotPassword} varient="body1">
                            حساب کاربری ندارید؟
                            <span style={{ color: "#08afe4", marginRight: 8 }}>ثبت ‌نام کنید  </span>
                        </ButtonBase>
                    </Grid>
                </form>
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={snackType}>
                    {snackMessage}
                </Alert>
            </Snackbar>
        </Grid>
    )
}

export default Login;
