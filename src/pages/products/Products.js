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
                <Tabs style={{ backgroundColor: "#c4dffaad" }} TabIndicatorProps={{
                    style: {
                        backgroundColor: "#08afe4",
                        color: "#08afe4"
                    }
                }} centered value={selectedTab} onChange={handleChange}>
                    <Tab classes={{ root: classes.tabRoot, selected: classes.selectedTab }}
                        // style={{ color: (selectedTab === 0) ? "#08afe4" : "#02d4166" }}
                        label="محصولات" />
                    <Tab classes={{ root: classes.tabRoot, selected: classes.selectedTab }}
                        // style={{ color: (selectedTab === 1) ? "#08afe4" : "#02d4166" }}
                        label="سوابق خرید" />
                </Tabs>
                {selectedTab === 0 && <ProductsTab />}
                {selectedTab === 1 && <PurchasesTab />}
            </Box>
        </>
    )

}

export default Products;