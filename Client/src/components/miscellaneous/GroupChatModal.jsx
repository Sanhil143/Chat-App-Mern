import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

function GroupChatModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { Toast, user, chats, setChats } = ChatState();
  async function handleSearch(query) {
    if (!query) {
      return;
    }
    setSearch(query);

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_KEY}user/allUser?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
    } catch (e) {
      Toast("Error Occured!", "error", "Failed to Load the Search Results");
    }
  }
  function handleGroup(userToAdd) {
    if (selectedUsers.includes(userToAdd)) {
      Toast("User already added", "warning");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  }
  function handleDelete(user) {
    setSelectedUsers(selectedUsers.filter((item) => item._id !== user._id));
  }
  async function handleSubmit() {
    if (!groupChatName || !selectedUsers) {
      Toast("please fill all fields", "warning");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_KEY}chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      Toast("New Group Chat Created!", "success");
    } catch (e) {
      Toast("Failed to create the Chat", "error", e.message);
    }
  }

  return (
    <div>
      <>
        <span onClick={onOpen}>{children}</span>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay></ModalOverlay>
          <ModalContent>
            <ModalHeader
              fontSize={"35px"}
              fontFamily="Work sans"
              display={"flex"}
              justifyContent="center"
            >
              Create Group Chat
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody display={"flex"} flexDir="column" alignItems={"center"}>
              <FormControl>
                <Input
                  placeholder="Chat Name"
                  mb={3}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Add user eg. john,jane"
                  mb={1}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>
              <Box w="100%" display="flex" flexWrap="wrap">
                {selectedUsers.map((u) => (
                  <UserBadgeItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleDelete(u)}
                  />
                ))}
              </Box>
              {loading ? (
                <div>Loading...</div>
              ) : (
                searchResult
                  ?.slice(0, 4)
                  .map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))
              )}
            </ModalBody>
            <Button onClick={handleSubmit} colorScheme="blue">
              Create Chat
            </Button>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
}

export default GroupChatModal;
