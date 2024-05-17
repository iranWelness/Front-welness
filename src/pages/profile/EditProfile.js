import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Grid,
    ButtonBase,
    TextField,
    Box,
    Snackbar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import profileImage from "../../assets/images/user.png";
import back from "../../assets/images/Right Arrow 2.png";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { showNav } from '../../actions';
import MuiAlert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';
// import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali';

const useStyles = makeStyles({
    profilePic: {
        boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
        borderRadius: "50%",
        width: 85,
        height: 85,
        overflow: "hidden",
        border: "3px solid #cfd6dc",
        "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: "90%",
        },
    },
    topBar: {
        padding: "20px 16px",
        left: 18
    },
    uploadButton: {
        fontSize: 16,
        borderBottom: "1px solid #485c93",
        color: "#485c93",
        marginLeft: 15,
    },
    submitButton: {
        width: 289,
        height: 57,
        margin: 15,
        borderRadius: 15,
        background: "linear-gradient(126deg, rgba(73,94,149,1) 0%, rgba(87,108,164,1) 100%)",
        fontSize: "1.1em",
        boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
        fontWeight: "bold",
        color: "#fff"
    },
    upperSection: {
        background: "#c9e3fc"
    },
    labelRoot: {
        fontWeight: "bold",
        fontSize: "1.2em",
        color: "#485c93",
        margin: 10,
        zIndex: 2,
        textShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px  #ffffffd1",
    },
    labelFocused: {
        fontWeight: "bold",
    },
    input: {
        borderRadius: 15,
        background: "#c4dffaad",
        border: "1px solid #bbd7f2",
        color: "#2f4167",
        "& input": {
            padding: 10,
            height: 27,
        }
    },
    secure: {
        color: "#ef5661",
        fontWeight: "bold",
        fontSize: "1em",
        textAlign: "center"
    },
    calender: {
        width: "100%",
        background: "#c4dffaad",
        color: "#2f4167",
        height: 60,
        borderBottom: "1px solid back",
        borderLeft: 0,
        borderRight: 0,
        borderTop: 0,
    },
    selectRoot: {
        borderRadius: 15,
        overflow: "hidden"
    },
    formControl: {
        width: "30%",
    },
    menuRoot: {
        backgroundColor: "#c9e3fc",
        color: "#000000a1",
        borderRadius: 30,
        boxShadow: "0px 0px 20px 0px rgb(0 0 0 / 20%)",
        "& .MuiList-padding": {
            padding: 0
        }
    }
});

const days = () => {
    let array = [];
    for (let i = 1; i <= 31; i++) {
        array.push(<MenuItem value={i}>{i}</MenuItem>)
    }
    return array
}
const months = () => {
    let array = [
        <MenuItem value={1}>فروردین</MenuItem>,
        <MenuItem value={2}>اردیبهشت</MenuItem>,
        <MenuItem value={3}>خرداد</MenuItem>,
        <MenuItem value={4}>تیر</MenuItem>,
        <MenuItem value={5}>مرداد</MenuItem>,
        <MenuItem value={6}>شهریور</MenuItem>,
        <MenuItem value={7}>مهر</MenuItem>,
        <MenuItem value={8}>آبان</MenuItem>,
        <MenuItem value={9}>آذر</MenuItem>,
        <MenuItem value={10}>دی</MenuItem>,
        <MenuItem value={11}>بهمن</MenuItem>,
        <MenuItem value={12}>اسفند</MenuItem>,
    ];

    return array
}
const years = () => {
    let array = [];
    for (let i = 1310; i <= 1400; i++) {
        array.push(<MenuItem value={i}>{i}</MenuItem>)
    }
    return array
}

