import React, {useState, useEffect} from 'react';
import Delete from '../../assets/images/Delete.png'
import {Box, ButtonBase, Divider, FormControl, Select, MenuItem, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Header from '../../components/Header';
import addIcon from '../../assets/images/Add.png';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import water from '../../assets/images/water.png';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FontSize from '../../components/FontSize';
import sendNotif from '../../sendNotif';
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
    recomendText: {
        textAlign: "center",
        fontWeight: "bold",
        borderBottom: "1px solid #2e4169",
        color: "#2e4169",
        width: "fit-content",
        margin: "20px auto auto",
        fontSize: FontSize(1)
    },
    daySelection: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "15px 0"
    },
    dayButton: {
        width: 72,
        height: 50,
        backgroundColor: "#c4dffaad",
        margin: 5,
        borderRadius: 15
    },
    timeSelectionContainer: {
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
        marginTop: 10,
    },
    add: {
        display: "grid",
        justifyContent: "center",
        height: 70,
        width: 80,
        boxSizing: "border-box",
        padding: 10,
        color: "#fff",
        backgroundColor: "#4d639d",
        fontSize: FontSize(.6),
        marginRight: 10,
        borderRadius: 15,
        "& img": {
            height: 25,
            width: 25,
        },
    },
    timeSelection: {
        display: 'flex',
        width: 257,
        height: 70,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#c4dffaad",
        borderRadius: 15,
    },
    hrAdjust: {
        display: 'grid',
        color: "#abafd4c2",
        "& svg": {
            fontSize: "2em"
        }
    },
    time: {
        fontSize: FontSize(2),
        color: "#2b4166",
        fontWeight: "bold",
        opacity: .9
    },
    minAdjust: {
        display: 'grid',
        color: "#abafd4c2",
        "& svg": {
            fontSize: "2em"
        }
    },
    timesAdded: {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        boxSizing: "border-box",
        justifyContent: "space-around",
        margin: "10px 0"
    },
    timeAdded: {
        backgroundColor: "#67c8f3",
        margin: 5,
        width: 160,
        height: 50,
        display: "flex",
        alignItems: "center",
        color: "#fff",
        borderRadius: 15,
        fontSize: FontSize(1.4),
        justifyContent: "space-around",
    },
    bottomContainer: {
        width: "100%",
        padding: "10px 0",
        boxSizing: "border-box",
        display: "grid",
        maxWidth: 440,
        margin: "0 auto"
    },
    formControl: {
        width: "100%",
        margin: "0 auto",
        "& .MuiInputBase-root": {
            borderRadius: 15
        }
    },
    reminderDesc: {
        fontWeight: "Bold",
        fontSize: FontSize(1.1),
        color: "#485b95",
        textShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px  #ffffffd1",
        marginTop: 25,
    },
    submit: {
        height: 57,
        width: 289,
        margin: "40px auto auto",
        background: "#51669d",
        color: "#fff",
        fontSize: FontSize(1.1),
        fontWeight: "bold",
        borderRadius: 15,
        boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
    },
    selectRoot: {
        background: "#c4dffaad",
        borderRadius: 15,
        padding: "13px 12px",
    },
    selectitem: {
        display: "flex",
        alignItems: "center"
    },
});

