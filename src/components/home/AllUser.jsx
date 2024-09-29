import React, { useEffect, useState } from "react";
import { AddFriendIcon } from "../../assets/svg/AddFriendIcon";
import Title2 from "../utilities/Title2";
import { getDownloadURL, getStorage, ref as Ref } from "firebase/storage";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";
import AvaterImg from "../../assets/image/avarar.jpg";
const AllUser = () => {
  let [users, setUsers] = useState([]);
  console.log(users);

  const userUid = useSelector((state) => state.login.user);
  const storage = getStorage();
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      let user = [];
      snapshot.forEach((item) => {
        if (item.key !== userUid.uid) {
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
  }, [db, userUid.uid, storage]);

  return (
    <div className="mt-7 px-7">
      <Title2 content="All users" />
      {users?.map((item, index) => (
        <div className="flex justify-between items-center my-4">
          <div className="flex gap-5 items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={item.photoURL || AvaterImg} />
            </div>
            <div className="">
              <h3>{item.username}</h3>
            </div>
          </div>
          <div className="">
            <AddFriendIcon />
          </div>
        </div>
      ))}
    </div>
  );
};
export default AllUser;
