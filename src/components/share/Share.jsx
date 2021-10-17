import "./share.css"
import {PermMedia, Label, Room, EmojiEmotions, Cancel} from "@material-ui/icons"
import { useContext,useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Api from "../../util/Api";
import storage from '../../firebase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const {user} = useContext(AuthContext)
    const desc = useRef()
    const [file, setFile] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        let newPost = {
            userId: user._id,
            description: desc.current.value
        }

        if (file) {
            console.log("upload file to firebase");
            var storageRef = ref(storage, `images/test/${file.name}`);
            var metaData = {
                contentType: 'image/*'
            };
            await uploadBytes(storageRef, file, metaData)
                .then((snapshot) => {
                    console.log('Uploaded successfully');
                })
                .catch((error) => error);

            await getDownloadURL(ref(storage, `images/test/${file.name}`))
                .then( async (url) => {
                    try {
                        let data = {
                            ...newPost,
                            img: url,
                            imgName: file.name,
                        }
                        console.log(data);
                        await Api.post("/posts/create", data)
                        window.location.reload()
                    } catch (error) {
                        console.log(error);
                    }
                })
        } else {
            await Api.post("/posts/create", newPost)
            window.location.reload()
        }
    }

    return (
        <div className="share">
            <form className="shareWrapper" onSubmit={handleSubmit}>
                <div className="shareTop">
                    <img src={user.profilePicture ? user.profilePicture : PF + "person/avatar-default.png"} alt="" className="shareProfileImg" />
                    <input 
                        placeholder={`${user.username} bạn đang nghĩ gì?`} 
                        type="text" 
                        className="shareInput" 
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" alt="" src={URL.createObjectURL(file)}/>
                        <Cancel className="shareCancelImg" onClick={() => { 
                            setFile(null);
                        }}/>
                    </div>    
                )}
                <div className="shareBottom" >
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="pomato" className="shareIcon"/>
                            <span className="shareOptionText">Hình ảnh/Video</span>
                            <input
                                style={{display: "none"}} 
                                type="file" 
                                id="file" 
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">Vị trí</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Cảm xúc</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Chia sẻ</button>
                </div>
            </form>
        </div>
    )
}

export default Share
