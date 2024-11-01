import React, { useEffect, useState } from "react";
import Title2 from "../utilities/Title2";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import AvaterImg from "../../assets/image/avarar.jpg";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const user = useSelector((state) => state.login.user);
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      const friendsArr = [];
      snapshot.forEach((item) => {
        friendsArr.push({ ...item.val(), id: item.key });
      });
      setFriends(friendsArr);
    });
  }, [db]);
  return (
    <div className="mt-4 px-6">
      <Title2 content="Friends" />
      {friends?.map((item) => (
        <div key={item.id} className="flex justify-between items-center my-4">
          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              {user.uid === item.recieverID ? (
                <img src={item.senderPhoto || AvaterImg} />
              ) : (
                <img src={item.recieverPhoto || AvaterImg} />
              )}
            </div>
            <div className="">
              <h3 className="text-red-400">
                {user.uid === item.recieverID
                  ? item.senderName
                  : item.recieverName}
              </h3>
            </div>
          </div>
          <div className="flex gap-x-3">
            <button className="text-sm font-mono font-normal py-2 px-3 bg-[#4A81D3] text-white rounded-md">
              Message
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friends;
