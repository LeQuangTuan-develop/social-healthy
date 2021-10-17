import { useEffect, useState } from 'react'
import Api from '../../util/Api';
import './conversation.css'

export default function Conversation({conversation, currentUser}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [chater, setChater] = useState({}) 

    useEffect(() => {
        const doctorId = conversation.members.find(m => m !== currentUser._id)
        const fetchChater = async () => {
            try {
                const chaterData = await Api.get(`/doctors/detail/${doctorId}`)
                setChater(chaterData.data)                
            } catch (error) {
                console.log(error);
            }
        }
        fetchChater()
    }, [conversation, currentUser])

    return (
        <div className="conversation">
            <img src={ chater.img ? chater.img  : PF + '/person/avatar-default.png'} alt="" className="conversationImg"/>
            <span className="conversationName">{chater.name}</span>
        </div>
    )
}
