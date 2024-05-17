import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../components/Header';
import { ButtonBase, Button, Box, Typography } from '@material-ui/core';
import Link from 'react-router-dom/Link';
import FontSize from '../../components/FontSize';
import { useSelector } from 'react-redux';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    buttons: {
        display: "flex",
        flexDirection: "column",
    },
    buttonWrapper: {
        display: "flex",
        justifyContent: "center",
        width: '100%',
        paddingTop: 20
    },
    buttonNext: {
        width: 289,
        height: 57,
        margin: 15,
        borderRadius: 15,
        background: "linear-gradient(126deg, rgba(73,94,149,1) 0%, rgba(87,108,164,1) 100%)",
        fontSize: FontSize(1.1),
        boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
        fontWeight: "bold",
    },
    instructions: {
        textAlign: "center",
        color: "#68c7f5",
        fontWeight: "bold",
        fontSize: FontSize(1.3)
    },
    topDesc: {
        textAlign: "center",
        paddingTop: 90,
        paddingBottom: 26,
        backgroundColor: "#c4dffaad",
    },
    descRoot: {
        color: "#68c7f5",
        fontWeight: "bold",
        fontSize: FontSize(1.3)
    },
    button: {
        height: 57,
        margin: "10px auto",
        backgroundColor: "#c4dffaad",
        fontSize: FontSize(.9),
        borderRadius: 10,
        width: 289,
    },
    buttonActive: {
        height: 57,
        width: 289,
        margin: "5px auto",
        backgroundColor: "#08afe4",
        boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
        color: "#fff",
        fontSize: FontSize(.9),
        borderRadius: 10,
    },
    topSect: {
        height: 70,
        backgroundColor: "#c4dffaad",
        paddingTop: 70,
        marginBottom: 15,
    }
}));


const ReserveAppointment = () => {
    const classes = useStyles();
    const [active, setActive] = useState();

    const resType = useSelector(state => {
        return state.resType;
    });



    return (
        <div className={classes.root}>


            <div>
                <div style={{ displat: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Box className={classes.topSect}>
                        <Header component="link" to="/appointments" />
                        <Typography className={classes.instructions}>ثبت زمان مشاوره</Typography>
                    </Box>
                    <Box className={classes.buttons}>
                        <ButtonBase
                            className={(active === 0.5) ? classes.buttonActive : classes.button}
                            onClick={() => setActive(0.5)}>
                            مشاوره 30 دقیقه‌ای
                        </ButtonBase>
                        <ButtonBase

                            className={(active === 1) ? classes.buttonActive : classes.button} onClick={() => setActive(1)}>
                            مشاوره 60 دقیقه‌ای
                        </ButtonBase>
                        <ButtonBase
                            className={(active === 1.5) ? classes.buttonActive : classes.button} onClick={() => setActive(1.5)}>
                            مشاوره 90 دقیقه‌ای
                        </ButtonBase>
                        <ButtonBase
                            className={(active === 2) ? classes.buttonActive : classes.button} onClick={() => setActive(2)}>
                            مشاوره 120 دقیقه‌ای
                        </ButtonBase>
                    </Box>
                    <div className={classes.buttonWrapper}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.buttonNext}
                            component={Link}
                            to="/appointments/OnlineApoointment/chat"
                        >
                            مرحله بعد
                        </Button>

                    </div>
                </div>
            </div >
        </div >
    );
}

export default ReserveAppointment;