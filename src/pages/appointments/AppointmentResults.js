import React, { useEffect, useState } from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import Download from '../../assets/images/Download.png';
import Header from '../../components/Header';
import moment from 'moment-jalaali';

const useStyles = makeStyles({
    header: {
        height: 180,
        backgroundColor: "#c9e3fc",
        display: "flex",
        alignItems: 'center',
        justifyContent: "center",
        fontSize: "1.3em",
        color: "#0000009e",
        fontWeight: "bold"
    },
    results: {
        padding: 20,
    },
    accordionDetails: {
        display: "grid"
    },
    accordion: {
        width: "90%",
        margin: "10px auto",
        background: "#c9e3fc",
        borderRadius: 12,
        "&::before": {
            backgroundColor: "transparent"
        }
    },
    acordionExpended: {
        margin: "16px auto !important"
    },
    accordionContent: {
        display: 'Flex',
        justifyContent: "space-evenly",
        borderBottom: "1px solid #00000029",
        padding: 10,
    },
    downloadImage: {
        height: 21,
        widgth: 21,
    }
});

const AppointmentResults = () => {
    const classes = useStyles();
    const [EDSFiles, setEDSFiles] = useState([]);
    const [healthFiles, setHealthFiles] = useState([]);
    const token = `bearer ${localStorage.getItem('jwt')}`;

    useEffect(() => {
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/test-results/my`,
            { headers: { 'Authorization': token } },
        )
            .then(res => {
                console.log(res.data.data)
                res.data.data.forEach(item => {
                    if (item.testType === 'Health') {
                        setHealthFiles(oldArray => [...oldArray, item]);
                    } else {
                        setEDSFiles(oldArray => [...oldArray, item]);
                    }
                })
            })
    }, [])

    return (
        <Box>
            <Header component="link" to="/appointments" />
            <Box className={classes.header}>تنیجه</Box>
            <Box className={classes.results}>
                <Accordion elevation={0} className={classes.accordion} classes={{ expanded: classes.acordionExpended }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <p>EDS</p>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        {(EDSFiles.length === 0) ? 'رکوردی موجود نیست' : EDSFiles.map(item => (
                            <Box className={classes.accordionContent}>
                                <p>
                                    {moment(new Date(item.created_at)).format('jYYYY/jM/jD')}
                                </p>
                                <p>
                                    {moment(new Date(item.created_at)).format('HH:mm:ss')}
                                </p>
                                <a href={`${item.resultFile}`}>
                                    <img className={classes.downloadImage} src={Download} alt="دانلود" />
                                </a>
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>
                <Accordion elevation={0} className={classes.accordion} classes={{ expanded: classes.acordionExpended }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <p>Health</p>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        {(healthFiles.length === 0) ? 'رکوردی موجود نیست' : healthFiles.map(item => (
                            <Box className={classes.accordionContent}>
                                <p>
                                    {moment(new Date(item.created_at)).format('jYYYY/jM/jD')}
                                </p>
                                <p>
                                    {moment(new Date(item.created_at)).format('HH:mm')}
                                </p>
                                <a href={`${item.resultFile}`}>
                                    <img className={classes.downloadImage} src={Download} alt="دانلود" />
                                </a>
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    )
}

export default AppointmentResults
