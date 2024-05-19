import React, { useState, useEffect } from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import {
  StylesProvider,
  jssPreset,
  makeStyles,
} from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import CustomTheme from "./assets/CustomTheme";
import BootomNav from "./components/BootomNav";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/profile/Profile";
import BackUp from "./pages/profile/BackUp";
import BroadcastMessages from "./pages/profile/BroadcastMessages";
import Evolution from "./pages/evolution/Evolution";
import Products from "./pages/products/Products";
import EditProfile from "./pages/profile/EditProfile";
import Login from "./pages/auth/Login";
import Product from "./pages/products/Product";
import ProductList from "./pages/products/ProductList";
import ClosedShop from "./pages/products/ClosedShop";
import Cart from "./pages/products/Cart";
import Norbu from './pages/evolution/Norbu';
import Game from './pages/sudoku/index';
import Appointments from "./pages/appointments/Appointments";
import ReserveAppointment from "./pages/appointments/ReserveAppointment";
import AppointmentResults from "./pages/appointments/AppointmentResults";
import ActivateProfile from "./pages/auth/ActivateProfile";
import QuizzesDims from "./pages/quizzes/QuizzesDims";
import Nutrition from "./pages/quizzes/quizes/Nutrition";
import Dimension from './pages/quizzes/Dimension';
import Breathing from './pages/evolution/Breathing';
import OnlineAppointment from './pages/appointments/OnlineAppointment';
import OnlineChat from './pages/appointments/OnlineChat';
import Quiz from './pages/quizzes/Quiz'
import Notifications from './pages/profile/Notifications'
import AddNotif from './pages/profile/AddNotif'
import Signup from "./pages/auth/Signup";
import HealthFiles from "./pages/admin/HealthFiles";
import Analyzes from "./pages/admin/Analyzes";
import SpecilistsPanel from "./pages/admin/SpecilistsPanel";
import QuizSubjects from "./pages/admin/QuizSubjects";
import QuizResult from "./pages/admin/QuizResult";
import SearchFiles from "./pages/admin/SearchFiles";
import FilePanel from "./pages/admin/FilePanel";
import PanelSelection from "./pages/admin/PanelSelection";
import ManagementPanel from "./pages/admin/ManagementPanel";
import SearchUserInfo from "./pages/admin/SearchUserInfo";
import AdminAnalyzeEDS from "./pages/admin/AdminAnalyzeEDS";
import AdminAnalyzeHealth from "./pages/admin/AdminAnalyzeHealth";
import SupportMessages from "./pages/admin/SupportMessages";
import AdminUserDetails from "./pages/admin/AdminUserDetails";
import AdminBroadcastMessages from "./pages/admin/AdminBroadcastMessages";
import AdminChat from "./pages/admin/AdminChat";
import AdminChatPage from "./pages/admin/AdminChatPage";
import Reservation from './pages/admin/Reservation';
import AdminOrders from './pages/admin/AdminOrders';
import Paths from "./pages/admin/Paths";
import "./assets/fonts/fonts.css";
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment-jalaali';
import Breath from "./pages/quizzes/quizes/Breath";
import Movement from "./pages/quizzes/quizes/Movement";
import Sleep from "./pages/quizzes/quizes/Sleep";
import FirstLevelUpgrade from "./pages/quizzes/social/FirstLevelUpgrade";
import SecondLevelUpgrade from "./pages/quizzes/social/SecondLevelUpgrade";
import FirstLevelUpgradeE from "./pages/quizzes/emotional/FirstLevelUpgradeE";
import SecondLevelUpgradeE from "./pages/quizzes/emotional/SecondLevelUpgradeE";
import ThirdLevelUpgrade from "./pages/quizzes/emotional/ThirdLevelUpgrade";
import FourthLevelUpgrade from "./pages/quizzes/emotional/FourthLevelUpgrade";
import FiFthLevelUpgrade from "./pages/quizzes/emotional/FiFthLevelUpgrade";
import SixthLevelUpgrade from "./pages/quizzes/emotional/SixthLevelUpgrade";




// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    background: "#d4ebff",
  },
  main: {
    // height: "calc(100vh - 77px)",
    overflow: "auto"
  }
});


