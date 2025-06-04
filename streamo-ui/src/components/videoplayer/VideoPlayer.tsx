
export default function VideoPlayer() {
  return (
    <div className="min-h-screen text-white p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-[#11182C] rounded-2xl p-6 shadow-xl">
        {/* Video Player */}
        <div className="w-full max-h-[450px] aspect-video rounded-lg overflow-hidden mb-6">
          <video src={`http://localhost:8080/api/v1/videos/stream/range/c89b97fa-5280-4bdc-b793-0daf4c6c8d97`}
          className="w-full h-full object-cover bg-black"
          controls></video>
        </div>

        {/* Title and Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Tech Tutorials</h2>
          <p className="text-sm text-gray-400">
            Learn the fundamentals of building user interfaces with React and Tailwind. This tutorial covers everything from setup to deployment.
          </p>
        </div>
      </div>
    </div>
  );
}
