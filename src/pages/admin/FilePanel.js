import React from 'react';
import { Box, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    container: {
        width: 800,
        maxWidth: "100%",
        margin: "100px auto 0",
        borderRadius: 30,
        backgroundColor: "#dde7f3",
        boxShadow: "-7px 6px 13px #a6a6a6b8, -7px -8px 20px 0px #ffffffd1",
    },
    header: {
        backgroundColor: "#d3e0f1",
        boxSizing: "border-box",
        padding: "10px 30px",
        borderRadius: "30px 30px 0 0"
    },
    headerTitle: {
        color: "#08afe3"
    },
    innerContainer: {
        padding: 30,
    },
    buttons: {
        display: "grid",
        justifyContent: "center"
    },
    button: {
        borderRadius: 12,
        width: 250,
        height: 45,
        color: "#fff",
        backgroundColor: "#506497",
        margin: "10px 5px",
        boxShadow: "-7px 6px 13px #a6a6a6b8, -7px -8px 20px 0px #ffffffd1",
    },
    botButtons: {
        display: "flex",
        justifyContent: "center",
    },
    return: {
        border: "1px solid #df585f",
        color: "#df585f",
        borderRadius: 11,
        width: 180,
        height: 40,
        marginBottom: 15,
    }
});

const FilePanel = () => {
    const classes = useStyles()
    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <h2 className={classes.headerTitle}>فایل مراجعه کنندگان Health</h2>
            </Box>
            <Box className={classes.innerContainer}>
                <Box className={classes.buttons}>
                    <ButtonBase className={classes.button}>ارسال فایل</ButtonBase>
                    <ButtonBase className={classes.button}>مشاهده و ویرایش فایل‌های پیشین</ButtonBase>
                </Box>
            </Box>
            <Box className={classes.botButtons}>
                <ButtonBase className={classes.return}>بازگشت</ButtonBase>
            </Box>
        </Box>
    )
}

export default FilePanel