const App = props => {
  const classes = useStyles();
  const state = useSelector(state => state.authentication)
  const [highlight, setHighlight] = useState([]);
  const nav = useSelector(state => {
    return state.nav;
  });
  console.log(state)
  useEffect(() => {
    async function getData() {
      const data = await axios.get('https://tame-rose-clownfish-ring.cyclic.app/api/v1/appointments/', { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } })
      let array = (data.data.data);
      array.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      let highlightAray = []
      array.forEach(item => {
        highlightAray.push({
          color: '#00BCD4',
          start: moment(new Date(item.date)),
          end: moment(new Date(item.date))
        })
      })
      setHighlight(highlightAray)
    }
    getData();
  }, [])
  return (
    <Router>
      <ThemeProvider theme={CustomTheme}>
        <StylesProvider jss={jss}>
          <div className={classes.root}>
            <div className={classes.main} style={{ height: (nav) ? "calc(100vh - 65px)" : "100vh" }}>
              <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/profile/edit" component={EditProfile} />
                <Route path="/profile/broadcast" component={BackUp} />
                <Route path="/profile/support" component={BroadcastMessages} />
                <Route path="/profile/notifications" exact component={Notifications} />
                <Route path="/profile/notifications/add-notif" component={AddNotif} />
                <Route path="/quizzes" exact component={QuizzesDims} />
                <Route path="/quizzes/dimension" exact component={Dimension} />
                <Route path="/quizzes/dimension/quiz" component={Quiz} />
                <Route path="/quizzes/physical/quiz/nutrition" component={Nutrition} />
                <Route path="/quizzes/physical/quiz/breath" component={Breath} />
                <Route path="/quizzes/physical/quiz/movement" component={Movement} />
                <Route path="/quizzes/physical/quiz/sleep" component={Sleep} />
                <Route path="/quizzes/social/quiz/firstlevelupgrate" component={FirstLevelUpgrade} />
                <Route path="/quizzes/social/quiz/secondlevelupgrate" component={SecondLevelUpgrade} />
                <Route path="/quizzes/emotional/quiz/firstlevelupgrate" component={FirstLevelUpgradeE}/>
                <Route path="/quizzes/emotional/quiz/secondlevelupgrate" component={SecondLevelUpgradeE}/>
                <Route path="/quizzes/emotional/quiz/thirdlevelupgrate" component={ThirdLevelUpgrade}/>
                <Route path="/quizzes/emotional/quiz/fourthlevelupgrate" component={FourthLevelUpgrade}/>
                <Route path="/quizzes/emotional/quiz/fifthlevelupgrate" component={FiFthLevelUpgrade}/>
                <Route path="/quizzes/emotional/quiz/sixthlevelupgrate" component={SixthLevelUpgrade}/>
                <Route path="/evolution" exact component={Evolution} />
                <Route path="/evolution/breathing" exact component={Breathing} />
                <Route path="/evolution/relaxation" component={Norbu} />
                <Route path="/evolution/sudoko" component={Game} />
                <Route path="/products" exact component={ClosedShop} />
                <Route path="/products/product" component={Product} />
                <Route path="/products/product-list" component={ProductList} />
                <Route path="/products/cart" component={Cart} />
                <Route path="/appointments" exact component={Appointments} />
                <Route path="/appointments/reserve" component={ReserveAppointment} />
                <Route path="/appointments/OnlineApoointment" exact component={OnlineAppointment} />
                <Route path="/appointments/results" exact component={AppointmentResults} />
                <Route path="/appointments/OnlineApoointment/chat" component={OnlineChat} />
                <Route path="/admin/health-files" component={HealthFiles} />
                <Route path="/admin/analyzes" exact component={Analyzes} />
                <Route path="/admin/analyzes/eds" exact component={AdminAnalyzeEDS} />
                <Route path="/admin/analyzes/health" exact component={AdminAnalyzeHealth} />
                <Route path="/admin/specilists-panel" exact component={SpecilistsPanel} />
                <Route path="/admin/management-panel" exact component={ManagementPanel} />
                <Route path="/admin/quiz-subjects" exact component={QuizSubjects} />
                <Route path="/admin/search-files" exact component={SearchFiles} />
                <Route path="/admin/broadcast-messages" exact component={AdminBroadcastMessages} />
                <Route path="/admin/reservation" exact >
                  <Reservation highlight={highlight} />
                </Route>
                <Route path="/admin/support-messages" exact component={SupportMessages} />
                <Route path="/admin/user-info/user" exact component={AdminUserDetails} />
                <Route path="/admin/search-files" exact component={SearchFiles} />
                <Route path="/admin/file-panel" exact component={FilePanel} />
                <Route path="/admin/online-support" exact component={AdminChat} />
                <Route path="/admin/chat" exact component={AdminChatPage} />
                <Route path="/admin/panel-selection" exact component={PanelSelection} />
                <Route path="/admin/paths" exact component={Paths} />
                <Route path="/admin/quiz-result" component={QuizResult} />
                <Route path="/admin/user-info" component={SearchUserInfo} />
                <Route path="/admin/user-info" component={SearchUserInfo} />
                <Route path="/admin/orders" component={AdminOrders} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/activate" component={ActivateProfile} />
              </Switch>
            </div>
            <Route path="(/profile|/profile/quizzes|/quizzes/dimensio|/quizzes/dimension/quiz|/evolution|/evolution/breathing|/evolution/relaxation|/products|/products/product|/appointments|/appointments/reserve|/appointments|/quizzes)" component={() => <BootomNav />} />
          </div>
        </StylesProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
