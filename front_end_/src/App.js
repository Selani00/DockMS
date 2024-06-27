
import "./App.css";
import DocumentCrud from "./components/DocumentCrud";
import DocumentAdd from "./components/DocumentAdd";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import AboutUs from "./components/AboutUs";
import Registration from "./components/Register";
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/Add" element={<DocumentAdd />} />
        <Route path="/Crud" element={<DocumentCrud />} />
        <Route path="/Registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
