/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import streamo from "../../assets/images/streamo-logo.png";
interface Video {
  videoId: string;
  title: string;
  description?: string;
  filePath: string;
  contentType: string;
  thumbnailPath?: string;
}
const TrendingVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const getImageUrl = (video: any) => {
    return `https://loremflickr.com/400/300/${encodeURIComponent(
      video.title || "video"
    )}`;
  };
  useEffect(() => {
    async function getVideos() {
      try {
        const resp = await axios.get(`${baseUrl}/videos/getAllVideos`);
        console.log(resp.data);
        if (resp?.data.length > 0) {
          setVideos(resp.data);
        } else {
          setVideos([]);
        }
      } catch (error) {
        console.log(error);
        setVideos([]);
      }
    }
    getVideos();
  }, []);

  return (
    <section className="pt-4 pr-4 text-white">
      <h2 className="text-2xl font-semibold mb-6">Trending Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
        {videos.slice(0, 4).map((video) => (
          <div
            key={video.videoId}
            className="bg-[#11182C] p-3 rounded-xl hover:scale-[1.02] transition-transform duration-200 shadow-lg"
          >
            <Link to={`/video/${video.videoId}`}
              state={{ videoTitle: video.title, videoDescription: video.description }}

            >
              <img
                src={getImageUrl(video) || streamo}
                alt={video.title}
                onError={(e:any) => {
                  e.target.onerror = null;
                  e.target.src = streamo;
                }}
                className="rounded-lg w-full h-30 object-cover mb-3"
              />
              <h3 className="text-lg font-medium">{video.title}</h3>
              <p className="text-sm text-gray-400">{video.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingVideos;
