import React from 'react';
import { Box, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link, } from 'react-router-dom';
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
        display: "grid",
        justifyContent: "center"
    },
    button: {
        borderRadius: 15,
        width: 180,
        height: 50,
        color: "#fff",
        backgroundColor: "#506497",
        margin: "20px 5px",
        boxShadow: "-7px 6px 13px #a6a6a6b8, -7px -8px 20px 0px #ffffffd1",
    },
    row: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
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
        marginLeft: 5,
    }
});

const SpecilistsPanel = () => {
    const classes = useStyles()
    return (
        <>
            <AdminNav />
            <Box className={classes.container}>
                <Box className={classes.header}>
                    <h2 className={classes.headerTitle}>پنل متخصص</h2>
                </Box>
                <Box className={classes.innerContainer}>
                    <Box className={classes.row}>
                        <ButtonBase component={Link} to="/admin/online-support" className={classes.button}>پشتیبانی غیر حضوری</ButtonBase>
                        <ButtonBase component={Link} to={"/admin/user-info"} className={classes.button}>اطلاعات کاربران</ButtonBase>
                    </Box>
                    <Box className={classes.row}>
                        <ButtonBase component={Link} to='/admin/reservation' className={classes.button}>رزواسیون</ButtonBase>
                        <ButtonBase component={Link} to={"/admin/analyzes"} className={classes.button}>ارزیابی ها</ButtonBase>
                    </Box>
                    <Box className={classes.botButtons}>
                        <ButtonBase component={Link} to={"/admin/panel-selection"} className={classes.return}>بازگشت</ButtonBase>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default SpecilistsPanel
