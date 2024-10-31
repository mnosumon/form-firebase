import React, { useEffect, useState } from "react";
import Title2 from "../utilities/Title2";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const [friendList, setFriendList] = useState([]);
  const user = useSelector((state) => state.login.user);
  const db = getDatabase();
  useEffect(() => {
    const starCountRef = ref(db, "friendReqUserDetails/");
    onValue(starCountRef, (snapshot) => {
      const riendsReqArr = [];
      snapshot.forEach((item) => {
        if (user.uid === item.val().recieverID) {
          riendsReqArr.push({ ...item.val(), id: item.key });
        }
      });
      setFriendList(riendsReqArr);
    });
  }, [db, user.uid]);

  return (
    <div className="mt-4 px-6">
      <Title2 content="Friend Reques" />
      {friendList?.map((item, i) => (
        <div key={i} className="flex justify-between items-center my-4">
          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 rounded-full bg-[#D9D9D9]"></div>
            <div className="">
              <h3>{item.senderName}</h3>
            </div>
          </div>
          <div className="flex gap-x-3">
            <button className="text-sm font-serif font-normal py-1 px-2 bg-[#4A81D3] text-white rounded-md">
              Accept
            </button>
            <button className="text-sm font-serif font-normal py-1 px-2 bg-[#4A81D3] text-white rounded-md">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequest;
