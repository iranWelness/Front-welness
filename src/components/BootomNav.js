import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import profile from '../assets/images/navIcon/profile.png';
import quizzes from '../assets/images/navIcon/quizzes.png';
import store from '../assets/images/navIcon/store.png';
import reservation from '../assets/images/navIcon/reservation.png';
import evolution from '../assets/images/navIcon/evolution.png';
import FontSize from "./FontSize";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: "0px",
    left: "0px",
    right: "0px",
    height: 54,
    background: "linear-gradient(264deg, rgba(144,192,211,1) 0%, rgba(163,190,233,1) 53%, rgba(142,206,210,1) 100%)",
    padding: 5,
  },
  navItem: {
    padding: 0,
    fontWeight: "bold",
    fontSize: FontSize(1.1),
    minWidth: 69,
  },
  navIcon: {
    height: 30
  },
});

const BootomNav = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        className={classes.navItem}
        component={Link}
        to="/quizzes"
        label="ارزیابی"
        value="quizzes"
        icon={<img src={quizzes} alt="آزمون" className={classes.navIcon} />}
      />
      <BottomNavigationAction
        className={classes.navItem}
        component={Link}
        to="/products"
        label="فروشگاه"
        value="shop"
        icon={<img src={store} alt="store" className={classes.navIcon} />}
      />
      <BottomNavigationAction
        className={classes.navItem}
        component={Link}
        to="/appointments"
        label="مشاوره"
        value="reservation"
        icon={<img src={reservation} alt="مشاوره" className={classes.navIcon} />}
      />
      <BottomNavigationAction
        className={classes.navItem}
        component={Link}
        to="/evolution"
        label="ارتقاء"
        value="evolution"
        icon={<img src={evolution} alt="ارتقاء" className={classes.navIcon} />}
      />
      <BottomNavigationAction
        className={classes.navItem}
        component={Link}
        to="/profile"
        label="پروفایل"
        value="profile"
        icon={<img src={profile} alt="profile" className={classes.navIcon} />}
      />
    </BottomNavigation>
  );
};

export default BootomNav;
