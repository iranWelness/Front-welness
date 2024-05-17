import React, { useEffect, useState } from 'react';
import { Box, ButtonBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import moment from 'moment-jalaali';
import edit from '../../assets/images/Upload.png';


const useStyles = makeStyles({
    container: {
        width: 800,
        maxWidth: "100%",
        margin: "100px auto 0",
        borderRadius: 30,
        backgroundColor: "#dde7f3",
        boxShadow: "-7px 6px 13px #a6a6a6b8, -7px -8px 20px 0px #ffffffd1",
    },
    input: {
        display: 'none',
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
    }
});

const onChange = (e, id) => {
    let url = "https://tame-rose-clownfish-ring.cyclic.app/api/v1/test-results";
    let file = e.target.files[0];
    uploadFile(url, file, id);
};

const uploadFile = (url, file, id) => {
    console.log(id)
    console.log(file)
    let formData = new FormData();
    formData.append("resultFile", file);
    formData.append("customer", id);
    formData.append("testType", 'EDS');
    formData.append("uploader", localStorage.getItem('userid'));
    axios.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `bearer ${localStorage.getItem('jwt')}`
        },
    }).then((response) => {
        fnSuccess(response);
    }).catch((error) => {
        fnFail(error);
    });
};


const fnSuccess = (response) => {
    alert('ارسال شد.')
};

const fnFail = (error) => {
    console.log("خطا")
};

const HealthFiles = () => {
    const classes = useStyles();
    const [data, setData] = useState([])
    useEffect(() => {
        const header = { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } };
        const url = `https://tame-rose-clownfish-ring.cyclic.app/api/v1/appointments/get-unresponsed/special`
        axios.get(url, header)
            .then(response => {
                setData(response.data.data);
                // console.log(response.data.data);
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                    localStorage.removeItem('jwt')
                }
            })
    }, [])
    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <h2 className={classes.headerTitle}>آپلود دستگاه‌های EDS</h2>
            </Box>
            <Box className={classes.innerContainer}>

                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">نام</TableCell>
                            <TableCell align="left">تاریخ مراجعه</TableCell>
                            <TableCell align="left">آپلود</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={item.name}>
                                {console.log(data)}
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left">
                                    {item.customer.firstname}  {item.customer.lastname}</TableCell>
                                <TableCell align="left">{moment(new Date(item.date)).format('jYYYY/jMMMM/jD')}</TableCell>
                                <TableCell align="left">
                                    <input
                                        accept="*/*"
                                        className={classes.input}
                                        id="contained-button-file"
                                        type="file"
                                        onChange={(e) => onChange(e, item.customer._id)}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <ButtonBase component="span">
                                            <img src={edit} alt="آپلود" style={{ width: 30, height: 30 }} />
                                        </ButtonBase>
                                    </label>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Box className={classes.botButtons}>
                <ButtonBase className={classes.return}>بازگشت</ButtonBase>
            </Box>
        </Box>
    )
}

export default HealthFiles
