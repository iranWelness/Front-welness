import React from 'react';
import { Box, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AdminNav from '../../components/AdminNav'

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
    inputs: {
        display: "flex",
        justifyContent: "center",
        margin: "20px auto"
    },
    Input: {
        borderRadius: 11,
        backgroundColor: "#d7e1ed",
        border: "none",
        outline: "none",
        height: 30,
        width: 180,
        margin: 5,
        padding: 5,
    },
    botButtons: {
        display: "flex",
        justifyContent: "center",
    },
    register: {
        backgroundColor: "#08afe4",
        color: "#fff",
        borderRadius: 11,
        width: 180,
        height: 40,
        marginRight: 5,
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

const HealthFiles = () => {
    const classes = useStyles()
    return (
        <>
            <AdminNav />
            <Box className={classes.container}>
                <Box className={classes.header}>
                    <h2 className={classes.headerTitle}>جستجوی فایل‌های ارزیابی آپلود شده</h2>
                </Box>
                <Box className={classes.innerContainer}>
                    <Box className={classes.inputs}>
                        <input type="text" className={classes.Input} placeholder="نام" />
                        <input type="text" className={classes.Input} placeholder="نام خانوادگی" />
                    </Box>
                </Box>
                <Box className={classes.botButtons}>
                    <ButtonBase className={classes.register}>جستجو</ButtonBase>
                    <ButtonBase className={classes.return}>بازگشت</ButtonBase>
                </Box>
            </Box>
        </>
    )
}

export default HealthFiles
