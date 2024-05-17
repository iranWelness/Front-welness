import React, { useEffect, useState } from 'react';
import { Box, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link, } from "react-router-dom";
import axios from "axios";

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
        borderRadius: "30px 30px 0 0",
        display: "grid",
        justifyContent: "center",
        textAlign: "center",
    },
    userInfo: {
        marginTop: 20,
        marginBottom: 50,
    },
    userName: {
        color: "#475c95",
    },
    headerTitle: {
        color: "#08afe3"
    },
    innerContainer: {
        padding: 30,
    },
    buttons: {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        bottom: 60
    },
    button: {
        borderRadius: 15,
        width: 180,
        height: 50,
        color: "#fff",
        backgroundColor: "#506497",
        margin: "0 5px",
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

const PanelSelection = () => {
    const classes = useStyles()
    const [fname, setFname] = useState();
    const [lname, setlname] = useState();
    const [phone, setPhone] = useState();
    const [admin, setAdmin] = useState(true);
    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
            },
        };
        axios.get("https://tame-rose-clownfish-ring.cyclic.app/api/v1/users/getMyProfile", config)
            .then(res => {
                console.log(res)
                setFname(res.data.data.firstname)
                setlname(res.data.data.lastname)
                setPhone(res.data.data.phone)
                if (res.data.data.userType === 'admin') {
                    setAdmin(false)
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem('jwt')
                }
            })
    }, [])
    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <h2 className={classes.headerTitle}>انتخاب پنل مورد نظر</h2>
                <Box className={classes.userInfo}>
                    <h3 className={classes.userName}>{fname} {lname}</h3>
                    <p className={classes.userPhone}>{phone}</p>
                </Box>
            </Box>
            <Box className={classes.innerContainer}>
                <Box className={classes.buttons}>
                    <ButtonBase component={Link} to={"/profile"} className={classes.button}>پنل کاربری</ButtonBase>
                    <ButtonBase disabled={admin} component={Link} to={"/admin/management-panel"} className={classes.button}>پنل مدیریت</ButtonBase>
                    <ButtonBase component={Link} to={"/admin/specilists-panel"} className={classes.button}>پنل متخصص</ButtonBase>
                </Box>
            </Box>
            <Box className={classes.botButtons}>
                <ButtonBase className={classes.return}>خرووج از حساب کاربری</ButtonBase>
            </Box>
        </Box>
    )
}

export default PanelSelection
