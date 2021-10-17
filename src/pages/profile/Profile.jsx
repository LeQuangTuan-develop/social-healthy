import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import RightbarProfile from "../../components/rightbarProfile/RightbarProfile"
import Feed from "../../components/feed/Feed"
import { useState, useEffect } from "react"
import "./profile.css"
import API from "../../util/Api"
import { useParams } from "react-router"

function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState({})
    const [cate, setCate] = useState({})
    const { doctorId } = useParams()

    useEffect(() => {
        const fetchUser = async () => {
            const res = await API.get(`/doctors/detail/${doctorId}`)
            setUser(res.data)
            const cate = await API.get(`/categories/${res.data.cate_id}`)
            setCate(cate.data)
        }
        fetchUser()
    }, [doctorId])

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img 
                                src={user.coverPicture ? user.coverPicture : PF + "person/cover-default.jpg"} 
                                alt="" 
                                className="profileCoverImg" 
                            />
                            <img 
                                src={user.img ? user.img : PF + "person/avatar-default.png"}   
                                alt="" 
                                className="profileUserImg" 
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.name}</h4>
                            <span className="profileInfoDesc">{user.description}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed doctorId={doctorId} />
                        <RightbarProfile user={user} cate={cate}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
