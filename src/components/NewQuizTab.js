import React, { useEffect, useState } from 'react';
import { ButtonBase, Box, Snackbar, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import MuiAlert from '@material-ui/lab/Alert';
import FontSize from './FontSize';

const useStyle = makeStyles({
    mainWrapper: {
        display: "flex",
        flexDirection: 'column',
        textAlign: 'center',
        padding: 10,
        alignItems: 'center'
    },
    take: {
        height: 57,
        width: "100%",
        maxWidth: 289,
        color: "#cfd7e2",
        borderRadius: 15,
        fontWeight: 'bold',
        fontSize: FontSize(1.2),
        backgroundColor: "#485d94",
        marginTop: 40,
        boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
    },
    intro: {
        color: "#546497",
        fontSize: FontSize(1.1),
        marginBottom: 20,
    },
    desc: {
        color: "#7989a3",
    },
    cpllapseHidden: {
        minHeight: "110px !important",
        visibility: "visible"
    },
    readMoreButton: {
        position: "relative",
        marginBottom: -10,
        width: "100%",
        background: "linear-gradient(184deg, rgba(255,255,255,0) 0%, rgba(212,235,255,1) 36%)",
        textDecoration: "underline",
        textDecorationColor: "#00000091",
        color: "#5fc3f4"

    }
});

const NewQuizTab = ({ onStart }) => {
    const [quizTitle, setQuizTitle] = useState("");
    const [quizDesc, setQuizDesc] = useState("");
    const [quizAudio, setQuizAudio] = useState("");
    const [openSnack, setOpenSnack] = React.useState(false);
    const [snackType, setSnackType] = React.useState("");
    const [snackMessage, setSnackMessage] = React.useState("");
    const [checked, setChecked] = React.useState(false);
    let quiz = useSelector(state => {
        return state.quiz;
    });
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleChange = () => {
        setChecked((prev) => !prev);
    };
    const classes = useStyle();
    const readMoreText = () => (checked) ? "بستن" : "مطالعه بیشتر"


    useEffect(() => {
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/quizzes/${quiz}`, { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } })
            .then(function (response) {

                setQuizTitle(response.data.data[0].quizTitle)
                setQuizDesc(response.data.data[0].quizDescription)
                setQuizAudio(response.data.data[0].quizAudio)

                console.log(response);
            })
            .catch(function (error) {
                setOpenSnack(true)
                setSnackType("error")
                setSnackMessage("خطا در سرور")
                if (error.response.status === 401) {
                    localStorage.removeItem('jwt')
                }
                console.log(error);
            })
    }, [])
    return (
        <Box className={classes.mainWrapper}>
            <h5 className={classes.intro} style={{ marginTop: 20 }}>{quizTitle}</h5>
            <AudioPlayer
                style={{ direction: "ltr", display: "none" }}
                src={`${quizAudio}`}
                onPlay={e => console.log("onPlay")}
                showJumpControls={false}
                layout="horizontal"
                customAdditionalControls={[]}
                customVolumeControls={[]}
            />
            <Collapse in={checked} collapsedSize={200} classes={{ hidden: classes.cpllapseHidden }}>
                <p style={{ fontSize: FontSize(1), }} className={classes.desc} style={{ textAlign: 'justify', padding: "0 30px" }}> {quizDesc} </p>
            </Collapse>
            <ButtonBase style={{ fontSize: FontSize(1), }} className={classes.readMoreButton} onClick={handleChange}> {readMoreText()} </ButtonBase>
            <ButtonBase className={classes.take} onClick={onStart}>انجام آزمون</ButtonBase>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert style={{ fontSize: FontSize(1), }} onClose={handleCloseSnack} severity={snackType}>
                    {snackMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default NewQuizTab;