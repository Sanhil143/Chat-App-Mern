import { Box, FormLabel, Select } from "@chakra-ui/react";
import background from "../../assets/background.png";
import background2 from "../../assets/background2.png";
import background3 from "../../assets/background3.png";
import background4 from "../../assets/background4.png";
import background5 from "../../assets/background5.png";
import { ChatState } from "../../context/ChatProvider";

function BackgroundChange() {
  const { setUrl } = ChatState();
  function handleChange(e) {
    console.log(e.target.value);
    setUrl(e.target.value);
  }
  return (
    <div>
      <Box mt="20px">
        <FormLabel
          bg="black"
          p={2}
          fontFamily="cursive"
          textAlign={"center"}
          color={"white"}
        >
          Change Background
        </FormLabel>

        <Select bg="white" onChange={handleChange}>
          <option value={background}>default</option>
          <option value={background3}>Sky</option>
          <option value={background2}>Night</option>
          <option value={background4}>Flower</option>
          <option value={background5}>Rain</option>
        </Select>
      </Box>
    </div>
  );
}

export default BackgroundChange;
