import React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, ButtonBase, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Delete from '../../assets/images/adminDelete.png'

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
    table: {
        borderRadius: 30,
        overflow: "hidden"
    },
    tableHeader: {
        backgroundColor: "#9eadca",
    },
    tableRow: {
        backgroundColor: "#d3e0f1",
    },
    cell: {
        color: "#4b6095",
        fontWeight: "Bold",
        fontSize: "1.1em"
    },
    files: {
        borderRadius: 30,
        backgroundColor: "#d3e0f1",
        marginTop: 30,
    },
    fileRow: {
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 25px"
    },
    deleteImg: {
        height: 24,
        width: 20
    },
    buttons: {
        display: "flex",
        justifyContent: "center",
    },
    register: {
        backgroundColor: "#08afe4",
        color: "#fff",
        borderRadius:11,
        width: 180,
        height: 40,
        marginRight:5,
    },
    return:{
        border: "1px solid #df585f",
        color: "#df585f",
        borderRadius:11,
        width: 180,
        height: 40,
        marginLeft:5,
    }
});

const HealthFiles = () => {
    const classes = useStyles()
    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <h2 className={classes.headerTitle}>آپلود دستگاه‌های هلث</h2>
            </Box>
            <Box className={classes.innerContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            <TableCell className={classes.cell} align="center">نام</TableCell>
                            <TableCell className={classes.cell} align="center">نام‌خانوادگی</TableCell>
                            <TableCell className={classes.cell} align="center">شماره‌همراه</TableCell>
                            <TableCell className={classes.cell} align="center">زمان مراجعه</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={classes.tableRow} >
                            <TableCell className={classes.cell} align="center">حمید</TableCell>
                            <TableCell className={classes.cell} align="center">ادیبی فرد منفرد</TableCell>
                            <TableCell className={classes.cell} align="center">09127459584</TableCell>
                            <TableCell className={classes.cell} align="center">روز سه‌شنبه ساعت: 14:00 1400/09/13</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Box className={classes.files}>
                    <Box className={classes.fileRow}>
                        <span>انتخاب فایل PDF</span>
                        <ButtonBase><img className={classes.deleteImg} src={Delete} alt="حذف" /></ButtonBase>
                    </Box>
                    <Divider variant="middle" />
                    <Box className={classes.fileRow}>
                        <span>انتخاب فایل PDF</span>
                        <ButtonBase><img className={classes.deleteImg} src={Delete} alt="حذف" /></ButtonBase>
                    </Box>
                    <Divider variant="middle" />
                    <Box className={classes.fileRow}>
                        <span>انتخاب فایل PDF</span>
                        <ButtonBase><img className={classes.deleteImg} src={Delete} alt="حذف" /></ButtonBase>
                    </Box>
                </Box>
                <Box className={classes.buttons}>
                    <ButtonBase className={classes.register}>ثبت</ButtonBase>
                    <ButtonBase className={classes.return}>بازگشت</ButtonBase>
                </Box>
            </Box>
        </Box>
    )
}

export default HealthFiles
