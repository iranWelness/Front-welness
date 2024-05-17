import React, { useEffect, useState } from 'react';
import { Box, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link, } from 'react-router-dom';
import axios from 'axios';

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

const SupportMessages = () => {
    const classes = useStyles();
    const [messages, setMessages] = useState([]);
    const token = `bearer ${localStorage.getItem('jwt')}`;

    useEffect(() => {
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/support-messages`, { headers: { 'Authorization': token } },)
            .then(res => {
                setMessages(res.data.data)
                console.log(res.data.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <h2 className={classes.headerTitle}>پیام های پشتیبانی</h2>
            </Box>
            <Box className={classes.innerContainer}>
                {messages.map((item, index) => (
                    <Box style={{ display: "flex", width: "100%" }} key={index}>
                        <Box>{item.message}</Box>
                        <Box>{item.sender.firstname} {item.sender.lastname} </Box>
                    </Box>
                ))}
            </Box>
            <Box className={classes.botButtons}>
                <ButtonBase component={Link} to="/admin/management-panel" className={classes.return}>بازگشت</ButtonBase>
            </Box>
        </Box>
    )
}

export default SupportMessages
