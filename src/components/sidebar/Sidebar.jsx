import "./sidebar.css"
import { 
    Bookmark, 
    Chat, 
    Event, 
    Group, 
    HelpOutline, 
    PlayCircleFilledOutlined, 
    RssFeed, 
    School, 
    WorkOutline 
} from "@material-ui/icons"
import CloseFriend from "../closefriend/CloseFriend"
import { Users } from '../../dummyData'


function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon" />
                        <span className="sidebarListItemText">Tin tức</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon" />
                        <span className="sidebarListItemText">Nhắn tin</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon" />
                        <span className="sidebarListItemText">Nhóm</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon" />
                        <span className="sidebarListItemText">Đánh dấu</span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon" />
                        <span className="sidebarListItemText">Câu hỏi</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className="sidebarIcon" />
                        <span className="sidebarListItemText">Việc làm</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon" />
                        <span className="sidebarListItemText">Sự kiện</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon" />
                        <span className="sidebarListItemText">Khóa học</span>
                    </li>
                </ul>
                <button className="sidebarButton">Xem thêm</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendlist">
                    {Users.map(user => <CloseFriend key={user.id} user={user} />)}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar