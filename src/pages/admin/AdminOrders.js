import React, { useEffect, useState } from 'react';
import {
    Box, ButtonBase, Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Switch
} from '@material-ui/core';
import axios from 'axios';
import moment from 'moment-jalaali';
import { makeStyles } from '@material-ui/styles';

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

const AdminOrders = () => {
    const classes = useStyles();
    const [orders, setOrders] = useState([]);
    const header = { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } };
    const deliveredOrder = id => {
        console.log(header)
        axios.put(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/orders/delivered/${id}`, {}, header)
            .then(res => {
                setOrders([]);
                axios.get('https://tame-rose-clownfish-ring.cyclic.app/api/v1/orders', header)
                    .then(res => {
                        res.data.data.forEach(items => {
                            items.items.forEach(item => {
                                setOrders(oldArray => [...oldArray, {
                                    id: item._id,
                                    firstname: items.user.firstname,
                                    lastname: items.user.lastname,
                                    phone: items.user.phone,
                                    product: item.item.name,
                                    date: items.date,
                                    qty: item.qty,
                                    status: item.status,
                                }])
                            })
                        })
                    })
            })
    }
    useEffect(() => {
        axios.get('https://tame-rose-clownfish-ring.cyclic.app/api/v1/orders', header)
            .then(res => {
                res.data.data.forEach(items => {
                    items.items.forEach(item => {
                        console.log(item.item.name)
                        console.log(items.date)
                        console.log(items.user)
                        setOrders(oldArray => [...oldArray, {
                            id: item._id,
                            firstname: items.user.firstname,
                            lastname: items.user.lastname,
                            phone: items.user.phone,
                            product: item.item.name,
                            date: items.date,
                            qty: item.qty,
                            status: item.status,
                        }])
                    })
                })
            })
    }, [])
    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <h2 className={classes.headerTitle}>سفارشات</h2>
            </Box>
            <Box className={classes.innerContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            <TableCell className={classes.cell} align="center">#</TableCell>
                            <TableCell className={classes.cell} align="center">نام </TableCell>
                            <TableCell className={classes.cell} align="center">نام ‌خانوادگی </TableCell>
                            <TableCell className={classes.cell} align="center">شماره تماس</TableCell>
                            <TableCell className={classes.cell} align="center">نام کالا</TableCell>
                            <TableCell className={classes.cell} align="center">تاریخ ثبت</TableCell>
                            <TableCell className={classes.cell} align="center">تعداد</TableCell>
                            <TableCell className={classes.cell} align="center">وضعیت</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((item, index) => (
                            <TableRow style={{ justifyContent: "space-evenly" }} key={index}>
                                <TableCell className={classes.cell} align="center">{index + 1}</TableCell>
                                <TableCell className={classes.cell} align="center">{item.firstname}</TableCell>
                                <TableCell className={classes.cell} align="center">{item.lastname}</TableCell>
                                <TableCell className={classes.cell} align="center">{item.phone}</TableCell>
                                <TableCell className={classes.cell} align="center">{item.product}</TableCell>
                                <TableCell className={classes.cell} align="center">{moment(new Date(item.date)).format("jYY/jM/jD")}</TableCell>
                                <TableCell className={classes.cell} align="center">{item.qty}</TableCell>
                                <TableCell className={classes.cell} align="center">
                                    <Switch checked={item.status} onChange={() => deliveredOrder(item.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Box className={classes.botButtons}>
                <ButtonBase className={classes.return}>بازگشت</ButtonBase>
            </Box>
        </Box>
    )
}

export default AdminOrders;
