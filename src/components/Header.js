import React, { useState, useEffect } from 'react';
import { Grid, Button, Drawer, ButtonBase, Modal, Backdrop, Box } from '@material-ui/core';
import settings from "../assets/images/settings.png";
import dots from "../assets/images/dots.png";
import { makeStyles } from "@material-ui/core/styles";
import back from "../assets/images/Right Arrow 2.png";
import { Link } from 'react-router-dom';
import Slider from '@material-ui/core/Slider';
import FontSize from './FontSize';
import { useHistory } from 'react-router-dom';
import warningicon from '../assets/images/Virus Found.png';
import cartIcon from '../assets/images/Cart 2.png';
import axios from 'axios';

const useStyles = makeStyles({
  modalContainer: {
    width: 335,
    maxWidth: "85%",
    height: 100,
    padding: 20,
    margin: "50px auto 0",
    background: "#b5cbe8",
    borderRadius: 15,
    color: "#00000099"
  },
  backdrop: {
    zIndex: 1299,
    color: '#fff',
  },
  backdropRoot: {
    backgroundColor: "#19163a54",
    backdropFilter: "blur(2px)",
  },
  settingsButton: {
    position: "fixed",
    right: 10,
    top: 17,
  },
  back: {
    position: "fixed",
    left: 21,
    top: 22,
  },
  backIcon: {
    height: 23,
    width: 32,
    position: 'reletive'
  },
  settingIcon: {
    fontSize: "2em",
  },
  BackdropProps: {
    background: "transparent",
  },
  drawerRoot: {
    background: "#ffffff00",
    "&::before": {
      content: '""',
      position: "fixed",
      left: 0,
      right: 0,
      zIndex: "-1",
      height: "100vh",
      width: "100vw",
      backdropFilter: "blur(10px)",
    },
  },
  drawerPaper: {
    background: "transparent"
  },
  drawerModal: {
    background: "transparent"
  },
  exitButton: {

  },
  list: {
    width: "100vw",
    background: "#ffffff00",
    height: "100vh",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    "& ul": {
      "& div": {
        textAlign: "center",
      },
    },

  },
  topList: {
    fontWeight: "bold",
    display: "grid",
    gridGap: "5em",
  },
  dotsIcon: {
    width: 28,
  },
  listItem: {
    fontWeight: "bold",
    fontSize: "1.1em",
    color: "#4b6097",
    textAlign: "center",
    textShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px  #ffffffd1",
  },
  modalButton: {
    color: "#f05660",
    fontWeight: "bold",
    width: "100%",
    padding: 18, fontSize: FontSize(1)
  },
  dots: {
    height: 5,
    width: 5,
    borderRadius: "43px",
    backgroundColor: "red",
    position: "absolute",
    top: 0,
    left: 0
  },
});

const Header = ({ component, to, setting, cart, warning }) => {
  const classes = useStyles();
  const history = useHistory();
  const [fontSizeState, setFontSize] = useState('1em');
  const [reload, setReload] = useState(false);
  const [state, setState] = useState(false);
  const [modal, setModal] = useState(false);
  const [unread, setUndread] = useState(false);

  useEffect(() => {
    const config = {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
    };
    axios.get('https://tame-rose-clownfish-ring.cyclic.app/api/v1/broadcast-messages/unread', config)
      .then(res => {
        console.log(res.data.data)
        console.log(res.data.data.length > 0)
        if (res.data.data.length  > 0) {
          setUndread(true)
          console.log(unread)
        }
      })
  }, [])

  const toggleDrawer = () => {
    setState(!state);
  };
  if (!setting) {
    setting = false;
  } else {
    setting = true
  }
  const backButton = () => {
    switch (component) {
      case "function":
        return (<ButtonBase className={classes.back} onClick={to}><img src={back} alt="بازگشت" className={classes.backIcon} /></ButtonBase>)
      case "link":
        return (<ButtonBase className={classes.back} component={Link} to={to}><img src={back} alt="بازگشت" className={classes.backIcon} /></ButtonBase>)
      case "dots":
        return (<ButtonBase className={classes.back} component={Link} to={to}>
          <img src={dots} className={classes.dotsIcon} alt="dots" />
        </ButtonBase>)
      default:
        return ("");
    }
  }
  const handleChange = (e, value) => {
    localStorage.setItem('fontSize', value);
    setFontSize(FontSize(1))
    setReload(true)
  }
  const handleOpen = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };
  return (
    <Grid item style={{ zIndex: 2 }}>
      <div>
        <React.Fragment key={"right"}>
          {(cart) ? <Button
            className={classes.settingsButton}
            onClick={() => history.push("/products/cart")}
          >
            <img style={{ width: 40, height: 40 }} src={cartIcon} alt="سبد خرید" />
          </Button> : null}
          {(warning) ? <ButtonBase
            className={classes.settingsButton}
            onClick={handleOpen}>
            <img src={warningicon} className={classes.dotsIcon} alt="dots" />
          </ButtonBase> : null}
          {(setting) ? <Button
            className={classes.settingsButton}
            onClick={() => toggleDrawer()}
          >
            <img src={settings} alt="settings" />
          </Button> : null}

          {backButton()}
          <div style={{ display: (unread) ? 'absolute' : "none" }} className={classes.dots}>{unread}</div>
          <Drawer
            anchor={"right"}
            open={state}
            onClose={() => toggleDrawer()}
            onOpen={() => toggleDrawer()}
            disableBackdropClick
            BackdropProps={{
              classes: {
                root: classes.BackdropProps
              }
            }}
            classes={{
              modal: classes.drawerModal,
              paper: classes.drawerPaper,
              root: classes.drawerRoot,
            }}
          >
            <div
              className={classes.list}
              role="presentation"
            >
              <div className={classes.topList}>
                <div className={classes.slider}>
                  <p style={{ fontSize: fontSizeState }} className={classes.listItem}>سایز متن</p>
                  <Slider
                    defaultValue={(localStorage.getItem('fontSize')) ? localStorage.getItem('fontSize') : 1}
                    marks
                    min={0}
                    track={false}
                    style={{ width: 289 }}
                    max={2}
                    onChange={handleChange}
                    classes={{ markLabel: classes.sliderLabel }}
                  />
                </div>
                <ButtonBase style={{ fontSize: fontSizeState }} className={classes.listItem}>جلوه‌های صوتی</ButtonBase>
                <ButtonBase style={{ fontSize: fontSizeState }} className={classes.listItem}>زبان فارسی</ButtonBase>
              </div>
              <ButtonBase
                onClick={() => { toggleDrawer(); reload && window.location.reload(); }}
                className={classes.listItem}
                style={{ color: "#e1515a", fontSize: FontSize(1.1) }}
              >
                بازگشت
              </ ButtonBase>
            </div>
          </Drawer>
        </React.Fragment>
      </div>
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
            <p className={classes.modalContext}>پیام های شما محرمانه(انکریپت شده) ثبت خواهد شد.</p>
            <ButtonBase className={classes.modalButton} onClick={handleClose}>بازگشت</ButtonBase>
          </Box>
        </Modal>

      </Backdrop>
    </Grid >
  )
}
export default Header;