import React, { useEffect, useState } from 'react';
import {
    Box, ButtonBase, Divider, Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import moment from 'moment-jalaali';
import { Link } from 'react-router-dom';
import AdminNav from '../../components/AdminNav'

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
        overflow: "auto",
        marginTop: 30
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
    },
});
function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const AdminUserDetails = () => {
    const classes = useStyles()
    const [name, setName] = useState("");
    const [quzies, setQuizes] = useState([]);
    const [apps, setApps] = useState([]);
    let query = useQuery();
    useEffect(() => {
        const header = { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } };
        const url = `https://tame-rose-clownfish-ring.cyclic.app/api/v1/appointments/`
        axios.get(url, header)
            .then(response => {
                response.data.data.forEach(item => {
                    if (item.customer._id === query.get("id")) {
                        setApps(oldArray => [...oldArray, item]);
                    }
                })
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                    localStorage.removeItem('jwt')
                }
            })
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/quiz/results/`, header)
            .then(res => {
                res.data.data.forEach(item => {
                    if (item.user._id === query.get("id")) {
                        setQuizes(oldArray => [...oldArray, item]);
                    }
                })
            })
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/users/search?_id=${query.get("id")}`, header)
            .then(res => {

                setName(`${res.data.data[0].firstname} ${res.data.data[0].lastname}`)

                console.log(res.data.data)
            })
    }, [])
    return (
        <>
            <AdminNav />
            <Box className={classes.container}>

                <Box className={classes.header}>
                    <h2 className={classes.headerTitle}>{name}</h2>
                </Box>
                <Box className={classes.innerContainer}>
                    <p style={{ textAlign: "center", color: "#08afe3", fontSize: "1.2em", marginBottom: 20, }}>آزمون ها</p>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                <TableCell className={classes.cell} align="center">#</TableCell>
                                <TableCell className={classes.cell} align="center">تاریخ</TableCell>
                                <TableCell className={classes.cell} align="center">نام آزمون</TableCell>
                                <TableCell className={classes.cell} align="center">نمره</TableCell>
                                <TableCell className={classes.cell} align="center">پاسخ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {quzies.map((item, index) => (
                                <TableRow style={{ justifyContent: "space-evenly" }} key={index}>
                                    <TableCell className={classes.cell} align="center">{index + 1}</TableCell>
                                    <TableCell className={classes.cell} align="center">{moment(new Date(item.created_at)).format("jYYYY/jM/jD")}</TableCell>
                                    <TableCell className={classes.cell} align="center">{item.quiz.quizCategory}</TableCell>
                                    <TableCell className={classes.cell} align="center">{item.score * 10}٪</TableCell>
                                    <TableCell className={classes.cell} align="center">{(item.specilistNote === undefined) ? <Link style={{ color: "#08afe3", textDecoration: "none" }} to={`/admin/quiz-result?id=${item._id}`}>پاسخ داده نشده</Link> : 'پاسخ داده شده'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Divider variant="middle" />
                    <p style={{ textAlign: "center", color: "#08afe3", marginTop: 30, fontSize: "1.2em", marginBottom: 20, }}>مشاوره ها</p>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                <TableCell className={classes.cell} align="center">#</TableCell>
                                <TableCell className={classes.cell} align="center">تاریخ</TableCell>
                                <TableCell className={classes.cell} align="center">زمان</TableCell>
                                <TableCell className={classes.cell} align="center">دستگاه</TableCell>
                                <TableCell className={classes.cell} align="center">پاسخ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {apps.map((item, index) => (
                                <TableRow style={{ justifyContent: "space-around" }} key={index}>
                                    <TableCell className={classes.cell} align="center">{index + 1}</TableCell>
                                    <TableCell className={classes.cell} align="center">{moment(new Date(item.date)).format("jYYYY/jM/jD")}</TableCell>
                                    <TableCell className={classes.cell} align="center">{Math.floor(item.time)}:{Number.isSafeInteger(item.time) ? "00" : "30"}</TableCell>
                                    <TableCell className={classes.cell} align="center">{(item.type === 'special') ? "EDS" : "Health"}</TableCell>
                                    <TableCell className={classes.cell} align="center">{(item.response) ? <a style={{ color: "#08afe3", textDecoration: "none" }} href={`https://api.hamyerwellness.com/${item.responseresultFile}`}>دانلود</a> : <Link style={{ color: "#08afe3", textDecoration: "none" }} to={(item.type === 'special') ? "/admin/analyzes/eds" : "/admin/analyzes/health"}>جواب داده نشده</Link>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                <Box className={classes.botButtons}>
                    <ButtonBase component={Link} to={"/admin/user-info"} className={classes.return}>بازگشت</ButtonBase>
                </Box>
            </Box >
        </>
    )
}

export default AdminUserDetails
