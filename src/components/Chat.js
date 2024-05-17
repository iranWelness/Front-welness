import React, {useState, useEffect} from 'react';
// import io from 'socket.io-client';
import {Box, ButtonBase} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import user from "../assets/images/demoUser.png";
import send from "../assets/images/send.png";
import axios from "axios";
import moment from 'moment-jalaali';


// const socket = io.connect('https://tame-rose-clownfish-ring.cyclic.app');

const useStyles = makeStyles({
    chat: {
        height: "calc(100vh - 420px)",
        overflow: "auto",
    },
    chatContainer: {
        display: "grid",
        alignItems: "flex-start",
        paddingTop: 15,
        boxSizing: "border-box"
    },
    messageBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "5px 15px",
    },
    userImage: {
        height: 50,
        width: 50,
        borderRadius: "50%",
        margin: "0 15px",
        objectFit: "cover",
        boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
    },
    messageContainer: {
        padding: "2px 20px",
        borderRadius: 15,
        minHeight: 35,
        minWidth: 143,
        display: 'flex',
        fontSize: ".9em",
        alignItems: 'center'
    },
    input: {
        position: "fixed",
        bottom: 66,
        width: "calc(100% - 20px)",
        backgroundColor: "#c9e3fc",
        height: 70,
        alignItems: "center",
        display: 'flex',
        justifyContent: 'center',
        padding: "0 10px"
    },
    chatInput: {
        width: "calc(100% - 70px)",
        border: "none",
        borderRadius: 15,
        height: 50,
        margin: "0 5px",
        backgroundColor: "#d4ebff",
        outline: 0,
        padding: "0 10px",
        color: "rgb(119, 134, 163)",
        "&::placeholder": {
            color: "#00000044"
        }
    },
    sendButton: {
        padding: "16px 12px 14px 17px",
        backgroundColor: "#08afe4",
        borderRadius: 15,
        marginRight: 5
    },
    chatName: {
        fontSize: ".7em",
        color: "#7787a1",
    }
});


const Chat = () => {
    const [state, setState] = useState({message: "", name: ""});
    const classes = useStyles();
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/messages/${localStorage.getItem('userid')}`)
            .then(res => {
                console.log(res);
                res.data.data.forEach(element => {
                    let type;
                    if (element.user._id === element.sender._id) {
                        type = 'sent'
                    } else {
                        type = 'recieved'
                    }
                    setMessages(messages => [...messages, {
                        type: type,
                        message: element.message,
                        image: element.sender.image,
                        name: element.sender.firstname + " " + element.sender.lastname,
                        date: element.date
                    }])
                });

            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                }
            })
    }, [])
    const handleMessageWrite = e => {
        setMessageInput(e.target.value)
    }

    const sendMessage = () => {
        // socket.emit('chatMessage', { message: messageInput, user: localStorage.getItem('userid'), sender: localStorage.getItem('userid') });
        // setMessageInput("");
        // const messageListener = message => {
        //     console.log(message);
        //     let type;
        //     if (message.user === localStorage.getItem('userid')) {
        //         type = 'sent'
        //     } else {
        //         type = 'recieved'
        //     }
        //     setMessages(messages => [...messages, { type: type, message: message.message, date: new Date() }])
        // }
        // socket.once('message', messageListener);
        const url = 'https://tame-rose-clownfish-ring.cyclic.app/api/v1/messages/';
        const data = {
            message: messageInput,
            user: localStorage.getItem('userid'),
            sender: localStorage.getItem('userid')
        };
        console.log(data)
        const config = {headers: {'Authorization': `bearer ${localStorage.getItem('jwt')}`}};
        axios.post(url, data, config).then(res => {
            setMessages(messages => [...messages, { type: 'sent', message: data.message, date: new Date() }])
        }).catch(err=> console.log(err))
    };


    return (
        <Box className={classes.chat}>
            <Box className={classes.chatContainer}>
                {messages.map(item => {
                    return (
                        <Box className={classes.messageBox}
                             style={{
                                 alignItems: (item.type === "sent") ? "flex-end" : "flex-start",
                             }}>
                            <Box style={{
                                display: 'flex',
                                flexDirection: (item.type === "sent") ? "row" : "row-reverse",
                            }}>
                                <Box className={classes.messageContainer}
                                     style={{
                                         background: (item.type === "sent") ? "#c9e3fc" : "#08afe4",
                                         color: (item.type === "sent") ? "#7786a3" : "#dbe9f4",
                                     }}
                                >{item.message}</Box>
                                {(item.type === "sent") ? <img className={classes.userImage}
                                                               src={(item.image !== undefined) ? `${item.image}` : user}
                                                               alt="user"/> : <img className={classes.userImage}
                                                                                   src={(item.image) ? `${item.image}` : user}
                                                                                   alt="user"/>}
                            </Box>
                            <p className={classes.chatName} style={{
                                marginRight: (item.type === "sent") ? "0" : 80,
                                marginLeft: (item.type === "recieved") ? "0" : 80,
                            }}>{item.name} {moment(new Date(item.date)).format('jD jMMMM jYYYY HH:SS')}</p>
                        </Box>
                    )
                })}
            </Box>
            <Box className={classes.input}>
                <ButtonBase className={classes.sendButton} onClick={sendMessage}>
                    <img style={{width: 20}} src={send} alt="ارسال"/>
                </ButtonBase>
                <input
                    className={classes.chatInput}
                    type="text"
                    id="message"
                    name="message"
                    value={messageInput}
                    placeholder="پیام خور را وارد کنید"
                    onChange={handleMessageWrite}
                />
            </Box>
        </Box>
    )
}

export default Chat;
