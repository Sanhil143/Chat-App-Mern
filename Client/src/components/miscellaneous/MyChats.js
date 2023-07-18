import { AddIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getSender } from "../../config/ChatLogic";

import { ChatState } from "../../context/ChatProvider";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./GroupChatModal";

function MyChats({ fetchAgain }) {
  const { selectedChat, setSelectedChat, user, Toast, chats, setChats } =
    ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user ? user.token : ""}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_KEY}chat`,
        config
      );
      setChats(data);
    } catch (e) {
      Toast("Error Occured", "error", "Failed to load the chats");
    }
  };

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [fetchAgain, user]);
  return (
    <div>
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        h="100%"
        w={["95vw", "100%"]}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          display="flex"
          w="100%"
          alignItems={"center"}
          justifyContent="space-between"
          gap={["5px", "15px", "20px"]}
        >
          MyChats
          <GroupChatModal>
            <Button
              display={"flex"}
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              rightIcon={<AddIcon />}
            >
              New Group Chat
            </Button>
          </GroupChatModal>
        </Box>
        <Box
          display={"flex"}
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          w="100%"
          h="100%"
          bg="#3f0e40"
          borderRadius={"lg"}
          overflowY="hidden"
        >
          {chats ? (
            <Stack overflowY={"scroll"}>
              {chats?.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#1164a3" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                  display={"flex"}
                  gap="10px"
                >
                  <Avatar
                    mr={2}
                    size="sm"
                    cursor="pointer"
                    name={
                      !chat?.isGroupChat
                        ? getSender(user, chat?.users)
                        : chat?.chatName
                    }
                    src={
                      !chat?.isGroupChat
                        ? getSender(user, chat?.users)
                        : chat?.chatName
                    }
                  />
                  <Text>
                    {!chat?.isGroupChat
                      ? getSender(user, chat?.users)
                      : chat?.chatName}
                  </Text>
                  {/* <Text>
                    {getSenderFull(loggedUser, chat.users).status
                      ? "online"
                      : "offline"}
                  </Text> */}
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
    </div>
  );
}

export default MyChats;
