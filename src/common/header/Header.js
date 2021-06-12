import React, { Component } from 'react'
import Fastfood from '@material-ui/icons/Fastfood';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import { withStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Button, FormHelperText, Typography } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Modal from 'react-modal'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Profile from'../../screens/profile/Profile'
import ReactDOM from 'react-dom'


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


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
        backgroundColor: '#DFDFDF',
        padding: 8,
        marginTop: 4,
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));


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


const StyledMenuItem = withStyles(theme => ({
    root: {
        padding: 4,
        minHeight: 'auto',
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

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
            registerPasswordErrorMsg: "",
            loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
            loggedInFirstName: sessionStorage.getItem('login') == null ? "" : sessionStorage.getItem('login'),
            open: false,
            anchorEl: null,
            snackBarOpen: false,
            snackBarMessage: '',
            signupSuccess: false,
            signupErrorMessage: "",
            signupErrorMessageRequired: "dispNone",
            loginErroMessage: '',
            loginErroMessageRequired: ''
        }
    }
    
    //Method to handle Login functionality
    loginClickHandler = () => {
         this.state.contact === "" ? this.setState({ contactRequired: "dispBlock" }) : this.setState({ contactRequired: "dispNone" })
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" })
        this.state.loginErrorMsg === "" ? this.setState({ loginErrorMessageRequired: "dispBlock" }) : this.setState({ loginErrorMessageRequired: "dispNone" })

        if (this.state.contact === "" || this.state.password === "") { return }

        //validating Contact details of customer
        var phoneno = /^\d{10}$/;
        //to check if the lenth is 10 and it only contain valid digits
        if ((this.state.contact.length !== 10) && (!phoneno.test(this.state.contactNo))) {

            this.setState({
                loginErrorMsg: "Invalid Contact"
            })
            this.setState({
                loginErrorCode: "ATH-001"

            })
            return;
        }

        //Making API call for Login authorization
        let loginData = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (xhrLogin.status === 200 || xhrLogin.status === 201){
                    let loginData = JSON.parse(this.responseText);
                    sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                    sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));
                    sessionStorage.setItem("login", loginData.first_name);

                    that.setState({
                        loggedIn: true,
                        loggedInFirstName: loginData.first_name
                    });
                    that.snackBarHandler("Logged in successfully!");

                    that.closeModalHandler();
                } else {
                    that.setState({passwordRequired: "dispBlock"});
                    that.setState({passwordErrorMsg: JSON.parse(this.responseText).message});
                }
            }
        });
        
        let url = this.props.baseUrl + 'customer/login';
        xhrLogin.open("POST", url);
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.contact + ":" + this.state.password));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(loginData);
    }


    //Method to register a customer and sending customer details to sign up API call after validating required fields
    signUpClickHandler = () => {

        this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" })
        this.state.lastname === "" ? this.setState({ lastnameRequired: "dispBlock" }) : this.setState({ lastnameRequired: "dispNone" })

        //To check if Email is valid 
        if (this.state.email !== "") {
            if (this.state.email.toString().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) === null) {
                this.setState({ emailRequired: "dispblock" })
                this.setState({ emailErrorMsg: "Invalid email" })
            } else {
                this.setState({ emailRequired: "dispNone" })
                this.setState({ emailErrorMsg: "" })
            }
        } else {
            this.setState({ emailRequired: "dispBlock" })
            this.setState({ emailErrorMsg: "required" })
        }
        //To check if password is valid
        if (this.state.registerPassword !== "") {
            if (this.state.registerPassword.toString().match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,32}$/i) === null) {
                this.setState({ registerPasswordRequired: "dispblock" })
                this.setState({ registerPasswordErrorMsg: "Password must contain at least one capital letter, one small letter, one number, and one special character" })
            } else {
                this.setState({ registerPasswordRequired: "dispNone" })
                this.setState({ registerPasswordErrorMsg: "" })
            }
        } else {
            this.setState({ registerPasswordRequired: "dispBlock" })
            this.setState({ registerPasswordErrorMsg: "required" })
        }
        //To check if contact number is Valid
        if (this.state.registerContact !== "") {
            if (this.state.registerContact.toString().match(/^(?=.*\d).{10,10}$/i) === null) {
                this.setState({ registerContactRequired: "dispblock" })
                this.setState({ registerContactErrorMsg: "Invalid Contact" })
            } else {
                this.setState({ registerContactRequired: "dispNone" })
                this.setState({ registerContactErrorMsg: "" })
            }
        } else {
            this.setState({ registerContactRequired: "dispBlock" })
            this.setState({ registerContactErrorMsg: "required" })
        }
 
        //sign up API Call
        let signupData = JSON.stringify({
            "contact_number": this.state.registerContact,
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "password": this.state.registerPassword
        });

        let xhrSignup = new XMLHttpRequest();
        let that = this;
        xhrSignup.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (xhrSignup.status === 200 || xhrSignup.status === 201) {
                    that.setState({
                        signupSuccess: true,
                    });
                    that.snackBarHandler("Registered successfully! Please login now!");
                    that.openModalHandler();
                } else {
                    that.setState({ registerContactRequired: "dispBlock" });
                    that.setState({ registerContactErrorMsg: JSON.parse(this.responseText).message });
                }
            }
        });

        xhrSignup.open("POST", this.props.baseUrl + "customer/signup");
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        xhrSignup.send(signupData);
    }


    openModalHandler = () => {
       
        this.setState({modalIsOpen: true});
        this.setState({contactRequired: "dispNone"});
        this.setState({value: 0})
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

    
    handleMenuClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }
    
    handleMenuClose = (purpose, e) => {
        if (purpose === 'profile') {
            ReactDOM.render(<Profile />, document.getElementById('root'));
        } else if (purpose === 'logout') {
            sessionStorage.clear();
            this.setState({
                loggedIn: false
            });
           
        }
        this.setState({ anchorEl: null });
    };
    
    
    logoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");

        this.setState({
            loggedIn: false
        });
    }

    //Snack bar to show messages
    snackBarHandler = (message) => {
        this.setState({ snackBarMessage: message });
        this.setState({ snackBarOpen: true });
    }
    
    
    render() {
        const { classes } = this.props
        return (
            <div className="app-header">
                <span className="app-header-logo">
                    <Fastfood /></span>
                {this.props.showSearch &&
                    <div className="app-header-searchbar">
                        <ThemeProvider theme={theme}>
                            <div className="search-icon">
                                <SearchIcon style={{ color: "#FFFFFF" }} />
                            </div>
                            <Input placeholder="Search By Restaurant Name" className={classes.searchInput} onChange={this.props.searchChangeHandler} />
                        </ThemeProvider>
                    </div>}
                {this.state.loggedIn ?
                    <div>
                        <Button className="loggedInButton" disableRipple={true} variant='text' aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true" onClick={this.handleMenuClick}>
                            <AccountCircleIcon className="account-circle" style={{ marginRight: 4 }} /> {this.state.loggedInFirstName}
                        </Button>
                        <StyledMenu id="simple-menu" anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} onClose={this.handleMenuClose.bind(this, '')}>
                            <StyledMenuItem className="menu-item" onClick={this.handleMenuClose.bind(this, 'profile')}>
                                <ListItemText primary="My Profile" />
                            </StyledMenuItem>

                            <StyledMenuItem className="menu-item" onClick={this.handleMenuClose.bind(this, 'logout')}>
                                <ListItemText primary="Logout" />
                            </StyledMenuItem>
                        </StyledMenu>
                    </div> :
                    <div className={classes.headerLoginBtn}>
                        <Button color="default" variant="contained" onClick={this.openModalHandler}> <AccountCircleIcon />Login</Button>
                    </div>}
               
               
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
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snackBarOpen}
                    autoHideDuration={6000}
                    onClose={() => this.setState({ snackBarOpen: false })}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackBarMessage}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={() => this.setState({ snackBarOpen: false })}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </div>
        )
    }
}

export default withStyles(styles)(Header);
