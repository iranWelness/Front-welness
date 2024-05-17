import React, { useEffect, useState } from 'react';
import {
    Box,
    ButtonBase,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Modal,
    Backdrop,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    TextField,
    Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from '../../assets/images/Search.png';
import edit from '../../assets/images/Edit.png';
import AdminNav from '../../components/AdminNav'

const useStyles = makeStyles({
    container: {
        width: 900,
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
    },
    searchInputs: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    nameInput: {
        backgroundColor: "#d7e1ed",
        border: "1px solid #bfcbdb",
        boxSizing: "border-box",
        padding: "3px 6px",
        borderRadius: 15,
        height: 50,
        width: 210,
        textAlign: "center",
        outline: 0,
        margin: 5,
    },
    lnameInput: {
        backgroundColor: "#d7e1ed",
        border: "1px solid #bfcbdb",
        boxSizing: "border-box",
        padding: "3px 6px",
        borderRadius: 15,
        height: 50,
        width: 210,
        textAlign: "center",
        outline: 0,
        margin: 5,
    },
    phoneInput: {
        backgroundColor: "#d7e1ed",
        border: "1px solid #bfcbdb",
        boxSizing: "border-box",
        padding: "3px 6px",
        borderRadius: 15,
        height: 50,
        width: 210,
        textAlign: "center",
        outline: 0,
        margin: 5,
    },
    searchButton: {
        backgroundColor: "#495e95",
        padding: 10,
        boxSizing: "border-box",
        borderRadius: 15,
        height: 50,
        width: 50
    },
    searchIcon: {
        height: 25,
        width: 25,
        filter: "brightness(0) invert(1)"
    },
    tableWrapper: {
        maxHeight: 400,
        overflow: "auto",
        marginTop: 30
    },
    table: {
        borderRadius: 30,
        overflow: "hidden"
    },
    tableHeader: {
        backgroundColor: "#9eadca",
    },
    tableRow: {
        backgroundColor: "#d3e0f1",
        textDecoration: "none",
    },
    formControl: {
        margin: "8px 0",
    },
    cell: {
        color: "#4b6095",
        fontWeight: "Bold",
        fontSize: "1.1em"
    },
    inputRoot: {
        borderRadius: 15,
        background: "#c9e3fc",
        border: ".5px solid #bbd7f2",
        color: "#2f4167",
        "& input": {
            padding: 10,
            height: 42,
            textAlign: "center",
        }
    },
    botButtons: {
        display: "flex",
        justifyContent: "center",
        padding: "0 30px 30px"
    },
    return: {
        border: "1px solid #df585f",
        color: "#df585f",
        borderRadius: 11,
        width: 180,
        height: 40,
        marginBottom: 15,
    },
    root: {
        marginBottom: 40,
        marginTop: 20,
    },
    modalContainer: {
        width: 700,
        maxWidth: "95%",
        margin: "50px auto 0",
        background: "#d4ebff",
        borderRadius: 15,
        padding: 15,
        boxSizing: "border-box",
        textAlign: "center",
        paddingBottom: 40,
    },
    backdrop: {
        zIndex: 1299,
        color: '#fff',
    },
    backdropRoot: {
        backgroundColor: "#19163a54",
        backdropFilter: "blur(2px)",
    },
    modalInput: {
        margin: "7px 8px",
        width: 220,
        borderRadius: 20,
        background: "#c9e3fc",
        border: "1px solid #bbd7f2",
        color: "#2f4167",
    },
    selectLabel: {
        margin: "0 30px",
        zIndex: 2,
    },
    modalAddress: {
        margin: "10px 15px",
        width: 470,
    },
    buttonClose: {
        border: "1px solid #df585f",
        color: "#df585f",
        borderRadius: 11,
        width: 180,
        height: 40,
        marginLeft: 5,
    },
    register: {
        backgroundColor: "#08afe4",
        color: "#fff",
        borderRadius: 11,
        width: 180,
        height: 40,
        marginRight: 5,
    },
});


const SearchUserInfo = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [modal, setModal] = React.useState(false);
    const [role, setRole] = React.useState('user');
    const [modalGender, setModalGender] = useState('');
    const [modalFname, setModalFname] = useState('');
    const [modalLname, setModalLname] = useState('');
    const [modalPhone, setModalPhone] = useState('');
    const [modalEmail, setModalEmail] = useState('');
    const [modaljobTitle, setModalJobTitle] = useState('');
    const [searchFirstname, setSearchFirstname] = useState('');
    const [searchLastname, setSearchLastname] = useState('');
    const [searchPhone, setSearchPhone] = useState('');
    const [modalAddress, setModalAddress] = useState('');
    const [modalId, setModalId] = useState('');

    const handleGenderChange = (event) => {
        setModalGender(event.target.value);
    };
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };
    const handleOpen = () => {
        setModal(true);

    };
    const handleDialogClick = e => {
        e.stopPropagation();
    };
    const handleClose = () => {
        setModal(false);
    };
    const searchUsers = () => {
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/users/search?${searchFirstname ? 'firstname=' + searchFirstname : ""}${searchLastname ? '&lastname=' + searchLastname : ""}${searchPhone ? '&phone=' + searchPhone : ""} `, { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')} ` } })
            .then(res => {
                setUsers(res.data.data)
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 404) {
                    setUsers([])
                }
            })
    }
    const showModal = e => {
        console.log(e)
        handleOpen()
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/users/search?_id=${e}`, { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } })
            .then(res => {
                console.log(res.data.data[0])
                setModalFname(res.data.data[0].firstname);
                setModalLname(res.data.data[0].lastname);
                setModalPhone(res.data.data[0].phone);
                setModalEmail(res.data.data[0].email);
                setModalJobTitle(res.data.data[0].jobTitle);
                setModalGender(res.data.data[0].gender);
                setModalAddress(res.data.data[0].address);
                setModalId(res.data.data[0]._id);
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                }
            })
    };

    const updateUser = () => {
        const header = { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } };
        console.log(modalId)
        const data = {
            firstname: modalFname,
            lastname: modalLname,
            phone: modalPhone,
            email: modalEmail,
            gender: modalGender,
            address: modalAddress,
            jobTitle: modaljobTitle,
        }
        axios.put(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/users/${modalId}`, data, header)
            .then(res => {
                console.log(res)
                alert('ثبت شد')
            }).catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                }
            })
    };

    useEffect(() => {
        axios.get(`https://tame-rose-clownfish-ring.cyclic.app/api/v1/users`, { headers: { 'Authorization': `bearer ${localStorage.getItem('jwt')}` } })
            .then(res => {
                console.log(res)
                setUsers(res.data.data)
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                }
            })
    }, [])
    return (
        <>
            <AdminNav />
            <Box className={classes.container}>
                <Box className={classes.header}>
                    <h2 className={classes.headerTitle}>جستجوی اطلاعات کاربران</h2>
                </Box>
                <Box className={classes.innerContainer}>
                    <Box className={classes.searchInputs}>
                        <input
                            type="text"
                            value={searchFirstname}
                            placeholder={"نام"}
                            onChange={e => setSearchFirstname(e.target.value)}
                            className={classes.nameInput}
                            onKeyDown={(e) => {
                                if (e.code === "Enter") {
                                    searchUsers()
                                }
                            }}
                        />

                        <input
                            type="text"
                            value={searchLastname}
                            placeholder={"نام خانوادگی"}
                            onChange={e => setSearchLastname(e.target.value)}
                            className={classes.lnameInput}
                            onKeyDown={(e) => {
                                if (e.code === "Enter") {
                                    searchUsers()
                                }
                            }} />
                        <input
                            type="text"
                            value={searchPhone}
                            placeholder={"شماره همراه"}
                            onChange={e => setSearchPhone(e.target.value)}
                            className={classes.phoneInput}
                            onKeyDown={(e) => {
                                if (e.code === "Enter") {
                                    searchUsers()
                                }
                            }} />
                        <ButtonBase className={classes.searchButton} onClick={searchUsers}>
                            <img src={Search} className={classes.searchIcon} alt="جستجو" />
                        </ButtonBase>
                    </Box>
                    <Box className={classes.tableWrapper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead className={classes.tableHeader}>
                                <TableRow>
                                    <TableCell className={classes.cell} align="center">#</TableCell>
                                    <TableCell className={classes.cell} align="center">نام</TableCell>
                                    <TableCell className={classes.cell} align="center">نام‌خانوادگی</TableCell>
                                    <TableCell className={classes.cell} align="center">شماره‌همراه</TableCell>
                                    <TableCell className={classes.cell} align="center">اطلاعات</TableCell>
                                    <TableCell className={classes.cell} align="center">ویرایش</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((data, index) => (
                                    <TableRow className={classes.tableRow} >
                                        <TableCell className={classes.cell} align="center">{(users) ? index + 1 : ""}</TableCell>
                                        <TableCell className={classes.cell} align="center">{(users) ? data.firstname : ""}</TableCell>
                                        <TableCell className={classes.cell} align="center">{(users) ? data.lastname : ""}</TableCell>
                                        <TableCell className={classes.cell} align="center">{(users) ? data.phone : ""}</TableCell>
                                        <TableCell className={classes.cell} align="center">
                                            <Link style={{ color: "#08afe3", textDecoration: "none" }} to={`/admin/user-info/user?id=${(users) ? data._id : ""}`}>مشاهده</Link>
                                        </TableCell>
                                        <TableCell className={classes.cell} align="center">
                                            <ButtonBase onClick={() => showModal(data._id)}>
                                                <img src={edit} alt="ویرایش" style={{ width: 30, height: 30 }} />
                                            </ButtonBase>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
                <Box className={classes.botButtons}>
                    <ButtonBase component={Link} to={"/admin/specilists-panel"} className={classes.return}>بازگشت</ButtonBase>
                </Box>
                <Backdrop className={classes.backdrop} open={modal} classes={{
                    root: classes.backdropRoot
                }} onClick={handleClose}>
                    <Modal
                        onClick={handleDialogClick}
                        open={modal}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        hideBackdrop={true}
                    >
                        <Box className={classes.modalContainer}>
                            <h3 style={{ padding: 10, color: "#08afe3" }}>ویرایش کاربر</h3>
                            <Divider variant="middle" style={{ width: "80%", margin: "0 auto", opacity: .7 }} />
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField
                                    value={modalFname}
                                    onChange={(e) => setModalFname(e.target.value)}
                                    InputProps={{ disableUnderline: true, classes: { root: classes.inputRoot }, }}
                                    variant="filled"
                                    className={classes.modalInput}
                                    id="standard-basic" placeholder="نام" />
                                <TextField
                                    value={modalLname}
                                    onChange={(e) => setModalLname(e.target.value)}
                                    InputProps={{ disableUnderline: true, classes: { root: classes.inputRoot }, }}
                                    variant="filled"
                                    className={classes.modalInput}
                                    id="standard-basic"
                                    placeholder="نام خانوادگی" />
                                <TextField
                                    value={modalPhone}
                                    onChange={(e) => setModalPhone(e.target.value)}
                                    InputProps={{ disableUnderline: true, classes: { root: classes.inputRoot }, }}
                                    variant="filled"
                                    className={classes.modalInput}
                                    id="standard-basic"
                                    placeholder="شماره همراه" />
                                <TextField
                                    value={modalEmail}
                                    onChange={(e) => setModalEmail(e.target.value)}
                                    InputProps={{ disableUnderline: true, classes: { root: classes.inputRoot }, }}
                                    variant="filled"
                                    className={classes.modalInput}
                                    id="standard-basic"
                                    placeholder="ایمیل" />
                                <FormControl className={classes.formControl}>
                                    <InputLabel className={classes.selectLabel} id="select-gender-label">جنسیت</InputLabel>
                                    <Select
                                        className={classes.modalInput}
                                        disableUnderline
                                        style={{ margin: "0 9px", height: 62 }}
                                        variant="filled"
                                        labelId="select-gender-label"
                                        id="select-gender"
                                        value={modalGender}
                                        onChange={handleGenderChange}
                                    >
                                        <MenuItem value={"MALE"}>مرد</MenuItem>
                                        <MenuItem value={"FEMALE"}>زن</MenuItem>
                                        <MenuItem value={"OTHER"}>غیره</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    value={modaljobTitle}
                                    onChange={(e) => setModalJobTitle(e.target.value)}
                                    InputProps={{ disableUnderline: true, classes: { root: classes.inputRoot }, }}
                                    variant="filled"
                                    className={classes.modalInput}
                                    id="standard-basic"
                                    placeholder="شغل" />
                                {/* <FormControl className={classes.formControl}>
                                    <InputLabel className={classes.selectLabel} id="select-role-label">سطح دسترسی</InputLabel>
                                    <Select
                                        className={classes.modalInput}
                                        labelId="select-role-label"
                                        id="select-role"
                                        value={role}
                                        onChange={handleRoleChange}
                                    >
                                        <MenuItem value={"user"}>کاربر</MenuItem>
                                        <MenuItem value={"specialist"}>متخصص</MenuItem>
                                        <MenuItem value={"admin"}>مدیر</MenuItem>
                                    </Select>
                                </FormControl> */}
                                <TextField
                                    value={modalAddress}
                                    onChange={e => setModalAddress(e.target.value)}
                                    InputProps={{ disableUnderline: true, classes: { root: classes.inputRoot }, }}
                                    variant="filled"
                                    className={classes.modalAddress}
                                    id="address-input"
                                    placeholder="آدرس"
                                    multiline
                                    rows={3}
                                />
                            </form>
                            <ButtonBase onClick={updateUser} className={classes.register}>ثبت</ButtonBase>
                            <ButtonBase className={classes.buttonClose} onClick={handleClose}>بازگشت</ButtonBase>
                        </Box>
                    </Modal>

                </Backdrop>
            </Box>
        </>
    )
}

export default SearchUserInfo
