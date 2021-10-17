import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import Api from "../../util/Api"
import "./rightbarProfile.css"
import { AuthContext } from "../../context/AuthContext"
import {Add, Remove, Star} from "@material-ui/icons"
import { Follow, Unfollow } from "../../context/AuthAction"


export default function RightbarProfile({ user, cate }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [doctors, setDoctors] = useState([])
    const {user:currentUser, dispatch} = useContext(AuthContext)
    const [followed, setFollowed] = useState(false)

    useEffect(() => {
        setFollowed(currentUser.followings.includes(String(user._id)))
    }, [currentUser, user._id])

    useEffect(() => {
        const fetchDoctorsCate = async () => {
            const doctorsCate = await Api.get("doctors/" + user.cate_id)
            setDoctors(doctorsCate.data.filter(doctor => doctor._id !== user._id))
        }
        fetchDoctorsCate()
    }, [user.cate_id, user._id])

    const handleFollow = async () => {
        try {
            if (followed) {
                await Api.put(`doctors/unfollow/${user._id}`, {userId: currentUser._id})
                dispatch(Unfollow(String(user._id)))
            } else {
                await Api.put(`doctors/follow/${user._id}`, {userId: currentUser._id})
                dispatch(Follow(String(user._id)))
            }
        } catch (error) {
            console.log(error);
        }
        setFollowed(!followed)
    }
    
    return (
        <div className="rightbarProfile">
            <button className="rightbarFollowButton" onClick={handleFollow}>
                {followed ? "Bỏ theo dõi" : "Theo dõi"}
                {followed ? <Remove/> : <Add/>}
            </button>
            <div className="rightbarWrapper">
                <h4 className="rightbarTitle">Thông tin cá nhân</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Đánh giá: </span>
                        <span className="rightbarInfoValue" >{user.starAveraged}
                            <Star className="rightbarIcon" />
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Lượt đánh giá: </span>
                        <span className="rightbarInfoValue">{user.starNum}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Kinh nghiệm: </span>
                        <span className="rightbarInfoValue">{user.exp} năm</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Chuyên khoa: </span>
                        <span className="rightbarInfoValue">{cate.categoryname}</span>
                    </div>
                    <div className="rightbarInfoItem righbarInfoDrop">
                        <span className="rightbarInfoKey">Kỹ năng chuyên môn: </span>
                        <span className="rightbarInfoValue">
                            {user.skill}
                        </span>
                    </div>
                </div>
                <h4 className="rightbarTitle">Bác sĩ cùng chuyên khoa</h4>
                <div className="rightbarProfileFollowings">
                    {doctors.map(doctor => (
                        <Link 
                            to={"/profile/" + doctor._id} 
                            key={doctor._id} 
                            style={{textDecoration: "none", color: "#333"}}
                        >
                            <div className="rightbarFollowing">
                                <img 
                                    src={doctor.img ? doctor.img : PF + "person/avatar-default.png"} 
                                    alt="" 
                                    className="rightbarFollowingImg" 
                                />
                                <span className="rightbarFollowingName">{doctor.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
