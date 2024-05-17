import React, {useState, useEffect} from 'react';
import {Box, ButtonBase} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import axios from 'axios';
import moment from 'moment-jalaali';
import {useLocation} from "react-router-dom";
// import io from 'socket.io-client';
import send from "../../assets/images/send.png";
import AdminNav from '../../components/AdminNav'


// const socket = io.connect('https://tame-rose-clownfish-ring.cyclic.app');

const useQuery = () => {
    const {search} = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const useStyles = makeStyles({
    container: {
        width: 800,
        maxWidth: "100%",
        margin: "100px auto 0",
        borderRadius: 30,
        backgroundColor: "#dde7f3",
        boxShadow: "-7px 6px 13px #a6a6a6b8, -7px -8px 20px 0px #ffffffd1",
    },
    header: {
        backgroundColor: "#d3e0f1",
        boxSizing: "border-box",
        padding: "10px 30px",
        borderRadius: "30px 30px 0 0"
    },
    headerTitle: {
        color: "#08afe3"
    },
    innerContainer: {
        padding: 30,
        display: "grid"
    },
    botButtons: {
        display: "flex",
        justifyContent: "center",
    },
    return: {
        border: "1px solid #df585f",
        color: "#df585f",
        borderRadius: 11,
        width: 180,
        height: 40,
        marginBottom: 15,
    },
    chatInput: {
        width: "calc(100% - 186px)",
        border: "none",
        borderRadius: 15,
        height: 50,
        margin: "0 50px",
        padding: "0 5px",
        backgroundColor: "#d3e0f1",
        outline: 0,
    },
    sendButton: {
        padding: "11px 7px 9px 12px",
        backgroundColor: "#08afe4",
        borderRadius: 15,
        marginRight: 5
    },
    recieved: {
        width: "maxContent",
        justifySelf: "right",
        "& div:first-child": {
            backgroundColor: "#d7e1ed",
            textAlign: "right",
            borderRadius: 15,
            padding: 5,
        },
        "& div:last-child": {
            fontSize: ".8em"
        }
    },
    sent: {
        width: "maxContent",
        justifySelf: "left",
        "& div:first-child": {
            backgroundColor: "#08afe4",
            textAlign: "left",
            borderRadius: 15,
            padding: 5,
        },
        "& div:last-child": {
            fontSize: ".8em"
        }
    },

});

const AdminChatPage = () => {
    const query = useQuery();
    const classes = useStyles();
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [id, setId] = useState('');

    const handleMessageWrite = e => {
        setMessageInput(e.target.value)
    }

    const sendMessage = () => {
        // socket.emit('chatMessage', { message: messageInput, user: id, sender: localStorage.getItem('userid') });
        // setMessageInput("");
        // const messageListener = message => {
        //     console.log(message);
        //     let type;
        //     if (message.user === localStorage.getItem('userid')) {
        //         type = 'sent'
        //     } else {
        //         type = 'recieved'
        //     }
        //     setMessages(messages => [...messages, { user: { _id: id }, sender: { _id: localStorage.getItem('userid'), }, message: message.message, date: new Date() }])
        // }
        // socket.once('message', messageListener);
        const url = 'https://tame-rose-clownfish-ring.cyclic.app/api/v1/messages/';
        const data = {
            message: messageInput,
            user: id,
            sender: localStorage.getItem('userid')
        };
        const config = {headers: {'Authorization': `bearer ${localStorage.getItem('jwt')}`}};
        axios.post(url, data, config).then(res => {
            setMessages(messages => [...messages, {
                user: {_id: id},
                sender: {_id: localStorage.getItem('userid'),},
                message: data.message,
                date: new Date()
            }])
        }).catch(err => console.log(err))
    };

    useEffect(() => {
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/messages/${query.get('user')}`)
            .then(res => {
                setMessages(res.data.data);
                setName(res.data.data[0].user.firstname + " " + res.data.data[0].user.lastname)
                setId(res.data.data[0].user._id)
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                }
            })
    }, [])

    return (
        <>
            <AdminNav/>
            <Box className={classes.container}>

                <Box className={classes.header}>
                    <h2 className={classes.headerTitle}>{name}</h2>
                </Box>
                <Box className={classes.innerContainer}>
                    {messages.map((message, index) => (
                        <Box className={(message.user._id === message.sender._id) ? classes.recieved : classes.sent}
                             key={index}>
                            <Box className={classes.messageBox}>{message.message}</Box>
                            <Box>{moment(new Date(message.date)).format('jYYYY/jM/jD HH:mm:ss')}</Box>
                        </Box>
                    ))}
                </Box>
                <input
                    className={classes.chatInput}
                    type="text"
                    id="message"
                    name="message"
                    value={messageInput}
                    placeholder="پیام خور را وارد کنید"
                    onChange={handleMessageWrite}
                />
                <ButtonBase className={classes.sendButton} onClick={sendMessage}>
                    <img style={{width: 32}} src={send} alt="ارسال"/>
                </ButtonBase>
                <Box className={classes.botButtons}>
                    <ButtonBase className={classes.return}>بازگشت</ButtonBase>
                </Box>
            </Box>
        </>
    )
}

export default AdminChatPage
