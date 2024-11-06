import React, { useEffect, useState } from "react";
import { Imoji } from "../../assets/svg/Imoji";
import { GallaryIcon } from "../../assets/svg/GallaryIcon";
import { useSelector } from "react-redux";
import AvaterImg from "../../assets/image/avarar.jpg";
import { getDatabase, push, ref, set } from "firebase/database";
import { onValue } from "firebase/database";
import { formatDistance, subDays } from "date-fns";
import Nuture01 from "../../assets/image/nutute01.jpg";

const SendMessage = () => {
  const singleFriend = useSelector((state) => state.single.value);
  const user = useSelector((state) => state.login.user);
  const [text, setText] = useState("");
  const [message, setMessage] = useState([]);
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
        <div className="ml-auto mt-2 flex flex-col items-end">
          <div className="max-w-[60%] rounded-md overflow-hidden">
            <img
              className="w-full h-auto object-cover"
              src={Nuture01}
              alt="Nuture01"
            />
          </div>
        </div>
      </div>
      <div className="bg-[#F5F5F5] shadow-md rounded-b-md">
        <div className="w-3/5 mx-auto flex justify-between items-center py-4">
          <div className="flex justify-between items-center w-[10%] cursor-pointer">
            <Imoji />
            <GallaryIcon />
          </div>
          <div className="w-3/4">
            <input
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
