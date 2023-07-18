import {
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  FormControl,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
const init = {
  name: "",
  email: "",
  password: "",
  pic: "",
};

function SignUp() {
  const [show, setShow] = useState(false);
  const [formState, setFormState] = useState(init);

  const [picLoading, setPicLoading] = useState(false);
  const { Toast } = ChatState();

  const handleClick = () => setShow(!show);
  const postDetails = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      setPicLoading(true);
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFormState({
            ...formState,
            pic: data.url.toString(),
          });
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    }
  };

  async function handleChange(e) {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  }

  const { name, email, password } = formState;
  function handleSubmit() {
    axios
      .post("https://chatingapp4.onrender.com/user/signup", formState)
      .then((res) => {
        const { msg } = res.data;
        if (msg === "Register sucessfully") {
          Toast(msg, "success");
          return;
        }
        if (msg === "Please Enter all the fields") {
          Toast(msg, "warning");
          return;
        }
        if (msg === "User already exist") {
          Toast(msg, "error");
          return;
        }
      });
  }
  return (
    <VStack spacing={"5px"}>
      <FormControl id="name">
        <FormLabel>Name</FormLabel>
        <Input onChange={handleChange} name="name" value={name} />
      </FormControl>
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input onChange={handleChange} name="email" value={email} />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            onChange={handleChange}
            name="password"
            value={password}
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          name="pic"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        type="submit"
        colorScheme={"blue"}
        width="100%"
        onClick={handleSubmit}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default SignUp;
