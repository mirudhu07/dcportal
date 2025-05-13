import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar2 = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    setHamburgerClicked(!hamburgerClicked);
  };

  const handleSelect = (item) => {
    setActiveItem(item);

    switch (item) {
      case "logger":
        navigate("/logger2");
        break;
      case "mentor":
        navigate("/mentor2");
        break;
      case "revoke":
        navigate("/revoke2");
        break;
      case "forward":
        navigate("/forward2");
        break;
      case "logout":
        navigate("/");
        break;
      default:
        break;
    }
  };

  const menuItems = [
    { icon: "bi bi-journal-text", label: "Logger", key: "logger" },
    { icon: "bi bi-people", label: "Mentor", key: "mentor" },
    { icon: "bi bi-slash-circle", label: "Revoke", key: "revoke" },
    { icon: "bi bi-send-fill", label: "Forward", key: "forward" },
  ];

  return (
    <div
      className="d-flex flex-column justify-content-between vh-100 shadow"
      style={{
        backgroundColor: "#ffffff",
        width: collapsed ? "65px" : "250px",
        position: "fixed",
        top: 0,
        left: 0,
        transition: "width 0.3s ease",
        overflow: "hidden",
        zIndex: 1000,
      }}
    >
      {/* Top Section: Hamburger and Menu */}
      <div>
        <button
          className="btn mb-3"
          onClick={toggleSidebar}
          style={{
            color: hamburgerClicked ? "#0d6efd" : "#000000",
            marginTop: "10px",
            marginLeft: collapsed ? "8px" : "16px",
          }}
        >
          <i className="bi bi-list fs-4"></i>
        </button>

        <ul className="nav flex-column align-items-start mt-4 px-2">
          {menuItems.map(({ icon, label, key }) => (
            <li key={key} className="nav-item w-100 text-center">
              <SidebarItem
                icon={icon}
                label={label}
                collapsed={collapsed}
                active={activeItem === key}
                onClick={() => handleSelect(key)}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section: Logout */}
      <div className="mb-4 px-2">
        <SidebarItem
          icon="bi bi-box-arrow-left"
          label="Logout"
          collapsed={collapsed}
          active={activeItem === "logout"}
          onClick={() => handleSelect("logout")}
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, collapsed, active, onClick }) => {
  return (
    <div
      className="nav-link d-flex align-items-center"
      onClick={onClick}
      style={{
        color: active ? "#0d6efd" : "#343a40",
        fontWeight: active ? "bold" : "normal",
        cursor: "pointer",
        padding: "12px 10px",
      }}
    >
      <i className={`${icon} fs-5`}></i>
      {!collapsed && <span className="ms-3">{label}</span>}
    </div>
  );
};

export default Sidebar2;
