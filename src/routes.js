// import
import Dashboard from "views/Dashboard/Dashboard";

import AcademicCalendar from "components/LJKU-Components/Academic-Calendar.js";
import TimeTable from "components/LJKU-Components/Time-Table";
import Circular from "components/LJKU-Components/Circular";
import Attendance from "components/LJKU-Components/Attendance";
import Notes from "components/LJKU-Components/Notes";
import Result from "components/LJKU-Components/Result";

import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import { CalendarIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';

import { Icon } from '@chakra-ui/react'
import { MdAccessTime, MdSpeakerNotes, MdLanguage, MdOutlineBook } from 'react-icons/md';

import { HomeIcon, StatsIcon, CreditIcon, PersonIcon, DocumentIcon, RocketIcon, SupportIcon } from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/home",
    name: "Home",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/academic-calendar",
    name: "Academic Calendar",
    rtlName: "لوحة القيادة",
    icon: <CalendarIcon boxSize={3.5} color="inherit" />,
    component: AcademicCalendar,
    layout: "/admin",
  },
  {
    path: "/time-table",
    name: "Time Table",
    rtlName: "لوحة القيادة",
    icon: <Icon as={MdAccessTime} boxSize={4} />,
    component: TimeTable,
    layout: "/admin",
  },
  {
    path: "/notes",
    name: "Notes",
    rtlName: "لوحة القيادة",
    icon: <Icon as={MdSpeakerNotes} boxSize={4} />,
    component: Notes,
    layout: "/admin",
  },
  {
    path: "/circular",
    name: "Circular",
    rtlName: "لوحة القيادة",
    icon: <Icon as={MdLanguage} boxSize={4} />,
    component: Circular,
    layout: "/admin",
  },
  {
    path: "/result",
    name: "Result",
    rtlName: "لوحة القيادة",
    icon: <Icon as={MdOutlineBook} boxSize={4} />,
    component: Result,
    layout: "/admin",
  },
  {
    path: "/signin",
    name: "Sign In",
    rtlName: "لوحة القيادة",
    icon: <DocumentIcon color="inherit" />,
    component: SignIn,
    layout: "/auth",
  },
  {
    path: "/signup",
    name: "Sign Up",
    rtlName: "لوحة القيادة",
    icon: <RocketIcon color="inherit" />,
    secondaryNavbar: true,
    component: SignUp,
    layout: "/auth",
  }
];
export default dashRoutes;
