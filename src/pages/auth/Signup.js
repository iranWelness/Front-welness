import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, ButtonBase, InputAdornment, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { hideNav, } from '../../actions';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FontSize from '../../components/FontSize';

const useStyles = makeStyles({
    header: { height: 210, maxHeight: "40vh", padding: 40, backgroundColor: "#c4dffaad", fontSize: FontSize(1), },
    headerTitle: {
        color: "#465b92",
        fontWeight: "bold",
        width: "95%",
        textShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px  #ffffffd1",
        textAlign: "center",
        padding: "19px 0",
        marginBottom: 50,
        borderRadius: 20,
        fontSize: FontSize(1),
    },
    body: {
        padding: "0px 10px",
        margin: "30px auto 0 auto",
        borderRadius: 20,
        width: "95%",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    inputRoot: {
        fontSize: FontSize(.9),
        width: "100%"
    },
    labelRoot: {
        width: "100%",
        fontWeight: "bold",
        fontSize: FontSize(1.2),
        color: "#485c93",
        textShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px  #ffffffd1",
        "&$labelFocused": {
            marginBottom: 10
        }
    },
    sendActivation: {
        width: 289,
        color: "#fff",
        margin: "70px auto 0 auto",
        background: "linear-gradient(0deg, rgba(85,145,120,1) 0%, rgba(100,160,134,1) 100%)",
        boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
        fontSize: FontSize(1.1),
        borderRadius: 15,
        height: 57,
        paddingBottom: 4,
        fontWeight: "bold",
    },
});

const Signup = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [signedUp, setSignedUp] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
    const dispatch = useDispatch()
    const classes = useStyles();

    const handleClickShowPassword = () => {
        setShowPassword(showPassword => !showPassword)
    }

    const handleClickShowRepeatPassword = () => {
        setShowRepeatPassword(showRepeatPassword => !showRepeatPassword)
    }

    useEffect(() => {
        dispatch(hideNav())
    }, [])
    const signup = () => {
        if (password === rePassword) {
            axios.post('https://tame-rose-clownfish-ring.cyclic.app/api/v1/users/signup', { phone: phone, password: password, })
                .then(res => {
                    localStorage.setItem('userid', res.data.user._id);
                    localStorage.setItem('jwt', res.data.token);
                    setSignedUp(true)
                    console.log(res)
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        localStorage.removeItem('jwt')
                    }
                })
        }
    }
    if (signedUp) {
        return <Redirect to='/profile/edit' />
    }
    return (
        <Grid container className={classes.root}>
            <Grid item container justify="center" alignContent="flex-start" className={classes.header}>
                <Typography className={classes.headerTitle} variant={'h5'}>عضویت در پنل کاربری </Typography>
            </Grid>
            <Grid item container direction="column" className={classes.body} justify="center">
                <form>
                    <Grid item style={{ marginBottom: 25 }}>
                        <TextField id="phone" style={{ width: "100%" }} InputProps={{ classes: { root: classes.inputRoot } }}
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                    focused: classes.labelFocused
                                }
                            }} label="شماره همراه" />
                    </Grid>
                    <Grid item style={{ width: "316px%", marginBottom: 25 }}>
                        <TextField id="password"
                            style={{ width: "100%" }}
                            InputProps={{
                                classes: { root: classes.inputRoot },
                                endAdornment:
                                    <InputAdornment position="end" >
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }} InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                    focused: classes.labelFocused
                                }
                            }}
                            type={showPassword ? 'text' : 'password'}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="new-password"
                            value={password}
                            label="رمزعبور" />
                    </Grid>
                    <Grid item style={{ width: "100%", marginBottom: 25 }}>
                        <TextField id="repeatedPassword"
                            style={{ width: "316px" }}
                            InputProps={{
                                classes: { root: classes.inputRoot },
                                endAdornment:
                                    <InputAdornment position="end" >
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowRepeatPassword}
                                        >
                                            {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }} InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                    focused: classes.labelFocused
                                }
                            }}
                            type={showRepeatPassword ? 'text' : 'password'}
                            onChange={e => setRePassword(e.target.value)}
                            autoComplete="new-password"
                            value={rePassword} label="تکرار رمزعبور " />
                    </Grid>
                    <Grid item style={{ width: "316px%", marginBottom: 15, display: "flex", justifyContent: "center" }}>
                        <ButtonBase onClick={signup} className={classes.sendActivation}>ثبت نام</ButtonBase>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}

export default Signup;
