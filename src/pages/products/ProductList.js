import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@material-ui/core';
import Header from '../../components/Header';
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios';
import { useLocation, Link } from "react-router-dom";
import desertBanner from '../../assets/images/desserts.jpg';

const useStyle = makeStyles({
    listContainer: {
        display: "flex",
        padding: "37px 30px",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    itemContainer: {
        display: "flex",
        flexDirection: "column",
        width: 310,
        borderRadius: 15,
        color: "#696969",
        textDecoration: "none",
        marginBottom: 25,
        height: 114,
        overflow: "hidden",
        backgroundPosition: "center",
        backgroundSize: "cover",
    },
    productImage: {
        height: 150,
        objectFit: "cover",
        width: "100%",
        objectPosition: "center",
        borderRadius: "15px 15px 0 0 ",
        opacity: .8,
    },
    productInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        color: "#c5d0de",
        justifyContent: "space-between",
        marginLeft: 10,
        "& p": {
            margin: 10
        }
    },
    headerContainer: {
        height: "215px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#c9e3fc",
        backgroundPosition: "center",
        backgroundSize: "cover"
    },
    gradientLayer: {
        width: "100%",
        height: "100%",
        background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.6786064767703957) 100%)",
    },
    showMore: {
        border: "2px solid #9f7b1d",
        width: 70,
        paddingLeft: 16,
        borderRadius: 5,
    },
    headerText: {
        fontSize: "1.5em",
        color: "#2d4166"
    },
    headerimage: {
        width: "100%",
        position: "absolute",
        top: 0,
    },

});

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ProductList = () => {
    let query = useQuery();
    const classes = useStyle();
    const token = `bearer ${localStorage.getItem('jwt')}`
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [background, setbackground] = useState('');
    useEffect(() => {
        let params = "";
        if (query.get("category")) {
            params = "category=" + query.get("category")
            axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/categories/${query.get("category")}`,
                { headers: { 'Authorization': token } })
                .then(res => {
                    setCategory(res.data.data.name)
                    if (res.data.data.name === "دسرهای ارگانیک") {
                        setbackground(desertBanner)
                        console.log(desertBanner)
                    }
                })
        } else if (query.get("isFeatured")) {
            params = "isFeatured=true"
            setCategory('محصولات پیشنهاد شده')
        }

        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/products/search?${params}`,
            { headers: { 'Authorization': token } })
            .then(res => {
                console.log(res.data.data)
                setProducts(res.data.data)
            })
    }, [])
    return (
        <Box>
            <Box className={classes.headerContainer} style={{ backgroundImage: `url(${background})` }}>
                <Header component="link" to="/products" />
                
                {(!category === "دسرهای ارگانیک") ?<p className={classes.headerText}>{category}</p> : ""}
            </Box>
            <Box className={classes.listContainer}>
                {products.map((item, index, array) => (
                    <Box
                        style={{ backgroundImage: `url(${item.image})` }}
                        className={classes.itemContainer}
                        component={Link}
                        to={`/products/product?pid=${item._id}`}>
                        <Box className={classes.gradientLayer}>
                            <Box className={classes.productInfo}>
                                <p style={{ fontWeight: "bold", fontSize: "1.3em" }}>{item.name}</p>
                                <p className={classes.showMore}>مشاهده</p>
                            </Box>
                        </Box>
                    </Box>

                ))}

            </Box>
        </Box >
    )
}

export default ProductList
