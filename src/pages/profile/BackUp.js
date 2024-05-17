import React, { useState, useEffect } from 'react';
import { Box, ButtonBase, Divider, Backdrop, Modal, Fade, } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Header from '../../components/Header';
import megaphone from '../../assets/images/Megaphone.png'
import axios from 'axios';
import persianDate from 'persian-date';

const useStyles = makeStyles({
    topConrainer: {
        height: 180,
        backgroundColor: "#c9e3fc",
        display: "flex",
        alignItems: 'center',
        justifyContent: "center",
    },
    containerText: {
        color: "#485c91",
        fontWeight: "bold",
    },
    messagebuttons: {
        display: "flex",
        justifyContent: "center",
        padding: 5,
        margin: "15px 0"
    },
    switchButton: {
        margin: "0 5px",
        width: 95,
        height: 45,
        borderRadius: 15,
        backgroundColor: "#c4dffaad",
        color: "#2d4164",
    },
    messagesContainer: {
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        margin: 15,
        maxWidth: "100%",
    },
    messageContainer: {
        display: "flex",
        width: 400,
        maxWidth: "100%",
        justifyContent: "space-evenly",
        marginBottom: 15,
    },
    megaphone: {
        width: 30,
        height: 30,
        padding: 10,
    },
    message: {
        width: "83%",
        textAlign: "left",
        backgroundColor: "#c9e3fc",
        padding: 12,
        borderRadius: 15,
    },
    messageTitle: {
        color: "#465b94",
        fontWeight: "bold",
    },
    messageBottom: {
        display: "flex",
        justifyContent: "space-between",
    },
    messageContext: {
        color: "#7787a1",
        height: 58,
        overflow: "hidden",
    },
    messageDate: {
        fontSize: ".9em",
        color: "#98a3b7"
    },
    messageShow: {
        color: "#07b1e5",
    },
    paper: {
        margin: "calc(100vh - 73vh) auto",
        width: 450,
        padding: "8px 24px",
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
        fontWeight: "bold",
        textAlign: "center",
    },
    modalTop: {
        textAlign: "center",
        margin: 32
    },
});

const BackUp = () => {
    const classes = useStyles();
    const [activeButton, setActiveButton] = useState(0);
    const [messages, setMessages] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");
    const [currentTitle, setCurrentTitle] = useState(false);


    const handleOpen = (title, message, id) => {
        setCurrentMessage(message)
        setCurrentTitle(title)
        setOpen(true);
        axios.put(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/broadcast-messages/read-by/${id}`, {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            },
        }).then(res => {
            console.log(res)
        })

    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
            },
        };
        let url = "";
        if (activeButton === 0) {
            url = `https://tame-rose-clownfish-ring.cyclic.app/api/v1/broadcast-messages/my-messages`
        } else if (activeButton === 1) {
            url = 'https://tame-rose-clownfish-ring.cyclic.app/api/v1/broadcast-messages/read'
        } else if (activeButton === 2) {
            url = 'https://tame-rose-clownfish-ring.cyclic.app/api/v1/broadcast-messages/unread'
        }
        axios.get(url, config)
            .then(res => {
                setMessages(res.data.data)
                console.log(messages)
            })
    }, [activeButton])
    return (
        <Box>
            <Box className={classes.topConrainer}>
                <Header component="link" to="/profile" setting={true} />
                <h3 className={classes.containerText}>پبام ها</h3>
            </Box>
            <Box className={classes.mainContainer}>
                <Box className={classes.messagebuttons}>
                    <ButtonBase
                        onClick={() => setActiveButton(0)}
                        style={(activeButton === 0) ? { backgroundColor: "#67c8f3", color: "#dce9f2" } : {}}
                        className={classes.switchButton}>
                        همه
                    </ButtonBase>
                    <ButtonBase
                        onClick={() => setActiveButton(1)}
                        style={(activeButton === 1) ? { backgroundColor: "#67c8f3", color: "#dce9f2" } : {}}
                        className={classes.switchButton}>
                        خوانده‌شده
                    </ButtonBase>
                    <ButtonBase
                        onClick={() => setActiveButton(2)}
                        style={(activeButton === 2) ? { backgroundColor: "#67c8f3", color: "#dce9f2" } : {}}
                        className={classes.switchButton}>
                        خوانده‌نشده
                    </ButtonBase>
                </Box>
                <Divider variant="middle" />
                <Box className={classes.messagesContainer}>
                    {messages.map((item, index) => (
                        <Box className={classes.messageContainer} key={index}>
                            <img className={classes.megaphone} src={megaphone} alt="" />
                            <Box className={classes.message}>
                                <h4 className={classes.messageTitle}>{item.title}</h4>
                                <p className={classes.messageContext}>{item.message}</p>
                                <Box className={classes.messageBottom}>
                                    <Box className={classes.messageDate}>{new persianDate(item.created_at).toLocale('fa').format('D MMMM YYYY')}</Box>
                                    <ButtonBase onClick={() => handleOpen(item.title, item.message, item._id)} className={classes.messageShow}>مشاهده</ButtonBase>
                                </Box>
                            </Box>
                        </Box>
                    ))}


                </Box>
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
                        <p className={classes.modalCenter}>{currentTitle}</p>
                        <Divider variant="middle" />
                        <p className={classes.modalTop} id="transition-modal-description">{currentMessage}</p>
                        <Divider variant="middle" />
                        <ButtonBase className={classes.modalButton} onClick={handleClose}>بازگشت</ButtonBase>
                    </div>
                </Fade>
            </Modal>
        </Box>
    )
}

export default BackUp
