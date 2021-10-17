import { useEffect, useState } from 'react'
import Api from '../../util/Api'
import './chatOnline.css'

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [doctors, setdoctors] = useState([])
    const [onlineDoctors, setOnlineDoctors] = useState([])

    useEffect(() => {
        const getDoctors = async () => {
            try {
                const doctorsData = await Api.get(`users/doctors/${currentId}`)
                setdoctors(doctorsData.data)
            } catch (error) {
                console.log(error);
            }
        }
        getDoctors()
    }, [currentId])

    useEffect(() => {
        setOnlineDoctors(doctors.filter(doctor => onlineUsers.includes(String(doctor._id))))
    }, [doctors, onlineUsers])

    const handleClick = async (user) => {
        try {
            const conversation = await Api.get(`conversations/find/${currentId}/${user._id}`)
            if (conversation.data) {
                setCurrentChat(conversation.data)
            } else {
                const newConversation = await Api.post(`conversations/create`, {
                    senderId: currentId,
                    receiverId: String(user._id),
                })
                setCurrentChat(newConversation.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="chatOnline">
            {onlineDoctors.map(doctor => 
                <div key={doctor._id} className="chatOnlineFriend" onClick={() => handleClick(doctor)}>
                    <div className="chatOnlineImgContainer">
                        <img 
                            src={ doctor.img ? doctor.img : PF + "person/avatar-default.png" } 
                            alt="" 
                            className="chatOnlineImg"
                        />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{doctor.name}</span>
                </div>
            )}
        </div>
    )
}
