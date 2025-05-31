
const videos = [
  {
    id: 1,
    title: 'Tech Tutorials',
    subtitle: 'Motion Normations',
    image: 'https://source.unsplash.com/400x300/?tech,person',
  },
  {
    id: 2,
    title: 'Coding Challenges',
    subtitle: 'Coding Challenges',
    image: 'https://source.unsplash.com/400x300/?coding,woman',
  },
  {
    id: 1,
    title: 'Tech Tutorials',
    subtitle: 'Motion Normations',
    image: 'https://source.unsplash.com/400x300/?tech,person',
  },
  {
    id: 2,
    title: 'Coding Challenges',
    subtitle: 'Coding Challenges',
    image: 'https://source.unsplash.com/400x300/?coding,woman',
  },
];

const TrendingVideos = () => {
  return (
    <section className="pt-4 pr-4 text-white">
      <h2 className="text-2xl font-semibold mb-6">Trending Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-[#11182C] p-3 rounded-xl hover:scale-[1.02] transition-transform duration-200 shadow-lg"
          >
            <img
              src={video.image}
              alt={video.title}
              className="rounded-lg w-full h-30 object-cover mb-3"
            />
            <h3 className="text-lg font-medium">{video.title}</h3>
            <p className="text-sm text-gray-400">{video.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingVideos;
