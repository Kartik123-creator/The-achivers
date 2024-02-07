// Chakra imports
import { Text, Button, Grid, GridItem, CloseButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, Alert, AlertIcon } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import React, { useState } from "react";

const FilesOfNotes = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileName, setFileName] = useState("");
  const [showWarningMsg, setShowWarningMsg] = useState(false);
  // const [file, setFile] = useState(null);

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      setFileName(e.target.files[0].name);
      props.setBinaryFile(e.target.files[0]);
      e.target.value=null;
    }
  }

  const onSubmitClick = () => {
    if(props.binaryFile){
      props.onSubmitFile(props.subjectName, props.facultyName);
      setFileName("")
      onClose();
    } else {
      setShowWarningMsg(true);
      setTimeout(() => {
        setShowWarningMsg(false);
      }, 3000);
    }
  }

  const modalClose = () => {
    onClose();
    setFileName(""); 
    props.setBinaryFile(null);
  }

  const downloadFile = (obj) => {
    // let src=(`../../notes/${props.branchName}/${props.semesterNumber}/${props.subjectName}/${props.facultyName}/${obj.full_src}`);
    // window.location.href = obj.full_src;
    // window.open("C:/xampp/htdocs/achievers/notes/CE/3/FSD/UML/Time-Table (1).pdf", '_blank');
    // const link = document.createElement('a');
    // link.href = src;
    // link.setAttribute('download', "favicon.png");
    // link.download = "abc"+obj.full_src;
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
  }

  return (
    <>
      {props.isFiles
      ? <>
          <Grid templateColumns={{sm: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)'}} gap={6}>
            {props.filesList.length
              ? props.filesList.map((obj, key) => {
                return (
                  <GridItem key={key} w='100%' p={4} bg='blue.600' rounded="10" cursor="pointer" onClick={() => {downloadFile(obj)}} display="flex" justifyContent="space-between" alignItems={"center"} flexDirection="row">
                    <Text>
                      {obj.full_src.split("/")[(obj.full_src.split("/").length)-1]}
                    </Text>
                    {/* {props.designation==="hod" || props.designation==="faculty" 
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
          <Modal isOpen={isOpen} onClose={() => modalClose()}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader> Add File </ModalHeader>
              <ModalCloseButton autoFocus={false} />
              <ModalBody>
                <FormControl>
                <FormLabel> Upload File to update data: </FormLabel>
                <FormLabel htmlFor="uploadbtn" cursor="pointer" mt={3} mb={3}>
                  <Button fontSize='sm' fontWeight='normal' pointerEvents="none"> Upload </Button>
                  <p>{fileName}</p>
                </FormLabel>
                <Input display="none" onChange={readUploadFile} id="uploadbtn" name="upload" borderRadius='15px' mb='36px' fontSize='sm' type='file' size='lg' />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button mr={3} onClick={() => modalClose()}> Cancel </Button>
                <Button onClick={() => {onSubmitClick();}} colorScheme='blue'> Submit </Button>
              </ModalFooter>
              { showWarningMsg
                ? 
                  <ModalFooter>
                    <Alert status='warning' mt={2} mb={4}>
                      <AlertIcon /> Please upload File.
                    </Alert>
                  </ModalFooter>
                : <></>
              }
            </ModalContent>
          </Modal>
        </>
      : null
      }
    </>
  );
}

export default FilesOfNotes;