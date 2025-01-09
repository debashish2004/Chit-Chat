// import React, { useEffect, useRef, useState } from "react";
// import "./chat.css";
// import EmojiPicker from "emoji-picker-react";
// import {
//   onSnapshot,
//   doc,
//   arrayUnion,
//   updateDoc,
//   getDoc,
//   waitForPendingWrites,
// } from "@firebase/firestore";
// import { db } from "../../lib/firebase";
// import { useChatStore } from "../../lib/chatStore";
// import { useUserStore } from "../../lib/userStore";

// const Chat = () => {
//   const [chat, setChat] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [text, setText] = useState("");
//   const [img, setImg] = useState({
//     file: null,
//     url: "",
//   });

//   const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
//   const { currentUser } = useUserStore();

//   const endRef = useRef(null);

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   useEffect(() => {
//     const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
//       setChat(res.data());
//     });
//     return () => {
//       unSub();
//     };
//   }, [chatId]);

//   console.log(chat);

//   const handleEmoji = (e) => {
//     setText((prev) => prev + e.emoji);
//     setOpen(false);
//   };


//   const handleImg = (e) => {
//     if (e.target.files[0]) {
//       setImg({
//         file: e.target.files[0],
//         url: URL.createObjectURL(e.target.files[0]),
//       });
//     }
//   };

//   const handleSend = async () => {
//     if (text === "") return;

//     let imgUrl = null

//     try {

//       if(img.file) {
//         imgUrl = await upload(img.file)
//       }

//       await updateDoc(doc(db, "chats", chatId), {
//         messages: arrayUnion({
//           senderId: currentUser.id,
//           text,
//           createAt: new Date(),
//           ...(imgUrl && {img : imgUrl})
//         }),
//       });

//       const userIDs = [currentUser.id, user.id];

//       userIDs.forEach(async (id) => {
//         const userChatsRef = doc(db, "userChats", currentUser.id);
//         const userChatsSnapshot = await getDoc(userChatsRef);

//         if (userChatsSnapshot.exists()) {
//           const userChatsData = userChatsSnapshot.data();

//           const chatIndex = userChatsData.chats.findIndex(
//             (c) => c.chatId === chatId
//           );

//           userChatsData.chats[chatIndex].lastMessage = text;
//           userChatsData.chats[chatIndex].isSeen =
//             id === currentUser.id ? true : false;
//           userChatsData.chats[chatIndex].updatedAt = Date.now();

//           await updateDoc(userChatsRef, {
//             chats: userChatsData.chats,
//           });
//         }
//       });
//       setText("");
//     } catch (err) {
//       console.log(err);
//     }

//     setImg({
//       file: null,
//       url: "" 
//     });
//     setText("");
//   };
  
//   console.log(text);
//   return (
//     <div className="chat">
//       <div className="top">
//         <div className="user">
//         <img
//           src={
//             currentUser.avatar
//               ? `data:image/png;base64,${user.avatar}` // Assuming the Base64 is a PNG
//               : "./avatar.png"
//           }
//           alt=""
//         />
//           <div className="texts">
//             <span>{user?.username}</span>
//             <p>{user?.about}</p>
//           </div>
//         </div>
//         <div className="icons">
//           <img src="./phone.png" alt="" />
//           <img src="./video.png" alt="" />
//           <img src="./info.png" alt="" />
//         </div>
//       </div>
//       <div className="center">
//         {chat?.messages?.map((message) => (
//           <div className={message.senderId === currentUser?.id ? "message own" : "message"} key={message?.createAt}>
//             <div className="texts">
//               <p>{message.text}</p>
//             </div>
//           </div>
//         ))}
//         {img.url && (<div className="message own">
//           <div className="texts">
//             <img src={img.url} alt="" />
//           </div>
//         </div>)}
//         <div ref={endRef}></div>
//       </div>
//       <div className="bottom">
//         <div className="icons">
//           <label htmlFor="file">
//               <img src="./img.png" alt="" />
//           </label>
//           <input type="file" id="file" style={{display:"none"}} onChange={handleImg} />
//           <img src="./camera.png" alt="" />
//           <img src="./mic.png" alt="" />
//         </div>
//         <input
//           type="text"
//           placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "You cannot send a message." : "Type a message"}
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           disabled={isCurrentUserBlocked || isReceiverBlocked}
//         />
//         <div className="emoji">
//           <img
//             src="./emoji.png"
//             alt=""
//             onClick={() => setOpen((prev) => !prev)}
//           />
//           <div className="picker">
//             <EmojiPicker open={open} onEmojiClick={handleEmoji} />
//           </div>
//         </div>
//         <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;


// import React, { useEffect, useRef, useState } from "react";
// import "./chat.css";
// import EmojiPicker from "emoji-picker-react";
// import {
//   onSnapshot,
//   doc,
//   arrayUnion,
//   updateDoc,
//   getDoc,
// } from "@firebase/firestore";
// import { db } from "../../lib/firebase";
// import { useChatStore } from "../../lib/chatStore";
// import { useUserStore } from "../../lib/userStore";

// const Chat = () => {
//   const [chat, setChat] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [text, setText] = useState("");
//   const [img, setImg] = useState(null);

//   const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
//   const { currentUser } = useUserStore();

//   const endRef = useRef(null);

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   useEffect(() => {
//     const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
//       setChat(res.data());
//     });
//     return () => {
//       unSub();
//     };
//   }, [chatId]);

//   const handleEmoji = (e) => {
//     setText((prev) => prev + e.emoji);
//     setOpen(false);
//   };

//   const handleImg = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImg(reader.result); // Base64 string
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSend = async () => {
//     if (text === "" && !img) return;

//     try {
//       await updateDoc(doc(db, "chats", chatId), {
//         messages: arrayUnion({
//           senderId: currentUser.id,
//           text,
//           createAt: new Date(),
//           ...(img && { img }),
//         }),
//       });

//       const userIDs = [currentUser.id, user.id];

//       userIDs.forEach(async (id) => {
//         const userChatsRef = doc(db, "userChats", id);
//         const userChatsSnapshot = await getDoc(userChatsRef);

//         if (userChatsSnapshot.exists()) {
//           const userChatsData = userChatsSnapshot.data();

//           const chatIndex = userChatsData.chats.findIndex(
//             (c) => c.chatId === chatId
//           );

//           if (chatIndex !== -1) {
//             userChatsData.chats[chatIndex].lastMessage = text || "[Image]";
//             userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
//             userChatsData.chats[chatIndex].updatedAt = Date.now();

//             await updateDoc(userChatsRef, {
//               chats: userChatsData.chats,
//             });
//           }
//         }
//       });

//       setText("");
//       setImg(null);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="chat">
//       <div className="top">
//         <div className="user">
//           <img
//             src={
//               currentUser.avatar
//                 ? `data:image/png;base64,${user.avatar}`
//                 : "./avatar.png"
//             }
//             alt=""
//           />
//           <div className="texts">
//             <span>{user?.username}</span>
//             <p>{user?.about}</p>
//           </div>
//         </div>
//         <div className="icons">
//           <img src="./phone.png" alt="" />
//           <img src="./video.png" alt="" />
//           <img src="./info.png" alt="" />
//         </div>
//       </div>
//       <div className="center">
//         {chat?.messages?.map((message) => (
//           <div
//             className={
//               message.senderId === currentUser?.id ? "message own" : "message"
//             }
//             key={message?.createAt}
//           >
//             <div className="texts">
//               {message.img ? (
//                 <img src={message.img} alt="Sent" />
//               ) : (
//                 <p>{message.text}</p>
//               )}
//             </div>
//           </div>
//         ))}
//         <div ref={endRef}></div>
//       </div>
//       <div className="bottom">
//         <div className="icons">
//           <label htmlFor="file">
//             <img src="./img.png" alt="" />
//           </label>
//           <input
//             type="file"
//             id="file"
//             style={{ display: "none" }}
//             onChange={handleImg}
//           />
//           <img src="./camera.png" alt="" />
//           <img src="./mic.png" alt="" />
//         </div>
//         <input
//           type="text"
//           placeholder={
//             isCurrentUserBlocked || isReceiverBlocked
//               ? "You cannot send a message."
//               : "Type a message"
//           }
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           disabled={isCurrentUserBlocked || isReceiverBlocked}
//         />
//         <div className="emoji">
//           <img
//             src="./emoji.png"
//             alt=""
//             onClick={() => setOpen((prev) => !prev)}
//           />
//           <div className="picker">
//             <EmojiPicker open={open} onEmojiClick={handleEmoji} />
//           </div>
//         </div>
//         <button
//           className="sendButton"
//           onClick={handleSend}
//           disabled={isCurrentUserBlocked || isReceiverBlocked}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;



// Import necessary modules
import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import {
  onSnapshot,
  doc,
  arrayUnion,
  updateDoc,
  getDoc
} from "@firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";

const Chat = () => {
  const [chat, setChat] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    base64: "",
  });

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const { currentUser } = useUserStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 800;
          const maxHeight = 800;
          let width = img.width;
          let height = img.height;
  
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height *= maxWidth / width;
              width = maxWidth;
            } else {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
  
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
  
          const base64String = canvas.toDataURL("image/jpeg", 0.3).split(",")[1];
          resolve(base64String);
        };
  
        img.onerror = reject;
        img.src = reader.result;
      };
  
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  const handleImg = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
  
      // Compress and convert the image to Base64 before setting the state
      fileToBase64(file).then((compressedBase64) => {
        setImg({
          file,
          base64: `data:image/jpeg;base64,${compressedBase64}`, // Add the proper data URI scheme
        });
      }).catch((error) => {
        console.error('Error compressing the image:', error);
      });
    }
  };
  const handleSend = async () => {
    if (text === "" && !img.base64) return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createAt: new Date(),
          ...(img.base64 && { img: img.base64 }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      for (const id of userIDs) {
        const userChatsRef = doc(db, "userChats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text || "Image";
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      }

      setText("");
      setImg({ file: null, base64: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img
            src={
              currentUser.avatar
                ? `data:image/png;base64,${user.avatar}` // Assuming the Base64 is a PNG
                : "./avatar.png"
            }
            alt=""
          />
          <div className="texts">
            <span>{user?.username}</span>
            <p>{user?.about}</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message) => (
          <div
            className={
              message.senderId === currentUser?.id ? "message own" : "message"
            }
            key={message?.createAt}
          >
            <div className="texts">
              {message.img && <img src={message.img} alt="sent" />}
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {img.base64 && (
          <div className="message own">
            <div className="texts">
              <img src={img.base64} alt="preview" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You cannot send a message."
              : "Type a message"
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <div className="picker">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>
        <button
          className="sendButton"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
