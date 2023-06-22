import { Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Auth/Login";
function App() {
  return (
<>
<Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/Register" element={<Register/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/About" element={<About/>}/>
  <Route path="/Contact" element={<Contact/>}/>
  <Route path="/Policy" element={<Policy/>}/>
  <Route path="*" element={<PageNotFound/>}/>

</Routes>
</>
  );
}

export default App;
