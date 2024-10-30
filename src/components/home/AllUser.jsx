import React, { useEffect, useState } from "react";
import { AddFriendIcon } from "../../assets/svg/AddFriendIcon";
import Title2 from "../utilities/Title2";
import { getDownloadURL, getStorage, ref as Ref } from "firebase/storage";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import AvaterImg from "../../assets/image/avarar.jpg";

const AllUser = () => {
  let [users, setUsers] = useState([]);
  let [cancelReq, setCancelReq] = useState([]);
  console.log(cancelReq);

  const user = useSelector((state) => state.login.user);

  const storage = getStorage();
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      let user = [];
      snapshot.forEach((item) => {
        if (item.key !== user.uid) {
          getDownloadURL(Ref(storage, item.key))
            .then((downloadURL) => {
              user.push({
                ...item.val(),
                id: item.key,
                photoURL: downloadURL,
              });
            })
            .catch((error) => {
              user.push({
                ...item.val(),
                id: item.key,
                photoURL: null,
              });
            })
            .then(() => {
              setUsers([...user]);
            });
        }
      });
    });
  }, [db, user.uid, storage]);

  const handleReqSend = (item) => {
    set(push(ref(db, "friendReqUserDetails/")), {
      senderName: user.displayName,
      senderID: user.uid,
      senderPhoto: user.photoURL ?? AvaterImg,
      recieverName: item.username,
      recieverID: item.id,
      recieverPhoto: item.photoURL ?? AvaterImg,
    });
  };

  useEffect(() => {
    const starCountRef = ref(db, "friendReqUserDetails/");
    onValue(starCountRef, (snapshot) => {
      const cancelReqList = [];
      snapshot.forEach((item) => {
        cancelReqList.push(item.val().senderID + item.val().recieverID);
      });
      setCancelReq(cancelReqList);
    });
  }, [db]);

  return (
    <div className="mt-7 px-7">
      <Title2 content="All users" />
      {users?.map((item, index) => (
        <div key={index} className="flex justify-between items-center my-4">
          <div className="flex gap-5 items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={item.photoURL || AvaterImg} />
            </div>
            <div className="">
              <h3>{item.username}</h3>
            </div>
          </div>
          <div className="">
            <button className="cursor-pointer">Cancel Request</button>
            <div onClick={() => handleReqSend(item)} className="cursor-pointer">
              <AddFriendIcon />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AllUser;
