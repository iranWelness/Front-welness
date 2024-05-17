import React, { useEffect, useState } from 'react';
import { Box, ButtonBase, FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';
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
        display: "grid"
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
    },
    register: {
        backgroundColor: "#08afe4",
        color: "#fff",
        borderRadius: 11,
        width: 180,
        height: 40,
        marginRight: 5,
    },
});

const AdminBroadcastMessages = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [type, setType] = useState('');
    const [user, setUser] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const token = `bearer ${localStorage.getItem('jwt')}`;

    useEffect(() => {
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/users/`, { headers: { 'Authorization': token } },)
            .then(res => {
                setUsers(res.data.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])
    const send = () => {
        const body = {
            "title": title,
            "message": message,
            "bradcastType": type,
            "user": user
        }
        axios.post(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/broadcast-messages`, body, { headers: { 'Authorization': token } },)
            .then(res => {
                alert('sent')
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <h2 className={classes.headerTitle}>پیام های برادکست</h2>
            </Box>
            <Box className={classes.innerContainer}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">نوع</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        onChange={e => setType(e.target.value)}
                    >
                        <MenuItem value={'all'}>همه</MenuItem>
                        <MenuItem value={'user'}>کاربر</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl} disabled={(type === 'user') ? false : true}>
                    <InputLabel id="user-select-label">کاربر</InputLabel>
                    <Select
                        labelId="user-select-label"
                        id="user-select"
                        value={user}
                        onChange={e => setUser(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>هیچ</em>
                        </MenuItem>
                        {users.map(item => (
                            <MenuItem value={item._id}>{item.phone + " - " + item.firstname + " " + item.lastname}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField value={title} onChange={(e) => setTitle(e.target.value)} id="standard-basic" label="title" />
                <TextField
                    id="standard-multiline-static"
                    label="پیام"
                    multiline
                    rows={4}
                    value={message} onChange={(e) => setMessage(e.target.value)}
                />
            </Box>
            <Box className={classes.botButtons}>
                <ButtonBase component={Link} to="/admin/management-panel" className={classes.return}>بازگشت</ButtonBase>
                <ButtonBase onClick={send} className={classes.register}>ارسال</ButtonBase>
            </Box>
        </Box>
    )
}

export default AdminBroadcastMessages
