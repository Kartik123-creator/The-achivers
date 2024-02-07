// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import CardHeader from "../Card/CardHeader.js";

const Attendance = () => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <>
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Card>
        <CardHeader p='6px 0px 22px 0px'>
          <Text fontSize='xl' color={textColor} fontWeight='bold'>
            Attendance
          </Text>
        </CardHeader>
        <CardBody>
          
        </CardBody>
      </Card>
    </Flex>
    </>
  );
}

export default Attendance;