import React, { useState, useEffect } from 'react';
import { Box, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Alert from '@material-ui/lab/Alert';
import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali';
import isHoliday from 'shamsi-holiday';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 300,
        margin: "0 auto",
    },
    button: {
        height: 57,
        margin: "5px auto",
        backgroundColor: "#c4dffaad",
        fontSize: ".9em",
        borderRadius: 10,
        width: 289,
    },
    buttonActive: {
        height: 57,
        margin: 5,
        backgroundColor: "#08afe4",
        boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
        color: "#fff",
        fontSize: ".9em",
        borderRadius: 10,
    },
    calender: {
        border: "none",
        textAlign: "center",
        padding: 10,
        fontSize: "1.3em",
        backgroundColor: "#c9e3fc",
        width: 283,
        height: 60,
        borderRadius: 15,
        color: "#52679f",
        "&::placeholder": {
            color: "#52679f50",
        }
    }
});

const First = ({ setDay }) => {
    const classes = useStyles();
    const [date, setDate] = useState(new Date());
    const [openSnack, setOpenSnack] = useState(false);
    useEffect(() => {
        setDay(date)
    }, [date, setDay])
    const newDate = e => {
        console.log(e._d)
        console.log(isHoliday(e._d))
        if (isHoliday(e._d)) {
            setDate("")
            setOpenSnack(true)
        } else {
            setDate(e)
        }
    }
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    return (
        <Box className={classes.root}>
            <DatePicker
                date={date}
                className={classes.calender}
                onChange={newDate}
                min={moment()}
                max={moment().add(6, 'months')}
                timePicker={false}
                showTodayButton={false}
                isGregorian={false}
                placeholder="تاریخ مورد نظر"
            />
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity='error'>
                    روز تعطیل
                </Alert>
            </Snackbar>
        </Box >
    );
}

export default First
