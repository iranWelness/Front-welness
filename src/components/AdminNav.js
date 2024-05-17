import React, { useEffect, useState } from "react";
import { Box, ButtonBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    wrapper: {
        boxSizing: "border-box",
        height: 80,
        width: "100%",
        backgroundColor: "#dde7f3",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
    },
    name: {
        color: "#08afe3",
        fontWeight: "bold",
        size: "1.2em"
    },
    exit: {
        color: " #df585f",
        width: 180,
        border: "1px solid #df585f",
        height: 40,
        marginRight: 5,
        borderRadius: 11
    }
});

const AdminNav = () => {
    const classes = useStyles();
    const history = useHistory();
    const [fname, setFname] = useState("");
    const [lname, setlname] = useState("");
    const logout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('userid');
        history.push("/");
      };
    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
            },
        };
        axios.get("https://tame-rose-clownfish-ring.cyclic.app/api/v1/users/getMyProfile", config)
            .then(res => {
                console.log(res)
                setFname(res.data.data.firstname)
                setlname(res.data.data.lastname)
            })
            .catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem('jwt')
                }
            })
    }, [])

    return (
        <Box className={classes.wrapper}>
            <p className={classes.name}>{fname + " " + lname}</p>
            <ButtonBase onClick={logout} className={classes.exit}>خروج</ButtonBase>
        </Box>
    );
};

export default AdminNav;
