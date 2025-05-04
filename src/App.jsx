import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

// Student Sidebars
import S_Sidebar1 from "./components/sidebar/S_Sidebar1";
import S_Sidebar2 from "./components/sidebar/S_Sidebar2";
import S_Sidebar3 from "./components/sidebar/S_Sidebar3";
import S_Sidebar4 from "./components/sidebar/S_Sidebar4";
import S_Sidebar5 from "./components/sidebar/S_Sidebar5";

// Admin Sidebar
import Admin_Sidebar from './components/sidebar/Admin_sidebar';
import Header from "./components/header/Header";

// Student Pages
import Student1_1 from "./pages/Students/Student1/Student1_1";
import Student1_2 from "./pages/Students/Student1/Student1_2";
import Student1_3 from "./pages/Students/Student1/Student1_3";
import Student1_4 from "./pages/Students/Student1/Student1_4";
import Student2_1 from "./pages/Students/Student2/Student2_1";
import Student2_2 from "./pages/Students/Student2/Student2_2";
import Student2_3 from "./pages/Students/Student2/Student2_3";
import Student2_4 from "./pages/Students/Student2/Student2_4";
import Student3_1 from "./pages/Students/Student3/Student3_1";
import Student3_2 from "./pages/Students/Student3/Student3_2";
import Student3_3 from "./pages/Students/Student3/Student3_3";
import Student3_4 from "./pages/Students/Student3/Student3_4";
import Student4_1 from "./pages/Students/Student4/Student4_1";
import Student4_2 from "./pages/Students/Student4/Student4_2";
import Student4_3 from "./pages/Students/Student4/Student4_3";
import Student4_4 from "./pages/Students/Student4/Student4_4";
import Student5_1 from "./pages/Students/Student5/Student5_1";
import Student5_2 from "./pages/Students/Student5/Student5_2";
import Student5_3 from "./pages/Students/Student5/Student5_3";
import Student5_4 from "./pages/Students/Student5/Student5_4";

// Admin Pages
import Admin1 from "./pages/Admin/Admin1";
import Admin2 from "./pages/Admin/Admin2";
import Admin3 from "./pages/Admin/Admin3";
import Admin3_1 from "./pages/Admin/Admin3_1";
import Admin3_2 from "./pages/Admin/Admin3_2";
import Admin4 from "./pages/Admin/Admin4";

// Faculty Pages
import Logger from './pages/Faculty/Logger';
import Mentor from './pages/Faculty/Mentor';
import Revoke from './pages/Faculty/Revoke';
import Forward from './pages/Faculty/Forward';

// Support Desk
import Supportdesk from "./pages/Supportdesk/SupportDesk";
import SupportSidebar from './components/sidebar/SupportSidebar';
import Sidebar from "./components/sidebar/Sidebar";

