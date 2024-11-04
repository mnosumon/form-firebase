import React from "react";

import SendMessage from "../../components/message/SendMessage";
import Friends from "../../components/home/Friends";

const Message = () => {
  return (
    <div className="bg-[#ffffff] grid grid-cols-[1fr,3fr] gap-x-5">
      <div className="bg-[#FBFBFB]">
        <Friends />
      </div>
      <div className="">
        <SendMessage />
      </div>
    </div>
  );
};

export default Message;
