import React, { useState, useEffect } from 'react';
import { Box, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FontSize from '../../FontSize';

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 300,
        margin: "0 auto",
    },
    button: {
        height: 57,
        margin: "5px auto",
        backgroundColor: "#c4dffaad",
        fontSize: ".9em",
        borderRadius: 10,
        width: 289,
    },
    buttonActive: {
        height: 57,
        margin: 5,
        backgroundColor: "#08afe4",
        boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
        color: "#fff",
        fontSize: ".9em",
        borderRadius: 10,
    }
});

const Second = ({ setDuration }) => {
    const classes = useStyles();
    const [active, setActive] = useState('list');
    useEffect(() => {
        setDuration(active)

    }, [active, setDuration])
    return (
        <Box className={classes.root}>
            <ButtonBase
                style={{ fontSize: FontSize(1) }}
                className={(active === 'assessment') ? classes.buttonActive : classes.button}
                onClick={() => setActive('assessment')}>
                مشاوره ارزیابی
            </ButtonBase>
            <ButtonBase
                style={{ fontSize: FontSize(1) }}
                className={(active === "evolution") ? classes.buttonActive : classes.button} onClick={() => setActive("evolution")}>
                مشاوره ارتقاء
            </ButtonBase>
            <ButtonBase
                style={{ fontSize: FontSize(1) }}
                className={(active === "both") ? classes.buttonActive : classes.button} onClick={() => setActive("both")}>
                مشاوره ارزیابی و ارتقاء
            </ButtonBase>
        </Box >
    );
}

export default Second