const EditProfile = () => {
    const classes = useStyles();
    const [fname, setFname] = useState();
    const [lname, setlname] = useState();
    const [phone, setPhone] = useState();
    const [image, setImage] = useState();
    const [birthDay, setbirthDay] = useState("");
    const [birthMonth, setbirthMonth] = useState("");
    const [birthYear, setbirthYear] = useState("");
    const [healthBackground, setHealthBackground] = useState("");
    const [selectedImage, setSelectedImage] = useState();
    const [jobTitle, setJobTitle] = useState();
    const [address, setAddress] = useState();
    const [openSnack, setOpenSnack] = React.useState(false);
    const [snackType, setSnackType] = React.useState("");
    const [snackMessage, setSnackMessage] = React.useState("");
    const fileInputRef = React.useRef(null);

    const dispatch = useDispatch();
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };
    useEffect(() => {
        dispatch(showNav())
        const config = {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
            },
        };
        axios.get("https://tame-rose-clownfish-ring.cyclic.app/api/v1/users/getMyProfile", config)
            .then(res => {
                console.log(res)
                setFname(res.data.data.firstname)
                setlname(res.data.data.lastname)
                setPhone(res.data.data.phone)
                setJobTitle(res.data.data.jobTitle)
                setbirthDay(moment(new Date(res.data.data.birthdate)).format('jD'))
                setbirthMonth(moment(new Date(res.data.data.birthdate)).format('jM'))
                setbirthYear(moment(new Date(res.data.data.birthdate)).format('jYYYY'))
                setHealthBackground(res.data.data.healthBackground)
                setAddress(res.data.data.address)
                if (res.data.data.image || res.data.data.image !== undefined) {
                    setImage(`${res.data.data.image}`)
                }
            })
        // .catch(err => {
        //     if (err.response.status === 401) {
        //         localStorage.removeItem('jwt')
        //     }
        // })

    }, [])
    const update = () => {
        const config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
            },
        };
        // console.log(selectedImage)
        let formData = new FormData();
        if (fname) {
            formData.append('firstname', fname);
        }
        if (lname) {
            formData.append('lastname', lname);
        }
        if (jobTitle) {
            formData.append('jobTitle', jobTitle);
        }
        if (address) {
            formData.append('address', address);
        }
        if (birthDay && birthMonth && birthYear) {
            formData.append('birthdate', new Date(moment(`${birthYear} ${birthMonth} ${birthDay}`, 'jYYYY jM jD')));
        }
        if (healthBackground) {
            formData.append('healthBackground', healthBackground);
        }
        if (selectedImage) {
            formData.append('image', selectedImage);
        }


        console.log(formData)

        axios.put(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/users/updateMyProfile`, formData, config)
            .then(res => {
                console.log(res)
                setSnackType("success")
                setSnackMessage("تغییر با موفقیت انجام شد")
                setOpenSnack(true)
            })
            .catch(err => {
                console.log(err)
                setSnackType("error")
                setSnackMessage("خطا در سرور")
                setOpenSnack(true)
                if (err.response.status === 401) {
                    localStorage.removeItem('jwt')
                }
            })
    };
    return (
        <Grid container>

            <Grid container item className={classes.upperSection}>
                <Grid item className={classes.topBar}>
                    <ButtonBase component={Link} to={'/profile'} >
                        <img style={{ width: 28, height: 21 }} src={back} alt="بازگشت" />
                    </ButtonBase>
                </Grid>
                <form onSubmit={e => e.preventDefault()}>
                    <Grid container style={{ padding: "0 16px" }}>
                        <Grid container item alignItems={'center'} style={{ marginBottom: 14 }}>
                            <Box className={classes.profilePic} >
                                {(image && image !== undefined) ? <img src={image} alt={"نصویر پروفایل"} /> : <img src={profileImage} alt={"نصویر پروفایل"} />}
                            </Box>
                            <ButtonBase onClick={() => fileInputRef.current.click()} className={classes.uploadButton}>ویرایش تصویر پروفایل</ButtonBase>
                            {(selectedImage) ? <CheckIcon /> : ""}
                            <input
                                type="file"
                                ref={fileInputRef}
                                name={image}
                                accept="image/*"
                                multiple={false}
                                onChange={(e) => setSelectedImage(e.target.files[0])}
                                style={{ display: 'none' }} />

                        </Grid>
                    </Grid>
                    <Grid container item style={{ padding: "0px 16px" }}>
                        <Grid item style={{ width: "100%", margin: "10px 10px" }}>
                            <TextField
                                key="Firstname"
                                onChange={e => setFname(e.target.value)}
                                value={fname}
                                style={{ width: "100%" }}
                                id="name"
                                placeholder="نام"
                                name="firstname"
                                InputProps={{ className: classes.input, disableUnderline: true }}
                                InputLabelProps={{
                                    shrink: (fname) ? true : false,
                                    classes: {
                                        root: classes.labelRoot,
                                        focused: classes.labelFocused
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item style={{ width: "100%", margin: "10px 10px" }}>
                            <TextField
                                key="Lastname"
                                onChange={e => setlname(e.target.value)}
                                value={lname}
                                style={{ width: "100%" }}
                                id="name"
                                name="lastname"
                                placeholder="نام خانوادگی"
                                InputProps={{ className: classes.input, disableUnderline: true }}
                                // inputProps={{ disableUnderline: true, }}
                                InputLabelProps={{
                                    shrink: (lname) ? true : false,
                                    classes: {
                                        root: classes.labelRoot,
                                        focused: classes.labelFocused
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item style={{ width: "100%", margin: "10px 10px" }}>
                            <TextField
                                key="Phone number"
                                onChange={e => setPhone(e.target.value)}
                                value={phone}
                                style={{ width: "100%" }}
                                id="name"
                                placeholder=" شماره همراه"
                                InputProps={{ className: classes.input, disableUnderline: true }}
                                InputLabelProps={{
                                    shrink: (phone) ? true : false,
                                    classes: {
                                        root: classes.labelRoot,
                                        focused: classes.labelFocused
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item style={{ width: "100%", margin: "10px 10px" }}>
                            <TextField
                                key="Job Title"
                                onChange={e => setJobTitle(e.target.value)}
                                value={jobTitle}
                                style={{ width: "100%" }}
                                id="name"
                                name="jobTitle"
                                placeholder="شغل"
                                InputProps={{ className: classes.input, disableUnderline: true }}
                                InputLabelProps={{
                                    shrink: (jobTitle) ? true : false,

                                    classes: {
                                        root: classes.labelRoot,
                                        focused: classes.labelFocused
                                    }
                                }}
                            />
                        </Grid>
                        {/* <Grid item style={{ width: "100%", margin: "10px 10px" }}>
                            <TextField
                                key="healthBackground"
                                onChange={e => setHealthBackground(e.target.value)}
                                value={healthBackground}
                                style={{ width: "100%" }}
                                id="healthBackground"
                                name="healthBackground"
                                label="سابقه بیماری"
                                inputProps={{ className: classes.input }}
                                InputLabelProps={{
                                    shrink: (healthBackground) ? true : false,
                                    classes: {
                                        root: classes.labelRoot,
                                        focused: classes.labelFocused
                                    }
                                }}
                            />
                        </Grid> */}
                        <Grid item style={{ width: "100%", margin: "10px 10px" }}>
                            {/* <DatePicker
                                value={birthdate}
                                className={classes.calender}
                                onChange={value => setbirthdate(value)}
                                max={moment()}
                                timePicker={false}
                                showTodayButton={false}
                                isGregorian={false}
                                placeholder="تاریخ تولد"
                            /> */}
                            <FormControl variant="filled"
                                classes={{
                                    root: classes.selectRoot,
                                }} className={classes.formControl}>
                                <InputLabel id="demo-simple-select-filled-label">روز</InputLabel>
                                <Select
                                    disableUnderline
                                    style={{ backgroundColor: "#c4dffaad" }}
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    MenuProps={{
                                        classes: {
                                            paper: classes.menuRoot
                                        }
                                    }}
                                    value={birthDay}
                                    onChange={e => { setbirthDay(e.target.value) }}
                                >
                                    <MenuItem value="">
                                        <em>هیچ‌کدام</em>
                                    </MenuItem>
                                    {days()}
                                </Select>
                            </FormControl>

                            <FormControl variant="filled"
                                classes={{
                                    root: classes.selectRoot,
                                }} className={classes.formControl}>
                                <InputLabel id="demo-simple-select-filled-label">ماه</InputLabel>
                                <Select
                                    disableUnderline
                                    style={{ backgroundColor: "#c4dffaad" }}
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    MenuProps={{
                                        classes: {
                                            paper: classes.menuRoot
                                        }
                                    }}
                                    value={birthMonth}
                                    onChange={e => { setbirthMonth(e.target.value) }}
                                >
                                    <MenuItem value="">
                                        <em>هیچ‌کدام</em>
                                    </MenuItem>
                                    {months()}
                                </Select>
                            </FormControl>

                            <FormControl variant="filled"
                                classes={{
                                    root: classes.selectRoot,
                                }} className={classes.formControl}>
                                <InputLabel id="demo-simple-select-filled-label">سال</InputLabel>
                                <Select
                                    disableUnderline
                                    style={{ backgroundColor: "#c4dffaad" }}
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    MenuProps={{
                                        classes: {
                                            paper: classes.menuRoot
                                        }
                                    }}
                                    value={birthYear}
                                    onChange={e => { setbirthYear(e.target.value) }}
                                >
                                    <MenuItem value="">
                                        <em>هیچ‌کدام</em>
                                    </MenuItem>
                                    {years()}
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item style={{ width: "100%", margin: "10px 10px" }}>
                            <TextField
                                key="Address"
                                onChange={e => setAddress(e.target.value)}
                                value={address}
                                style={{ width: "100%" }}
                                id="name"
                                name="address"
                                placeholder="آدرس"
                                InputProps={{ className: classes.input, disableUnderline: true }}
                                InputLabelProps={{
                                    shrink: (address) ? true : false,
                                    classes: {
                                        root: classes.labelRoot,
                                        focused: classes.labelFocused
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item style={{ width: "100%", margin: "5px 10px", display: "flex", justifyContent: "center" }}>
                            <ButtonBase onClick={update} className={classes.submitButton}>ثبت تغییرات</ButtonBase>
                        </Grid>
                        <Grid item style={{ width: "100%", marginBottom: 15 }}>
                            <p className={classes.secure}>اطلاعات شما به صورت محرمانه ذخیره خواهد شد.</p>
                        </Grid>
                    </Grid>
                </form>
            </Grid>

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={snackType}>
                    {snackMessage}
                </Alert>
            </Snackbar>
        </Grid >
    )
}
export default EditProfile;