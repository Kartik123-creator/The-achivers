// Chakra imports
import { Flex, Text, useColorModeValue, FormControl, FormLabel, Input, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Grid, GridItem, Button, CloseButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { ChevronRightIcon } from '@chakra-ui/icons'
import React, { useState, useEffect } from "react";
import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import CardHeader from "../Card/CardHeader.js";
import Faculties from "./Faculties";
import FilesOfNotes from "./FilesOfNotes.js";
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';

const Notes = () => {

  const [isFaculty, setIsFaculty] = useState(false);
  const [isFiles, setIsFiles] = useState(false);
  const [designation, setDesignation] = useState("student");
  const [branchName, setBranchName]= useState("");
  const [semesterNumber, setSemesterNumber] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [addSubjectName, setAddSubjectName] = useState("");
  const [addFacultyName, setAddFacultyName] = useState("");
  const [subjectsList, setSubjectsList] = useState([]);
  const [facultiesList, setFacultiesList] = useState([]);
  const [filesList, setFilesList] = useState([]);
  const [binaryFile, setBinaryFile] = useState(null);
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (localStorage.getItem("data")) {
      let data = localStorage.getItem("data");
      let des_name = JSON.parse(data).designation;
      let branch_name="";
      setDesignation(des_name);
      // if(des_name==="student") {
        if (JSON.parse(data).branch === "computer-eng" || JSON.parse(data).branch === "computer-science-eng" || JSON.parse(data).branch === "information-tech") {
          branch_name="CE";
        } else if (JSON.parse(data).branch === "civil-eng") {
          branch_name="CIVIL";
        } else if (JSON.parse(data).branch === "mechanical-eng") {
          branch_name="MECHANICAL";
        }
        setBranchName(branch_name);
        setSemesterNumber(JSON.parse(data).sem);
      // }
      getData(branch_name, JSON.parse(data).sem);
    }
  }, []);

  const addSubject = (val) => {
    // subjectsList.push({"subject_name": val});
    onSubmitFile(addSubjectName, facultyName); 
    onClose();
    setAddSubjectName("");
  }

  const getData = async (branch_name=branchName, sem_num=semesterNumber, subject_name=subjectName, faculty_name=facultyName) => {
    let obj;
    obj={
      "branch": branch_name, 
      "sem": sem_num,
      "sub": subject_name, 
      "faculty": faculty_name
    };
    // console.log(obj)
    await axios({
      method: 'post',
      url: 'http://localhost/achievers/get_notes.php',
      data: obj,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((res) => {
      // console.log("res: ", res);
      if(res.data){
        if(res.data.name==="subject") {
          let data = JSON.parse(res.data.data);
          setSubjectsList(data);
          setFacultiesList([]);
          setFilesList([]);
        } else if (res.data.name==="faculty") {
          let data = JSON.parse(res.data.data);
          setSubjectsList([]);
          setFacultiesList(data);
          setFilesList([]);
        } else if (res.data.name==="file") {
          let data = JSON.parse(res.data.data);
          setSubjectsList([]);
          setFacultiesList([]);
          setFilesList(data);
        }
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const onSubmitFile = async (subject_name, faculty_name) => {
    // console.log(binaryFile);
    let obj;
    obj={
      "file": binaryFile, 
      "branch": branchName, 
      "sem": semesterNumber,
      "sub": subject_name, 
      "faculty": faculty_name
    };
    await axios({
      method: 'post',
      url: 'http://localhost/achievers/set_notes.php',
      data: obj,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((res) => {
      if(binaryFile){
        setBinaryFile(null);
      }
      getData();
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
      <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
        <Card>
          <CardHeader p='6px 0px 22px 0px'>
            <Text fontSize='xl' color={textColor} fontWeight='bold'>
              Notes
            </Text>
          </CardHeader>
          <CardBody flexDirection="column">
            <Breadcrumb spacing='8px' mb={5} separator={<ChevronRightIcon color='gray.500' />}>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => {setSubjectName(""); setFacultyName(""); getData(branchName, semesterNumber, "", ""); setIsFaculty(false); setIsFiles(false);}}>{subjectName ? subjectName : "Subjects"}</BreadcrumbLink>
              </BreadcrumbItem>
              {isFaculty || isFiles
                ? <BreadcrumbItem>
                    <BreadcrumbLink onClick={() => {setFacultyName(""); getData(branchName, semesterNumber, subjectName, ""); setIsFaculty(true); setIsFiles(false);}}>{facultyName ? facultyName : "Faculties"}</BreadcrumbLink>
                  </BreadcrumbItem>
                : null
              }
              {isFiles
                ? <BreadcrumbItem>
                    <BreadcrumbLink onClick={() => {setIsFaculty(false);getData(); setIsFiles(true);}}>Files</BreadcrumbLink>
                  </BreadcrumbItem>
                : null
              }
            </Breadcrumb>
            {((!isFaculty) && (!isFiles))
              ? <Grid templateColumns={{sm: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)'}} gap={6}>
                  {subjectsList.length
                    ? subjectsList.map((obj, key) => {
                        return(
                          <GridItem key={key} w='100%' p={4} bg='blue.600' rounded="10" cursor="pointer" onClick={()=> { setSubjectName(obj.subject_name); getData(branchName, semesterNumber, obj.subject_name, ""); setIsFaculty(true);}} display="flex" justifyContent="space-between" alignItems={"center"} flexDirection="row">
                            <Text>{obj.subject_name}</Text>
                            {/* {designation==="hod" || designation==="faculty" 
                              ? <CloseButton onClick={(e) => {console.log("close"); e.stopPropagation();}}/>
                              : null
                            } */}
                          </GridItem>
                        );
                    })
                    : null
                  }
                  {designation==="hod" || designation==="faculty"
                    ? <GridItem w='100%' p={4} bg='blue.600' rounded="10" cursor="pointer" onClick={() => onOpen()} display="flex" justifyContent="center" alignItems={"center"} flexDirection="row">
                        <Button background="none"><AddIcon /></Button>
                      </GridItem>
                    : null
                  }
                </Grid>
              : null
            }

            <Faculties isFaculty={isFaculty} setIsFaculty={setIsFaculty} setIsFiles={setIsFiles} facultiesList={facultiesList} designation={designation} branchName={branchName} semesterNumber={semesterNumber} subjectName={subjectName} addFacultyName={addFacultyName} setAddFacultyName={setAddFacultyName} setFacultyName={setFacultyName} onSubmitFile={onSubmitFile} getData={getData} />

            <FilesOfNotes branchName={branchName} semesterNumber={semesterNumber} subjectName={subjectName} facultyName={facultyName} isFiles={isFiles} filesList={filesList} designation={designation} binaryFile={binaryFile} setBinaryFile={setBinaryFile} onSubmitFile={onSubmitFile} />

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader> Add Subject </ModalHeader>
                <ModalCloseButton autoFocus={false} />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Please enter subject name: </FormLabel>
                    <Input onChange={(e) => setAddSubjectName(e.target.value)} id="subject" value={addSubjectName} name="email" borderRadius='15px' mb='24px' fontSize='sm' type='text' size='lg' required />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button mr={3} onClick={onClose}> No </Button>
                  <Button onClick={() => {addSubject(addSubjectName);}} colorScheme='blue'> Yes </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
}

export default Notes;