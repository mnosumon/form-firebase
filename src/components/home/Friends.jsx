import React, { useEffect, useState } from "react";
import Title2 from "../utilities/Title2";
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import AvaterImg from "../../assets/image/avarar.jpg";
import { Link, useLocation } from "react-router-dom";
import { singleFriend } from "../../features/slice/activeSingleSlice/ActiveSingleSlice";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const user = useSelector((state) => state.login.user);
  const db = getDatabase();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      const friendsArr = [];
      snapshot.forEach((item) => {
        if (
          user.uid === item.val().senderID ||
          user.uid === item.val().recieverID
        ) {
          friendsArr.push({ ...item.val(), id: item.key });
        }
      });
      setFriends(friendsArr);
    });
  }, [db]);

  const handleActiveAndDispatch = (data) => {
    setSelectedId(data.id);

    if (user.uid === data.recieverID) {
      dispatch(
        singleFriend({
          status: "single",
          id: data.senderID,
          name: data.senderName,
          photo: data.senderPhoto,
        })
      );
      localStorage.setItem(
        "single",
        JSON.stringify({
          status: "single",
          id: data.senderID,
          name: data.senderName,
          photo: data.senderPhoto,
        })
      );
    } else {
      dispatch(
        singleFriend({
          status: "single",
          id: data.recieverID,
          name: data.recieverName,
          photo: data.recieverPhoto,
        })
      );
      localStorage.setItem(
        "single",
        JSON.stringify({
          status: "single",
          id: data.recieverID,
          name: data.recieverName,
          photo: data.recieverPhoto,
        })
      );
    }
  };

  return (
    <div className="mt-4 px-6">
      <Title2 content="Friends" />
      {friends?.map((item) => (
        <div
          key={item.id}
          onClick={() => handleActiveAndDispatch(item)}
          className={`flex justify-between items-center my-4 rounded-md ${
            selectedId === item.id ? "bg-green-300" : "bg-transparent"
          }  ${
            location.pathname === "/message"
              ? "cursor-pointer hover:bg-green-300 px-2 py-1"
              : ""
          }`}
        >
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
            {location.pathname == "/" ? (
              <Link
                to="/message"
                className="text-sm font-mono font-normal py-2 px-3 bg-[#4A81D3] text-white rounded-md"
              >
                Message
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friends;
