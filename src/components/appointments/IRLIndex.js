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
        padding: "20px 0",
        maxWidth: "90vw",
        alignItems: "center",
    },
    button: {
        height: 59,
        backgroundColor: "#c4dffaad",
        borderRadius: 10,
        maxWidth: "100%",
        width: 300,
        color: "#2f4167",
        margin: 10,
    },
    recordButton: {
        height: 57,
        backgroundColor: "#08afe4",
        borderRadius: 10,
        maxWidth: "90%",
        color: "#fff",
        fontSize: "0.9em",
        margin: 10,
        marginTop: 15,
        width: 289,
        boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
    }
})

const IRLIndex = () => {
    const classes = useStyle()
    const dispatch = useDispatch()
    return (
        <Box className={classes.root}>
            <ButtonBase style={{ fontSize: FontSize(.8) }} component={Link} to="/appointments/reserve?type=special" onClick={() => { dispatch(setResType("specialized")) }} className={classes.button}>ارزیابی و ارتقا ابعاد ولنس: وضعیت فعلی</ButtonBase>
            <ButtonBase style={{ fontSize: FontSize(.8) }} component={Link} to="/appointments/reserve?type=general" onClick={() => { dispatch(setResType("general")) }} className={classes.button}>ارزیابی و ارتقا ابعاد ولنس: وضعیت طولانی مدت</ButtonBase>
            <Divider style={{ width: "90%", margin: "20px auto", fontSize: FontSize(1) }} />
            <ButtonBase style={{ fontSize: FontSize(.9) }} component={Link} to="/appointments/results" className={classes.recordButton} >مشاهده فایل های پشتیبانی‌های پیشین</ButtonBase>
        </Box>
    )
}

export default IRLIndex;