import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, ButtonBase } from '@material-ui/core';
import NatureBG from '../../assets/images/112eaaba131289e5258ee0920c259499.jpg'
import Header from '../../components/Header';
import breath1 from "../../assets/audio/Breath1.mp3";
import pad from "../../assets/audio/Pad.mp3";
import AudioPlayer from 'react-h5-audio-player';
import breath2 from '../../assets/audio/Breath2.mp3';
import breath3 from '../../assets/audio/Breath3.mp3';
import useSound from "use-sound";

const useStyles = makeStyles({
    root: {
        position: "fixed",
        left: 0,
        right: 0,
        zIndex: 0,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#23232e99",
        minHeight: "100vh",
        "&::before": {
            position: "fixed",
            left: 0,
            right: 0,
            zIndex: -1,
            display: "block",
            "-webkit-filter": "blur(5px)",
            "-moz-filter": "blur(5px)",
            "-o-filter": "blur(5px)",
            "-ms-filter": "blur(5px)",
            filter: "blur(5px)",
            backgroundImage: `url(${NatureBG})`,
            backgroundSize: "cover",
            content: '""',
            backgroundPositionX: -180,
            height: "100%",
            width: "100%",
            transform: "scale(1.1)"
        },
    },
    activeState: {
        position: "absolute",
        fontSize: "2em",
        fontWeight: "Bold",
        color: "#9fb7e5",
        top: "35%",
        right: "41%",
    },
    container: {
        height: "100%",
        width: "100%",
    },
    rotator: {
        margin: "0 auto",
        position: "relative",
        height: "100%",
        width: "100%",
        transitionProperty: "all",
    },
    options: {
        display: "flex",
        justifyContent: "center"
    },
    optionButtons: {
        margin: 10,
        padding: 10,
        backgroundColor: "#1819264d",
        width: 70,
        height: 57,
        color: "#fff",
        textAlign: "center",
        borderRadius: 10
    },
    option: {
        display: "flex",
        justifyContent: "space-around",
        fontWeight: "bold",
        fontSize: "1.2em",
        color: "#9cb7e2",

    },
    number: {
    },
    inred: {
        fontSize: "1.2em"
    },
    circle: {
        height: "98%",
        width: "98%",
        borderRadius: "50%",
        border: "3px solid #9eb7e5",
        boxShadow: "0 0 20px 5px #55fdfb99"
    },
    rotatorWrapper: {
        position: "relative",
        width: 250,
        height: 250,
        margin: "113px auto",
    },
    colloredOverlay: {
        backgroundColor: "#23232e99",
        position: "absolute", top: 0,
        left: -21, width: "101vw", height: "100%"
    },

});

const Breathing = () => {
    const classes = useStyles();
    const [activeState, setActiveState] = useState('دم');
    const [inhale, setInhale] = useState(2);
    const [exhale, setExhale] = useState(2);
    const [pause, setPause] = useState(2);
    const [b1] = useSound(breath1);
    const [b2] = useSound(breath2);
    const [b3] = useSound(breath3);

    let animation = `${inhale}s infinite cubic-bezier(0.32, 0.3, 1, 1) firstSpin `
    useEffect(() => {
        if (activeState === 'دم') {
            const timeoutID = window.setTimeout(() => {
                setActiveState('بازدم');
                b3()
            }, inhale * 1000);

            return () => window.clearTimeout(timeoutID);
        }
        if (activeState === 'بازدم') {
            const timeoutID = window.setTimeout(() => {
                setActiveState('مکث');
                b1()
            }, exhale * 1000);

            return () => window.clearTimeout(timeoutID);
        }
        if (activeState === 'مکث') {
            const timeoutID = window.setTimeout(() => {
                setActiveState('دم');
                b2()
            }, pause * 1000);

            return () => window.clearTimeout(timeoutID);
        }
    });
    let transitionDuration = "2s"
    let scale = "scale(1)";
    if (activeState === 'دم') {
        transitionDuration = `${inhale}s `;
        scale = "scale(1.2)";
    } else if (activeState === 'بازدم') {
        transitionDuration = `${exhale}s `;
        scale = "scale(1)";
    } else {
        transitionDuration = `${pause}s `;
        scale = "scale(1)";
    }
    return (
        <Box className={classes.root}>
            <div className={classes.colloredOverlay} >
                <Header component="link" to="/evolution" />
                <Box className={classes.container}>
                    <div className={classes.rotatorWrapper}>
                        <p className={classes.activeState}>{activeState}</p>
                        <div style={{ transitionDuration: transitionDuration, transform: scale }} className={classes.rotator}>
                            <div className={classes.circle} style={{}}>
                            </div>
                        </div>
                    </div>
                    <AudioPlayer
                        style={{ direction: "ltr", display: "none" }}
                        src={pad}
                        autoPlay
                        loop={true}
                        onPlay={e => console.log("onPlay")}
                        showJumpControls={false}
                        layout="horizontal"
                        customAdditionalControls={[]}
                        customVolumeControls={[]}
                    />
                    <Divider variant="middle" />
                    <Box className={classes.options}>
                        <Box className={classes.optionButtons}>
                            دم
                            <Box className={classes.option}>
                                <ButtonBase onClick={() => setInhale(inhale + 1)} className={classes.inred}>+</ButtonBase>
                                <span className={classes.number}>{inhale}</span>
                                <ButtonBase onClick={() => setInhale((inhale) => (Math.max(inhale - 1, 1)))} className={classes.inred}>-</ButtonBase>
                            </Box>
                        </Box>
                        <Box className={classes.optionButtons}>
                            بازدم
                            <Box className={classes.option}>
                                <ButtonBase onClick={() => setExhale(exhale + 1)} className={classes.inred}>+</ButtonBase>
                                <span className={classes.number}>{exhale}</span>
                                <ButtonBase onClick={() => setExhale((exhale) => (Math.max(exhale - 1, 1)))} className={classes.inred}>-</ButtonBase>
                            </Box>
                        </Box>
                        <Box className={classes.optionButtons}>
                            مکث
                            <Box className={classes.option}>
                                <ButtonBase onClick={() => setPause(pause + 1)} className={classes.inred}>+</ButtonBase>
                                <span className={classes.number}>{pause}</span>
                                <ButtonBase onClick={() => setPause((pause) => (Math.max(pause - 1, 1)))} className={classes.inred}>-</ButtonBase>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </div>
        </Box>
    )
}

export default Breathing;
