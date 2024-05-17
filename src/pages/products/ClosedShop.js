import React, { useState, } from 'react';
import Header from '../../components/Header';
import { Box, Tabs, Tab, } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import PurchasesTab from '../../components/PurchasesTab';
import ProductsTab from '../../components/ProductsTab';
import FontSize from '../../components/FontSize';


const useStyle = makeStyles({
    topWrapper: {
        height: 200
    },
    assitance: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "#c4dffaad"
    },
    assistanceHeader: {
        color: "#08afe4",
        fontSize: FontSize(1),
    },
    requestAssistance: {
        textDecoration: "underline",
        textDecorationColor: "#00000033",
        fontSize: FontSize(1),
    },
    tabRoot: {
        fontSize: FontSize(1.1),
        color: "rgb(120, 135, 162)"
    },
    selectedTab: {
        color: "#08afe4",
    },
    WOPBox:{
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
        paddingTop: 80
    },
    workInProgress:{
        fontSize: FontSize(1.2),
        color:"#808080",
        fontWeight:"Bold"
    }
});


const Products = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const classes = useStyle();
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    return (
        <>
            <Box>
                <Header />
                <Box className={classes.topWrapper}>
                    <Box className={classes.assitance}>
                        <h1 className={classes.assistanceHeader}>دریافت مشاوره خرید</h1>
                        <p className={classes.requestAssistance}>برای دریافت مشاوره رایگان کلیک کنید</p>
                    </Box>
                </Box>
                <Box className={classes.WOPBox}>
                    <p className={classes.workInProgress}>در دست طراحی</p>
                </Box>
            </Box>
        </>
    )

}

export default Products;