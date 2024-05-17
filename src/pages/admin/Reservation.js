import React, { useEffect, useState } from 'react';
import { Box, ButtonBase, Backdrop, Modal, Fade, FormControl, MenuItem, Select, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import moment from 'moment-jalaali';
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker2';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

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
        display: "flex",
        alignItems: "center",
        flexDirection: "column-reverse"
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
    normal: { display: 'flex', justifyContent: "space-evenly", width: "100%" },
    paper: {
        margin: "60px auto",
        width: 400,
        padding: 50,
        backgroundColor: "#dde7f3",
        border: "5px solid #57a7c0",
        borderRadius: 50,
        color: "#8391ab",
        display: "grid",
        justifyContent: "center",
    },
    modalButton: {
        border: "1px solid #58a5b7",
        color: "#58a5b7",
        margin: "20px auto 0",
        padding: 5,
        width: 180,
        borderRadius: 10,
    },
    button: {
        margin: 10,
        background: "#eeeeee",
        padding: 5,
        borderRadius: 5,
    }
});

const appStatus = (id, status, uid) => {
    const body = { "status": status };
    const header = { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } };
    const url = `https://tame-rose-clownfish-ring.cyclic.app/api/v1/appointments/${id}`
    axios.put(url, body, header)
        .then(response => {
            console.log(response);
            alert('انجام شد')
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 401) {
                localStorage.removeItem('jwt')
            }
        })
