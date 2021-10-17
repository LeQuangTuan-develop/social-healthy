import "./message.css";
import {format} from "timeago.js"
import { useEffect, useState } from "react";
import Api from "../../util/Api";

export default function Message({own, message}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState({})

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = own 
        ? await Api.get(`/users?userId=${message.senderId}`)
        : await Api.get(`/doctors/detail/${message.senderId}`)
        setUser(userData.data) 
      } catch (error) {
        console.log(error);
      }
    }
    getUser()
  }, [message, own])

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={own ? user.profilePicture ? user.profilePicture :  PF + "person/avatar-default.png" 
            : user.img ? user.img : PF + "person/avatar-default.png" }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
