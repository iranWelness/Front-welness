import React, { useState } from 'react';
import Header from '../../components/Header';
import { Box, Tabs, Tab, ButtonBase } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import FontSize from '../../components/FontSize';
import DoctorImage from '../../assets/images/DoctorImage.jpg';
import ChatIcon from '../../assets/images/chat.png';
import VideoIcon from '../../assets/images/Video.png';
import CallIcon from '../../assets/images/Call.png';
import FolderIcon from '../../assets/images/Fully Charged.png';
import Chat from '../../components/Chat';
import Headphone from '../../assets/images/headphones.png';


const useStyle = makeStyles({
    chatPage: {
        paddingTop: "40vh",
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: FontSize(2),
        color: "#5a6c7b6e"
    },
    topWrapper: {
        display: 'flex',
        height: 220,
        alignItems: "center",
        boxSizing: "border-box",
        padding: "0 0 0 10%",
        backgroundColor: "#c4dffaad"
    },
    docPic: {
        height: 100,
        width: 100,
        borderRadius: "50%",
        margin: 10,
        overflow: "hidden",
        border: "3px solid #cfd6dc",
        boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
        "& img": {
            height: 100,
            width: 100,
        },
    },
    docName: {
        color: "#475c93",
        fontWeight: "bold",
        fontSize: FontSize(1.2),
    },
    conTime: {
        color: "#7787a1",
        fontSize: FontSize(0.9)
    },
    tabButton: {
        display: "grid",
        justifyContent: "center",
        width: 90,
        paddingBottom: 5,
        color: "#7787a1",
    },
    tabLogo: {
        margin: "0 auto"
    },
    headphone: {
        borderRadius: "50%",
        background: "#737cf1",
        width: 90,
        height: 90,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20,
        "& img": {
            width: 60,
            height: 60,
        },
    },
});

const Appointments = () => {
    const classes = useStyle();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    return (
        <>
            <Box>
                <Header component="link" to="/appointments" warning={true} />
                <Box className={classes.topWrapper}>
                    <Box className={classes.headphone}>
                        <img src={Headphone} alt="" />
                    </Box>
                    <Box>
                        <p style={{ color: "#839bb5" }}>گفتگو با مشاوران ولنس </p>
                        <p style={{ color: "#839bb5", fontSize: ".8em" }}>ساعات پاسخگویی 8 الی 17</p>
                    </Box>
                </Box>
                <Tabs style={{ backgroundColor: "#c4dffaad" }} TabIndicatorProps={{
                    style: {
                        backgroundColor: "#08afe4",
                        color: "#08afe4"
                    }
                }} centered value={selectedTab} onChange={handleChange}>
                    <Tab classes={{ root: classes.tabRoot, selected: classes.selectedTab }}
                        label="چت" component={() => (
                            <ButtonBase className={classes.tabButton} onClick={() => setSelectedTab(0)}>
                                <img style={{ width: 32, height: 32 }} className={classes.tabLogo} src={ChatIcon} alt="چت" />
                                <p className={classes.tabText}>مشاوره متنی</p>
                            </ButtonBase>
                        )} />

                    <Tab classes={{ root: classes.tabRoot, selected: classes.selectedTab }} disabled
                        label="مشاوره صوتی" component={() => (
                            <ButtonBase className={classes.tabButton}>
                                <img style={{ width: 32, height: 32, opacity: .3 }} className={classes.tabLogo} src={CallIcon} alt="صوت" />
                                <p style={{ opacity: .3 }} className={classes.tabText}>مشاوره صوتی</p>
                            </ButtonBase>
                        )} />
                    <Tab disabled classes={{ root: classes.tabRoot, selected: classes.selectedTab }}
                        label="مشاوره تصویری" component={() => (
                            <ButtonBase className={classes.tabButton} >
                                <img style={{ width: 40, height: 28, opacity: .3 }} className={classes.tabLogo} src={VideoIcon} alt="ویدیو" />
                                <p style={{ opacity: .3 }} className={classes.tabText}>مشاوره تصویری</p>
                            </ButtonBase>
                        )} />
                    <Tab classes={{ root: classes.tabRoot, selected: classes.selectedTab }} disabled
                        label="ارسال پرونده" component={() => (
                            <ButtonBase className={classes.tabButton} >
                                <img style={{ width: 32, height: 32, opacity: .3 }} className={classes.tabLogo} src={FolderIcon} alt="پرونده" />
                                <p style={{ opacity: .3 }} className={classes.tabText}>ارسال نتایج</p>
                            </ButtonBase>
                        )} />
                </Tabs>
                {selectedTab === 0 && <Chat />}
            </Box>
        </>
    )
}

export default Appointments;