import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";

import { Users } from "./";
import "./CreateChannel.css";

const ChannelNameInput = ({ channelName, setChannelName }) => {
  const handleChange = (event) => {
    setChannelName(event.target.value);
  };
  return (
    <div className="channel-name-wrapper">
      <div>
        <label htmlFor="">Channel Name:</label>
      </div>
      <input
        type="text"
        value={channelName}
        onChange={handleChange}
        placeholder="Enter channel name"
      />
    </div>
  );
};

const CreateChannel = ({ createType, setCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [channelName, setChannelName] = useState("");
  const [addedUsers, setAddedUsers] = useState([client.userID || ""]);
  const [errorMessage, setErrorMessage] = useState(""); 

  const createChannel = async () => {
    if (createType === 'team' && !channelName) {
        setErrorMessage("Channel name is required.");
        return;
    }
  
    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: addedUsers,
      });

      await newChannel.watch();

      setChannelName("");
      setCreating(false);
      setAddedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="create-channel-wrapper">
      <p className="create-channel-header">
        {createType === "team"
          ? "Create a New Channel"
          : "Start a Direct Message"}
      </p>
      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}

      {/* Display error message */}
      {errorMessage && <p style={{ color: "red", fontSize: "14px", marginBottom: "5px" }}>{errorMessage}</p>}

      <Users setAddedUsers={setAddedUsers} />
      <div>
        <button className="create-channel-button" onClick={createChannel}>
          {createType === "team" ? "Create Channel" : "Start Direct Chat"}
        </button>
      </div>
    </div>
  );
};

export default CreateChannel;
