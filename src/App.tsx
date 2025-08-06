import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Classes from "./components/Classes";
import Trainers from "./components/Trainers";
import Services from "./components/Services";
import Membership from "./components/Membership";
import Contact from "./components/Contact";
import Login from "./components/Login/Login"; // Assuming you have a Login component

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/services" element={<Services />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
