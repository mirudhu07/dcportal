import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

const Sidebar = ({ onSelect }) => {
  const [collapsed, setCollapsed] = useState(false); 
  const [activeItem, setActiveItem] = useState(""); 
  const navigate = useNavigate(); // ✅ initialize

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleSelect = (item) => {
    setActiveItem(item); 
    onSelect(item);      

    if (item === "logout") {
      navigate("/");  // ✅ navigate to login page on logout
    }
  };

  return (
    <div
      className="d-flex flex-column vh-100 p-0"
      style={{
        backgroundColor: "white",
        width: collapsed ? "100px" : "250px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        transition: "width 0.3s ease",
        overflow: "hidden",
        borderRight: "1px solid lightgrey" // optional better look
      }}
    >
      <button
        className="btn btn-outline-dark mb-3"
        onClick={toggleSidebar}
        style={{ marginTop: "8px" }}
      >
        <i className="bi bi-list"></i>
      </button>

      <div style={{ marginTop: "40px" }}>
        <ul className="nav flex-column fs-5 mt-5">
          <div className="my-3 mx-1" style={{ fontFamily: "Tahoma" }}>
            <SidebarItem icon="bi bi-journal-text" label="Logger" collapsed={collapsed} active={activeItem === "logger"} onClick={() => handleSelect("logger")} />
          </div>
          <div className="my-3 mx-1" style={{ fontFamily: "Tahoma" }}>
            <SidebarItem icon="bi bi-people" label="Mentor" collapsed={collapsed} active={activeItem === "mentor"} onClick={() => handleSelect("mentor")} />
          </div>
          <div className="my-3 mx-1" style={{ fontFamily: "Tahoma" }}>
            <SidebarItem icon="bi bi-slash-circle" label="Revoke" collapsed={collapsed} active={activeItem === "revoke"} onClick={() => handleSelect("revoke")} />
          </div>
          <div className="my-3 mx-1" style={{ fontFamily: "Tahoma" }}>
            <SidebarItem icon="bi bi-send-fill" label="Forward" collapsed={collapsed} active={activeItem === "forward"} onClick={() => handleSelect("forward")} />
          </div>
          <div className="my-3 mx-1" style={{ fontFamily: "Tahoma" }}>
            <SidebarItem icon="bi bi-box-arrow-left" label="Logout" collapsed={collapsed} active={activeItem === "logout"} onClick={() => handleSelect("logout")} />
          </div>
        </ul>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, collapsed, active, onClick }) => {
  return (
    <li className="nav-item" onClick={onClick} style={{ cursor: "pointer" }}>
      <div
        className="nav-link d-flex align-items-center"
        style={{
          color: active ? "#0d6efd" : "grey", 
          fontWeight: active ? "bold" : "normal",
        }}
      >
        <i className={`${icon} fs-5`}></i>
        {!collapsed && <span className="ms-3">{label}</span>}
      </div>
    </li>
  );
};

export default Sidebar;
