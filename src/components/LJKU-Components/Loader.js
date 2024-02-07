// Chakra imports
import { Flex } from "@chakra-ui/react";
import React from "react";
import "./Loader.css";

const Loader = (props) => {
  return (
    <>
    {props.load
      ? <Flex height="100vh" width="100vw" position="fixed" top="0px" left="0px" background="#00000040" zIndex={100} alignItems="center" justifyContent="center">
          <div class="loader">
            <div class="face">
              <div class="circle"></div>
            </div>
            <div class="face">
              <div class="circle"></div>
            </div>
          </div>
        </Flex>
      : null
    }
    </>
  );
}

export default Loader;