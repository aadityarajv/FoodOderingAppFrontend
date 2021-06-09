import React, { Component } from 'react'
import Fastfood from '@material-ui/icons/Fastfood';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';

import { withStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Button, FormHelperText, Typography } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Modal from 'react-modal'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';

const styles = {
    root: {
        color: "#FFFFFF"
    },
    searchInput: {
        width: "120%",
        color: "white"
    },
    icon: {
        color: '#FFFFFF',
        fontSize: 32,
    },
    formControl: {
        width: "90%"
    }
}
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        }
    }
});
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
            {props.children}
        </Typography>
    )
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}


class Header extends Component {

    constructor(props) {
        super(props)

        this.state = {
            modalIsOpen: false,
            value: 0,
            contactNo: "",
            password: "",
            contactNoRequired: "dispNone",
            passwordRequired: "dispNone",
            loginErrorMsg: "",
            loginErrorMessageRequired: "dispNone",




        }
    }
    loginClickHandler = () => {


        this.state.contactNo === "" ? this.setState({ contactNoRequired: "dispBlock" }) : this.setState({ contactNoRequired: "dispNone" })
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" })
        this.state.loginErrorMsg === "" ? this.setState({ loginErrorMessageRequired: "dispBlock" }) : this.setState({ loginErrorMessageRequired: "dispNone" })

        if (this.state.contactNo === "" || this.state.password === "") { return }


        var phoneno = /^\d{10}$/;
        if ((this.state.contactNo.length !== 10) && (!phoneno.test(this.state.contactNo))) {

            this.setState({
                loginErrorMsg: "Invalid Contact"
            })
            this.setState({
                loginErrorCode: "ATH-001"

            })
            return;
        }





    }

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true
        })
        this.setState({ value: 0 });
        this.setState({ contactNo: "" });
        this.setState({ password: "" });
        this.setState({ contactNoRequired: "dispNone" });
        this.setState({ passwordRequired: "dispNone" });
        this.setState({ loginErrorMsg: "" })
        this.setState({ loginError: "" })
        this.setState({ loginErrorCode: "" })


    }
    closeModalHandler = () => {
        this.setState({
            modalIsOpen: false
        })

    }
    tabChangeHandler = (event, value) => {
        this.setState({ value })
    }




    inputContactChangeHandler = (e) => {
        this.setState({
            contactNo: e.target.value
        })
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })

    }
    inputFirstNameChangeHandler = (e) => {
        this.setState({
            firstname: e.target.value
        })
    }
    inputLastNameChangeHandler = (e) => {
        this.setState({
            lastname: e.target.value
        })
    }

    render() {
        const { classes } = this.props
        return (
            <div className="app-header">
                <span className="app-header-logo">
                    <Fastfood /></span>
                <div className="app-header-searchbar">
                    <ThemeProvider theme={theme}>
                        <div className="search-icon">
                            <SearchIcon style={{ color: "#FFFFFF" }} />
                        </div>
                        <Input placeholder="Search By Restaurant Name" className={classes.searchInput} />
                    </ThemeProvider>
                </div>
                <div className={classes.headerLoginBtn}>
                    <Button color="deafult" variant="contained" onClick={this.openModalHandler}> <AccountCircleIcon />Login</Button>
                </div>
                <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Login" onRequestClose={this.closeModalHandler} style={customStyles}>
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login" />
                        <Tab label="Sign-up" />
                    </Tabs>
                    {this.state.value === 0 &&
                        <TabContainer>
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="username">Contact No.</InputLabel>
                                <Input id="username" type="text" contactNo={this.state.contactNo} onChange={this.inputContactChangeHandler} />
                                <FormHelperText className={this.state.contactNoRequired}><span className="red">required</span></FormHelperText>
                                {this.state.loginErrorCode === "ATH-001" ?
                                    <FormControl className={classes.formControl}>
                                        <Typography variant="subtitle1" color="error" className={this.state.loginErrorMessageRequired} align="left">{this.state.loginErrorMsg}</Typography>
                                    </FormControl> : ""}
                            </FormControl>




                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler} />
                                <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
                            </FormControl>
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler} className={classes.formControl}>LOGIN</Button>
                        </TabContainer>
                    }
                    {/* {this.state.value === 1 &&
                    <TabContainer>
                    <FormControl required>
                            <InputLabel htmlFor="firstname"> First Name</InputLabel>
                            <Input id="username" type="text" onChange={this.inputFirstNameChangeHandler}/>
                        </FormControl>
                        <FormControl required>
                            <InputLabel htmlFor="lastname"> Last Name onChange={this.inputLastNameChangeHandler}</InputLabel>
                            <Input id="username" type="text" />
                        </FormControl>
                        <FormControl required>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="username" type="text" />
                        </FormControl>
                        <br/>
                        </TabContainer>
                    } */}

                </Modal>

            </div>
        )
    }
}

export default withStyles(styles)(Header);
