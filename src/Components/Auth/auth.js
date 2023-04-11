import React, {useState, useEffect} from 'react';
import { Avatar, Button, Paper, 
    Grid, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './style'
import { signin, signup } from '../../actions/auth';

import Input from './input';
import {GoogleLogin} from 'react-google-login'
import Icon from './Icon'
import {useDispatch} from 'react-redux';
import {gapi} from 'gapi-script'
import {useNavigate} from 'react-router-dom'


function Auth() {

const classes = useStyles();
const dispatch = useDispatch();
const clientId = "349602970092-qgfs2275p2e55r8aevrq4ko59i833opk.apps.googleusercontent.com"
const navigate = useNavigate();

const [isSignup, setIsSignup] = useState(false) 
const [showpassword, setShowpassword] = useState(false);
const [formData, setFormData] = useState({
    firstName: "", 
    lastName: "", 
    email: "", 
    password: "",
    confirmPassword: ""
})

useEffect(() => {
    gapi.load("client: auth2", ()=> {
        gapi.auth2.init({clientId: clientId})
    })
}, [])  

const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
}

const handleShowPassword = () => setShowpassword((prevShowPassword) => !prevShowPassword)

const handleSubmit = (e) => {
    e.preventDefault()
    if(isSignup){
        dispatch(signup(formData, navigate))
    }else{
        dispatch(signin(formData, navigate))
    }
}

const switchMode = () => {
    setIsSignup((previsSignup) => !previsSignup)
    handleShowPassword(false)
}

const googleSuccess = async(res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
        dispatch({type: 'AUTH', data: {result, token}});
        navigate('/');
    } catch (error) {
        console.log(error)
    }
}

const googleFailure = (error) => {
    console.log(error);
    console.log("Google login was not successful, try again later")
}


  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant='h5'>{isSignup ? "Sign up" : "Sign in"}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                    
                            </>
                        )}

                        <Input name="email" label="Email Address" handleChange={handleChange} autoFocus/>
                        <Input name="password" label="Password" handleShowPassword={handleShowPassword} type={showpassword ? "text" : "password"} handleChange={handleChange}/>
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                </Grid>
                
                <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>

                <GoogleLogin
                    clientId={clientId}
                    render={(renderProps) => (
                        <Button className={classes.googleButton}
                        color='primary' fullWidth
                        disabled={renderProps.disabled}
                        onClick={renderProps.onClick}
                        startIcon={<Icon/>} variant="contained">
                            Google Sign in
                        </Button>
                    )}

                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justify='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign in' : 'Dont have an account? Sign Up'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth;