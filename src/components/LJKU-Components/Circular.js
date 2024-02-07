// Chakra imports
import { Flex, Text, useColorModeValue, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Badge, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, Alert, AlertIcon } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import CardHeader from "../Card/CardHeader.js";
import { AddIcon } from '@chakra-ui/icons';
import Loader from "./Loader";
import axios from 'axios';

const Circular = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.700", "white");
  const [branchName, setBranchName]= useState("");
  const [designation, setDesignation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [alertMsg, showAlertMsg] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [data, setData] = useState([])

  useEffect(() => {
    let data = localStorage.getItem("data");
    let des_name = JSON.parse(data).designation;
    let branch_name="";
    if (JSON.parse(data).branch === "computer-eng") {
      branch_name="CE";
    } else if (JSON.parse(data).branch === "computer-science-eng") {
      branch_name="CSE";
    } else if (JSON.parse(data).branch === "information-tech") {
      branch_name="IT";
    } else if (JSON.parse(data).branch === "civil-eng") {
      branch_name="CIVIL";
    } else if (JSON.parse(data).branch === "mechanical-eng") {
      branch_name="MECHANICAL";
    }
    setDesignation(des_name);
    setBranchName(branch_name);
    getData();
  }, []);

  const getData = async() => {
    await axios({
      method: 'post',
      url: 'http://localhost/achievers/get_circular.php'
    }).then((res) => {
      console.log(res.data)
      if(res.data && res.data.length) {
        setData(res.data.reverse())
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  const modalClose = () => {
    setDescription("");
    setTitle("");
    onClose();
  }

  const onSubmit = () => {
    if(branchName && title && description){
      console.log(branchName, title, description)
      insertCircular();
      setTimeout(() => {
        setShowLoader(false);
      }, 3000);
    } else {
      showAlertMsg(true);
      setTimeout(() => {
        showAlertMsg(false);
      }, 3000)
    }
  }

  const insertCircular = async () => {
    await axios({
      method: 'post',
      url: 'http://localhost/achievers/set_circular.php',
      data: {branch: branchName, title: title, description: description},
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((res) => {
      modalClose();
      setShowLoader(true);
      getData();
      setTimeout(() => {
        setShowLoader(false);
      }, 3000);
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Loader load={showLoader} />
      <Card>
        <CardHeader p='6px 0px 22px 0px'>
          <Text fontSize='xl' color={textColor} fontWeight='bold'> Circular </Text>
        </CardHeader>
        <CardBody>
          <Flex flexDirection="column" w="100%">
            { data.length
              ? <Accordion w="100%" allowMultiple>
                  { data.map((obj, index) => {
                    return(
                      <AccordionItem py={1} key={index}>
                        <h2>
                          <AccordionButton _focus={{"boxShadow": "None"}}>
                            <Box as="span" flex='1' textAlign='left'>
                              <Flex>
                                {obj.title}
                                {index===0
                                  ? <Badge variant='solid' ms={2} my="auto" borderRadius={5} px={2} py={1} colorScheme='blue' display="flex" alignItems="center"> Latest </Badge>
                                  : <></>
                                }
                              </Flex>
                            </Box>
                            { obj.branch
                              ? <Badge variant='subtle' ms={2} borderRadius={5} px={2} py={1} colorScheme='blue' display="flex" alignItems="center"> {obj.branch} </Badge>
                              : <></>
                            }
                            {/* <AccordionIcon /> */}
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} borderTop="1px solid">
                          {obj.description}
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              : <Flex w="100%" direction='row' flexWrap="wrap" justifyContent="center" fontWeight='bold'>
                  No Data Found !
                </Flex>
            }
            {
              designation && designation==="hod"
              ? <Button mt={2} width="" onClick={()=> {onOpen()}}><AddIcon /></Button>
              : <></>
            }
            <Modal isOpen={isOpen} onClose={() => modalClose()}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader> Add Circular </ModalHeader>
                <ModalCloseButton autoFocus={false} />
                <ModalBody>
                  <FormControl>
                    <FormLabel> Title: </FormLabel>
                    <Input type='text' id="title" name="title" value={title} onChange={(evt) => {setTitle(evt.target.value)}} />
                  </FormControl>
                  <FormControl mt={3}>
                    <FormLabel> Description: </FormLabel>
                    <Input type='text' id="desc" name="desc" value={description} onChange={(evt) => {setDescription(evt.target.value)}} />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button mr={3} onClick={() => modalClose()}> Cancel </Button>
                  <Button onClick={() => {onSubmit()}} colorScheme='blue'> Submit </Button>
                </ModalFooter>
                { alertMsg
                  ? 
                    <ModalFooter>
                      <Alert status='warning' mb={3}>
                        <AlertIcon /> Data should not be empty.
                      </Alert>
                    </ModalFooter>
                  : <></>
                }
              </ModalContent>
            </Modal>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
    </>
  );
}

export default Circular;