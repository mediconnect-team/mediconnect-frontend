import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "./Settings";
import Notification from "./Notification";
import Security from "./Security";
import System from "./System";
import Appearance from "./Appearance";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/settings" element={<Settings />}>
          <Route index element={<div />} />

          <Route path="general" element={<div />} />
          <Route path="notification" element={<Notification />} />
          <Route path="security" element={<Security />} />
          <Route path="system" element={<System />} />
          <Route path="appearance" element={<Appearance />} />
        </Route>

        <Route path="/" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
