import React, { useEffect, useState } from 'react';
import { Box, ButtonBase, Table, TableBody, TableCell, TableHead, TableRow, } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import persianDate from 'persian-date';
import { useLocation, Link } from 'react-router-dom';
import AdminNav from '../../components/AdminNav';
import moment from 'moment-jalaali';

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
    tableWrapper: {
        maxHeight: 400,
        overflow: "auto"
    },
    table: {
        borderRadius: 30,
        overflow: "hidden"
    },
    tableHeader: {
        backgroundColor: "#9eadca",
    },
    tableRow: {
        backgroundColor: "#d3e0f1",
        textDecoration: "none",
    },
    cell: {
        color: "#4b6095",
        fontWeight: "Bold",
        fontSize: "1.1em"
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

const getId = name => {
    switch (name) {
        case 'love':
            return ('61657fe4141561d3a5604158');
        case 'breathing':
            return ('61646f76257f280090fbb8d7');
        case 'food':
            return ('6165804c141561d3a560415a');
        case 'feeling':
            return ('616580a8141561d3a560415c');
        case 'moving':
            return ('6165815e141561d3a560415e');
        case 'felt':
            return ('61658232141561d3a5604160');
        case 'thinking':
            return ('6165a06a141561d3a560416b');
        case 'playing':
            return ('6165a0a4141561d3a560416d');
        case 'connecting':
            return ('6165a100141561d3a560416f');
        case 'realationgship':
            return ('6165a145141561d3a5604171');
        case 'meaning':
            return ('6165a182141561d3a5604173');
        case 'transcening':
            return ('6165a1bf141561d3a5604175');
        default:
            return (null)
    }
};

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const HealthFiles = () => {
    const classes = useStyles()
    const [subjects, setSubjects] = useState([]);
    let query = useQuery();
    console.log(getId(query.get("quiz")))
    useEffect(() => {
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/quiz/results/quiz/${getId(query.get("quiz"))}`, { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } })
            .then(res => {
                console.log(res)
                setSubjects(res.data.data)
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                }
            })
    }, [])
    return (
        <>
            <AdminNav />
            <Box className={classes.container}>
                <Box className={classes.header}>
                    <h2 className={classes.headerTitle}>مسیر تنفس</h2>
                </Box>
                <Box className={classes.innerContainer}>
                    <Box className={classes.tableWrapper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead className={classes.tableHeader}>
                                <TableRow>
                                    <TableCell className={classes.cell} align="center">نام</TableCell>
                                    <TableCell className={classes.cell} align="center">نام‌خانوادگی</TableCell>
                                    <TableCell className={classes.cell} align="center">شماره‌همراه</TableCell>
                                    <TableCell className={classes.cell} align="center">تاریخ زمان آزمون</TableCell>
                                    <TableCell className={classes.cell} align="center">ساعت زمان آزمون</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {subjects.map(data => (

                                    <TableRow className={classes.tableRow} component={Link} to={`/admin/quiz-result?id=${data._id}`}>
                                        <TableCell className={classes.cell} align="center">{data.user.firstname}</TableCell>
                                        <TableCell className={classes.cell} align="center">{data.user.lastname}</TableCell>
                                        <TableCell className={classes.cell} align="center">{data.user.phone}</TableCell>
                                        <TableCell className={classes.cell} align="center">{moment(new Date(data.created_at)).format('jYYYY/jM/jD')}</TableCell>
                                        <TableCell className={classes.cell} align="center">{moment(new Date(data.created_at)).format('HH:mm:ss')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
                <Box className={classes.botButtons}>
                    <ButtonBase component={Link} to={'/admin/paths'} className={classes.return}>بازگشت</ButtonBase>
                </Box>
            </Box>
        </>
    )
}

export default HealthFiles
