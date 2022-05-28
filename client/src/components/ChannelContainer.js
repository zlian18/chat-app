import React from "react";
import { Channel, MessageTeam } from "stream-chat-react";

import { CreateChannel, ChannelContent } from "./";

import "./ChannelContainer.css";

const ChannelContainer = ({ createType, creating, setCreating }) => {
  if (creating) {
    return (
      <div>
        <CreateChannel createType={createType} setCreating={setCreating} />
      </div>
    );
  }

  const EmptyChannel = () => (
    <div className="empty-channel-message">
      <p>This is the start of your chat history, enter some text to send!</p>
    </div>
  );

  return (
    <div className="chat-content-container-wrapper">
      <Channel
        EmptyStateIndicator={EmptyChannel}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelContent />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
