import { Grow, Container, Grid} from "@material-ui/core"
import { useState, useEffect } from "react";
import Posts from "../Posts/posts";
import Form from "../Form/form";
import {getPosts} from '../../actions/posts'

import useStyles from '../Home/style'
import { useDispatch } from 'react-redux';

const Home = () => {

    const [currentId, setCurrentId] = useState(0);

    const classes = useStyles();
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getPosts())
    },[currentId, dispatch]/*dependency array*/)

    return(

        <Grow in>
        <Container>
            <Grid container className={classes.mainContainer} justify="space-between" alignItems='stretch' spacing={3}>
                <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                </Grid>
            </Grid>
        </Container>
        </Grow>
    )
}

export default Home;