import React, { useState } from "react";
import {
  MessageList,
  MessageInput,
  Thread,
  Window,
  useChannelActionContext,
  Avatar,
  useChannelStateContext,
  useChatContext,
} from "stream-chat-react";

import "./ChannelContent.css";

export const GiphyContext = React.createContext({});

const ChannelHeader = () => {
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  const MessagingHeader = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    if (channel.type === "messaging") {
      return (
        <div className="users-header-wrapper">
          {members.map(({ user }, i) => (
            <div key={i} className="user-header-multi">
              <Avatar
                image={user.image}
                name={user.fullName || user.id}
                size={32}
              />
              <p className="user-header-name">{user.fullName || user.id}</p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="channel-header-wrapper">
        <p className="channel-header-name"># {channel.data.name}</p>
      </div>
    );
  };

  return (
    <div>
      <MessagingHeader />
    </div>
  );
};

const ChannelContent = () => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();

  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }

    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div className="chat-content-container">
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

export default ChannelContent;
