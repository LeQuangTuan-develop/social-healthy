import "./online.css"
import { Star } from "@material-ui/icons"
import { Link } from 'react-router-dom'

function Online({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <Link to={`/profile/` + user._id}>
            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img
                        src={user.img ? user.img : PF + "person/avatar-default.png"}
                        alt=""
                        className="rightbarProfileImg"
                    />
                </div>
                <span className="rightbarUsername">{user.name}</span>
                <Star className="rightbarIcon" />
                <span className="rightbarAveraged">{user.starAveraged}</span>
            </li>
        </Link>
    )
}

export default Online
