import "./feed.css"
import Share from "../share/Share"
import Post from "../post/Post"
import { useState, useEffect } from "react"
import API from "../../util/Api"

function Feed({ doctorId, question }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const res = doctorId   
            ? await API.get(`posts/doctor/${doctorId}`) 
            : question 
            ? await API.get(`posts/userpost`) 
            : await API.get(`posts/doctorpost`)
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
        }
        fetchPosts()
    }, [doctorId, question])

    return (
        <div className="feed">
            <div className="feedWrapper">
                { question && <Share /> }
                {posts.map(post => <Post key={post._id} post={post} question={question}/>)}
            </div>
        </div>
    )
}

export default Feed