import React from 'react';
import { makeStyles } from '@material-ui/core';
import sudoku from '../assets/images/sudoku.jpg';
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
    sudoku: {
        background: `url(${sudoku}) `,
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
        paddingTop: 22,
        paddingLeft: 10
    },
    relax: {
        background: `url(${sudoku}) `,
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

const ChalengesCard = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ButtonBase style={{ fontSize: FontSize(1.1) }} component={Link} to="/evolution/sudoko" className={classes.sudoku}>
                <div className={classes.overlay}>
                    <p style={{ fontWeight: "bold", fontSize: FontSize(1.1) }}>سودوکو</p>
                    <p style={{ fontSize: FontSize(1.1) }}>برای تقویت تمرکز و حل مسئله</p>
                </div>
            </ButtonBase>

        </div>
    )
}

export default ChalengesCard
