import React, { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";

import "./Users.css";

const UserList = ({ user, setAddedUsers }) => {
  const [added, setAdded] = useState(false);

  const handleAddUser = () => {
    if (!added) {
      setAddedUsers((preUsers) => [...preUsers, user.id]);
    } else {
      setAddedUsers((preUsers) =>
        preUsers.filter((preUser) => preUser !== user.id)
      );
    }
    setAdded((prevAdded) => !prevAdded);
  };

  return (
    <div className="user-item-wrapper">
      <div className="user-item-detail-wrapper">
        <Avatar image={user.image} name={user.fullName || user.id} size={30} />
        <p>{user.fullName || user.id}</p>
      </div>
      <button
        className={added ? "user-added-button" : "user-add-button"}
        onClick={handleAddUser}
      >
        {added ? "Added!" : "Add"}
      </button>
    </div>
  );
};

const Users = ({ setAddedUsers }) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [listEmpty, setListEmpty] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 6 }
        );
        data.users.length ? setUsers(data.users) : setListEmpty(true);
      } catch (e) {
        console.log(e);
      }
    };
    if (client) getUsers();
  }, [client]);

  return (
    <div>
      <div>Users</div>
      {listEmpty && <div>No users found</div>}
      <div className="users-container">
        {users.map((user) => (
          <UserList key={user.id} user={user} setAddedUsers={setAddedUsers} />
        ))}
      </div>
    </div>
  );
};

export default Users;
