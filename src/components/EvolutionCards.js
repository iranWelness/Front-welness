import React from 'react';
import { makeStyles } from '@material-ui/core';
import breath from '../assets/images/120088-Just-Breathe.png';
import relax from '../assets/images/nature.jpg';
import Link from 'react-router-dom/Link';
import { ButtonBase } from '@material-ui/core';
import FontSize from './FontSize';



const useStyles = makeStyles({
    root: {
        maxWidth: 800,
        display: "flex",
        margin: "0 auto",
        padding: 20,
        flexWrap: "wrap",
        justifyContent: "center"
    },
    breath: {
        background: `url(${breath}) `,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        maxWidth: "90vh",
        width: 350,
        height: 100,
        borderRadius: 20,
        color: "#fff",
        overflow: "hidden",
        margin: 10,
    },
    overlay: {
        zIndex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#00000057",
        paddingTop: 20,
        paddingLeft: 10
    },
    relax: {
        background: `url(${relax}) `,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        maxWidth: "90vh",
        width: 350,
        height: 100,
        borderRadius: 20,
        color: "#fff",
        overflow: "hidden",
        margin: 10
    },
});

const EvolutionCards = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ButtonBase style={{ fontSize: FontSize(1.1) }} component={Link} to="/evolution/breathing" className={classes.breath}>
                <div className={classes.overlay}>
                    <p style={{ fontWeight: "bold", fontSize: FontSize(1.1) }}>تنفس</p>
                    <p style={{ fontSize: FontSize(1.1) }}>به شما کمک می‌کند تا آرام شوید</p>
                </div>
            </ButtonBase>
            <ButtonBase component={Link} to="/evolution/relaxation" className={classes.relax}>
                <div className={classes.overlay}>
                    <p style={{ fontWeight: "bold", fontSize: FontSize(1.1) }}>صدای طبیعت</p>
                    <p style={{ fontSize: FontSize(1.1) }}>ریلکس، خوابیدن و مدیتیت</p>
                </div>
            </ButtonBase>
        </div>
    )
}

export default EvolutionCards
