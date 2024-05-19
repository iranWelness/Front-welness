import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Box, Divider, Tabs, Tab, Backdrop, Modal, Fade, ButtonBase } from '@material-ui/core';
import Quizzes from '../../components/Quizzes';
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { showNav } from '../../actions';
import FontSize from "../../components/FontSize";
import QuizEval from '../../components/QuizEval';


const useStyle = makeStyles({
    wiw: {
        textAlign: 'center',
        direction: "rtl",
        color: "#64c6f5",
        paddingTop: 30,

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
    readMore: {
        textAlign: 'center',
        direction: "rtl",
        textDecoration: 'underline',
        textDecorationStyle: 'dotted',
        marginBottom: 30,
    },

    tabRoot: {
        color: "#08afe4",
        fontWeight: "Bold",
        fontSize: FontSize(1.1),
    },
});

const Dimension = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(showNav())
    }, [])
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue)
    }
    return (
        <>
            <Box>
                <Box style={{ backgroundColor: "#c4dffaad", height: 130, paddingTop: 30 }}>
                    {/* <Header component="link" to="/quizzes" /> */}
                    <h2 onClick={handleOpen} className={classes.wiw}>ولنس چیست؟</h2>
                </Box>
                <Tabs style={{ backgroundColor: "#c4dffaad", color: "#7887a2" }} TabIndicatorProps={{
                    style: {
                        backgroundColor: "#08afe4"
                    }
                }} centered value={selectedTab} onChange={handleChange}>
                    <Tab classes={{ root: classes.tabRoot, selected: classes.selectedTab }} label="ارزیابی‌ها" />
                    <Tab classes={{ root: classes.tabRoot, selected: classes.selectedTab }} label="تحلیل ارزیابی‌های پیشین" />
                </Tabs>
                {selectedTab === 0 && <Quizzes />}
                {selectedTab === 1 && <QuizEval />}
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
                                ولنس انجام عادات سالم به صورت روزانه برای دستیابی به نتایج بهتر سلامت جسمی و روانی است، به طوری که به جای اینکه فقط زنده بمانید، شکوفا شوید.
                            </p>
                            <ButtonBase className={classes.modalButton} onClick={handleClose}>بازگشت</ButtonBase>
                        </div>
                    </Fade>
                </Modal>
            </Box>
        </>
    )

}

export default Dimension;