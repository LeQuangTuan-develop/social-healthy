import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import "./question.css"

function Question() {
    return (
        <>
            <Topbar/>
            <div className="questionContainer">
                <Sidebar/>
                <Feed question={true}/>
                <Rightbar/>
            </div>
        </>
    )
}

export default Question