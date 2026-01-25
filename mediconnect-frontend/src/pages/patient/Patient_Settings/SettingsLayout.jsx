import { NavLink, Outlet } from "react-router-dom";

export default function SettingsLayout() {
  const tabs = ["notification", "appearance", "edit"];

  return (
    <div className="w-100 p-3">

      {/* Header */}
      <div className="mb-3">
        <h3 className="mb-1">Settings</h3>
        <p className="text-muted">Manage your settings</p>
      </div>

      {/* Pill Tabs */}
      <div className="pill-tabs mb-4">
        {tabs.map((tab) => (
          <NavLink
            key={tab}
            to={tab}
            className={({ isActive }) =>
              "pill-tab" + (isActive ? " pill-active" : "")
            }
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </NavLink>
        ))}
      </div>

      {/* Page Content */}
      <Outlet />
    </div>
  );
}



// import { NavLink, Outlet } from "react-router-dom";
// import { Container, Nav } from "react-bootstrap";

// export default function SettingsLayout() {
//   return (
//     <Container className="mt-4">
//       <h3>Settings</h3>
//       <p className="text-muted">Manage your settings</p>

//       <Nav variant="tabs" className="settings-tabs mb-4">
//         <Nav.Item>
//           <Nav.Link as={NavLink} to="notification">
//             Notification
//           </Nav.Link>
//         </Nav.Item>

//         <Nav.Item>
//           <Nav.Link as={NavLink} to="appearance">
//             Appearance
//           </Nav.Link>
//         </Nav.Item>

//         <Nav.Item>
//           <Nav.Link as={NavLink} to="edit">
//             Edit
//           </Nav.Link>
//         </Nav.Item>
//       </Nav>

//       {/* Child page renders here */}
//       <Outlet />
//     </Container>
//   );
// }


// import { NavLink, Outlet } from "react-router-dom";

// export default function SettingsLayout() {
//   return (
//     <div className="w-100 p-3">

     
//       <div className="mb-3">
//         <h3 className="mb-1">Settings</h3>
//         <p className="text-muted mb-3">Manage your settings</p>
//       </div>

      
//       <nav
//         className="d-flex gap-3 border-bottom px-3 py-2"
//         style={{ backgroundColor: "#f8f9fa", marginTop: "10px" }}
//       >
//         {["notification", "appearance"].map((tab) => (
//           <NavLink
//             key={tab}
//             to={tab}
//             className={({ isActive }) =>
//               "px-3 py-1 rounded-pill fw-semibold text-decoration-none " +
//               (isActive
//                 ? "bg-white text-dark shadow-sm border"
//                 : "text-muted")
//             }
//             style={{
//               borderWidth: "1.5px",
//               borderStyle: "solid",
//               borderColor: "transparent",
//               borderRadius: "2px",
//             }}
//             onMouseEnter={(e) => {
//               if (!e.currentTarget.classList.contains("active")) {
//                 e.currentTarget.style.borderColor = "#dee2e6"; 
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (!e.currentTarget.classList.contains("active")) {
//                 e.currentTarget.style.borderColor = "transparent";
//               }
//             }}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </NavLink>
//         ))}
//       </nav>

//       <div className="p-3">
//         <Outlet />
//       </div>
//     </div>
//   );
// }
