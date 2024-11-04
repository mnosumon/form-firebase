import React, { useState } from "react";
import { Imoji } from "../../assets/svg/Imoji";
import { GallaryIcon } from "../../assets/svg/GallaryIcon";
import { useSelector } from "react-redux";
import AvaterImg from "../../assets/image/avarar.jpg";
import { getDatabase, push, ref, set } from "firebase/database";
import { date } from "yup";

const SendMessage = () => {
  const singleFriend = useSelector((state) => state.single.value);
  const user = useSelector((state) => state.login.user);
  const [text, setText] = useState("");
  const timeFunction = `${new Date().getFullYear()}-${
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
        time: timeFunction,
      });
    }
    setText("");
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
      <div className="w-full h-[500px] shadow-md bg-red-200 px-5 py-1 overflow-y-auto">
        <div className="mt-2 flex justify-end">
          <p className="w-3/5 bg-blue-400 font-mono px-2 py-1 rounded-md max-w-fit">
            Lorem ipsum sit amet consectetur adipisicing elit. Natus doloribus
            soluta ratione eveniet itaque accusantium, animi, asperiores sed,
            consectetur adipisicing elit. Repellendus quibusdam, saepe
            reprehenderit sapiente qui sequi nobis iste dolorum facilis quasi
            placeat reiciendis, porro minus voluptate perferendis illum ullam
            rerum praesentium.consectetur adipisicing elit. Repellendus
            quibusdam, saepe reprehenderit sapiente qui sequi nobis iste dolorum
            facilis quasi placeat reiciendis, porro minus voluptate perferendis
            illum ullam rerum praesentium.
          </p>
        </div>
        <div className="mt-2 flex justify-start">
          <p className="w-3/5 bg-slate-400 font-mono px-2 py-1 rounded-md max-w-fit">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
            doloribus soluta ratione eveniet itaque accusantium,
            animi,consectetur adipisicing elit. Repellendus quibusdam, saepe
            reprehenderit sapiente qui sequi nobis iste dolorum facilis quasi
            placeat reiciendis, porro minus voluptate perferendis illum ullam
            rerum praesentium.
          </p>
        </div>
        <div className="mt-2 flex justify-end">
          <p className="w-3/5 bg-blue-400 font-mono px-2 py-1 rounded-md max-w-fit">
            Lorem ipsum sit amet consectetur adipisicing elit. Natus doloribus
            soluta ratione eveniet itaque accusantium, animi, asperiores sed,
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repellendus quibusdam, saepe reprehenderit sapiente qui sequi nobis
            iste dolorum facilis quasi placeat reiciendis, porro minus voluptate
            perferendis illum ullam rerum praesentium.
          </p>
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
