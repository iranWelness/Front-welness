import React, { useEffect, useState } from 'react';
import { Box, ButtonBase, Modal, Divider, Backdrop } from '@material-ui/core';
import axios from 'axios';
import Header from '../../components/Header';
import { makeStyles } from "@material-ui/core/styles";
import Delete from '../../assets/images/adminDelete.png';
import logo from '../../assets/images/logo.svg';
import notifSound from '../../assets/audio/notif.wav';
import { Link } from 'react-router-dom';


const useStyle = makeStyles({
    headerContainer: {
        backgroundColor: "#d4ebff",
        height: "74px",
        position: "fixed",
        width: "100%",
        zIndex: 2,
    },
    cartContainer: {
        padding: "60px 10px",
    },
    productName: {
        fontWeight: "bold"
    },
    cartItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#c2dcf380",
        padding: 10,
        margin: "20px 5px",
        borderRadius: 15,
        height: 60,
    },
    productImage: {
        height: 100,
        width: 100,
        borderRadius: 15,
        objectFit: "cover",

    },
    productDetails: {
        display: "grid",
        marginLeft: 20,
    },
    deleteCartButton: {
        width: 140,
        height: 57,
        borderRadius: 15,
        fontSize: "1.1em",
        border: "2px solid #ef5661",
        fontWeight: "bold",
        color: "#ef5661",
        margin: "15px auto"
    },
    bottomButtons: {
        display: "flex",
    },
    deleteIcon: {
        height: 26,
        width: 20,
        opacity: .6
    },
    bottomContainer: {
        display: "flex",
        justifyContent: "space-between",

    },
    modalButton: {
        color: "#f05660",
        fontWeight: "bold",
        width: "100%",
        padding: 18,
    },
    total: {
        display: "flex",
        justifyContent: "center",
        height: 70,
        alignItems: "center",
        backgroundColor: "#c2dcf3",
        width: "100%",
        fontSize: "1em",
        borderRadius: 15,
        padding: "0 10px",
        margin: "20px 5px",
    },
    purchaseButton: {
        width: 180,
        height: 57,
        borderRadius: 15,
        background: "#08afe4",
        fontSize: "1.1em",
        boxShadow: "-7px 6px 13px #a6a6a6b8, 7px -8px 20px 0px #ffffffd1",
        fontWeight: "bold",
        color: "#fff",
        margin: "15px auto"
    },
    header: {
        width: "100%",
        textAlign: "center",
        margin: "20px auto",
    },
    modalContainer: {
        width: 335,
        maxWidth: "95%",
        margin: "50px auto 0",
        background: "#b5cbe8",
        borderRadius: 15,
        padding: 15,
        boxSizing: "border-box",
        textAlign: "center"
    },
    backdrop: {
        zIndex: 1299,
        color: '#fff',
    },
    backdropRoot: {
        backgroundColor: "#19163a54",
        backdropFilter: "blur(2px)",
    },
});

const token = `bearer ${localStorage.getItem('jwt')}`
const deleteItem = (id) => {
    axios.delete(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/products/cart/${id}`, { headers: { 'Authorization': token } },)
        .then(res => {
            window.location.reload();
        })
}

const sendNotif = (data) => {
    navigator.serviceWorker.register('sw.js');
    if (Notification.permission === 'granted') {
        console.log("we have permission!");
        const notification = new Notification("ایران‌ولنس", {
            body: `یادآوری جهت ${data.name}`,
            icon: `https://tame-rose-clownfish-ring.cyclic.app/${data.image}`,
            image: `https://tame-rose-clownfish-ring.cyclic.app/${data.image}`,
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            console.log(permission)
        })
    }
}

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [modal, setModal] = React.useState(false);
    const classes = useStyle();
    const token = `bearer ${localStorage.getItem('jwt')}`

    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        setModal(false);
    };

    useEffect(() => {
        axios.get('https://tame-rose-clownfish-ring.cyclic.app/api/v1/products/cart', { headers: { 'Authorization': token } },)
            .then(res => {
                console.log(res.data.data)
                setCartItems(res.data.data)
                let totalPrice = 0;
                res.data.data.forEach(item => {
                    totalPrice = totalPrice + item.product.price;
                })
                setTotal(totalPrice)
            })
    }, [])
    return (
        <div>
            <Box className={classes.headerContainer}>
                <Header component="link" to="/products" />
                <h3 className={classes.header}>سبد خرید</h3>
            </Box>
            <Box className={classes.cartContainer}>
                {cartItems.map(item => (
                    <Box className={classes.cartItem}>
                        {/* <img className={classes.productImage} src={`https://tame-rose-clownfish-ring.cyclic.app/${item.product.image}`} alt="" /> */}
                        <Box className={classes.productDetails}>
                            <p className={classes.productName}>{item.product.name}</p>
                            <p className={classes.productDetail}>{item.product.price} تومان </p>
                        </Box>
                        <ButtonBase className={classes.productDetail} onClick={() => {
                            if ("serviceWorker" in navigator) {
                                sendNotif(item.product.name).catch(err => console.error(err));
                            } else {
                                console.log("no service worker")
                            }
                        }}>پیش‌نمایش یادآور</ButtonBase>
                        <ButtonBase onClick={() => deleteItem(item._id)} className={classes.productDetail} style={{ marginLeft: 10 }}>
                            <img className={classes.deleteIcon} src={Delete} alt="" />
                        </ButtonBase>
                    </Box>
                ))}
                <Divider variant="middle" style={{ marginTop: 10 }} />
                <Box className={classes.bottomContainer}>
                    <Box className={classes.total}>
                        <h2>قیمت:</h2>
                        <h2>{total}</h2>
                    </Box>

                </Box>
                <Box className={classes.bottomButtons}>
                    <ButtonBase className={classes.purchaseButton} onClick={handleOpen}>نهایی کردن خرید</ButtonBase>
                    <ButtonBase className={classes.deleteCartButton} disabled={true}>حذف سبد خرید</ButtonBase>
                </Box>
            </Box>
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
                        <p style={{ fontWeight: "Bold", fontSize: "1.1em" }}>سفارش شما با موفقیت ثبت شد</p>
                        <ButtonBase className={classes.modalButton} component={Link} to={"/products"}>بازگشت</ButtonBase>
                    </Box>
                </Modal>

            </Backdrop>
        </div>
    )
}

export default Cart
