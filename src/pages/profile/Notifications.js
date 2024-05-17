import React, { useEffect, useState } from 'react';
import { Box, ButtonBase, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../components/Header';
import add from '../../assets/images/Add.png';
import delte from '../../assets/images/Delete.png';
import water from '../../assets/images/water.png';
import { Link } from 'react-router-dom';
import FontSize from '../../components/FontSize';
import axios from 'axios';

const useStyle = makeStyles({
    topContainer: {
        height: 120,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#c4dffaad",
        "& h2": {
            marginTop: 40,
            color: "#67c7f1",
        }
    },
    quickReminder: {
        display: "flex",
        flexWrap: "wrap",
        margin: "15px 0",
        justifyContent: "center"
    },
    recomendText: {
        textAlign: "center",
        fontWeight: "bold",
        borderBottom: "1px solid #2e4169",
        color: "#2e4169",
        width: "fit-content",
        margin: "20px auto auto"
    },
    quickReminderButtton: {
        width: 160,
        height: 57,
        backgroundColor: "#c4dffaad",
        margin: 10,
        fontSize: FontSize(1),
        borderRadius: 15,
    },
    bottomContainer: {
        display: "grid",
        justifyContent: "center",
        padding: 15,
    },
    addButton: {
        width: 339,
        height: 60,
        backgroundColor: "#4d639d",
        color: "#fff",
        margin: "10px auto",
        borderRadius: 15,
    },
    add: {
        height: 32,
        width: 32,
        position: "relative",
        right: 10,
        opacity: .9
    },
    reminder: {
        width: 339,
        height: 50,
        color: "#fff",
        backgroundColor: "#67c8f3",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 15,
        margin: "15px auto auto",

    },
    reminderLeft: {
        display: "flex",
        marginLeft: 15,
    },
    reminderRight: {
        display: "flex",
        marginRight: 15,
    },
    delete: {
        height: 28,
        width: 28,
        opacity: .8
    }
});


const deleteNotif = i => {
    console.log("hce")
    axios.delete(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/notifs/${i}`, { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } })
        .then(function (response) {
            console.log(response.data.data)
            window.location.reload(false); 
        })
        .catch(function (error) {
            console.log(error);
        })
}

const Notifications = () => {
    const classes = useStyle();
    const [notifs, setNotifs] = useState([]);
    useEffect(() => {
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/notifs`, { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } })
            .then(function (response) {
                console.log(response.data.data)
                setNotifs(response.data.data)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    localStorage.removeItem('jwt')
                }
                console.log(error);
            })
    }, [])
    return (
        <Box>
            <Box className={classes.topContainer}>
                <Header component="link" to='/profile' />
                <h2 style={{ fontSize: FontSize(1.5) }}>یادآوری‌ها</h2>
            </Box>
            <p style={{ fontSize: FontSize(1) }} className={classes.recomendText}>یادآوری‌های پیشنهادی مرکز ولنس برای شما</p>
            <Box className={classes.quickReminder}>
                <ButtonBase className={classes.quickReminderButtton}>یادآور نوشیدن آب</ButtonBase>
                <ButtonBase className={classes.quickReminderButtton}>یادآور نوشیدن دمنوش</ButtonBase>
                <ButtonBase className={classes.quickReminderButtton}>یادآور ریلکسیشن</ButtonBase>
                <ButtonBase className={classes.quickReminderButtton}>یادآور ورزش و یوگا</ButtonBase>
            </Box>
            <Divider variant="middle" />
            <Box className={classes.bottomContainer}>
                <ButtonBase style={{ fontSize: FontSize(1) }} className={classes.addButton} component={Link} to="/profile/notifications/add-notif">
                    <img className={classes.add} src={add} alt="اضافه" />
                    اضافه کردن یادآوری جدید
                </ButtonBase>
                {notifs.map(item => (
                    <Box className={classes.reminder}>
                        <Box className={classes.reminderLeft}>
                            <img src={water} alt="آب" />
                            <p style={{ marginRight: 10 }}>{item.body}</p>
                        </Box>
                        <Box className={classes.reminderRight}>
                            <span style={{ marginLeft: 10, fontSize: "1.3em" }}>{item.hour}:{item.minute}</span>
                            <ButtonBase onClick={()=>{deleteNotif(item._id)}}><img className={classes.delete} src={delte} alt="حذف" /></ButtonBase>
                        </Box>
                    </Box>
                ))}


            </Box>

        </Box>
    )
}

export default Notifications
