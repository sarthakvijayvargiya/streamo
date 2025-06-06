import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import VideoPlayer from "./components/videoplayer/VideoPlayer";
import Home from "./components/home/Home";
import NotFound from "./components/notfound/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/video/:id" element={<VideoPlayer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
