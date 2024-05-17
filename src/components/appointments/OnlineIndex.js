import React from 'react';
import { ButtonBase, Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'react-router-dom/Link';
import { useDispatch } from "react-redux";
import { setResType } from '../../actions';
import FontSize from '../FontSize';

const useStyle = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        width: 400,
        margin: "0 auto",
        padding: 20,
        maxWidth: "90vw",
        alignItems: "center",
    },
    button: {
        height: 59,
        backgroundColor: "#c4dffaad",
        borderRadius: 10,
        maxWidth: "80%",
        width: 289,
        color: "#2f4167",
        fontSize: "0.9em",
        margin: 10,
    },
    recordButton: {
        height: 57,
        backgroundColor: "#08afe4",
        borderRadius: 10,
        maxWidth: "80%",
        color: "#fff",
        fontSize: "0.9em",
        margin: 10,
        marginTop: 15,
        width: 289,
        boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
    }
})

const OnlineIndex = () => {
    const classes = useStyle()
    const dispatch = useDispatch()
    return (
        <Box className={classes.root}>
            <ButtonBase style={{ fontSize: FontSize(1) }} component={Link} to="/appointments/OnlineApoointment/chat" onClick={() => { dispatch(setResType("specialized")) }} className={classes.button}>گفتگوی آنلاین</ButtonBase>
            
        </Box>
    )
}

export default OnlineIndex;