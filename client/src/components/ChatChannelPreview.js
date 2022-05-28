import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";

import "./ChatChannelPreview.css";

const ChatChannelPreview = ({
  setActiveChannel,
  setCreating,
  channel,
  type,
}) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p># {channel?.data?.name || channel?.data?.id}</p>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    return (
      <div className="channel-list-messages">
        <div>
          <Avatar
            image={members[0]?.user?.image}
            name={members[0]?.user?.fullName || members[0]?.user?.id}
            size={24}
          />
        </div>
        <div>
          <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
        </div>
      </div>
    );
  };

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "preview-wrapper-selected"
          : "preview-wrapper"
      }
      onClick={() => {
        setCreating(false);
        setActiveChannel(channel);
      }}
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default ChatChannelPreview;
