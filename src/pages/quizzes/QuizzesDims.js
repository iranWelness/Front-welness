import React, { useState, } from 'react';
import Header from '../../components/Header';
import Dimensions from '../../components/Dimensions';
import { Box, Tabs, Tab, Backdrop, Modal, Fade, ButtonBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FontSize from "../../components/FontSize";
import QuizEval from '../../components/QuizEval';
import { useLocation } from "react-router-dom";


const useStyles = makeStyles({
    main: {
        display: "flex",
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 20,
    },
    paper: {
        margin: "60px auto",
        width: 400,
        maxWidth: "75%",
        textAlign: "justify",
        padding: 40,
        backgroundColor: "#dde7f3",
        border: "5px solid #57a7c0",
        borderRadius: 50,
        color: "#8391ab",
        display: "grid",
        justifyContent: "center",
    },
    topBox: {
        height: 160,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#c4dffaad"
    },
    tabRoot: {
        color: "#08afe4",
        fontWeight: "Bold",
        fontSize: FontSize(1.1),
    },
    wiw: {
        textAlign: 'center',
        direction: "rtl",
        color: "#64c6f5",
        paddingTop: 30,

    },
});

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const QuizzesDims = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    let query = useQuery();
    const [selectedTab, setSelectedTab] = useState(query.get("tab") ? 1 : 0);
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue)
    }
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Box className={classes.topBox}>
                <Box style={{ backgroundColor: "#c4dffaad", height: 130, paddingTop: 30 }}>
                    {/* <Header component="link" to="/quizzes" /> */}
                    <h2 onClick={handleOpen} className={classes.wiw}>ولنس چیست؟</h2>
                </Box>
                <Tabs centered value={selectedTab} onChange={handleChange} TabIndicatorProps={{
                    style: {
                        backgroundColor: "#08afe4"
                    }
                }}>
                    <Tab classes={{ root: classes.tabRoot, selected: classes.selectedTab }} label="ارزیابی‌ها" />
                    <Tab classes={{ root: classes.tabRoot, selected: classes.selectedTab }} label="تحلیل ارزیابی‌های پیشین" />
                </Tabs>
            </Box>
            {selectedTab === 0 && <Box className={classes.main} >
                <Dimensions onCenterClick={setSelectedTab} />
            </Box>}
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
        </>
    )
}

export default QuizzesDims;