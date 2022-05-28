import React from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChatChannelList, ChatChannelPreview } from "./";

import "./ChannelListContainer.css";
import LogOutIcon from "../assests/logout.png";

const cookies = new Cookies();

const Logout = ({ logout }) => (
  <div className="logout-container" onClick={logout}>
    <img src={LogOutIcon} alt="Logout" width="18" />
  </div>
);

const ServerName = () => <h2 className="server-name">Chats</h2>;

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContainer = ({ creating, setCreating, setCreateType }) => {
  const logout = () => {
    cookies.remove("token");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("userId");
    cookies.remove("avatar");
    cookies.remove("hashedPassword");

    window.location.reload();
  };

  const { client } = useChatContext();
  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <div className="channel-list-wrapper">
        <div className="chat-list-header">
          <ServerName />
          <Logout logout={logout} />
        </div>
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <ChatChannelList
              {...listProps}
              type="team"
              creating={creating}
              setCreating={setCreating}
              setCreateType={setCreateType}
            />
          )}
          Preview={(previewProps) => (
            <ChatChannelPreview
              {...previewProps}
              type="team"
              setCreating={setCreating}
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <ChatChannelList
              {...listProps}
              type="messaging"
              creating={creating}
              setCreating={setCreating}
              setCreateType={setCreateType}
            />
          )}
          Preview={(previewProps) => (
            <ChatChannelPreview
              {...previewProps}
              type="messaging"
              setCreating={setCreating}
            />
          )}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
