import "./rightbar.css"
import Online from "../online/Online"
import { useEffect, useState } from "react"
import Api from "../../util/Api"

function Rightbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        const getDoctors = async () => {
            try {
                const doctorsData = await Api.get(`/doctors?_page=1&_limit=8&_sort=starAveraged&_order=-1`)
                setDoctors(doctorsData.data)
            } catch (error) {
                console.log(error);
            }
        }
        getDoctors()
    }, [])

    console.log(doctors);

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="birthdayContainer">
                    <img src={PF + "gift.png"} alt="" className="birthdayImg" />
                    <span className="birthdayText">
                        <b>Lộc Sarma</b> và <b>3 người khác</b> có ngày sinh nhật hôm nay
                    </span>
                </div>
                <img src={PF + "birthday.jpg"} alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Bác sĩ nổi bật</h4>
                <ul className="rightbarFriendList">
                    {doctors.map(doctor => <Online key={doctor.id} user={doctor}/>)}
                </ul>
            </div>
        </div>
    )
}

export default Rightbar