const deleteNotif = i => {
    console.log("hce")
    axios.delete(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/notifs/${i}`, {headers: {'Authorization': `bearer ${localStorage.getItem('jwt')}`}})
        .then(function (response) {
            console.log(response.data.data)
            window.location.reload(false);
        })
        .catch(function (error) {
            console.log(error);
        })
}

const AddNotif = () => {
    const classes = useStyle();
    const [hour, setHour] = useState(22);
    const [minute, setMinute] = useState(22);
    const [notifs, setNotifs] = useState([]);
    const incMin = () => {
        if (minute === 59) {
            setMinute(0);
        } else {
            setMinute(minute + 1)
        }
    }
    const incHr = () => {
        if (hour === 23) {
            setHour(0);
        } else {
            setHour(hour + 1)
        }
    }
    const decHr = () => {
        if (hour === 0) {
            setHour(23);
        } else {
            setHour(hour - 1)
        }
    }
    const decMin = () => {
        if (minute === 0) {
            setMinute(59);
        } else {
            setMinute(minute - 1)
        }
    }
    useEffect(() => {
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/notifs`, {headers: {'Authorization': `bearer ${localStorage.getItem('jwt')}`}})
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
                <Header component="link" to='/profile/notifications'/>
                <h2>ثبت یادآوری جدید</h2>
            </Box>
            <Box style={{padding: "0 20px"}}>
                <p className={classes.recomendText}>یادآوری‌های پیشنهادی مرکز ولنس برای شما</p>
                {/* <Box className={classes.daySelection}>
                    <ButtonBase className={classes.dayButton}>شنبه</ButtonBase>
                    <ButtonBase className={classes.dayButton}>یک‌شنبه</ButtonBase>
                    <ButtonBase className={classes.dayButton}>دوشنبه</ButtonBase>
                    <ButtonBase className={classes.dayButton}>سه‌شنبه</ButtonBase>
                    <ButtonBase className={classes.dayButton}>چهارشنبه</ButtonBase>
                    <ButtonBase className={classes.dayButton}>پنج‌شنبه</ButtonBase>
                    <ButtonBase className={classes.dayButton}>جمعه</ButtonBase>
                    <ButtonBase className={classes.dayButton}>همه</ButtonBase>
                </Box> */}
                <Divider variant="middle" style={{with: "90%", marginBottom: 20}}/>
                <Box className={classes.timeSelectionContainer}>
                    {/* <ButtonBase className={classes.add}>
                        <img style={{ margin: "0 auto", width: 27, height: 27, opacity: .9 }} src={addIcon} alt="اضافه" />
                        <span>اضافه کردن</span>
                    </ButtonBase> */}
                    <Box className={classes.timeSelection}>
                        <Box className={classes.minAdjust}>
                            <ExpandLessIcon onClick={incMin}/>
                            <ExpandMoreIcon onClick={decMin}/>
                        </Box>
                        <Box className={classes.time}>
                            {(hour < 10) ? "0" + hour : hour}:{(minute < 10) ? "0" + minute : minute}
                        </Box>
                        <Box className={classes.hrAdjust}>
                            <ExpandLessIcon onClick={incHr}/>
                            <ExpandMoreIcon onClick={decHr}/>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box className={classes.timesAdded}>
                        {notifs.map(item => (
                            <Box className={classes.timeAdded}>
                                <ButtonBase onClick={() => deleteNotif(item._id)}>
                                    <img style={{width: 27, height: 27, opacity: .8}} src={Delete} alt="حذف"/>
                                </ButtonBase>
                                <span style={{opacity: .9}}>{item.hour}:{item.minute}</span>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Divider variant="middle" style={{with: "90%", marginTop: 20}}/>
                <Box className={classes.bottomContainer}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <Select
                            classes={{root: classes.selectRoot}}
                            IconComponent={ExpandMoreIcon}
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            disableUnderline
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>
                                <Box className={classes.selectitem}>
                                    <img src={water} alt=""/>
                                    <span style={{marginRight: 20,}}>یادآوری نوشیدن آب</span>
                                </Box>
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <span className={classes.reminderDesc}>توضیحات یادآوری</span>
                    <TextField
                        id="standard-multiline-static"
                        rows={4}
                        placeholder="توضیحات خود را وارد کنید"
                    />
                    <ButtonBase onClick={() => {
                        if ("serviceWorker" in navigator) {
                            sendNotif(minute, hour, "آب بنوشید").catch(err => console.error(err));
                        } else {
                            console.log("no service worker")
                        }
                    }} className={classes.submit}><span style={{opacity: .9}}> ثبت یادآوری جدید</span></ButtonBase>
                </Box>
            </Box>
        </Box>
    )
}

export default AddNotif;
