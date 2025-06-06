import { useLocation, useParams } from "react-router-dom";

export default function VideoPlayer() {
    const { id } = useParams(); // grabs the id from the URL
 const location = useLocation();
  const { videoTitle, videoDescription } = location.state || {};
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

  return (
    <div className="min-h-[80vh]] text-white pt-3 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-[#11182C] rounded-2xl p-6 shadow-xl">
        {/* Video Player */}
        <div className="w-full max-h-[400px] aspect-video rounded-lg overflow-hidden mb-6">
          <video src={`${baseUrl}/videos/stream/range/${id}`}
          className="w-full h-full object-cover bg-black"
          controls></video>
        </div>

        {/* Title and Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">{videoTitle}</h2>
          <p className="text-sm text-gray-400">
            {videoDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
