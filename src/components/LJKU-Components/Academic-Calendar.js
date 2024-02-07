// Chakra imports
import { Flex, Text, useColorModeValue, FormControl, FormLabel, Input, Button, Table, Tbody, Th, Thead, Tr, Td, TableContainer, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Alert, AlertIcon } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import CardHeader from "../Card/CardHeader.js";
import * as xlsx from "xlsx";
import axios from 'axios';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Loader from "./Loader.js";

const AcademicCalendar = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const [designation, setDesignation] = useState("student");
  const [fileJson, setFileJson] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [tableName, setTableName] = useState(null);
  const [semesterNumber, setSemesterNumber] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showWarningMsg, setShowWarningMsg] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("data")) {
      let data = localStorage.getItem("data");
      let des_name = JSON.parse(data).designation;
      setDesignation(des_name);
      if(des_name==="student") {
        let table_name = "";
        if (JSON.parse(data).branch === "computer-eng" || JSON.parse(data).branch === "computer-science-eng" || JSON.parse(data).branch === "information-tech") {
          table_name="ce_"+JSON.parse(data).sem;
        } else if (JSON.parse(data).branch === "civil-eng") {
          table_name="civil_"+JSON.parse(data).sem;
        } else if (JSON.parse(data).branch === "mechanical-eng") {
          table_name="mechanical_"+JSON.parse(data).sem;
        }
        setTableName(table_name);
        getTableData(table_name);
      }
    }
  }, []);

  const onSetSemester = (e) => {
    if(e.target.value){
      let data = localStorage.getItem("data");
      let table_name = "";
      if (JSON.parse(data).branch === "computer-eng" || JSON.parse(data).branch === "computer-science-eng" || JSON.parse(data).branch === "information-tech") {
        table_name="ce_"+(e.target.value);
      } else if (JSON.parse(data).branch === "civil-eng") {
        table_name="civil_"+(e.target.value);
      } else if (JSON.parse(data).branch === "mechanical-eng") {
        table_name="mechanical_"+(e.target.value);
      }
      setSemesterNumber(e.target.value);
      setTableName(table_name);
      getTableData(table_name);
    } else {
      setSemesterNumber("");
      setTableName("");
      getTableData("");
    }
  }

  const getTableData = async (table_name) => {
    await axios({
      method: 'post',
      url: 'http://localhost/achievers/get_academic_calendar.php',
      data: {"tableName": "academic_calendar_"+table_name},
      headers: {'Content-Type': 'application/json'}
    }).then((res) => {
      if(res.data) {
        if(typeof res.data === "object"){
          setTableData(res.data);
        } else {
          setTableData([])
        }
      } else {
        setTableData([]);
      }
    }).catch((err) => {
      console.log("err:", err);
      setTableData([]);
    })
  }

  const onConfirmClick = () => {
    if(fileName) {
      onOpen();
    } else {
      setShowWarningMsg(true);
      setTimeout(() => {
        setShowWarningMsg(false);
      }, 3000);
    }
  }

  const downloadPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    let json=tableData;
    let columns = [];
    Object.keys(tableData[0]).map((key) => {
      columns.push(key);
    })
    var rows = [];
  
    for (let i = 0; i < json.length; i++) {
      var temp = [];
      Object.keys(tableData[0]).map((key) => {
        temp.push(json[i][key]);
      })
      rows.push(temp);
    }
    pdf.text(100, 40, "L. J. Institute of Engineering & Technology, Ahmedabad");
    pdf.autoTable(columns, rows, {
      startY: 65,
      theme: "grid",
      styles: { font: "times", halign: "center", cellPadding: 3.5, lineWidth: 0.5, lineColor: [0, 0, 0], textColor: [0, 0, 0] },
      headStyles: { textColor: [0, 0, 0], fontStyle: "normal", lineWidth: 0.5, lineColor: [0, 0, 0], fillColor: [166, 204, 247] },
      alternateRowStyles: { fillColor: [212, 212, 212], textColor: [0, 0, 0], lineWidth: 0.5, lineColor: [0, 0, 0] },
      rowStyles: { lineWidth: 0.5, lineColor: [0, 0, 0] },
      tableLineColor: [0, 0, 0]
    });
    pdf.save("Academic-Calendar");
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      setFileName(e.target.files[0].name);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        let jsonData = xlsx.utils.sheet_to_json(worksheet);
        setFileJson(jsonData);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
      e.target.value=null;
    }
  }

  const onUpdateData = async (json) => {
    if(json) {
      await axios({
        method: 'post',
        url: 'http://localhost/achievers/set_academic_calendar.php',
        data: {"tableName": "academic_calendar_"+tableName,
          "data": json 
        },
        headers: {'Content-Type': 'application/json'}
      }).then((res) => {
        // window.location.reload();
        getTableData(tableName);
        setFileJson(null);
        setFileName(null);
        setShowLoader(true);
        setShowSuccessMsg(true);
        setTimeout(() => {
          setShowSuccessMsg(false);
          setShowLoader(false);
        }, 3000);
      }).catch((err) => {
        console.log("err:", err);
      })
    }
  }

  return (
    <>
    <Flex className="scrollBar" direction='column' pt={{ base: "120px", md: "75px" }}>
      <Loader load={showLoader} />
      <Card>
        <CardHeader p='6px 0px 22px 0px'>
          <Text fontSize='xl' color={textColor} fontWeight='bold'> Academic Calendar </Text>
        </CardHeader>
        <CardBody flexDirection="column">
          {designation==="hod" || designation==="faculty"
            ? <FormControl display={"block"}>
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'> Semester </FormLabel>
                <Select onChange={(evt) => {onSetSemester(evt);}} id="sem" value={semesterNumber} fontSize='sm' width={{md: "40%", sm: "100%"}} borderRadius='15px' mb='24px' size='md'>
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
                {semesterNumber && designation==="hod"
                  ? <>
                      <FormLabel> Upload File to update data: </FormLabel>
                      <FormLabel htmlFor="uploadbtn" cursor="pointer" mt={3} mb={3}>
                        <Button fontSize='sm' fontWeight='normal' pointerEvents="none"> Upload </Button>
                        <p>{fileName}</p>
                      </FormLabel>
                      <Input display="none" onChange={readUploadFile} id="uploadbtn" accept=".xlsx" name="upload" borderRadius='15px' mb='36px' fontSize='sm' type='file' size='lg' />
                      <Flex direction='row' flexWrap="wrap">
                        <Button fontSize='sm' fontWeight='normal' mr={2} mb={3} onClick={() => onConfirmClick()}> Submit </Button>
                        {tableData.length
                        ? <Button fontSize='sm' fontWeight='normal' mb={3} onClick={() => downloadPDF()}> Download PDF </Button>
                        : null}
                      </Flex>
                      { showWarningMsg
                        ? <Alert status='warning' mt={2} mb={4}>
                            <AlertIcon /> Please upload File.
                          </Alert>
                        : <></>
                      }
                      { showSuccessMsg
                        ? <Alert status='success' variant='subtle' mt={2} mb={4}>
                            <AlertIcon /> Data updated successfully !
                          </Alert>
                        : <></>
                      }
                    </>
                  : null
                }
              </FormControl>
            : null
          }
          {(designation && designation!="hod" && tableData.length)
            ? <Flex direction='row' flexWrap="wrap">
                <Button fontSize='sm' fontWeight='normal' mb={3} onClick={() => downloadPDF()}> Download PDF </Button>
              </Flex>
            : null
          }
          {(!(tableData.length))
            ? <Flex direction='row' flexWrap="wrap" justifyContent="center" fontWeight='bold'>
                No Data Found !
              </Flex>
            : null
          }
          <TableContainer maxWidth="100%" overflowX="auto" overflowY="hidden" whiteSpace="nowrap">
            <Table mb={3} variant='striped' colorScheme='teal' color={textColor}>
              <Thead>
                <Tr color='gray.400'>
                  {tableData.length
                    ? Object.keys(tableData[0]).map((title, idx) => {
                        return (
                          <Th color='gray.400' key={idx}> {title} </Th>
                        );
                      })
                    : null
                  }
                </Tr>
              </Thead>
              <Tbody>
                {tableData.length
                  ? <>
                      {tableData.map((row, idx) => {
                        return(
                          <Tr key={idx}>
                            { Object.keys(row).map((title) => {
                              return (
                                <Td color='gray.200' key={title+"_"+idx}> {row[title]} </Td>
                              );
                            })}
                          </Tr>
                        );
                      })}
                    </>
                  : null
                }
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> Confirmation </ModalHeader>
            <ModalCloseButton autoFocus={false} />
            <ModalBody>
              Are you sure you want to update Data ?
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}> No </Button>
              <Button onClick={() => {onUpdateData(fileJson); onClose();}} colorScheme='blue'> Yes </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Card>
    </Flex>
    </>
  );
}

export default AcademicCalendar;