import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Box, Tabs, Tab } from '@material-ui/core';
import NewQuizTab from '../../components/NewQuizTab';
import QuizEval from '../../components/QuizEval';
import { makeStyles } from "@material-ui/core/styles";
import QuizQuestion from '../../components/QuizQuestions';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { showNav } from '../../actions';
import FontSize from "../../components/FontSize";


const useStyle = makeStyles({
    wiw: {
        textAlign: 'center',
        direction: "rtl",
    },
    readMore: {
        textAlign: 'center',
        direction: "rtl",
        textDecoration: 'underline',
        textDecorationStyle: 'dotted',
    },
    tabRoot: {
        fontSize: "1.05em"
    },
    selectedTab: {
        color: "#08afe4",
        fontSize: FontSize(1)
    },
    performanceWraper: {
        display: 'flex',
        flexDirection: "row-reverse",
        padding: "50px 0px",
        width: "100%",
        justifyContent: "center",
        backgroundColor: "#c4dffaad",
    },
    preformanceReport: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        padding: 10
    },
    preformCaption: {
        fontWeight: 'bold',
        color: "#2e4169",
        padding: "11px 0",
        fontSize: FontSize(1)
    },
    performScore: {
        color: "#65c7f4",
        fontSize: FontSize(2)
    },
});


const Quiz = () => {
    const dispatch = useDispatch()
    const [selectedTab, setSelectedTab] = useState(0);
    const [testStart, setTestStart] = useState(false);
    const [score, setScore] = useState(0);
    const classes = useStyle();
    const [textScore, setTextscore] = useState("");
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue)
    }
    let quiz = useSelector(state => {
        return state.quiz;
    });
    const user = localStorage.getItem('userid')
    const token = `bearer ${localStorage.getItem('jwt')}`
    useEffect(() => {
        dispatch(showNav())
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/quiz/results/?user=${user}&quiz=${quiz}`,
            { headers: { 'Authorization': token } },
        ).then(res => {
            let temScore = 0;
            console.log(res.data);
            res.data.data.forEach((element, index) => {
                temScore += element['score'];
                setScore(score + element['score']);
                setScore(temScore / res.data.data.length)
            });
        })
            .catch(err => { });
    }, []);

    useEffect(() => {
        console.log(score)
        if (score === 0) {
            setTextscore("نامعلوم")
        } else if (score < 2.5) {
            setTextscore("ضعیف")
        } else if (2.5 < score < 5.0) {
            setTextscore("متوسط")
        } else if (5.0 < score < 7.5) {
            setTextscore("خوب")
        } else if (score > 7.5) {
            setTextscore("بسیار خوب")
        } else {
            setTextscore("نامعلوم")
        }
    }, [score])

    return (
        <>
            <Box>
                <Header component="link" to="/quizzes" />
                <Box className={classes.performanceWraper}>
                    <Box className={classes.preformanceReport}>
                        <p className={classes.preformCaption}>عملکرد شما</p>
                        <h2 className={classes.performScore}>
                            {textScore}
                        </h2>
                    </Box>
                </Box>

                <Tabs style={{ backgroundColor: "#c4dffaad", color: "#7887a2" }} TabIndicatorProps={{
                    style: {
                        backgroundColor: "#08afe4",
                        color: "#ff0000"
                    }
                }} centered value={selectedTab} onChange={handleChange}>
                    <Tab classes={{ root: classes.tabRoot, selected: classes.selectedTab }} label="ارزیابی جدید" />
                    <Tab classes={{ root: classes.tabRoot, selected: classes.selectedTab }} label="تحلیل ارزیابی‌های پیشین" />
                </Tabs>
                {selectedTab === 0 && (testStart ? <QuizQuestion /> : <NewQuizTab onStart={() => { setTestStart(true) }} />)}
                {selectedTab === 1 && <QuizEval />}
            </Box>
        </>
    )

}

export default Quiz;