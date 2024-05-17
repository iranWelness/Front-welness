import React, { useState, useEffect } from 'react';
import { Box, ButtonBase, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useLocation, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import persianDate from 'persian-date';
import MuiAlert from '@material-ui/lab/Alert';
import AdminNav from '../../components/AdminNav'

const useStyles = makeStyles({
    container: {
        width: 800,
        maxWidth: "100%",
        margin: "100px auto 60px",
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
    details: {
        textAlign: 'center',
        color: "#0000006e"
    },
    resultWrapper: {
        height: 150,
        width: 30,
        padding: 4,
        borderRadius: 20,
        boxShadow: "inset 0 0 20px 0px #a1ccf4a8",
        position: "relative",
        backgroundColor: "#d4ebffba",
        marginBottom: 14,
        margin: "0 auto"
    },
    results: {
        display: "flex",

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
        display: "grid",
        textAlign: 'center',
        margin: "10px 0 20px 0",
        width: "20%"
    },
    buttons: {
        justifyContent: "center",
        display: "flex",
    },
    button: {
        borderRadius: 11,
        width: 180,
        height: 40,
        color: "#fff",
        backgroundColor: "#506497",
        margin: "20px 5px",
        boxShadow: "-7px 6px 13px #a6a6a6b8, -7px -8px 20px 0px #ffffffd1",
    },
    botButtons: {
        display: "flex",
        justifyContent: "center",
    },
    textArea: {
        width: "100%",
        height: 100,
        borderRadius: 15,
        outline: 0,
        border: "none",
        resize: "none",
        padding: 10,
        boxSizing: "border-box",
        backgroundColor: "#5064972e",
    },
    register: {
        backgroundColor: "#08afe4",
        color: "#fff",
        borderRadius: 11,
        width: 180,
        height: 40,
        marginRight: 5,
    },
    return: {
        border: "1px solid #df585f",
        color: "#df585f",
        borderRadius: 11,
        width: 180,
        height: 40,
        marginBottom: 15,
    }
});
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const HealthFiles = () => {
    const history = useHistory()
    const classes = useStyles();
    let query = useQuery();
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackType, setSnackType] = useState("");
    const [desc, setDesc] = useState("");
    const [quizData, setQuizData] = useState();
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
    ]);
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const updateDesc = e => {
        setDesc((e.target) ? e.target.value : e)
    }
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };
    const send = () => {
        const config = {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
            },
        };
        const data = {
            specilistNote: desc
        }
        axios.put(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/quiz/results/${query.get("id")}`, data, config)
            .then(res => {
                console.log(res)
                setSnackType("success")
                setSnackMessage("ارسال شد")
            })
            .catch(err => {
                setSnackType("error")
                setSnackMessage("خطا در ارسال")
                setOpenSnack(true)
            })
    }

    useEffect(() => {
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/quiz/results/perc/${query.get("id")}`, { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } })
            .then(res => {
                console.log(res.data.data[0])
                setQuizData(res.data.data[0])

            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                }
            })
    }, [])
    useEffect(() => {
        // updateDesc((quizData) ? quizData.specilistNote : "")
    }, [quizData])
    return (
        <>
            <AdminNav />
            <Box className={classes.container}>
                <Box className={classes.header}>
                    <h2 className={classes.headerTitle}>آپلود دستگاه‌های هلث</h2>
                </Box>
                <Box className={classes.innerContainer}>
                    <Box className={classes.details}>
                        <p>تاریح انجام آزمون: {(quizData) ? new persianDate(quizData.quiz.created_at).format("D MMMM YYYY") : ""}</p>
                        <p>ساعت انجام آزمون: {(quizData) ? new persianDate(quizData.quiz.created_at).format("H:m:s") : ""}</p>
                        <p>شماره همراه آزمون دهنده: {(quizData) ? quizData.user.phone : ""}</p>
                        <p>نام و نام‌‌خانوادگی آزمون دهنده: {(quizData) ? quizData.user.firstname : ""} {(quizData) ? quizData.user.lastname : ""}</p>
                    </Box>
                    <Box className={classes.results}>
                        {(quizData) ? quizData.answers.map((data, index) => (
                            <Box className={classes.result}>
                                <div className={classes.resultWrapper}>
                                    <div className={classes.resultFiller}
                                        style={{
                                            height: data * 10 + "%",
                                            background: colors[index],
                                            boxShadow: `0 0 15px ${shadowColors[index]}`,
                                        }}
                                    >
                                    </div>
                                </div>
                                <p style={{ color: "#97a6c1", }}>گزینه {index + 1}</p>
                                <p style={{ color: "#667690", fontWeight: "bold", }}> {data * 10 + "٪"}</p>
                            </Box>
                        )) : <Box className={classes.result}>
                            <div className={classes.resultWrapper}>
                                <div className={classes.resultFiller}
                                    style={{
                                        height: 0 * 10 + "%",
                                        background: colors[1],
                                        boxShadow: `0 0 15px ${shadowColors[1]}`,
                                    }}
                                >
                                </div>
                            </div>
                            <p style={{ color: "#97a6c1", }}>گزینه {0 + 1}</p>
                            <p style={{ color: "#667690", fontWeight: "bold", }}> {0 * 10 + "٪"}</p>
                        </Box>}

                    </Box>
                    <Box className={classes.buttons}>
                        <ButtonBase className={classes.button}>انتخاب فایل تصویر</ButtonBase>
                        <ButtonBase className={classes.button}>انتخاب فایل پی‌دی‌اف</ButtonBase>
                        <ButtonBase className={classes.button}>انتخاب فایل ویدیو</ButtonBase>
                        <ButtonBase className={classes.button}>انتخاب فایل صوتی</ButtonBase>
                    </Box>
                    <textarea onChange={updateDesc} placeholder={"توضیحات خود را وارد نمایید"} className={classes.textArea}>{desc}</textarea>
                </Box>
                <Box className={classes.botButtons}>
                    <ButtonBase onClick={send} className={classes.register}>ارسال</ButtonBase>
                    <ButtonBase onClick={() => history.go(-1)} className={classes.return}>بازگشت</ButtonBase>
                </Box>
                <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                    <Alert onClose={handleCloseSnack} severity={snackType}>
                        {snackMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    )
}

export default HealthFiles
