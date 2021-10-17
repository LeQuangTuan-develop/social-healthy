import "./post.css"
import {MoreVert} from "@material-ui/icons"
import { useState, useEffect, useContext } from "react"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import API from "../../util/Api"
import { AuthContext } from "../../context/AuthContext"

function Post({ post, question }) {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const {user: currentUser} = useContext(AuthContext)

    useEffect(() => {
        const fetchUser = async () => {
            const res = question 
            ? await API.get(`/users?userId=${post.userId}`)  
            : await API.get(`/doctors/detail/${post.doctorId}`)
            setUser(res.data)
        }
        fetchUser()
    }, [post.userId, question, post.doctorId])

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    async function likeHandler() {
        try {
            API.put(`/posts/like/${post._id}`, {userId: currentUser._id})
        } catch (error) {
            console.log(error);
        }
        setLike(isLiked ? like -1 : like + 1)
        setIsLiked(!isLiked)
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={!question && `profile/` + user._id}>
                            <img 
                                src={question ? 
                                    user.profilePicture ? user.profilePicture  : "person/avatar-default.png"  
                                    : user.img ? user.img : PF + "person/avatar-default.png"} 
                                alt="" 
                                className="postProfileImg" 
                            />
                        </Link>
                        <span className="postUsername">{question ? user.username : user.name}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">
                        {post.description}
                    </span>
                    <img src={post.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={PF + "like.png"} alt="" onClick={likeHandler} className="likeIcon" />
                        <img src={PF + "heart.png"} alt="" onClick={likeHandler} className="likeIcon" />
                        <span className="postLikeCounter">{like}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} bình luận</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
