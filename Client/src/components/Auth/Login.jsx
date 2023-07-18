import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";
const init = {
  email: "",
  password: "",
};
function Login() {
  const [show, setShow] = useState(false);
  const [formState, setFormState] = useState(init);
  const { Toast } = ChatState();
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }
  const { email, password } = formState;
  function handleSubmit() {
    axios
      .post("https://chatingapp4.onrender.com/user/login", formState)
      .then((res) => {
        const { msg, data } = res.data;
        console.log(msg);
        if (msg === "login successfully") {
          Toast(msg, "success");
          localStorage.setItem("userInfo", JSON.stringify(data));
          navigate("/chat");
          return;
        }
        if (msg === "Incorrect Password") {
          Toast(msg, "error");
          return;
        }
        if (msg === "Email not registred") {
          Toast(msg, "error");
          return;
        }
        if (msg === "Please Enter all the fields") {
          Toast(msg, "warning");
          return;
        }
      });
  }
  return (
    <VStack spacing={"5px"}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input name="email" value={email} onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            name="password"
            value={password}
            onChange={handleChange}
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

      <Button colorScheme={"blue"} width="100%" onClick={() => handleSubmit()}>
        Log in
      </Button>
      <Button colorScheme={"red"} width="100%" onClick={handleSubmit}>
        Get Guset User Credentials
      </Button>
    </VStack>
  );
}

export default Login;
