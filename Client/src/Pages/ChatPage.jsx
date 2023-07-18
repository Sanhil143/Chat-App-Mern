import { Box } from "@chakra-ui/react";
import React, { useState } from "react";

import ChatBox from "../components/miscellaneous/ChatBox";
import MyChats from "../components/miscellaneous/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";

function ChatPage() {
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      <SideDrawer />
      <Box
        display={"flex"}
        justifyContent="space-between"
        w="100%"
        p="10px"
        h="91.5vh"
      >
        <MyChats fetchAgain={fetchAgain} />
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </div>
  );
}

export default ChatPage;
