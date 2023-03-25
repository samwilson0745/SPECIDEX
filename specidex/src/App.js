import { Routes , Route , BrowserRouter } from "react-router-dom";
import Home from "./components/Home"
import About from "./components/About"
import Upload from "./components/Upload"
import WebCam from "./components/WebCam/Webcam";
import Navbar from './components/templates/Navbar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path = "/" element = {<Home/>} />
          <Route path = "/about" element = {<About/>} />
          <Route path = "/upload" element = {<Upload/>} />
          <Route path = "/webcam" element = {<WebCam/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