if (status==='confirm'){
        const body = {
            "title": "نوبت مشاوره",
            "message": 'نوبت مشاوره شما تایید شد.',
            "bradcastType": 'user',
            "user": uid
        }
        axios.post(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/broadcast-messages`, body, header)
            .then(res => {
                alert('sent')
            }).catch(err => {
                console.log(err)
            })
            }
    
}

const Reservation = ({ highlight }) => {
    const history = useHistory();
    const classes = useStyles();
    const [day, setDay] = useState();
    const [apps, setApps] = useState([]);
    console.log(highlight)
    const [archiveOpen, setArchiveOpen] = useState(false);
    const [newOpen, setNewOpen] = useState(false);
    const [newDate, setNewDate] = useState();
    const [hour, setHour] = useState();
    const [newType, setNewType] = useState();
    const [newDura, setNewDura] = useState();
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState();
    const [openSnack, setOpenSnack] = useState(false);
    const hours = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16]

    const handleOpen = () => {
        setArchiveOpen(true);
    };

    const handleClose = () => {
        setArchiveOpen(false);
    };
    const handleNewOpen = () => {
        setNewOpen(true);
    };

    const handleNewClose = () => {
        setNewOpen(false);
    };
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const newApp = () => {
        const body = {
            "date": day,
            "time": hour,
            "length": newDura,
            "type": newType,
            "userId": user
        }
        const header = { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } }
        if (newDura === 'both') {
            axios.post('https://tame-rose-clownfish-ring.cyclic.app/api/v1/appointments', {
                "date": day,
                "time": hour,
                "length": "assessment",
                "type": newType,
                "userId": user
            }, header)
                .then(res => {
                    console.log(res)
                    axios.post('https://tame-rose-clownfish-ring.cyclic.app/api/v1/appointments', {
                        "date": day,
                        "time": hour + .5,
                        "length": "evolution",
                        "type": newType,
                        "userId": user
                    }, header)
                        .then(res => {
                            console.log(res)
                            setOpenSnack(true)
                        })
                        .catch(err => {
                            console.log(err)
                            if (err.response.status === 401) {
                                localStorage.removeItem('jwt')
                            }
                        })
                })
                .catch(err => {
                    console.log(err)
                    if (err.response.status === 401) {
                        localStorage.removeItem('jwt')
                    }
                })
        }
        else {
            axios.post('https://tame-rose-clownfish-ring.cyclic.app/api/v1/appointments', body, header)
                .then(res => {
                    console.log(res)
                    setOpenSnack(true)
                })
                .catch(err => {
                    console.log(err)
                    if (err.response.status === 401) {
                        localStorage.removeItem('jwt')
                    }
                })
        }

    }
    useEffect(() => {
        async function getData() {
            const data = await axios.get('https://tame-rose-clownfish-ring.cyclic.app/api/v1/appointments/', { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } })
            let array = (data.data.data);
            array.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
            setApps(array)
            let highlightAray = []
            apps.forEach(item => {
                highlightAray.push({
                    color: '#00BCD4',
                    start: moment(item.date),
                    end: moment(item.date)
                })
            })
        }
        axios.get('https://tame-rose-clownfish-ring.cyclic.app/api/v1/users/', { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } })
            .then(data => {
                setUsers(data.data.data)
            })
        getData();
    }, [])
    const choseDate = value => {
        setDay(value)
        handleOpen();
    }
    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <h2 className={classes.headerTitle}>رزرواسیون</h2>
            </Box>

            <Box className={classes.innerContainer}>

                <ButtonBase onClick={handleNewOpen}>نوبت جدید</ButtonBase>
                {highlight.length === 0 ?
                    "" :
                    <DatePicker
                        className={classes.calender}
                        max={moment().add(6, 'months')}
                        timePicker={false}
                        showTodayButton={false}
                        isGregorian={false}
                        value={day}
                        ranges={highlight}
                        onChange={value => choseDate(value)}
                    />}

            </Box>
            <Box className={classes.botButtons}>
                <ButtonBase onClick={() => history.goBack()} className={classes.return}>بازگشت</ButtonBase>
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={archiveOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={archiveOpen}>
                    <div className={classes.paper}>
                        {apps.map((item, index) => (
                            moment(item.date).isSame(day, 'day')
                                ? <Box key={index} style={{ display: 'flex', justifyContent: "space-evenly" }}>
                                    <Box style={{ margin: 5 }}>{item.customer.firstname} {item.customer.lastname}</Box>
                                    <Box style={{ margin: 5 }}>{moment(`${new Date(item.date).getUTCFullYear()}-${new Date(item.date).getMonth() + 1}-${new Date(item.date).getDate()}`, 'YYYY-M-D').format('jYYYY/jM/jD')}</Box>
                                    <Box style={{ margin: 5 }}>{item.time}</Box>
                                    <Box style={{ margin: 5 }}>{(item.type === "general") ? "عمومی" : "تخصصی"}</Box>
                                    <Box style={{ margin: 5 }}>
                                        <ButtonBase onClick={() => appStatus(item._id, 'confirm',item.customer._id)}>تایید</ButtonBase>
                                        <ButtonBase onClick={() => appStatus(item._id, 'cancel',item.customer._id)}>لغو</ButtonBase>
                                    </Box>
                                </Box>
                                : ""
                        ))}
                        <ButtonBase className={classes.modalButton} onClick={handleClose}>بازگشت</ButtonBase>
                    </div>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={newOpen}
                onClose={handleNewClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={newOpen}>
                    <div className={classes.paper}>
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">مراجعه کننده</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                onChange={e => setUser(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>هیچکدام</em>
                                </MenuItem>
                                {users.map(item => (
                                    <MenuItem value={item._id}>{item.firstname + " " + item.lastname + " - " + item.phone}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <DatePicker
                            className={classes.calender}
                            max={moment().add(6, 'months')}
                            min={moment()}
                            timePicker={false}
                            showTodayButton={false}
                            isGregorian={false}
                            value={newDate}
                            onChange={value => setNewDate(value)}
                        />
                        <Box style={{ display: 'flex', flexWrap: "wrap", justifyContent: "center" }}>
                            <ButtonBase style={{ color: (newType === "general") ? "red" : "#8391ab" }} className={classes.button} onClick={() => setNewType("general")}>عمومی</ButtonBase>
                            <ButtonBase style={{ color: (newType === "special") ? "red" : "#8391ab" }} className={classes.button} onClick={() => setNewType("special")}>تخصصی</ButtonBase>
                        </Box>
                        <Box style={{ display: 'flex', flexWrap: "wrap", justifyContent: "center" }}>
                            <ButtonBase style={{ color: (newDura === "assessment") ? "red" : "#8391ab" }} className={classes.button} onClick={() => setNewDura("assessment")}>ارزیابی</ButtonBase>
                            <ButtonBase style={{ color: (newDura === "evolution") ? "red" : "#8391ab" }} className={classes.button} onClick={() => setNewDura("evolution")}>ارتقاء</ButtonBase>
                            <ButtonBase style={{ color: (newDura === "both") ? "red" : "#8391ab" }} className={classes.button} onClick={() => setNewDura("both")}>ارتقاء و ارزیابی</ButtonBase>
                        </Box>
                        <Box style={{ display: 'flex', justifyContent: "center", flexWrap: "wrap" }}>
                            {hours.map(hr => (
                                <ButtonBase className={classes.button} style={{ color: (hr === hour) ? "red" : "#8391ab" }} onClick={() => setHour(hr)}>{Math.floor(hr)}:{(hr % 1) ? "30" : "00"}</ButtonBase>
                            ))}
                        </Box>
                        <Box style={{ display: "flex" }}>
                            <ButtonBase className={classes.modalButton} onClick={handleNewClose}>بازگشت</ButtonBase>
                            <ButtonBase className={classes.modalButton} onClick={newApp}>ثبت</ButtonBase>
                        </Box>
                    </div>
                </Fade>
            </Modal>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert style={{ marginBottom: 70, width: "100%" }} onClose={handleCloseSnack} severity='success'>
                    ثبت شد
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Reservation
