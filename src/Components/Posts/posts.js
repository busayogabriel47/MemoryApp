import Post from "../Post/post";
import { useSelector } from "react-redux";
import makeStyles from '../Posts/style';
import { Paper, Grid } from "@material-ui/core";


const Posts = ({setCurrentId}) => {
const posts = useSelector((state) => state.posts);
const classes = makeStyles();



console.log(posts);

    return(
        <>
            <Grid container spacing={3}>
                {posts.map((post)=> (   
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default Posts;