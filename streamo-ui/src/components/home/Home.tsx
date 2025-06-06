import TrendingVideos from "../trendingvideos/TrendingVideos";
import UploadVideo from "../uploadvideo/UploadVideo";

const Home = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <UploadVideo />
      <TrendingVideos />
    </div>
  );
};

export default Home;
