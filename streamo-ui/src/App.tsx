import "./App.css";
import Navbar from "./components/navbar/Navbar";
import TrendingVideos from "./components/trendingvideos/TrendingVideos";
import UploadVideo from "./components/uploadvideo/UploadVideo";

function App() {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <UploadVideo />
        <TrendingVideos />
      </div>
    </>
  );
}

export default App;
