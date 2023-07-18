import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  Image,
  TabPanels,
  Tabs,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import logo from "../assets/logo.png";
import BackgroundChange from "../components/miscellaneous/BackgroundChange";

function HomePage() {
  return (
    <Container maxW={"xl"} centerContent>
      <Box>
        <BackgroundChange />
      </Box>
      <Box
        display="flex"
        justifyContent={"center"}
        alignItems="center"
        w="100%"
        bg="black"
        color="white"
        m="40px 0 15px 0"
        borderRadius={"lg"}
        gap="20px"
        p={3}
      >
        <Image h="40px" src={logo} />
        <Heading fontSize="20px">Live-Chat</Heading>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth={"1px"}>
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab w="50%">Login</Tab>
            <Tab w="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;
