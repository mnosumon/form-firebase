import React, { useEffect, useRef, useState } from "react";
import { Imoji } from "../../assets/svg/Imoji";
import { GallaryIcon } from "../../assets/svg/GallaryIcon";
import { useSelector } from "react-redux";
import AvaterImg from "../../assets/image/avarar.jpg";
import { getDatabase, push, ref, set } from "firebase/database";
import { onValue } from "firebase/database";
import { formatDistance, subDays } from "date-fns";
import Nuture01 from "../../assets/image/nutute01.jpg";
import Nuture02 from "../../assets/image/nutute02.jpg";
import EmojiPicker from "emoji-picker-react";
import {
  getStorage,
  ref as Ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const SendMessage = () => {
  const singleFriend = useSelector((state) => state.single.value);
  const user = useSelector((state) => state.login.user);
  const [text, setText] = useState("");
  const [emojiShow, setEmojiShow] = useState(false);
  const [message, setMessage] = useState([]);
  const scrollRef = useRef();
  const mediaSentRef = useRef();
  const storage = getStorage();

  const timeSystem = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`;

  const db = getDatabase();

  const handleMessage = () => {
    if (singleFriend?.status === "single") {
      set(push(ref(db, "singleMessage/")), {
        whoSenderId: user.uid,
        whoSenderName: user.displayName,
        whoRecieverId: singleFriend.id,
        whoRecieverName: singleFriend.name,
        text: text,
        time: timeSystem,
      });
    }
    setText("");
  };

  useEffect(() => {
    const starCountRef = ref(db, "singleMessage/");
    onValue(starCountRef, (snapshot) => {
      const singleFriendArr = [];
      snapshot.forEach((item) => {
        const datas = item.val();
        if (
          (user.uid === datas.whoSenderId &&
            singleFriend.id === datas.whoRecieverId) ||
          (user.uid === datas.whoRecieverId &&
            singleFriend.id === datas.whoSenderId)
        ) {
          singleFriendArr.push(datas);
        }
      });
      setMessage(singleFriendArr);
    });
  }, [db, user.uid, singleFriend]);

  const handleEmojiShow = () => {
    setEmojiShow(!emojiShow);
  };
  const handleEnterBtn = (e) => {
    if (e.key == "Enter") {
      handleMessage();
    }
  };
  const handleEmojiPicker = (data) => {
    setText(text + data.emoji);
    setEmojiShow(false);
  };
  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // }, [message]);

  useEffect(() => {
    if (message.length > 0) {
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 1000);
    }
  }, [message]);

  const handleMediaSent = (e) => {
    const mediaFile = e.target.files[0];
    const storageRef = Ref(
      storage,
      `${user.displayName} = mediaFolder/ ${mediaFile}`
    );
    const uploadTask = uploadBytesResumable(storageRef, mediaFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (singleFriend?.status === "single") {
            set(push(ref(db, "singleMessage/")), {
              whoSenderId: user.uid,
              whoSenderName: user.displayName,
              whoRecieverId: singleFriend.id,
              whoRecieverName: singleFriend.name,
              text: text,
              image: downloadURL,
              time: timeSystem,
            });
          }
          setText("");
        });
      }
    );
  };

  return (
    <div className="pt-2 pr-5">
      <div className="bg-[#232323] flex items-center gap-x-5 px-10 py-3 rounded-t-md">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={singleFriend.photo || AvaterImg} />
        </div>
        <div className="">
          <h3 className="text-white">{singleFriend.name}</h3>
        </div>
      </div>
      <div className="h-[500px] shadow-md bg-red-200 px-5 pb-2 overflow-y-auto">
        {singleFriend?.status === "single"
          ? message.map((item, i) => (
              <div ref={scrollRef} key={i}>
                {item.whoSenderId === user.uid ? (
                  <div>
                    {item.image ? (
                      <div className="ml-auto mt-2 flex flex-col items-end">
                        <div className="max-w-[60%] rounded-md overflow-hidden">
                          <img
                            className="w-full h-auto object-cover"
                            src={item.image}
                            alt="Nuture01"
                          />
                        </div>
                        <span className="text-xs text-[#4d4d4d]">
                          {formatDistance(item.time, new Date(), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    ) : (
                      <div className="ml-auto mt-2 flex flex-col items-end">
                        <p className="max-w-[60%] bg-blue-400 font-sans px-2 py-1 rounded-md break-words">
                          {item.text}
                        </p>
                        <span className="text-xs text-[#4d4d4d]">
                          {formatDistance(item.time, new Date(), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="">
                    {item.image ? (
                      <div className="mr-auto mt-2 flex flex-col items-start">
                        <div className="max-w-[60%] rounded-md overflow-hidden">
                          <img
                            className="w-full h-auto object-cover"
                            src={item.image}
                            alt="Nuture01"
                          />
                        </div>
                        <span className="text-xs text-[#4d4d4d]">
                          {formatDistance(item.time, new Date(), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    ) : (
                      <div className="mr-auto mt-2 flex flex-col items-start">
                        <p className="max-w-[60%] bg-slate-400 font-sans px-2 py-1 rounded-md break-words">
                          {item.text}
                        </p>
                        <span className="text-xs text-[#4d4d4d]">
                          {formatDistance(item.time, new Date(), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          : ""}
      </div>
      <div className="bg-[#F5F5F5] shadow-md rounded-b-md">
        <div className="w-3/5 mx-auto flex justify-between items-center py-4">
          <div className="flex justify-between items-center w-[10%] cursor-pointer">
            <div className="relative">
              {emojiShow && (
                <div className="absolute left-0 bottom-10">
                  <EmojiPicker onEmojiClick={handleEmojiPicker} />
                </div>
              )}
              <div onClick={handleEmojiShow} className="">
                <Imoji />
              </div>
            </div>
            <div className="">
              <div onClick={() => mediaSentRef.current.click()} className="">
                <GallaryIcon />
              </div>
              <input
                onChange={handleMediaSent}
                ref={mediaSentRef}
                hidden
                type="file"
              />
            </div>
          </div>
          <div className="w-3/4">
            <input
              onKeyUp={handleEnterBtn}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full py-3 px-4 outline-none"
              placeholder="type something"
              type="text"
            />
          </div>
          <div className="w-[10%]">
            <button
              onClick={handleMessage}
              className="text-sm font-mono font-normal py-3 px-8 bg-[#4A81D3] text-white rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
