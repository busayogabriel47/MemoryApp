import makeStyles from '../Post/style'
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Button, 
Typography} from '@material-ui/core/';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUp'

import moment from 'moment';
import { useDispatch } from 'react-redux';
import { likePost, deletePost } from '../../actions/posts'


const Post = ({post, setCurrentId}) => {
    
const dispatch = useDispatch()
const classes = makeStyles();
const user = JSON.parse(localStorage.getItem('profile'));

const Likes = (post) => {
    
if (post.likes?.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;

  };

    return( 
                 <>
        
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={post.selectedFile}
                            title={post.title}
                            />
                            <div className={classes.overflow}>
                                <Typography variant='h6'>{post.name}</Typography>
                                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                            </div>
                            <div className={classes.overflow2}>
                            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                                <Button style={{color: 'black'}} size="small" onClick={()=> setCurrentId(post._id)}>
                                    <MoreHorizIcon fontSize='default'/>
                                </Button>
                            )}
                               
                            </div>
                            <CardContent>
                            <div className={classes.details}>
                                <Typography variant='body2' color='textSecondary' component="h2">
                                    {post.tags.map((tag) => `#${tag} `)}
                                </Typography>
                            </div>
                            <Typography gutterBottom variant="h5" component="h2">
                                {post.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {post.message}
                            </Typography>
                            </CardContent>
                             </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" disabled={!user?.result} onClick={()=> dispatch(likePost(post._id))}>
                                    <Likes />
                                </Button>
                                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                                        <Button size="small" color="primary" onClick={()=> dispatch(deletePost(post._id))}>
                                        <DeleteIcon fontSize="small"/>   Delete
                                    </Button>
                                )}
                                
                             </CardActions>
                            </Card>    
                    
                        </>
    )
}

export default Post;


