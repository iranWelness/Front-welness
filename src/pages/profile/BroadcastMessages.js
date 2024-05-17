import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, ButtonBase, Backdrop, Modal, Fade, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Header from '../../components/Header';
import user from '../../assets/images/DuoUser.png';
import navigation from '../../assets/images/Navigation.png';
import axios from 'axios';

const useStyles = makeStyles({
    topContainer: {
        height: 160,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "36px 53px 0 0",
    },
    topDesc: {
        display: 'flex',
        alignItems: "center",
    },
    imageWrapper: {
        padding: 10,
        backgroundColor: "#f1f7fc",
        borderRadius: "50%",
        height: 60,
        width: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "5px solid #ced5db",
        boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
    },
    userImage: {
        height: 50,
    },
    descDits: {
        margin: 10,
        color: "#485b93"
    },
    warning: {
        textAlign: 'center',
        color: "#f16e50",
        backgroundColor: "#e1ced2",
        padding: "20px 11px",
        fontSize: "1em",
        lineHeight: 1.2
    },
    formControl: {
        width: 280,
    },
    selectRoot: {
        borderRadius: 15,
        overflow: "hidden"
    },
    textWrapper: {
        padding: 10,
        backgroundColor: "rgba(196, 223, 250, 0.68)",
        position: "absolute",
        bottom: 61,
        width: "94%",

    },
    buttonSend: {
        padding: 10,
        backgroundColor: "#08afe4",
        borderRadius: 15,
    },
    sendImage: {
        width: 32,
        height: 32,
    },
    textInput: {
        width: "calc(100% - 80px)",
        margin: 10,
        height: 45,
        border: "none",
        borderRadius: 15,
        padding: 4,
        backgroundColor: "#d4ebff"
    },
    paper: {
        margin: "60px auto",
        width: 450,
        padding: 35,
        backgroundColor: "#dde7f3",
        borderRadius: 15,
        color: "#8391ab",
        display: "grid",
        maxWidth: "70%",
        justifyContent: "center",
    },
    modalButton: {
        color: "#ee5760",
        margin: "10px auto 0",
        padding: 5,
        width: 180,
        borderRadius: 10,
    },
    backDrop: {
        backdropFilter: "blur(2px)"
    },
    modalCenter: {
        margin: "15px 0",
        color: "#1cb0de",
        fontWeight: "bold"
    },
    modalTop: {
        textAlign: "center",
        marginBottom: 5,
    },
    mainContainer: {
        padding: "12px 28px",
        marginBottom: 100,
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

const BroadcastMessages = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [select, setSelect] = React.useState(0);
    const [text, setText] = React.useState("");
    const [disable, setDisable] = React.useState(false);
    const token = `bearer ${localStorage.getItem('jwt')}`

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const send = e => {
        setDisable(true);
        const body = {
            "type": select,
            "message": text
        };
        axios.post(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/support-messages`, body, { headers: { 'Authorization': token } },)
            .then(res => {
                handleOpen();
                setDisable(false);
                setText("");
            }).catch(err => {
                console.log(err)
                setDisable(false);
            })
    }
    return (
        <Box>
            <Box className={classes.topContainer}>
                <Header component="link" to="/profile" setting={true} />
                <Box className={classes.topDesc}>
                    <Box className={classes.imageWrapper}>
                        <img className={classes.userImage} src={user} alt="کاربر" />
                    </Box>
                    <Box className={classes.descDits}>
                        <h4>پشتیبانی ایران ولنس</h4>
                        <p>پاسخدهی سریع و آسان</p>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.warning}>
                <p>لطفا سوالات مربوط به نتایج تست و ارزیابی های خود را از طریق پشتیبانی به ما گزارش نکنید، مشکلات تست و ارزیابی در فرم زیر رسیدگی نخواهد شد.</p>
            </Box>
            <Box className={classes.mainContainer}>
                <h4>گزارش خطا</h4>
                <p style={{ margin: "9px 0" }}>لطفا یکی از موارد زیر را انتخاب کنید</p>
                <FormControl variant="filled"
                    classes={{
                        root: classes.selectRoot,
                    }} className={classes.formControl}>
                    <InputLabel id="demo-simple-select-filled-label">انتخاب گزینه</InputLabel>
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
                        value={select}
                        onChange={e => { setSelect(e.target.value) }}
                    >
                        <MenuItem value="">
                            <em>هیچ‌کدام</em>
                        </MenuItem>
                        <MenuItem value={1}>مشاهده اشکال در ارزیابی</MenuItem>
                        <MenuItem value={2}>مشاهده اشکال در نوبت‌دهی</MenuItem>
                        <MenuItem value={3}>مغایرت در اطلاعات</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box className={classes.textWrapper}>
                <ButtonBase onClick={e => { send(e) }} disabled={disable} className={classes.buttonSend}>
                    <img className={classes.sendImage} src={navigation} alt="" />
                </ButtonBase>
                <input value={text} onChange={e => setText(e.target.value)} type="text" name="message" className={classes.textInput} />
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    classes: {
                        root: classes.backDrop
                    }
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <p className={classes.modalTop}>ارسال پیام به پشتیبانی</p>
                        <Divider variant="middle" />
                        <p className={classes.modalCenter} id="transition-modal-description">ارسال پیام شما با موفقیت انجام شد</p>
                        <Divider variant="middle" />
                        <ButtonBase className={classes.modalButton} onClick={handleClose}>بازگشت</ButtonBase>
                    </div>
                </Fade>
            </Modal>
        </Box>
    )
}

export default BroadcastMessages
