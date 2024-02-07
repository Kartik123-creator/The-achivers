/*eslint-disable*/
import { HamburgerIcon } from "@chakra-ui/icons";
// chakra imports
import React from "react";
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Link, Stack, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
import { CreativeTimLogo } from "components/Icons/Icons";
import { Separator } from "components/Separator/Separator";
import { SidebarHelp } from "components/Sidebar/SidebarHelp";
import { NavLink, useLocation } from "react-router-dom";

function SidebarResponsive(props) {
  let location = useLocation();
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const createLinks = (routes) => {
    const activeBg = useColorModeValue("white", "gray.700");
    const inactiveBg = useColorModeValue("white", "gray.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");

    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <div key={prop.name}>
            <Text color={activeColor} fontWeight="bold" mb={{ xl: "12px" }} mx="auto" ps={{ sm: "10px", xl: "16px" }} py="12px" >
              {document.documentElement.dir === "rtl"
                ? prop.rtlName
                : prop.name}
            </Text>
            {createLinks(prop.views)}
          </div>
        );
      }
      return (
        <NavLink to={prop.layout + prop.path} key={prop.name}>
          {activeRoute(prop.layout + prop.path) === "active" ? (
            <Button boxSize="initial" justifyContent="flex-start" alignItems="center" bg={activeBg} mb={{ xl: "12px" }} mx={{ xl: "auto" }} ps={{ sm: "10px", xl: "16px" }} py="12px" borderRadius="15px" _hover="none" w="100%"
              _active={{
                bg: "inherit", transform: "none", borderColor: "transparent"
              }}
              _focus={{ boxShadow: "none" }}
            >
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox bg="teal.300" color="white" h="30px" w="30px" me="12px">
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={activeColor} my="auto" fontSize="sm">
                  {document.documentElement.dir === "rtl"
                    ? prop.rtlName
                    : prop.name}
                </Text>
              </Flex>
            </Button>
          ) : (
            <Button boxSize="initial" justifyContent="flex-start" alignItems="center" bg="transparent"
              mb={{ xl: "12px" }}
              mx={{ xl: "auto" }}
              py="12px"
              ps={{ sm: "10px", xl: "16px" }}
              borderRadius="15px"
              _hover="none" w="100%"
              _active={{ bg: "inherit", transform: "none", borderColor: "transparent" }}
              _focus={{ boxShadow: "none" }}
            >
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox bg={inactiveBg} color="teal.300" h="30px" w="30px" me="12px" >
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={inactiveColor} my="auto" fontSize="sm">
                  {document.documentElement.dir === "rtl"
                    ? prop.rtlName
                    : prop.name}
                </Text>
              </Flex>
            </Button>
          )}
        </NavLink>
      );
    });
  };
  
  const { logoText, routes, ...rest } = props;

  var links = <>{createLinks(routes)}</>;
  
  let hamburgerColor = useColorModeValue("gray.500", "gray.200");
  if (props.secondary === true) {
    hamburgerColor = "white";
  }
  var brand = (
    <></>
  );

  // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  // Color variables
  return (
    <Flex display={{ sm: "flex", xl: "none" }} ref={mainPanel} alignItems="center">
      <HamburgerIcon color={hamburgerColor} w="18px" h="18px" ref={btnRef} colorscheme="teal" onClick={onOpen}/>
      <Drawer isOpen={isOpen} onClose={onClose} placement={document.documentElement.dir === "rtl" ? "right" : "left"} finalFocusRef={btnRef} >
        <DrawerOverlay />
        <DrawerContent w="250px" maxW="250px" ms={{ sm: "16px" }} my={{ sm: "16px" }} borderRadius="16px">
          <DrawerCloseButton _focus={{ boxShadow: "none" }} _hover={{ boxShadow: "none" }} zIndex={1}/>
          <DrawerBody maxW="250px" px="1rem">
            <Box maxW="100%">
              <Box>{brand}</Box>
              <Stack direction="column">
                <Box>{links}</Box>
              </Stack>
              {/* <SidebarHelp /> */}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default SidebarResponsive