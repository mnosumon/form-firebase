import React, { useEffect, useState } from "react";
import { AddFriendIcon } from "../../assets/svg/AddFriendIcon";
import Title2 from "../utilities/Title2";
import { getDownloadURL, getStorage, ref as Ref } from "firebase/storage";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import AvaterImg from "../../assets/image/avarar.jpg";

const AllUser = () => {
  let [users, setUsers] = useState([]);
  let [cancelReq, setCancelReq] = useState([]);
  let [cancelReqFind, setCancelReqFind] = useState([]);
  let [friends, setFriends] = useState([]);

  const user = useSelector((state) => state.login.user);

  const storage = getStorage();
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      let userList = [];
      snapshot.forEach((item) => {
        if (item.key !== user.uid) {
          getDownloadURL(Ref(storage, item.key))
            .then((downloadURL) => {
              userList.push({
                ...item.val(),
                id: item.key,
                photoURL: downloadURL,
              });
            })
            .catch((error) => {
              userList.push({
                ...item.val(),
                id: item.key,
                photoURL: null,
              });
            })
            .then(() => {
              setUsers([...userList]);
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
      const cancelReqFind = [];
      snapshot.forEach((item) => {
        cancelReqList.push(item.val().senderID + item.val().recieverID);
        cancelReqFind.push({ ...item.val(), id: item.key });
      });
      setCancelReq(cancelReqList);
      setCancelReqFind(cancelReqFind);
    });
  }, [db]);

  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      const friend = [];
      snapshot.forEach((item) => {
        friend.push({ ...item.val(), id: item.key });
      });
      setFriends(friend);
    });
  }, [db]);

  const handleCancelReq = (data) => {
    const findData = cancelReqFind.find(
      (item) => item.senderID === user.uid && item.recieverID === data.id
    );
    if (findData) {
      remove(ref(db, "friendReqUserDetails/" + findData.id));
    }
  };

  // jodi (User === reciever) hoy tahole sender ke dekhate cacchi na

  // useEffect(() => {
  //   const starCountRef = ref(db, "friendReqUserDetails/");
  //   onValue(starCountRef, (snapshot) => {
  //     const userEmpty = [];
  //     snapshot.forEach((item) => {
  //       const datas = item.val();
  //       // userEmpty.push(datas.filter((data) => data.recieverID !== user.uid));
  //       if (datas.recieverID === user.uid) {
  //         userEmpty.push(datas);
  //       }
  //     });
  //     setURequestedUser(userEmpty);
  //   });
  // }, [db, user.uid]);

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
          {console.log(friends.id + item.id)}
          <div className="">
            {cancelReq.includes(item.id + user.uid) ||
            cancelReq.includes(user.uid + item.id) ? (
              <button
                onClick={() => handleCancelReq(item)}
                className="cursor-pointer bg-orange-500 px-2 py-1 text-sm rounded-md"
              >
                Cancel Request
              </button>
            ) : (
              <div
                onClick={() => handleReqSend(item)}
                className="cursor-pointer"
              >
                <AddFriendIcon />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default AllUser;
