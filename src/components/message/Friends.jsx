import React, { useEffect, useState } from "react";
import Title2 from "../utilities/Title2";
import { getDatabase, ref, onValue } from "firebase/database";
import AvaterImg from "../../assets/image/avarar.jpg";
import { useSelector } from "react-redux";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const user = useSelector((state) => state.login.user);

  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      const friendsArr = [];
      snapshot.forEach((item) => {
        const friendData = item.val();
        if (
          (friendData.recieverID === user.uid ||
            friendData.senderID === user.uid) &&
          friendData.recieverID !== friendData.senderID
        ) {
          const friendInfo =
            friendData.senderID === user.uid
              ? {
                  name: friendData.recieverName,
                  photo: friendData.recieverPhoto,
                }
              : { name: friendData.senderName, photo: friendData.senderPhoto };

          friendsArr.push(friendInfo);
        }
      });
      setFriends(friendsArr);
    });
  }, [db, user.uid]);
  return (
    <div className="pt-7 px-7">
      <Title2 content="Friends" />
      {friends?.map((item, i) => (
        <div className="flex gap-5 items-center my-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={item.photo || AvaterImg} />
          </div>
          <div className="">
            <h3>{item.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friends;
