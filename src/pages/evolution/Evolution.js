import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Header from '../../components/Header';
import EvolutionCards from '../../components/EvolutionCards';
import FontSize from '../../components/FontSize';
import ChalengesCard from '../../components/ChalengesCard'

const useStyles = makeStyles({
    headWrapper: {
        height: "25vh",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: "#c4dffaad"
    },
    headTitle: {
        color: "#0aade4",
        fontWeight: "Bold",
        fontSize: FontSize(1.2)
    },
    headDesc: {
        fontSize: FontSize(1),
        textDecoration: "underline",
        textDecorationStyle: "dotted",
    },
    tabRoot: {
        fontSize: FontSize(1.1)
    },
    tabSelected: {
        color: "#08afe4"
    }
});

const Evolution = () => {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue)
    }
    return (
        <div>
            <Header />
            <Box className={classes.headWrapper}>
                <p className={classes.headTitle}>در ارتقاء ولنس و کیفیت زندگی‌تان همراهتان هستیم</p>

            </Box>
            <Tabs style={{ backgroundColor: "#c4dffaad", color: "#7887a2" }} TabIndicatorProps={{
                style: {
                    backgroundColor: "#08afe4"
                }
            }} centered value={selectedTab} onChange={handleChange}>
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="ارتقاء فردی" />
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="چالش ها" />
            </Tabs>
            {selectedTab === 0 && <EvolutionCards />}
            {selectedTab === 1 && <ChalengesCard />}
        </div>
    )
}

export default Evolution
