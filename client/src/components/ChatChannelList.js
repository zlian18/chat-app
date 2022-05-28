import React from "react";

import "./ChatChannelList.css";

const ChatChannelList = ({
  children,
  error,
  loading,
  type,
  creating,
  setCreating,
  setCreateType,
}) => {
  if (error) {
    return type === "team" ? (
      <div>
        <p className="error-loading-text">
          Connection Error, please try again!
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <p className="error-loading-text">
        {type === "team" ? "Channel" : "Messages"} Loading...
      </p>
    );
  }

  const AddChannel = ({ type, setCreating, setCreateType }) => {
    const AddChannelHandler = () => {
      setCreateType(type);
      setCreating(true);
    };

    return (
      <div className="add-chat" onClick={AddChannelHandler}>
        <p>+</p>
      </div>
    );
  };

  return (
    <div className="channel-type-container">
      <div className="channel-type-header">
        <p className="channel-type">
          {type === "team" ? "Channels" : "Direct Messages"}
        </p>
        <AddChannel
          type={type === "team" ? "team" : "messaging"}
          creating={creating}
          setCreating={setCreating}
          setCreateType={setCreateType}
        />
      </div>
      {children}
    </div>
  );
};

export default ChatChannelList;
