import React, { useEffect, useState } from "react";
import { AddFriendIcon } from "../../assets/svg/AddFriendIcon";
import Title2 from "../utilities/Title2";
import { getStorage, ref as Ref } from "firebase/storage";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";

const AllUser = () => {
  let [user, setUser] = useState([]);

  const userUid = useSelector((state) => state.login.user);
  const storage = getStorage();
  const db = getDatabase();

  // useEffect(() => {
  //   const starCountRef = ref(db, "users/");
  //   onValue(starCountRef, (snapshot) => {
  //     snapshot.forEach((item) => {
  //       console.log(item.val());
  //     });
  //   });
  // }, []);
  useEffect(() => {
    const userData = ref(db, "users/");
    let users = [];
    onValue(userData, (snapshot) => {
      snapshot.forEach((item) => {
        if (item.key !== userUid.uid) {
          getDownloadURL(Ref(storage, item.key))
            .then((downloadURL) => {
              users.push({
                ...item.val(),
                id: item.key,
                photoURL: downloadURL,
              });
            })
            .catch((error) => {
              users.push({
                ...item.val(),
                id: item.key,
                photoURL: null,
              });
            })
            .then(() => {
              setUser([...users]);
            });
        }
      });
    });
  }, [db, userUid.uid, storage]);
  return (
    <div className="mt-7 px-7">
      <Title2 content="All users" />

      <div className="flex justify-between items-center my-4">
        <div className="flex gap-5 items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img />
          </div>
          <div className="">
            <h3>dfgh</h3>
          </div>
        </div>
        <div className="">
          <AddFriendIcon />
        </div>
      </div>
    </div>
  );
};
export default AllUser;
