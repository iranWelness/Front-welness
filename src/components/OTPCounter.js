import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    counterContainer: {
        width: "100%"
    },
    counter: {
        textAlign: 'center',
        fontSize: "3em",
        fontWeight: "bold",
        marginTop: 20,
        color: "#ed5561"
    }
});

const OTPCounter = () => {
    const [seconds, setSeconds] = useState(120)
    const useInterval = (callback, delay) => {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            let id = setInterval(() => {
                savedCallback.current();
            }, delay);
            return () => clearInterval(id);
        }, [delay]);
    };
    useInterval(() => (seconds > 0) ? setSeconds(seconds - 1) : setSeconds(0),1000)
    const classes = useStyles();
    return (
        <Grid container justify="center" className={classes.counterContainer}>
            <Grid item className={classes.counter}>
                {Math.floor(seconds / 60)}:{(seconds % 60) < 10 ? `0${seconds % 60}` : seconds % 60}
            </Grid>
            <Grid item>

            </Grid>
        </Grid>
    )
}
export default OTPCounter;