// Chakra imports
import { Text, Button, Grid, GridItem, CloseButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import React from "react";

const Faculties = (props) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const addFaculty = (val) => {
    // props.facultiesList.push({"faculty_name": val});
    props.setAddFacultyName("");
    props.onSubmitFile(props.subjectName, props.addFacultyName);
    // props.onSubmitFile();
    onClose();
  }

  const onItemClick = (obj) => {
    props.setFacultyName(obj.faculty_name); 
    props.getData(props.branchName, props.semesterNumber, props.subjectName, obj.faculty_name); 
    props.setIsFiles(true); 
    props.setIsFaculty(false);
  }

  return (
    <>
      {props.isFaculty
        ? <>
            <Grid templateColumns={{sm: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)'}} gap={6}>
              {props.facultiesList.length
                ? props.facultiesList.map((obj, key) => {
                  return(
                    <GridItem w='100%' p={4} bg='blue.600' key={key} rounded="10" cursor="pointer" onClick={() => {onItemClick(obj)}} display="flex" justifyContent="space-between" alignItems={"center"} flexDirection="row">
                      <Text>{obj.faculty_name}</Text>
                      {/* { props.designation==="hod" || props.designation==="faculty" 
                        ? <CloseButton onClick={(e) => {console.log("close"); e.stopPropagation();}}/>
                        : null
                      } */}
                    </GridItem>
                  )})
                : null
              }
              {props.designation==="hod" || props.designation==="faculty"
                ? <GridItem w='100%' p={4} bg='blue.600' rounded="10" cursor="pointer" onClick={()=> {onOpen()}} display="flex" justifyContent="center" alignItems={"center"} flexDirection="row">
                    <Button background="none"><AddIcon /></Button>
                  </GridItem>
                : null
              }
            </Grid>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader> Add Faculty </ModalHeader>
                <ModalCloseButton autoFocus={false} />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Please enter faculty name: </FormLabel>
                    <Input onChange={(e) => props.setAddFacultyName(e.target.value)} id="faculty" value={props.addFacultyName} name="email" borderRadius='15px' mb='24px' fontSize='sm' type='text' size='lg' required />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button mr={3} onClick={onClose}> No </Button>
                  <Button onClick={() => {addFaculty(props.addFacultyName);}} colorScheme='blue'> Yes </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        : null
      }
    </>
  );
}

export default Faculties;