import React, { useState, useEffect } from 'react';
import { Box, ButtonBase, } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid'
import { makeStyles } from '@material-ui/styles';
// import io from 'socket.io-client';
import axios from 'axios';
import moment from 'moment-jalaali';
import { Link } from 'react-router-dom';

// const socket = io.connect('https://tame-rose-clownfish-ring.cyclic.app');


const uniq = (a) => {
    var prims = { "boolean": {}, "number": {}, "string": {} }, objs = [];

    return a.filter(function (item) {
        var type = typeof item;
        if (type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}

const useStyles = makeStyles({
    container: {
        width: 1100,
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
        height: 400,
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
    preview: {
        display: "flex",
        justifyContent: "space-between"
    }
});

const AdminChat = () => {
    const classes = useStyles()
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [rows, setRows] = useState([]);
    const [rows2, setRows2] = useState([]);
    const [loading, setLoading] = useState(true);
    const columns = [
        { field: "id", headerName: "#", width: 50 },
        { field: 'firstname', headerName: 'نام', width: 120 },
        { field: 'lastname', headerName: 'نام خانوادگی', width: 150 },
        { field: 'lastMessage', headerName: 'آخرین پیام', width: 350 },
        { field: 'date', headerName: 'زمان', width: 140 },
        { field: 'status', headerName: 'وضعیت', width: 120 },
        {
            field: 'view', headerName: 'مشاهده', width: 100,
            renderCell: (param) => (<Link to={`chat?user=${param.value}`}>مشاهده</Link>)
        },
    ]
    useEffect(() => {
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/messages/`)
            .then(res => {
                let array = [];
                res.data.data.forEach(element => {
                    console.log(element)
                    array.push(element.user._id)
                });
                setUsers(uniq(array))
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                }
            })
    }, [])
    useEffect(() => {
        for (const user of users) {
            axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/messages/${user}`)
                .then(res => {
                    setMessages(oldArray => [...oldArray, res.data.data]);
                    console.log(res.data.data[res.data.data.length - 1].date)
                    setRows(oldArray => [...oldArray, {
                        id: rows.length + 1,
                        firstname: res.data.data[res.data.data.length - 1].user.firstname,
                        lastname: res.data.data[res.data.data.length - 1].user.lastname,
                        lastMessage: res.data.data[res.data.data.length - 1].message,
                        date: moment(new Date(res.data.data[res.data.data.length - 1].date)).format(' jD jMMMM jYYYY HH:mm:ss'),
                        status: (res.data.data[res.data.data.length - 1].user._id !== res.data.data[res.data.data.length - 1].sender._id) ? "پاسخ داده شده" : "پاسخ داده نشده",
                        view: res.data.data[res.data.data.length - 1].user._id
                    }]);
                })
                .catch(err => {
                    console.log(err)
                    if (err.response.status === 401) {
                    }
                })
        }


        setLoading(false)
    }, [users])
    useEffect(() => {
        setRows2([])
        rows.forEach((item, index) => {
            setRows2(old => [...old, {
                id: index + 1,
                firstname: item.firstname,
                lastname: item.lastname,
                lastMessage: item.lastMessage,
                date: item.date,
                status: item.status,
                view: item.view
            }])
        })
    }, [rows])
    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <h2 className={classes.headerTitle}>گفتگو</h2>
            </Box>
            <Box className={classes.innerContainer}>
                {/* {messages.map((item, index) => (
                    <Box component={Link} to={"/admin/chat?user=" + item[item.length - 1].user._id} className={classes.preview} key={item.index}>
                        <Box style={{ width: "25%" }}>{item[item.length - 1].user.firstname}</Box>
                        <Box style={{ width: "25%" }}>{item[item.length - 1].user.lastname}</Box>
                        <Box style={{ width: "25%" }}>{item[item.length - 1].message}</Box>
                        <Box style={{ width: "25%" }}>
                            {moment(new Date(item[item.length - 1].date)).format('jYYYY/jM/jD HH:mm:ss')}
                        </Box>
                    </Box>
                ))} */}
                <DataGrid
                    rows={rows2}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection={false}
                >{rows2}{rows}</DataGrid>
            </Box>
            <Box className={classes.botButtons}>
                <ButtonBase className={classes.return}>بازگشت</ButtonBase>
            </Box>
        </Box>
    )
}

export default AdminChat
