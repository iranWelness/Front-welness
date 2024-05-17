import React, { useState, useEffect } from 'react';
import { Grid, Typography, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import OTPInput, { ResendOTP } from "otp-input-react";
import OTPCounter from '../../components/OTPCounter';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { hideNav } from '../../actions';
import FontSize from '../../components/FontSize';

const useStyles = makeStyles({
    header: { height: 220, maxHeight: "40vh", backgroundColor: "#c4dffaad", padding: 40 },
    headerTitle: { fontWeight: 'bold', color: "#465b92", textShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px  #ffffffd1", },
    body: {
        padding: 10,
    },
    enterCodeText: {
        textAlign: "center",
        color: "#465b92",
        textShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px  #ffffffd1",
        marginBottom: 35,
        marginTop: 15,
    },
    inputRoot: {
        fontSize: FontSize(1)
    },
    labelRoot: {
        fontSize: FontSize(1),
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
    otpRoot: { flexDirection: "row-reverse", margin: "0 auto", width: "fit-content" },
    activationButton: {
        width: 289,
        color: "#fff",
        margin: "35px auto 0 auto",
        background: "linear-gradient(0deg, rgba(85,145,120,1) 0%, rgba(100,160,134,1) 100%)",
        boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
        fontSize: FontSize(1.1),
        borderRadius: 15,
        height: 57,
        paddingBottom: 4,
        fontWeight: "bold",
    },
    resendActivation: {
        textAlign: "center",
        color: "#ee5e68",
        fontSize: FontSize(1.1),
        fontWeight: "Bold",
    }
});

const ActivateProfile = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [OTP, setOTP] = useState();
    const [activated, setActivated] = useState(false)
    useEffect(() => {
        dispatch(hideNav())
        const userId = localStorage.getItem('userid');
        axios.post('https://tame-rose-clownfish-ring.cyclic.app/api/v1/users/activation', { userId: userId })
            .then(res => {
                setActivated(true)
            })
            .catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem('jwt')
                }
            })
    }, [])
    const checkActivationCode = () => {
        console.log("test")
        axios.post('https://tame-rose-clownfish-ring.cyclic.app/api/v1/users/activate', { activationCode: OTP, userId: localStorage.getItem('userid') })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                    localStorage.removeItem('jwt')
                }
            })
    }
    if (activated) {
        return (<Redirect to='/profile' />)
    }
    return (
        <Grid container className={classes.root}>
            <Grid item container justify="center" alignContent="flex-start" className={classes.header}>
                <Typography className={classes.headerTitle} variant={'h5'}>کد فعالسازی</Typography>
            </Grid>
            <Grid item container direction="column" className={classes.body} justify="center">
                <Grid item>
                    <h2 className={classes.enterCodeText}>کد فعالسازی را وارد نمایید</h2>
                </Grid>
                <Grid item className={classes.otpContainer}>
                    {/*<OTPInput*/}
                    {/*    value={OTP}*/}
                    {/*    onChange={setOTP}*/}
                    {/*    autoFocus*/}
                    {/*    OTPLength={6}*/}
                    {/*    otpType="number"*/}
                    {/*    disabled={false}*/}
                    {/*    className={classes.otpRoot}*/}
                    {/*    inputStyles={{ margin: "0 5px", fontSize: FontSize(1.5), boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1", fontWeight: "bold", backgroundColor: "#c9d3e0", border: "none", padding: 8, borderRadius: "30%", outline: 0, color: "#4f649b" }}*/}
                    {/*/>*/}
                </Grid>
                <Grid item>
                    {/*<ResendOTP*/}
                    {/*    maxTime={120}*/}
                    {/*    renderTime={OTPCounter}*/}
                    {/*    // onTimerComplete={() => setActiveResend(true)}*/}
                    {/*    renderButton={() => { }} />*/}
                </Grid>
                <Grid item style={{ textAlign: "center", color: "#7886a3", fontSize: FontSize(1) }}>
                    زمان معتبر بودن کد فعالسازی
                </Grid>
                <Grid item container justify={"center"} style={{ width: "100%", marginBottom: 15 }}>
                    <ButtonBase onClick={checkActivationCode} className={classes.activationButton} >
                        تایید کد فعالسازی
                    </ButtonBase>
                </Grid>
                <Grid item>
                    <Typography className={classes.resendActivation} variant={'body1'}>ارسال مجدد کد فعالسازی</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ActivateProfile;
