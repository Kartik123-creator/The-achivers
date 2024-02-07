// Chakra imports
import { Flex, Icon, Link, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const ProfileInformation = () => {
  // Chakra color mode
  const [uname, setUname] = useState(null);
  const textColor = useColorModeValue("gray.700", "white");
  const [designation, setDesignation] = useState("");
  const [branchName, setBranchName]= useState("");
  const [email, setEmail]= useState("");
  const [sem, setSem]= useState("");

  useEffect(() => {
    let data = localStorage.getItem("data");
    let des_name = JSON.parse(data).designation;
    let u_name = JSON.parse(data).uname;
    let e_mail = JSON.parse(data).email;
    let semester = JSON.parse(data).sem;
    let branch_name="";
    if (JSON.parse(data).branch === "computer-eng") {
      branch_name="Computer Engineering";
    } else if (JSON.parse(data).branch === "computer-science-eng") {
      branch_name="Computer Science Engineering";
    } else if (JSON.parse(data).branch === "information-tech") {
      branch_name="Information Technology";
    } else if (JSON.parse(data).branch === "civil-eng") {
      branch_name="Civil Engineering";
    } else if (JSON.parse(data).branch === "mechanical-eng") {
      branch_name="Mechanical Engineering";
    }
    if(des_name!="faculty" && des_name!="hod") {
      setSem(semester)
    }
    setUname(u_name);
    setEmail(e_mail);
    setDesignation(des_name);
    setBranchName(branch_name);
  }, []);

  return (
    <Card p='16px' my={{ sm: "24px", xl: "0px" }}>
      <CardHeader p='12px 5px' mb='12px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold'> Profile Information </Text>
      </CardHeader>
      <CardBody px='5px'>
        <Flex direction='column'>
          { uname
            ? <Flex align='center' mb='18px'>
                <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
                  Name:{" "}
                </Text>
                <Text fontSize='md' color='gray.500' fontWeight='400'> {uname} </Text>
              </Flex>
            : <></>
          }
          { email
            ? <Flex align='center' mb='18px'>
                <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
                  Email:{" "}
                </Text>
                <Text fontSize='md' color='gray.500' fontWeight='400'> { email } </Text>
              </Flex>
            : <></>
          }
          { designation
            ? <Flex align='center' mb='18px'>
                <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
                  Designation:{" "}
                </Text>
                <Text fontSize='md' color='gray.500' fontWeight='400'> { designation[0].toLocaleUpperCase()+designation.slice(1) } </Text>
              </Flex>    
            : <></>
          }
          { sem
            ? <Flex align='center' mb='18px'>
                <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
                  Semester:{" "}
                </Text>
                <Text fontSize='md' color='gray.500' fontWeight='400'> { sem } </Text>
              </Flex>
            : <></>
          }
          { branchName
            ? <Flex align='center' mb='18px'>
                <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
                  Branch Name:{" "}
                </Text>
                <Text fontSize='md' color='gray.500' fontWeight='400'> { branchName } </Text>
              </Flex>
            : <></>
          }
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ProfileInformation;
