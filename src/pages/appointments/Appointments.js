import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Box, Tabs, Tab, Divider } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import IRLIndex from '../../components/appointments/IRLIndex';
import OnlineIndex from '../../components/appointments/OnlineIndex';
import { showNav } from '../../actions';
import { useDispatch } from "react-redux";
import FontSize from '../../components/FontSize';


const useStyle = makeStyles({
    topWrapper: {
        height: 200
    },
    assitance: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "#c4dffaad",
    },
    assistanceHeader: {
        color: "#08afe4",
        fontSize: FontSize(1)
    },
    requestAssistance: {
        textDecoration: "underline",
    },
    tabRoot: {
        fontSize: "1.1em"
    },
    tabSelected: {
        color: "#08afe4"
    }
});

const Appointments = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const classes = useStyle();
    const dispatch = useDispatch();
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);

    }

    useEffect(() => {
        dispatch(showNav())
    }, [])

    return (
        <>
            <Box>
                <Header />
                <Box className={classes.topWrapper}>
                    <Box className={classes.assitance}>
                        <h1 className={classes.assistanceHeader}>پشتیبانی تخصصی ولنسی</h1>
                        {/* <p className={classes.requestAssistance}>خرید اشتراک طلایی برای مشاوره آنلاین</p> */}
                    </Box>
                </Box>
                <Tabs style={{ backgroundColor: "#c4dffaad", color: "#7887a2" }} inkBarStyle={{ background: 'blue' }} TabIndicatorProps={{
                    style: {
                        backgroundColor: "#08afe4",
                        color: "#ff0000"
                    }
                }} centered value={selectedTab} onChange={handleChange}>
                    <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                        // style={{ color: (selectedTab === 0) ? "#08afe4" : "#02d4166" }}
                        label="پشتیبانی حضوری" />
                    <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                        // style={{ color: (selectedTab === 1) ? "#08afe4" : "#02d4166" }}
                        label="پشتیبانی آنلاین" />
                </Tabs>
                {selectedTab === 0 && <IRLIndex />}
                {selectedTab === 1 && <OnlineIndex />}
            </Box>
        </>
    )
}

export default Appointments;