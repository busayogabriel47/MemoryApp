import React, {useEffect, useState} from "react";
import makeStyles from '../Form/style';
import FileBase from 'react-file-base64'
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { createPost} from "../../actions/posts";
import { updatePost } from "../../api";


const Form = ({currentId, setCurrentId}) => {

const classes = makeStyles();
const dispatch = useDispatch(); 
const post = useSelector((state)=> (currentId ? state.posts.find((message)=> message._id === currentId) : null));
const user = JSON.parse(localStorage.getItem('profile'));

const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags:"",
    selectedFile: "" 
})


useEffect(()=> {
    if(post) setPostData(post);
}, [post]);

const handleSubmit = async(e) => {
    e.preventDefault();
    
   if(currentId === 0){
        dispatch(createPost({...postData, name: user?.result?.name}));
        clear();
   } else{
    dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
    clear()
   }
}



const clear = (e) => {
setCurrentId(0);
setPostData({title: "", message: "", tags : "", selectedFile: ""})
}


if(!user?.result?.name){
    return (
        <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
                Please Sign in to create your own memories and like other's memories
            </Typography>
        </Paper>
    )
}

    return(
        <>
            <Paper className={classes.paper}>
                <form autoComplete="off" 
                noValidate className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}>
                    <TextField name="title" 
                    variant="outlined" 
                    label="Title" fullWidth
                    value={postData.title}
                    onChange={(e)=> setPostData({...postData, title: e.target.value})}/>

                    <TextField name="message" 
                    variant="outlined" 
                    label="message" fullWidth
                    value={postData.message}
                    onChange={(e)=> setPostData({...postData, message: e.target.value})}/>
                
                    <TextField name="tags" 
                    variant="outlined" 
                    label="tags" fullWidth
                    value={postData.tags}
                    onChange={(e)=> setPostData({...postData, tags: e.target.value})}/>

                    <div className={classes.fileInput}> 
                        <FileBase type="file"
                        miltiple="file"
                        multiple={false}
                        onDone={({base64})=> setPostData({...postData, selectedFile: base64 })}/>
                    </div>
                    <Button className={classes.buttonSubmit} 
                    variant="contained" color="primary"
                     size="large" type="submit" fullWidth>Submit</Button>

                 <Button  variant="contained" color="secondary"
                     size="small" fullWidth
                     onClick={clear}>Clear</Button>
                </form>
            </Paper>
        </>
    )
}

export default Form;