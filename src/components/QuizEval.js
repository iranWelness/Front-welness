import React, { useEffect, useState } from 'react';
import { Box, ButtonBase, Divider, Snackbar, Modal, Backdrop, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import axios from 'axios';
import persianDate from 'persian-date';
import MuiAlert from '@material-ui/lab/Alert';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FontSize from './FontSize';

const useStyle = makeStyles({
    resultWrapper: {
        height: 150,
        width: 30,
        padding: 4,
        borderRadius: 20,
        boxShadow: "inset 0 0 20px 0px #a1ccf4a8",
        position: "relative",
        backgroundColor: "#d4ebffba",
        marginBottom: 14,
        margin: "0 auto",
    },
    resultFiller: {
        background: "linear-gradient(0deg, rgba(253,139,173,1) 0%, rgba(248,118,224,1) 100%)",
        borderRadius: 20,
        position: "absolute",
        bottom: 9,
        right: 8.2,
        width: 20
    },
    resultsContainer: {
        display: "flex",
        flexWrap: 'wrap',
        width: 500,
        maxWidth: "88vw",
        margin: "0 auto",
        justifyContent: "center",
        marginTop: 10
    },
    result: {
        textAlign: 'center',
        margin: "10px 0 20px 0",
        width: "20%"
    },
    resultDesc: {
        textAlign: 'center'
    },
    acordianContent: {
        display: "grid",
        textAlign: "left"
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
    modalContainer: {
        width: 335,
        maxWidth: "95%",
        height: 400,
        margin: "50px auto 0",
        background: "#b5cbe8",
        borderRadius: 15,
    },
    backdrop: {
        zIndex: 1299,
        color: '#fff',
    },
    backdropRoot: {
        backgroundColor: "#19163a54",
        backdropFilter: "blur(2px)",
    },
    accoridonBottom: {
        width: "90%",
        display: "grid",
        textAlign: "center",
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        margin: "10px auto",
    },
    modalTitle: {
        color: "#7987a1", textAlign: "center", padding: 16, fontSize: FontSize(1)
    },
    modalContext: {
        height: 261,
        color: "#465a8c",
        fontWeight: "bold",
        margin: "0px 30px 0",
        padding: "10px 0",
        borderTop: "1px solid  rgba(0, 0, 0, 0.12)",
        borderBottom: "1px solid  rgba(0, 0, 0, 0.12)", fontSize: FontSize(1)
    },
    modalButton: {
        color: "#f05660",
        fontWeight: "bold",
        width: "100%",
        padding: 18, fontSize: FontSize(1)
    }
});

const QuizEval = () => {
    const classes = useStyle();
    const [answers, setAnswers] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [colors,] = useState([
        "linear-gradient(0deg, rgba(92,208,221,1) 0%, rgba(102,180,244,1) 100%)",
        "linear-gradient(0deg, rgba(115,218,77,1) 0%, rgba(118,239,146,1) 100%)",
        "linear-gradient(0deg, rgba(245,167,131,1) 0%, rgba(244,201,122,1) 100%)",
        "linear-gradient(0deg, rgba(248,118,224,1) 0%, rgba(253,139,173,1) 100%)",
        "linear-gradient(0deg, rgba(69,235,113,1) 0%, rgba(180,255,113,1) 100%)",
        "linear-gradient(0deg, rgba(92,208,221,1) 0%, rgba(102,180,244,1) 100%)",
        "linear-gradient(0deg, rgba(115,218,77,1) 0%, rgba(118,239,146,1) 100%)",
        "linear-gradient(0deg, rgba(245,167,131,1) 0%, rgba(244,201,122,1) 100%)",
        "linear-gradient(0deg, rgba(248,118,224,1) 0%, rgba(253,139,173,1) 100%)",
        "linear-gradient(0deg, rgba(69,235,113,1) 0%, rgba(180,255,113,1) 100%)",
    ]);
    const [shadowColors] = useState([
        "rgba(102, 180, 244, 1",
        "rgba(118, 239, 146, 1",
        "rgba(244, 201, 122, 1",
        "rgba(253, 139, 173, 1",
        "rgba(180, 255, 113, 1",
        "rgba(102, 180, 244, 1",
        "rgba(118, 239, 146, 1",
        "rgba(244, 201, 122, 1",
        "rgba(253, 139, 173, 1",
        "rgba(180, 255, 113, 1"
    ])
    const [accordion, setAccordion] = useState([]);
    const [specilistNote, setSpecilistNote] = useState("در حال بررسی");
    const [openSnack, setOpenSnack] = React.useState(false);
    const [snackType, setSnackType] = React.useState("");
    const [snackMessage, setSnackMessage] = React.useState("");
    const [modal, setModal] = React.useState(false);

    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        setModal(false);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const user = localStorage.getItem('userid')
    const token = `bearer ${localStorage.getItem('jwt')}`
    useEffect(() => {
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/quiz/results/${user}`,
            { headers: { 'Authorization': token } },
        )
            .then(res => {
                res.data.data.forEach((data, index) => {
                    const date = new Date(data.created_at)
                    var day = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
                    var time = new Date(data.created_at).get
                    // console.log(new persianDate([, date.getMonth(), date.getDate()]).format())
                    console.log(new persianDate(day).format('D MMMM YYYY'))
                    let newAcc = {
                        title: data.quiz.quizCategory,
                        date: new persianDate(day).format('D MMMM YYYY'),
                        time: new persianDate(day).format("H:m:s"),
                        answers: data.answers
                    }
                    setSpecilistNote((data.setSpecilistNote) ? data.setSpecilistNote : "در حال بررسی")
                    setAccordion(accordion => [...accordion, newAcc]);
                })
                let array = [];
                answers.forEach((answer, index) => {
                    let score = 0;
                    res.data.data.forEach(quiz => {
                        score += quiz.answers[index]
                    });
                    array[index] = score / res.data.data.length
                });
                setAnswers(array)
            })
            .catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem('jwt')
                }
                if (err.response.status === 404) {
                    setSnackType("warning")
                    setSnackMessage("بررسی وجود ندارد")
                    setOpenSnack(true)
                }
                console.log(err)
                setSnackType("error")
                setSnackMessage("خطا در سرور")
                setOpenSnack(true)

            })
    }, [])
    return (
        <Box style={{ marginTop: 16, display: "flex", flexDirection: "column-reverse" }}>
            {accordion.map(element => (
                <Accordion elevation={0} className={classes.accordion} classes={{ expanded: classes.acordionExpended }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        classes={{ content: classes.acordianContent }}
                    >
                        <Typography style={{ color: "#536595", fontWeight: "bold", fontSize: FontSize(1) }}>{element.title}</Typography>
                        <Typography style={{ color: "#7888a2" }}>تاریخ انجام آزمون: {element.date}</Typography>

                    </AccordionSummary>

                    <AccordionDetails style={{ display: "grid", padding: 0, marginBottom: 10 }}>

                        <Divider style={{ width: "90%", margin: "10px auto" }} />
                        <Box style={{ textAlign: "center", color: "#7888a2", marginTop: 10, fontSize: FontSize(1) }}>
                            <span>زمان انجام آزمون: </span>{element.time}
                        </Box>
                        <Box className={classes.resultsContainer}>

                            {element.answers.map((data, index) => (
                                <Box className={classes.result}>
                                    <div className={classes.resultWrapper}>
                                        <div className={classes.resultFiller}
                                            style={{
                                                height: data * 10 - data + "%",
                                                background: colors[index],
                                                boxShadow: `0 0 15px ${shadowColors[index]}`,
                                                fontSize: FontSize(1)
                                            }}
                                        >

                                        </div>
                                    </div>
                                    <p style={{ color: "#97a6c1", fontSize: FontSize(0.9) }}>گزینه {index + 1}</p>
                                    <p style={{ color: "#667690", fontWeight: "bold", fontSize: FontSize(1.3) }}> {data * 10 + "٪"}</p>
                                </Box>
                            ))}

                        </Box>
                        <Box className={classes.accoridonBottom} >
                            <h4 style={{ margin: 10, color: "rgb(83, 101, 149)", fontSize: FontSize(1) }}>تحلیل ارزیابی</h4>
                            <ButtonBase onClick={handleOpen} style={{ fontSize: FontSize(1.05), marginBottom: 10, color: "#6bc8f4" }}>مشاهده تحلیل ارزیابی و رشد عملکرد</ButtonBase>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))
            }
            <Backdrop className={classes.backdrop} open={modal} classes={{
                root: classes.backdropRoot
            }} onClick={handleClose}>
                <Modal
                    open={modal}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    hideBackdrop={true}
                >
                    <Box className={classes.modalContainer}>
                        <p className={classes.modalTitle}>نتیجه‌ی تحلیل و ارزیابی عملکرد</p>
                        <p className={classes.modalContext}>{specilistNote}</p>
                        <ButtonBase className={classes.modalButton} onClick={handleClose}>بازگشت</ButtonBase>
                    </Box>
                </Modal>

            </Backdrop>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={snackType}>
                    {snackMessage}
                </Alert>
            </Snackbar>
        </Box >
    )
}

export default QuizEval;