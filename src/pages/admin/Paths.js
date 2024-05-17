import React, { useEffect, useState } from 'react';
import { Box, ButtonBase, Backdrop, Modal, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link, } from 'react-router-dom';
import AdminNav from '../../components/AdminNav';
import axios from 'axios';

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
        display: "Grid",
    },
    row: {
        display: "flex",
        justifyContent: "center"
    },
    button: {
        borderRadius: 15,
        fontSize: ".8em",
        width: 180,
        height: 50,
        color: "#fff",
        backgroundColor: "#506497",
        margin: "5px 10px",
        boxShadow: "-7px 6px 13px #a6a6a6b8, -7px -8px 20px 0px #ffffffd1",
    },
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


const Paths = () => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const [unres, setUnres] = useState([]);
    const [unresCount, setUnresCount] = useState(0);
    useEffect(() => {
        const header = { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } };
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/quiz/results/`, header)
            .then(res => {
                let arr = [];
                res.data.data.forEach((item,index,array) => {
                    if (!item.specilistNote) {
                        arr.push(item.quiz.quizCategory)
                        console.log(item);
                        setUnresCount(array.length)
                    }
                })
                setUnres(arr.filter(function (value, index, array) {
                    return array.indexOf(value) === index;
                }))
                setOpen(true)
                console.log(unres, unresCount)
            })
    }, [])
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <AdminNav />
            <Box className={classes.container}>
                <Box className={classes.header}>
                    <h2 className={classes.headerTitle}>ارزیابی مسیر 12‌گانه</h2>
                </Box>
                <Box className={classes.innerContainer}>
                    <Box className={classes.row}>
                        <ButtonBase component={Link} to={"/admin/quiz-subjects?quiz=love"} className={classes.button}>مسئولیت پذیری در قبال خود وعشق</ButtonBase>
                        <ButtonBase component={Link} to={"/admin/quiz-subjects?quiz=breathing"} className={classes.button}>تنفس</ButtonBase>
                        <ButtonBase component={Link} to={"/admin/quiz-subjects?quiz=food"} className={classes.button}>تغذیه</ButtonBase>
                    </Box>
                    <Box className={classes.row}>
                        <ButtonBase component={Link} to={"/admin/quiz-subjects?quiz=feeling"} className={classes.button}>حس‌کردن</ButtonBase>
                        <ButtonBase component={Link} to={"/admin/quiz-subjects?quiz=moving"} className={classes.button}>حرکت</ButtonBase>
                        <ButtonBase component={Link} to={"/admin/quiz-subjects?quiz=felt"} className={classes.button}>احساس کردن</ButtonBase>
                    </Box>
                    <Box className={classes.row}>
                        <ButtonBase component={Link} to={"/admin/quiz-subjects?quiz=thinking"} className={classes.button}>فکر کردن</ButtonBase>
                        <ButtonBase component={Link} to={"/admin/quiz-subjects?quiz=playing"} className={classes.button}>بازی کردن و کارکردن</ButtonBase>
                        <ButtonBase component={Link} to={"/admin/quiz-subjects?quiz=connecting"} className={classes.button}>ارتباط برقرار کردن</ButtonBase>
                    </Box>
                    <Box className={classes.row}>
                        <ButtonBase component={Link} to={"/admin/quiz-subjects?quiz=realationgship"} className={classes.button}>صمیمیت</ButtonBase>
                        <ButtonBase component={Link} to={"/admin/quiz-subjects?quiz=meaning"} className={classes.button}>یافتن معنا</ButtonBase>
                        <ButtonBase component={Link} to={"/admin/quiz-subjects?quiz=transcening"} className={classes.button}>ورا رفتن</ButtonBase>
                    </Box>
                </Box>
                <Box className={classes.botButtons}>
                    <ButtonBase component={Link} to={'/admin/specilists-panel'} className={classes.return}>بازگشت</ButtonBase>
                </Box>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <p id="transition-modal-description">
                                تعداد {unresCount} در مسیر های زیر باقی مانده است
                            </p>
                            {unres.map(item => (
                                <p>{item}</p>
                            ))}
                            <ButtonBase className={classes.modalButton} onClick={handleClose}>متوجه شدم</ButtonBase>
                        </div>
                    </Fade>
                </Modal>
            </Box>
        </>
    )
}

export default Paths
