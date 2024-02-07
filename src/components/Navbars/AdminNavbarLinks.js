import { BellIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, Flex, Icon, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
// Custom Icons
import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
import { MdLogout } from 'react-icons/md';
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import routes from "routes.js";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;

  // Chakra Color Mode
  let mainTeal = useColorModeValue("teal.300", "teal.300");
  let inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");

  const [uname, setUname] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("data")) {
      let data = localStorage.getItem("data");
      if(JSON.parse(data).uname) {
        setUname(JSON.parse(data).uname)
      }
    }
  }, []);

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  const settingsRef = React.useRef();
  return (
    <Flex cursor="pointer" pe={{ sm: "0px" }} w={{ sm: "100%", md: "auto" }} alignItems="center" flexDirection="row" justifyContent={{base: "space-between", xl: "end"}}>
      {/* <InputGroup cursor="pointer" bg={inputBg} borderRadius="15px" w={{ sm: "128px", md: "200px" }} me={{ sm: "auto", md: "20px" }} _focus={{ borderColor: { mainTeal } }} _active={{ borderColor: {mainTeal} }} >
        <InputLeftElement children={
            <IconButton bg="inherit" borderRadius="inherit" _hover="none" _active={{ bg: "inherit", transform: "none", borderColor: "transparent" }} _focus={{ boxShadow: "none" }} icon={ <SearchIcon color={searchIcon} w="15px" h="15px"/> }></IconButton>
          }
        />
        <Input fontSize="xs" py="11px" color={mainText} placeholder="Type here..." borderRadius="inherit" />
      </InputGroup> */}
      {/* <NavLink to="/auth/signin"> */}
      <SidebarResponsive logoText={props.logoText} secondary={props.secondary} routes={routes.slice(0, routes.length-2)}
        // logo={logo}
        {...rest} />
        <Flex>
          { uname
            ? <Flex cursor={"auto"} justifyContent="center" alignItems="center" me={2}>
                <Text display="flex" justifyContent="center" height="fit-content">{uname}</Text>
              </Flex>
            : <></>
          }
          <NavLink to="/auth/signin">
            <Button ms="0px" px="0px" color={navbarIcon} variant="transparent-with-icon">
              {/* <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" /> */}
              <Icon as={MdLogout} boxSize={6} />
              {/* <Text>Sign out</Text> */}
            </Button>
          </NavLink>
        </Flex>
      {/* <SettingsIcon cursor="pointer" ms={{ base: "16px", xl: "0px" }} me="16px" ref={settingsRef} onClick={props.onOpen} color={navbarIcon} w="18px" h="18px" /> */}
      {/* <Menu>
        <MenuButton>
          <BellIcon color={navbarIcon} w="18px" h="18px" />
        </MenuButton>
        <MenuList p="16px 8px">
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent time="13 minutes ago" info="from Alicia" boldInfo="New Message" aName="Alicia" aSrc={avatar1} />
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent time="2 days ago" info="by Josh Henry" boldInfo="New Album" aName="Josh Henry" aSrc={avatar2} />
            </MenuItem>
            <MenuItem borderRadius="8px">
              <ItemContent time="3 days ago" info="Payment succesfully completed!" boldInfo="" aName="Kara" aSrc={avatar3} />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu> */}
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
