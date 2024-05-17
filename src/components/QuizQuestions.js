import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Slider, ButtonBase, Modal } from '@material-ui/core';
import FontSize from './FontSize';

const useStyles = makeStyles({
    root: {
        width: 300,
        margin: "10px auto",
        textAlign: 'center',
        display: "flex",
        flexDirection: "column",
        height: 330,
        justifyContent: "space-evenly",
    },
    button: {
        height: 57,
        width: 289,
        margin: "5px auto",
        backgroundColor: "#08afe4",
        boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
        color: "#fff",
        fontSize: FontSize(.9),
        borderRadius: 10,
    },
    paper: {
        height: 410,
        backgroundColor: "#cedae8",
        maxWidth: "80%",
        width: 400,
        overflow: "scroll",
        padding: 30,
        margin: "60px auto",
        textAlign: "justify",
        borderRadius: 15

    },
    readMore: {
        fontSize: "1em",
        color: "#59a8ff",
        textDecoration: "underline",
        position: "relative",
        bottom: 10
    },
    modalContent: {
        height: 280,
        overflow: "auto",
        fontWeight: "bold",
        color: "#6074a6",
        borderBottom: "1px solid #b6c2ce",
        borderTop: "1px solid #b6c2ce"
    },
    modalTitle: {
        color: "#7787a1"
    },
    returnButton: {
        height: 60,
        width: "100%",
        fontSize: FontSize(1.05),
        color: "#ee5760",
    },
    sliderRail: {
        height: 4,
    },
    sliderTrack: {
        height: 4,
    },
    sliderMark: {
        height: 4,
    },
    sliderThumb: {
        height: 15,
        width: 15,
    }
});

const QuizQuestion = () => {
    const classes = useStyles();
    const history = useHistory()
    const [level, setLevel] = useState(1);
    const [questions, setQustions] = useState([]);
    const [questionTitle, setQustionTitle] = useState("");
    const [questionDesc, setQustionDesc] = useState("");
    const [answer, setAnswer] = useState(5);
    const [answers, setAnswers] = useState([]);
    const [buttonText, setButtonText] = useState("مرحله بعد");
    const [open, setOpen] = useState(false);

    let quiz = useSelector(state => {
        return state.quiz;
    });
    const handleClick = () => {
        setAnswers([...answers, answer]);
        setLevel(level + 1)
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        if (answers.length === 10) {
            const body = {
                "quiz": quiz,
                "user": localStorage.getItem('userid'),
                "answers": answers
            };
            console.log(body)
            axios.post('https://tame-rose-clownfish-ring.cyclic.app/api/v1/quiz/results/',
                body,
                { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } },

            )
                .then(response => {
                    history.push("/quizzes?tab=result")
                })
                .catch(err => {
                    console.log(err)
                    if (err.response.status === 401) {
                        localStorage.removeItem('jwt')
                    }
                })
        }
    }, [answers, quiz])
    useEffect(() => {
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/quizzes/${quiz}`, { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } })
            .then(function (response) {
                setQustions(response.data.data[0].questions);
                questions.forEach(element => {
                    if (element.level === level) {
                        setQustionTitle(element.questionTitle)
                        setQustionDesc(element.questionDescription)
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
                if (error.response.status === 401) {
                    localStorage.removeItem('jwt')
                }
            })
    }, [])
    useEffect(() => {
        questions.forEach(element => {
            if (element.level === level) {
                setQustionTitle(element.questionTitle)
                setQustionDesc(element.questionDescription)
            }
        });
        (level >= 10) ? setButtonText("ارسال نتایج") : setButtonText("مرحله بعد")
    }, [level, questions,])

    const body = (
        <div className={classes.paper}>
            <p className={classes.modalTitle} id="simple-modal-title">{questionTitle}</p>
            <p class={classes.modalContent} id="simple-modal-description">
                {questionDesc}
            </p>
            <ButtonBase onClick={handleClose} className={classes.returnButton}>بازگشت</ButtonBase>
        </div>
    );

    return (
        <div className={classes.root}>
            <h4 style={{ color: "#516597" }}>{questionTitle}</h4>
            <Slider
                defaultValue={5}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                value={answer}
                onChange={(event, newValue) => setAnswer(newValue)}
                classes={{ rail: classes.sliderRail, track: classes.sliderTrack, mark: classes.sliderMark, thumb: classes.sliderThumb }}
                marks
                min={1}
                max={10}
            />
            <ButtonBase onClick={handleClick} className={classes.button}>{buttonText}</ButtonBase>
            <ButtonBase className={classes.readMore} type="button" onClick={handleOpen}>
                توضیحات بیشتر
            </ButtonBase>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    )
}

export default QuizQuestion;