const AppContent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedPage, setSelectedPage] = useState("logger");
  const location = useLocation();

  // // Toggle manually for now, can be from login session later
  // const isFaculty = location.pathname.startsWith("/logger") ||
  //                   location.pathname.startsWith("/mentor") ||
  //                   location.pathname.startsWith("/revoke");
  // const isSupport = location.pathname.startsWith("/supportdesk");
  // Use either this for faculty routes...
  const isFaculty = location.pathname.startsWith("/logger") ||
                  location.pathname.startsWith("/mentor") ||
                  location.pathname.startsWith("/revoke");

  const isSupport = location.pathname.startsWith("/supportdesk");



  const isLoginPage = location.pathname === "/";

  const facultyPages = {
    logger: <Logger />,
    mentor: <Mentor />,
    revoke: <Revoke />,
    forward: <Forward />
  };

  const supportPages = {
    supportDesk: <Supportdesk />
  };

  const renderPage = () => {
    if (isFaculty) return facultyPages[selectedPage] || <h2>Select a faculty option</h2>;
    if (isSupport) return supportPages[selectedPage] || <h2>Select a support option</h2>;
    return null;
  };

  const sidebarMap = {
    "/student1_1": <S_Sidebar1 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student1_2": <S_Sidebar1 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student1_3": <S_Sidebar1 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student1_4": <S_Sidebar1 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student2_1": <S_Sidebar2 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student2_2": <S_Sidebar2 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student2_3": <S_Sidebar2 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student2_4": <S_Sidebar2 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student3_1": <S_Sidebar3 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student3_2": <S_Sidebar3 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student3_3": <S_Sidebar3 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student3_4": <S_Sidebar3 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student4_1": <S_Sidebar4 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student4_2": <S_Sidebar4 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student4_3": <S_Sidebar4 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student4_4": <S_Sidebar4 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student5_1": <S_Sidebar5 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student5_2": <S_Sidebar5 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student5_3": <S_Sidebar5 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student5_4": <S_Sidebar5 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/admin1": <Admin_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/admin2": <Admin_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/admin3": <Admin_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/admin3_1": <Admin_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/admin3_2": <Admin_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/admin4": <Admin_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
  };

  // Route-based Sidebar
  const showSidebar = sidebarMap[location.pathname];

  // Conditional Layouts
  if (isFaculty || isSupport) {
    return (
      <div style={{ display: "flex" }}>
        {isFaculty ? (
          <Sidebar onSelect={setSelectedPage} />
        ) : (
          <SupportSidebar onSelect={setSelectedPage} />
        )}
        <div style={{ flex: 1, padding: "20px" }}>
          {renderPage()}
        </div>
      </div>
    );
  }

  // Default App Layout (Students/Admin)
  return (
    <div className="d-flex">
      {showSidebar}
      <div style={{ flex: 1 }}>
        {!isLoginPage && <Header collapsed={collapsed} />}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* Admin */}
          <Route path="/admin1" element={<Admin1 />} />
          <Route path="/admin2" element={<Admin2 />} />
          <Route path="/admin3" element={<Admin3 />} />
          <Route path="/admin3_1" element={<Admin3_1 />} />
          <Route path="/admin3_2" element={<Admin3_2 />} />
          <Route path="/admin4" element={<Admin4 />} />

          {/* Student */}
          <Route path="/student1_1" element={<Student1_1 />} />
          <Route path="/student1_2" element={<Student1_2 />} />
          <Route path="/student1_3" element={<Student1_3 />} />
          <Route path="/student1_4" element={<Student1_4 />} />
          <Route path="/student2_1" element={<Student2_1 />} />
          <Route path="/student2_2" element={<Student2_2 />} />
          <Route path="/student2_3" element={<Student2_3 />} />
          <Route path="/student2_4" element={<Student2_4 />} />
          <Route path="/student3_1" element={<Student3_1 />} />
          <Route path="/student3_2" element={<Student3_2 />} />
          <Route path="/student3_3" element={<Student3_3 />} />
          <Route path="/student3_4" element={<Student3_4 />} />
          <Route path="/student4_1" element={<Student4_1 />} />
          <Route path="/student4_2" element={<Student4_2 />} />
          <Route path="/student4_3" element={<Student4_3 />} />
          <Route path="/student4_4" element={<Student4_4 />} />
          <Route path="/student5_1" element={<Student5_1 />} />
          <Route path="/student5_2" element={<Student5_2 />} />
          <Route path="/student5_3" element={<Student5_3 />} />
          <Route path="/student5_4" element={<Student5_4 />} />

          {/* Faculty & Support (Fallback only) */}
          <Route path="/logger" element={<Logger />} />
          <Route path="/mentor" element={<Mentor />} />
          <Route path="/revoke" element={<Revoke />} />
          <Route path="/forward" element={<Forward />} />
          <Route path="/supportdesk" element={<Supportdesk />} />
        </Routes>
      </div>
    </div>
  );
};

 const App = () => (
  <Router>
    <AppContent />
  </Router>
); 

export default App;