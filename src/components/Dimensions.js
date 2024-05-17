import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDimension } from '../actions';

import CenterLogo from '../assets/images/dims/1.png';
import dim1 from '../assets/images/dims/2.png';
import dim2 from '../assets/images/dims/3.png';
import dim3 from '../assets/images/dims/4.png';
import dim4 from '../assets/images/dims/5.png';
import dim5 from '../assets/images/dims/6.png';
import dim6 from '../assets/images/dims/7.png';
import dim7 from '../assets/images/dims/8.png';
import dim8 from '../assets/images/dims/9.png';


const useStyles = makeStyles({
    circle: {
        borderRadius: "50%",
        width: 378,
        backgroundColor: "tramsparent",
        height: 399,
        position: "relative",
        '@media(max-width: 410px)': {
            transform: "scale(0.9)"
        }
    },
    classDim1: {
        background: `url(${dim1}) no-repeat center`,
        "-webkit-background-size": 'contain',
        "-moz-background-size": "contain",
        "-o-background-size": "contain",
        backgroundSize: "contain",
        transition: "all 0.5s",
        width: 140,
        "&:hover": {
            transform: "scale(1.2, 1.2)"
        },
        height: 130, position: "absolute", left: 117, top: 14, "& img": { height: "100%" },
    },
    classDim2: {
        background: `url(${dim2}) no-repeat center`,
        "-webkit-background-size": 'contain',
        "-moz-background-size": "contain",
        "-o-background-size": "contain",
        transition: "all 0.5s",
        backgroundSize: "contain",
        "&:hover": {
            transform: "scale(1.2, 1.2) rotate(-45deg)",

        },
        height: 140,
        width: 130, position: "absolute", left: 40, top: 45, transform: "rotate(-45deg)", "& img": { height: "100%" },
    },
    classDim3: {
        background: `url(${dim3}) no-repeat center`,
        "-webkit-background-size": 'contain',
        "-moz-background-size": "contain",
        "-o-background-size": "contain",
        backgroundSize: "contain",
        transition: "all 0.5s",
        "&:hover": {
            transform: "scale(1.2, 1.2) rotate(-90deg)"
        },
        width: 140,
        height: 130, position: "absolute", left: 4, top: 133, transform: "rotate(-90deg)", "& img": { height: "100%" },
    },
    classDim4: {
        background: `url(${dim4}) no-repeat center`,
        "-webkit-background-size": 'contain',
        "-moz-background-size": "contain",
        "-o-background-size": "contain",
        backgroundSize: "contain",
        transition: "all 0.5s",
        "&:hover": {
            transform: "scale(1.2, 1.2) rotate(-135deg)"
        },
        width: 140,
        height: 130, position: "absolute", left: 43, top: 218, transform: "rotate(-135deg)", "& img": { height: "100%" },
    },
    classDim5: {
        background: `url(${dim5}) no-repeat center`,
        "-webkit-background-size": 'contain',
        "-moz-background-size": "contain",
        "-o-background-size": "contain",
        backgroundSize: "contain",
        transition: "all 0.5s",
        "&:hover": {
            transform: "scale(1.2, 1.2) rotate(-180deg)"
        },
        width: 140,
        height: 130, position: "absolute", left: 127, top: 253, transform: "rotate(-180deg)", "& img": { height: "100%" },
    },
    classDim6: {
        background: `url(${dim6}) no-repeat center`,
        "-webkit-background-size": 'contain',
        "-moz-background-size": "contain",
        "-o-background-size": "contain",
        backgroundSize: "contain",
        transition: "all 0.5s",
        "&:hover": {
            transform: "scale(1.2, 1.2) rotate(-225deg)"
        },
        width: 140,
        height: 130, position: "absolute", left: 209, top: 217, transform: "rotate(-225deg)", "& img": { height: "100%" },
    },
    classDim7: {
        background: `url(${dim7}) no-repeat center`,
        "-webkit-background-size": 'contain',
        "-moz-background-size": "contain",
        "-o-background-size": "contain",
        backgroundSize: "contain",
        transition: "all 0.5s",
        "&:hover": {
            transform: "scale(1.2, 1.2) rotate(-270deg)"
        },
        width: 140,
        height: 130, position: "absolute", left: 242, top: 132, transform: "rotate(-270deg)", "& img": { height: 130 },
    },
    classDim8: {
        background: `url(${dim8}) no-repeat center`,
        "-webkit-background-size": 'contain',
        "-moz-background-size": "contain",
        "-o-background-size": "contain",
        backgroundSize: "contain",
        transition: "all 0.5s",
        "&:hover": {
            transform: "scale(1.2, 1.2) rotate(-315deg)"
        },
        width: 140,
        height: 130, position: "absolute", left: 205, top: 46, transform: "rotate(-315deg)", "& img": { height: "100%" },
    },
    centerLogoWrappwe: {
        position: "absolute",
        borderRadius: 50,
        backgroundColor: "#fff",
        width: 100,
        height: 100,
        right: 135,
        top: 146
    },
    logo: {
        width: 100,
        height: 100
    }
});

const Dimensions = ({ onCenterClick }) => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const history = useHistory()
    return (
        <Box className={classes.circle} >
            <Link
                onClick={() => dispatch(setDimension("physical"))}
                to={"/quizzes/dimension"}><div className={classes.classDim1}>
                    <Box style={{ margin: "48px 53px" }}></Box>
                </div>
            </Link>
            <Link
                onClick={() => dispatch(setDimension("feeling"))}
                to={"/quizzes/dimension"}><div className={classes.classDim2}>
                    <Box style={{ margin: "48px 53px" }}></Box>
                </div>
            </Link>
            <Link
                onClick={() => dispatch(setDimension("mindset"))}
                to={"/quizzes/dimension"}><div className={classes.classDim3}>
                    <Box style={{ margin: "48px 53px" }}></Box>
                </div>
            </Link>
            <Link
                onClick={() => dispatch(setDimension("meaning"))}
                to={"/quizzes/dimension"}><div className={classes.classDim4}>
                    <Box style={{ margin: "19px 53px" }}></Box>
                </div>
            </Link>
            <Link
                onClick={() => dispatch(setDimension("career"))}
                to={"/quizzes/dimension"}><div className={classes.classDim5}>
                    <Box style={{ margin: "48px 53px" }}></Box>
                </div>
            </Link>
            <Link
                onClick={() => dispatch(setDimension("economical"))}
                to={"/quizzes/dimension"}><div className={classes.classDim6}>
                    <Box style={{ margin: "47px 42px" }}></Box>
                </div>
            </Link>
            <Link
                onClick={() => dispatch(setDimension("social"))}
                to={"/quizzes/dimension"}><div className={classes.classDim7}>
                    <Box style={{ margin: "38px 43px" }}></Box>
                </div>
            </Link>
            <Link
                onClick={() => dispatch(setDimension("environment"))}
                to={"/quizzes/dimension"}><div className={classes.classDim8}>
                    <Box style={{ margin: "41px 53px" }}></Box>
                </div>
            </Link>

            <div onClick={() => { onCenterClick(1) }} className={classes.centerLogoWrappwe}>
                <img src={CenterLogo} className={classes.logo} alt="center logo" />
            </div>
        </Box>
    )
}

export default Dimensions;
