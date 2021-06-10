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
            contact: "",
            password: "",
            contactRequired: "dispNone",
            passwordRequired: "dispNone",
            loginErrorMsg: "",
            loginErrorMessageRequired: "dispNone",

            firstname: "",
            lastname: "",
            email: "",
            firstnameRequired: "dispNone",
            lastnameRequired: "dispNone",
            emailRequired: "dispNone",
            registerContact: "",
            registerPassword: "",
            registerContactRequired: "dispNone",
            registerPasswordRequired: "dispNone",
            emailErrorMsg: " ",
            registerContactErrorMsg: "",
            registerPasswordErrorMsg: ""



        }
    }
    loginClickHandler = () => {


        this.state.contact === "" ? this.setState({ contactRequired: "dispBlock" }) : this.setState({ contactRequired: "dispNone" })
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" })
        this.state.loginErrorMsg === "" ? this.setState({ loginErrorMessageRequired: "dispBlock" }) : this.setState({ loginErrorMessageRequired: "dispNone" })

        if (this.state.contact === "" || this.state.password === "") { return }


        var phoneno = /^\d{10}$/;
        if ((this.state.contact.length !== 10) && (!phoneno.test(this.state.contactNo))) {

            this.setState({
                loginErrorMsg: "Invalid Contact"
            })
            this.setState({
                loginErrorCode: "ATH-001"

            })
            return;
        }

    }
    
    signUpClickHandler = () => {

        this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" })
        this.state.lastname === "" ? this.setState({ lastnameRequired: "dispBlock" }) : this.setState({ lastnameRequired: "dispNone" })
        
       
        if(this.state.email !== ""){
        if(this.state.email.toString().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)=== null){
            this.setState({emailRequired:"dispblock"})
            this.setState({emailErrorMsg:"Invalid email"})
        }else{
            this.setState({emailRequired:"dispNone"})
            this.setState({emailErrorMsg:""})
        }
    }else{
        this.setState({emailRequired:"dispBlock"})
            this.setState({emailErrorMsg:"required"})
    }
    if(this.state.registerPassword!== ""){
        if(this.state.registerPassword.toString().match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,32}$/i)=== null){
            this.setState({registerPasswordRequired:"dispblock"})
            this.setState({registerPasswordErrorMsg:"Password must contain at least one capital letter, one small letter, one number, and one special character"})
        }else{
            this.setState({registerPasswordRequired:"dispNone"})
            this.setState({registerPasswordErrorMsg:""})
        }
    }else{
        this.setState({registerPasswordRequired:"dispBlock"})
            this.setState({registerPasswordErrorMsg:"required"})
    }
    if(this.state.registerContact!== ""){
        if(this.state.registerContact.toString().match(/^(?=.*\d).{10,10}$/i)=== null){
            this.setState({registerContactRequired:"dispblock"})
            this.setState({registerContactErrorMsg:"Invalid Contact"})
        }else{
            this.setState({registerContactRequired:"dispNone"})
            this.setState({registerContactErrorMsg:""})
        }
    }else{
        this.setState({registerContactRequired:"dispBlock"})
            this.setState({registerContactErrorMsg:"required"})
    }
    }
    





    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            contact: "",
            password: "",
            contactRequired: "dispNone",
            passwordRequired: "dispNone",
            loginErrorMsg: "",
            loginError: "",
            loginErrorCode: "",
            firstname: "",
            lastname: "",
            firstnameRequired: "dispNone",
            lastnameRequired: "dispNone",
            email: "",
            emailRequired: "dispNone",
            emailErrorCode: "",
            emailErrorMessageRequired: "dispNone",
            registerContact: "",
            registerContactRequired: "dispNone",
            registerPassword: "",
            registerPasswordRequired: "dispNone",

            passwordErrorCode: "",
            passwordErrorMessageRequired: "dispNone",
            passwordErrorMsg: ""

        })



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
            contact: e.target.value
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
    inputEmailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    inputRegPasswordChangeHandler = (e) => {
        this.setState({
            registerPassword: e.target.value
        })
    }
    inputRegContactChangeHandler = (e) => {
        this.setState({
            registerContact: e.target.value
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
                    <Button color="default" variant="contained" onClick={this.openModalHandler}> <AccountCircleIcon />Login</Button>
                </div>
                <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Login" onRequestClose={this.closeModalHandler} style={customStyles}>
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login" />
                        <Tab label="Sign-up" />
                    </Tabs>
                    {this.state.value === 0 &&
                        <TabContainer>
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                <Input id="contact" type="text" className={this.state.contact} onChange={this.inputContactChangeHandler} />
                                <FormHelperText className={this.state.contactRequired}><span className="red">required</span></FormHelperText>
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
                    {this.state.value === 1 &&
                        <TabContainer>
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="firstname"> First Name</InputLabel>
                                <Input id="firstname" type="text" onChange={this.inputFirstNameChangeHandler} />
                                <FormHelperText className={this.state.firstnameRequired}><span className="red">required</span></FormHelperText>
                            </FormControl>
                            <br /> <br />
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="lastname"> Last Name </InputLabel>
                                <Input id="lastname" type="text" onChange={this.inputLastNameChangeHandler} />
                                <FormHelperText className={this.state.lastnameRequired}><span className="red">required</span></FormHelperText>
                            </FormControl>
                            <br /> <br />
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" type="text" onChange={this.inputEmailChangeHandler} />
                                <FormHelperText className={this.state.emailRequired}><span className="red">{this.state.emailErrorMsg}</span></FormHelperText>

                            </FormControl>
                            <br /> <br />
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                                <Input id="registerPassword" type="password" onChange={this.inputRegPasswordChangeHandler} />
                                <FormHelperText className={this.state.registerPasswordRequired}><span className="red">{this.state.registerPasswordErrorMsg}</span></FormHelperText>

                            </FormControl>
                            <br /> <br />
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="registerContact">Contact No.</InputLabel>
                                <Input id="registerContact" type="text" onChange={this.inputRegContactChangeHandler} />
                                <FormHelperText className={this.state.registerContactRequired}><span className="red">{this.state.registerContactErrorMsg}</span></FormHelperText>
                            </FormControl>
                            <br /> <br />
                            <Button variant="contained" color="primary" onClick={this.signUpClickHandler}>SIGNUP</Button>
                        </TabContainer>
                    }

                </Modal>

            </div>
        )
    }
}

export default withStyles(styles)(Header);
