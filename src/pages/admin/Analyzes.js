import React, { useEffect, useState } from 'react';
import { Box, ButtonBase, Backdrop, Modal, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link, } from 'react-router-dom';
import AdminNav from '../../components/AdminNav'
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
    },
    caption: {
        fontSize: ".9em",
        color: "#9da8bc",
        textAlign: "center",
        width: "100%"
    },
    buttons: {
        justifyContent: "center",
        display: "flex",
    },
    button: {
        borderRadius: 11,
        width: 180,
        height: 40,
        fontSize: ".7em",
        color: "#fff",
        backgroundColor: "#506497",
        margin: "20px 5px",
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
        marginLeft: 5,
    }
});

const Analyzes = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [unResEDS, setUnResEDS] = useState([]);
    const [unResHealth, setUnResHealth] = useState([]);
    const [unResQuiz, setUnResQuiz] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        const header = { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } };
        const url = `https://tame-rose-clownfish-ring.cyclic.app/api/v1/appointments/`
        axios.get(url, header)
            .then(response => {
                response.data.data.forEach(item => {
                    if (item.status === 'confirm' && !item.response) {
                        if (item.type === 'special') {
                            console.log(item)
                            setUnResEDS(oldArray => [...oldArray, item]);
                        }
                        if (item.type === 'general') {
                            console.log(item)
                            setUnResHealth(oldArray => [...oldArray, item]);
                        }
                    }

                })
                console.log(response);
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
                    if (!item.specilistNote) {
                        setUnResQuiz(oldArray => [...oldArray, item]);
                    }
                })
                setOpen(true)
                console.log(res.data.data)
            })
    }, [])
    return (
        <>
            <AdminNav />
            <Box className={classes.container}>
                <Box className={classes.header}>
                    <h2 className={classes.headerTitle}>ارزیابی‌ها</h2>
                </Box>
                <Box className={classes.innerContainer}>
                    <p className={classes.caption}>به منظور بازگزاری فایل‌های نتیجه، بخش مورد نظر خود را انتخاب کنید</p>
                    <Box className={classes.buttons}>
                        <ButtonBase component={Link} to={"/admin/paths"} className={classes.button}>ارزیابی مسیرهای 12 گانه</ButtonBase>
                        <ButtonBase component={Link} to={"/admin/analyzes/health"} className={classes.button}>فایل‌های مراجعه کنندگان دستگاه هلث</ButtonBase>
                        <ButtonBase component={Link} to={"/admin/analyzes/eds"} className={classes.button}>فایل‌های مراجعه کنندگان دستگاه EDS</ButtonBase>
                    </Box>
                    <Box className={classes.botButtons}>
                        <ButtonBase className={classes.return}>بازگشت</ButtonBase>
                    </Box>
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
                                تست های EDS در انتظار پاسخ: {unResEDS.length}
                            </p>
                            <p id="transition-modal-description">
                                تست های Health در انتظار پاسخ: {unResHealth.length}
                            </p>
                            <p id="transition-modal-description">
                                آزمون های ذر انتظار پاسخ: {unResQuiz.length}
                            </p>
                            <ButtonBase className={classes.modalButton} onClick={handleClose}>متوجه شدم</ButtonBase>
                        </div>
                    </Fade>
                </Modal>
            </Box>
        </>
    )
}

export default Analyzes
