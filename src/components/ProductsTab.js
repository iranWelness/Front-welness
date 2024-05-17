import { Box, ButtonBase, Divider } from '@material-ui/core';
import react, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import banner from '../assets/images/banner.png';
import FontSize from './FontSize';
import axios from 'axios';

import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    categories: {
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        margin: "40px 10px 10px",
        flexWrap: "wrap"
    },
    category: {
        width: "40%",
        height: 50,
        display: "flex",
        borderRadius: 10,
        paddingBottom: 8,
        backgroundColor: "#c4dffaad",
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
        color: "#2f4167",
        fontSize: FontSize(1),
    },
    bannerWrapper: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 40,
    },
    banner: {
        width: 500,
        maxWidth: "90vw",
        marginBottom: 50
    },
    cartButton: {
        width: 320,
        height: 52,
        textAlign: "center",
        margin: "15px auto",
        borderRadius: 15,
        background: "#08afe4",
        color: "#fff"
    },
})

const ProductsTab = () => {
    const classes = useStyle();
    const token = `bearer ${localStorage.getItem('jwt')}`
    const [categories, setCategories] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    useEffect(() => {
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/categories`,
            { headers: { 'Authorization': token } },
        )
            .then(res => {
                setCategories(res.data.data)
            })
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/products/cart`,
            { headers: { 'Authorization': token } },
        )
            .then(res => {
                setCartCount(res.data.data.length)
            })
    }, [])
    return (
        <Box className={classes.root}>
            <Box className={classes.categories}>
                {categories.map(item => (
                    <ButtonBase
                        component={Link}
                        to={`/products/product-list?category=${item._id}`}
                        style={{ fontSize: FontSize(1) }}
                        className={classes.category}>
                        {item.name}
                    </ButtonBase>
                ))}
            </Box>
            <Divider variant="middle" />
            <Box style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <ButtonBase className={classes.cartButton} component={Link} to={'/products/cart'}>
                    مشاهده سبد خرید ({cartCount})
                </ButtonBase>
            </Box>
            <Box className={classes.bannerWrapper}>
                <Link to={"/products/product-list?isFeatured=true"}>
                    <img src={banner} className={classes.banner} alt="banner" />
                </Link>
            </Box>
        </Box>
    )
}

export default ProductsTab;