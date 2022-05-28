import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import "stream-chat-react/dist/css/index.css";
import "./App.css";

import { ChannelListContainer, ChannelContainer, Auth } from "./components";

const cookies = new Cookies();

const apiKey = "exq84mymj3f8";
const authToken = cookies.get("token");
const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      avatar: cookies.get("avatar"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    authToken
  );
}

const App = () => {
  const [createType, setCreateType] = useState();
  const [creating, setCreating] = useState();

  if (!authToken) return <Auth />;

  return (
    <div className="app">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          creating={creating}
          setCreating={setCreating}
          setCreateType={setCreateType}
        />
        <ChannelContainer
          createType={createType}
          creating={creating}
          setCreating={setCreating}
        />
      </Chat>
    </div>
  );
};

export default App;
