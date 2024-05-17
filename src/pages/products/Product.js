import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Divider, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FontSize from '../../components/FontSize';
import WhiteBack from '../../assets/images/whiteBack.png'
import axios from 'axios';
import { useLocation, useHistory } from "react-router-dom";

const useStyle = makeStyles({
    nav: {
        position: "fixed",
        zIndex: 2,
        "& img": {
            margin: "24px 28px",
            width: 30,
            height: "auto"
        }
    },
    header: {
        height: 270,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundSize: "auto 100% !important",
        opacity: 0.8,
    },
    body: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 600,
        margin: "0 auto 72px",
        width: "92vw",
    },
    row: {
        display: "flex",
        margin: "15px 5px",

    },
    productFeature: {
        color: "#50659c",
        fontWeight: "Bold",
        fontSize: FontSize(1),
    },
    productKey: {
        color: "#7887a2",
        fontSize: FontSize(1),
        width: "31%",
    },
    productValue: {
        color: "#7887a2",
        fontWeight: "Bold",
        fontSize: FontSize(1),
        whiteSpace: "pre-wrap",
        width: "69%",
        paddingBottom: 22,
        borderBottom: "1px solid #7887a252"
    },
    price: {
        fontSize: FontSize(1.2),
        color: "#50659c",
        fontWeight: "Bold",
        marginLeft: 10
    },
    purchaseButton: {
        fontSize: FontSize(1.04),
        color: "#fff",
        width: 189,
        height: 57,
        margin: 10,
        maxWidth: "80%",
        boxShadow: "7px 6px 13px #a6a6a6b8, 7px - 8px 20px 0px #ffffffd1",
        borderRadius: 10,
        backgroundColor: "#08afe4",
    },
});



function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Product = () => {
    let query = useQuery();
    const classes = useStyle();
    const history = useHistory();
    const token = `bearer ${localStorage.getItem('jwt')}`
    const [item, setItem] = useState([]);
    const [rich, setRich] = useState([]);
    const addToCart = () => {
        const body = {
            "product": query.get("pid"),
            qty: 1
        };
        axios.post(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/products/cart`, body, { headers: { 'Authorization': token } },)
            .then(res => {
                history.push("/products/cart");
            }).catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/products/${query.get("pid")}`,
            { headers: { 'Authorization': token } },
        )
            .then(res => {
                console.log(res)
                setItem(res.data.data)
                setRich(JSON.parse(res.data.data.richDescription))
            })
    }, [])
    return (
        <>
            <Box className={classes.nav}><Link to="/products"><img src={WhiteBack} alt="" /></Link></Box>
            <Box className={classes.header} style={{
                background: `url(${item.image})  center no-repeat`,
            }}>
                <Typography style={{
                    textShadow: "0 0 8px #0000009c",
                    color: "#fff",
                    fontSize: "2.2em",
                    background: "linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(0 0 0 / 45%) 100%)", paddingBottom: 20, paddingRight: 30
                }} variant="h4"> {item.name} </Typography>
            </Box>
            <Box className={classes.body}>
                <Box className={classes.row}>
                    <Typography className={classes.productFeature} type="body1">ویژگی های محصول</Typography>
                </Box>
                {Object.entries(rich).map(([key, value]) => (
                    <Box className={classes.row}>
                        <Typography className={classes.productKey} type="body1">{key}</Typography>
                        <Typography className={classes.productValue} type="body1">{value}</Typography>
                    </Box>
                ))}

                <Box className={classes.row} style={{ justifyContent: "space-between", alignItems: "Center", flexDirection: "row-reverse" }}>
                    <Typography className={classes.price} type="body1">{item.price} تومان</Typography>
                    <ButtonBase onClick={addToCart} className={classes.purchaseButton}>ثبت سفارش</ButtonBase>
                </Box>
            </Box>
        </>
    )
};

export default Product;