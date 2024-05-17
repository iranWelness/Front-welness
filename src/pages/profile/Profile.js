import React, { useEffect, useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  ButtonBase,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import user from "../../assets/images/demoUser.png";
import settings from "../../assets/images/profileSettings.png";
import pencil from "../../assets/images/pencil.png";
import stopwatch from "../../assets/images/stopwatch.png";
import axios from "axios";
import Header from '../../components/Header'
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNav } from '../../actions';
import FontSize from "../../components/FontSize";

const useStyles = makeStyles({
  topBar: {
    padding: "25px 10px 0 10px",
    width: "100%",
    backgroundColor: "#c4dffaad"
  },
  settingIcon: {
    fontSize: FontSize(2),
  },
  bold: {
    fontWeight: "900",
  },
  nameContainer: {
    marginTop: 20,
    "& h6:first-child": {
      textShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px  #ffffffd1",
      fontSize: FontSize(1.3),
    }
  },
  profPic: {
    boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
    borderRadius: "50%",
    width: 160,
    height: 160,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: "#c1daf2",
    "& img": {
      width: "75%",
      height: "75%",
      objectFit: "cover",
      opacity: "90%",
    }
  },
  nameBox: {
    margin: "30px 0 -30px 0 ",
    textAlign: "center",
    color: "#475d97",
  },
  morphButtons: {
    position: "relative",
    top: 44
  },
  sqareButtons: {
    background: "linear-gradient(315deg, rgba(226,235,242,1) 0%, rgba(234,242,249,1) 100%)",
    boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
    margin: 9,
    padding: 10,
    borderRadius: 16,
    height: 53,
    width: 53,
    "& img": {
      height: 30,
    },
  },
  bellowButtons: {
    marginTop: 55
  },
  subscription: {
    width: 289,
    height: 57,
    margin: 15,
    borderRadius: 15,
    background: "linear-gradient(126deg, rgba(73,94,149,1) 0%, rgba(87,108,164,1) 100%)",
    fontSize: FontSize(1.1),
    boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
    fontWeight: "bold",
  },
  logout: {
    width: 289,
    height: 57,
    borderRadius: 15,
    borderWidth: 3,
    fontWeight: "bold",
    fontSize: FontSize(1.05),
    boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
  },
  fullList: {
    width: "auto",
  },
  settingsButton: {
    borderRadius: 50,
  },
});

const Profile = () => {
  const classes = useStyles();
  const history = useHistory();
  const [fname, setFname] = useState();
  const [lname, setlname] = useState();
  const [phone, setPhone] = useState();
  const [image, setImage] = useState();
  const dispatch = useDispatch();
 


  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userid');
    history.push("/");
  };


  useEffect(() => {
    dispatch(showNav())
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
        setPhone(res.data.data.phone)
        setImage(res.data.data.image)
      })
      .catch(err => {
        if (err.response.status === 401) {
          localStorage.removeItem('jwt')
        }
      })

  }, [])

  useEffect(() => {
    <Router forceRefresh={true} />
  }, [])

  return (
    <Box>

      <Grid className={classes.topBar} container justify="flex-end">
        <Header component="dots" setting={true} to={'/profile/broadcast'} />
        <Grid
          item
          className={classes.nameBox}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item className={classes.profPic}>
            {(image) ? <img src={`${image}`} style={{ width: "100%", height: "100%", }} alt="profile pic" /> : <img src={user} alt="profile pic" />}
          </Grid>
          <Grid item className={classes.nameContainer}>
            <Typography className={classes.bold} variant="h6">
              {fname + " " + lname}
            </Typography>
            <Typography variant="h6">{phone}</Typography>
          </Grid>
        </Grid>
        <Grid className={classes.morphButtons} item container justify="center">
          <ButtonBase component={Link} to={"/profile/support"} className={classes.sqareButtons}>
            <img style={{ height: 28 }} src={settings} alt="settings" />
          </ButtonBase>
          <ButtonBase component={Link} to="/profile/notifications" className={classes.sqareButtons}>
            <img src={stopwatch} alt="stopwatch" />
          </ButtonBase>
          <ButtonBase to={'/profile/edit'} component={Link} className={classes.sqareButtons}>
            <img src={pencil} alt="pencil" />
          </ButtonBase>
        </Grid>
      </Grid>
      <Grid
        className={classes.bellowButtons}
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          color="primary"
          className={classes.subscription}
        >
          اشتراک طلایی
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.logout}
          onClick={logout}
        >
          خروج از حساب کاربری
        </Button>
      </Grid>

    </Box >
  );
};
export default Profile;
