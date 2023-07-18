import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuDivider,
  MenuItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Image,
  Heading,
  Input,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "../userAvatar/ProfileModal";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import { getSender } from "../../config/ChatLogic";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const navigate = useNavigate();
  const {
    user,
    Toast,
    chats,
    setChats,
    notification,
    setNotification,
    setSelectedChat,
  } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  //  <------------------------handleSearch---------------------------->
  async function handleSearch() {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_KEY}user/allUser?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResults(data);
    } catch (e) {
      Toast("Error Occured", "error", e.message);
    }
  }

  const accessChat = async (userId) => {
    console.log(userId);
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_KEY}chat`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) {
        setChats([...chats, data]);
      }
      onClose();
    } catch (e) {
      Toast("Error fetching the chats", "error", e.message);
    }
  };
  function logoutUser() {
    window.localStorage.clear();
    navigate("/");
  }
  return (
    <>
      <Box
        display={"flex"}
        bg="black"
        alignItems="center"
        w="100%"
        justifyContent={"space-between"}
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button bg="white" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text color="black" d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text
          display={["none", "none", "flex"]}
          fontSize={"2xl"}
          fontFamily="work sans"
        >
          <Box
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            color="white"
            borderRadius={"lg"}
            gap="20px"
          >
            <Image h="40px" src={logo} />
            <Heading fontSize="20px">Live-Chat</Heading>
          </Box>
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <Flex top="8px" position="relative">
                <Box
                  position="absolute"
                  right="-2px"
                  top="-2px"
                  bg="red"
                  color="white"
                  h="15px"
                  w="15px"
                  display={notification.length ? "flex" : "none"}
                  justifyContent="center"
                  alignItems="center"
                  p="8px"
                  borderRadius="50%"
                  fontSize="12px"
                >
                  {notification.length}
                </Box>

                <BellIcon fontSize={"2xl"} color="white" mt={1} />
              </Flex>
            </MenuButton>
            <MenuList>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              p={1}
              as={Button}
              bg="white"
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar
                size={"sm"}
                cursor="pointer"
                name={user?.name}
                src={user?.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderWidth={"1px"}>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" p={2}>
              <Input
                placeholder="Serach by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={() => handleSearch()}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResults?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
