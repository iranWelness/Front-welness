import React, { useState, useEffect } from 'react';
import { Box, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FontSize from '../../FontSize';
import axios from 'axios';
import { useLocation } from "react-router-dom";


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
    }
});

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const getHoure = hr => {
    switch (hr) {
        case 8:
            return (0)
        case 8.5:
            return (1)
        case 9:
            return (2)
        case 9.5:
            return (3)
        case 10:
            return (4)
        case 10.5:
            return (5)
        case 11:
            return (6)
        case 11.5:
            return (7)
        case 12:
            return (8)
        case 12.5:
            return (9)
        case 13:
            return (10)
        case 13.5:
            return (11)
        case 14:
            return (12)
        case 14.5:
            return (13)
        case 15:
            return (14)
        case 15.5:
            return (15)
        case 16:
            return (16)
        case 16.5:
            return (17)
        case 17:
            return (18)
        default:
            return (null)
    }
}

const Third = ({ setHour, day, duration }) => {
    const classes = useStyles();
    const [active, setActive] = useState('');
    const [buttonActive, setButtonActive] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
    const token = `bearer ${localStorage.getItem('jwt')}`
    useEffect(() => {
        setHour(active)
        console.log(active)
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/appointments/`, { headers: { 'Authorization': token } })
            .then(res => {
                res.data.data.forEach(item => {
                    // console.log(new Date(item.date), day._d)
                    const currentDate = `${day}`

                    if (
                        day._d.getDate() === new Date(item.date).getDate() &&
                        day._d.getMonth() === new Date(item.date).getMonth() &&
                        day._d.getYear() === new Date(item.date).getYear()
                    ) {
                        console.log(item)
                        console.log(getHoure(14.5))
                        let arr = buttonActive;
                        arr[getHoure(item.time)] = true
                        if (duration === 'both') {
                            arr[getHoure(item.time + .5)] = true
                        }
                        setButtonActive(arr)
                    }

                })
            })
    }, [active])
    return (
        <Box className={classes.root}>
            <ButtonBase
                disabled={buttonActive[0]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 8) ? classes.buttonActive : classes.button}
                onClick={() => setActive(8)}>
                8:00
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[1]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 8.5) ? classes.buttonActive : classes.button} onClick={() => setActive(8.5)}>
                8:30
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[2]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 9) ? classes.buttonActive : classes.button} onClick={() => setActive(9)}>
                9:00
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[3]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 9.5) ? classes.buttonActive : classes.button} onClick={() => setActive(9.5)}>
                9:30
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[4]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 10) ? classes.buttonActive : classes.button} onClick={() => setActive(10)}>
                10:00
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[5]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 10.5) ? classes.buttonActive : classes.button} onClick={() => setActive(10.5)}>
                10:30
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[6]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 11) ? classes.buttonActive : classes.button} onClick={() => setActive(11)}>
                11:00
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[7]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 11.5) ? classes.buttonActive : classes.button} onClick={() => setActive(11.5)}>
                11:30
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[8]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 12) ? classes.buttonActive : classes.button} onClick={() => setActive(12)}>
                12:00
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[9]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 12.5) ? classes.buttonActive : classes.button} onClick={() => setActive(12.5)}>
                12:30
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[10]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 13) ? classes.buttonActive : classes.button}
                onClick={() => setActive(13)}>
                13:00
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[11]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 13.5) ? classes.buttonActive : classes.button} onClick={() => setActive(13.5)}>
                13:30
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[12]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 14) ? classes.buttonActive : classes.button} onClick={() => setActive(14)}>
                14:00
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[13]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 14.5) ? classes.buttonActive : classes.button} onClick={() => setActive(14.5)}>
                14:30
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[14]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 15) ? classes.buttonActive : classes.button} onClick={() => setActive(15)}>
                15:00
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[15]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 15.5) ? classes.buttonActive : classes.button} onClick={() => setActive(15.5)}>
                15:30
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[16]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 16) ? classes.buttonActive : classes.button} onClick={() => setActive(16)}>
                16:00
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[17]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 16.5) ? classes.buttonActive : classes.button} onClick={() => setActive(16.5)}>
                16:30
            </ButtonBase>
            <ButtonBase
                disabled={buttonActive[18]}
                style={{ fontSize: FontSize(1) }}
                className={(active === 17) ? classes.buttonActive : classes.button} onClick={() => setActive(17)}>
                17:00
            </ButtonBase>
        </Box >
    );
}

export default Third
