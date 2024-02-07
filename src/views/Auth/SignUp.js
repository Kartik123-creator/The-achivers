// Chakra imports
import { Box, Button, Flex, FormControl, FormLabel, Input, Text, useColorModeValue, Radio, RadioGroup, Stack, Alert, AlertIcon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { Select } from '@chakra-ui/react'
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
// import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

function SignUp() {

  const history = useHistory();
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");

  const [showEmailAlertMsg, setShowEmailAlertMsg] = useState(false);
  const [showErrorAlertMsg, setShowErrorAlertMsg] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  
  const [user, setUser] = useState({
    uname: "",
    email: "",
    pwd: "",
    designation: "student",
    sem: "",
    branch: ""
  })

  const handleChange = (evt) => {
    setUser({
      ...user,
      [evt.target.name]: evt.target.value
    });  
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(user)
    let email = user.email
    if(email.length > 12) {
      const email_verify=email.substring(email.length-12);
      if(email_verify==="@ljku.edu.in") {
        await axios({
          method: 'post',
          url: 'http://localhost/achievers/sign_up.php',
          data: user,
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then((res) => {
          localStorage.setItem('data', JSON.stringify(user));
          setUser({
            uname: "",
            email: "",
            pwd: "",
            designation: "student",
            sem: "",
            branch: ""
          })
          setShowSuccessMsg(true);
          setTimeout(() => {
            history.push("/admin/home")
            setShowSuccessMsg(false);
          }, 3000)
        }).catch((err) => {
          setShowErrorAlertMsg(true);
          setTimeout(() => {
            setShowErrorAlertMsg(false);
          }, 3000)
        })
      } else {
        setShowEmailAlertMsg(true);
        setTimeout(() => {
          setShowEmailAlertMsg(false);
        }, 3000)
      }
    } else {
      setShowEmailAlertMsg(true);
      setTimeout(() => {
        setShowEmailAlertMsg(false);
      }, 3000)
    }
  }
  
  return (
    <Flex direction='column' alignSelf='center' justifySelf='center' overflow='hidden'>
      <Box position='absolute' minH={{ base: "70vh", md: "50vh" }} w={{ md: "calc(100vw - 50px)" }} borderRadius={{ md: "15px" }} left='0' right='0' bgRepeat='no-repeat' overflow='hidden' zIndex='-1' top='0' bgImage={BgSignUp} bgSize='cover' mx={{ md: "auto" }} mt={{ md: "14px" }}></Box>
      <Flex direction='column' textAlign='center' justifyContent='center' align='center' mt='2.5rem' mb='30px'>
        <Text fontSize='4xl' color='white' fontWeight='bold'>
          Welcome!
        </Text>
      </Flex>
      <Flex alignItems='center' justifyContent='center' mb='20px' mt='20px'>
        <Flex direction='column' w='445px' background='transparent' borderRadius='15px' px='10px' py='40px' mx={{ base: "20px" }} bg={bgColor} boxShadow='0 20px 27px 0 rgb(0 0 0 / 5%)'>
          <form onSubmit={onSubmit}>
            <FormControl>

              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'> Name </FormLabel>
              <Input required name="uname" onChange={handleChange} value={user.uname} fontSize='sm' borderRadius='15px' id="uname" type='text' placeholder='Your full name' mb='24px' size='lg' />

              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'> Email </FormLabel>
              <Input required name="email" onChange={handleChange} value={user.email} fontSize='sm' borderRadius='15px' id="email" type='email' placeholder='Your email address' mb='24px' size='lg' />

              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'> Password </FormLabel>
              <Input required name="pwd" onChange={handleChange} value={user.pwd} fontSize='sm' borderRadius='15px' id="pwd" type='password' placeholder='Your password' mb='24px' size='lg' />

              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'> I am </FormLabel>
              <RadioGroup name="designation" onChange={(val) => setUser({...user, "designation": val})} value={user.designation} fontSize='sm' borderRadius='15px' type='password' placeholder='Your password' ms='4px' mb='24px' size='md'>
                <Stack direction='row'>
                  <Radio value='student'>Student</Radio>
                  {/* <Radio value='parent'>Parent</Radio> */}
                  <Radio value='faculty'>Faculty</Radio>
                </Stack>
              </RadioGroup>

              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'> Semester </FormLabel>
              <Select onChange={handleChange} id="sem" value={user.sem} name="sem" fontSize='sm' borderRadius='15px' mb='24px' size='md' required>
                <option value=''>-- select --</option>
                <option value='1'>SEM-1</option>
                <option value='2'>SEM-2</option>
                <option value='3'>SEM-3</option>
                <option value='4'>SEM-4</option>
                <option value='5'>SEM-5</option>
                <option value='6'>SEM-6</option>
                <option value='7'>SEM-7</option>
                <option value='8'>SEM-8</option>
              </Select>

              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'> Branch </FormLabel>
              <Select onChange={handleChange} id="branch" value={user.branch} name="branch" fontSize='sm' borderRadius='15px' mb='24px' size='md' required>
                <option value=''>-- select --</option>
                <option value='computer-eng'>Computer Eng.</option>
                <option value='computer-science-eng'>Computer Science Eng.</option>
                <option value='information-tech'>Information Tech.</option>
                <option value='civil-eng'>Civil Eng.</option>
                <option value='mechanical-eng'>Mechanical Eng.</option>
              </Select>

              <Button type='submit' bg='teal.300' color='white' fontWeight='bold' w='100%' h='45' mb='24px' _hover={{ bg: "teal.200" }} _active={{ bg: "teal.400" }}>
                SIGN UP
              </Button>

              { showEmailAlertMsg
                ? <Alert status='warning' mt={2} mb={4}>
                    <AlertIcon />
                    Invalid Email
                  </Alert>
                : <></>
              }

              { showErrorAlertMsg
                ? <Alert status='error' mt={2} mb={4}>
                    <AlertIcon />
                    User already exist 
                  </Alert>
                : <></>
              }

              { showSuccessMsg
                ? <Alert status='success' mt={2} mb={4}>
                    <AlertIcon />
                    Thanks for signing up
                  </Alert>
                : <></>
              }

            </FormControl>
          </form>
          <Flex flexDirection='column' justifyContent='center' alignItems='center' maxW='100%' mt='0px'>
            <Text color={textColor} fontWeight='medium'>
              <NavLink to="/auth/signin">
                <Text>Sign In</Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;
