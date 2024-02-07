import React, { useState } from "react";
import { Flex, Button, FormControl, FormLabel, Heading, Input, Text, useColorModeValue, Alert, AlertIcon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Loader from "../../components/LJKU-Components/Loader";

function SignIn() {

  const history = useHistory();
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const [user, setUser] = useState({
    email: "",
    pwd: ""
  })

  const [showAlertMsg, setShowAlertMsg] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleChange = (evt) => {
    setUser({
      ...user,
      [evt.target.name]: evt.target.value
    });  
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(user)
    await axios({
      method: 'post',
      url: 'http://localhost/achievers/sign_in.php',
      data: user,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((res) => {
      localStorage.setItem('data', JSON.stringify(res.data));
      setUser({
        email: "",
        pwd: ""
      })
      setShowSuccessMsg(true);
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
        history.push("/admin/home")
        setShowSuccessMsg(false);
      }, 3000)
    }).catch((err) => {
      setShowAlertMsg(true);
      setTimeout(() => {
        setShowAlertMsg(false);
      }, 3000)
    })
  }

  return (
    <Flex position='relative' mb='10px'>
      <Loader load={showLoader} />
      <Flex h={{ sm: "initial" }} w='100%' maxW='1044px' mx='auto' justifyContent='center' mb='10px' pt={{ sm: "50px", md: "0px" }}>
        <Flex alignItems='center' justifyContent='start' style={{ userSelect: "none" }} w={{ base: "100%", md: "50%", lg: "42%" }}>
          <Flex direction='column' w='100%' background='transparent' px='40px' py='20px' mt={{ md: "50px", lg: "80px" }}>
            <Heading color={titleColor} fontSize='32px' mb='10px'>
              Welcome
            </Heading>
            <Text mb='36px' ms='4px' color={textColor} fontWeight='bold' fontSize='14px'>
              Enter your email and password to sign in
            </Text>
            <form onSubmit={onSubmit}>
              <FormControl>
                
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'> Email </FormLabel>
                <Input onChange={handleChange} id="email" value={user.email} name="email" borderRadius='15px' mb='24px' fontSize='sm' type='text' placeholder='Your email adress' size='lg' required />

                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'> Password </FormLabel>
                <Input onChange={handleChange} id="pwd" value={user.pwd} name="pwd" borderRadius='15px' mb='36px' fontSize='sm' type='password' placeholder='Your password' size='lg' required />

                <Button type='submit' bg='teal.300' w='100%' h='45' mb='20px' color='white'
                // fontSize='15px'
                  _hover={{bg: "teal.200" }} _active={{ bg: "teal.400" }}>
                  SIGN IN
                </Button>

                { showAlertMsg
                  ? <Alert status='error' mt={2} mb={4}>
                      <AlertIcon />
                      Invalid Email or Password
                    </Alert>
                  : <></>
                }
                
                { showSuccessMsg
                  ? <Alert status='success' mt={2} mb={4}>
                      <AlertIcon />
                      You are successfully logged in
                    </Alert>
                  : <></>
                }
                
              </FormControl>
            </form>
            {/* <Flex flexDirection='column' justifyContent='center' alignItems='center' maxW='100%' mt='0px'>
              <Text color={textColor} fontWeight='medium'>
                <NavLink to="/auth/signup">
                  <Text>Sign Up</Text>
                </NavLink>
              </Text>
            </Flex> */}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignIn;
