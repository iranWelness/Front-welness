import React from 'react';
import {Box, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import FontSize from './FontSize';

const useStyle = makeStyles({
    root:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center",
        margin:"160px 0",
        color:"#7886a3"
    }
})

const PurchasesTab = () =>{
    const classes  = useStyle();
    return(
        <Box className={classes.root}>
            <Typography style={{ fontSize: FontSize(1) }} variant="body1">محصولی برای نمایش موجود نیست</Typography>
        </Box>
    )
}

export default PurchasesTab;