import { UploadCloud, Video } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-[#11182C] text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / App Name */}
        <div className="text-xl font-bold text-white tracking-wide">MyApp</div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 text-xl hover:text-[#7965C1] transition">
            <UploadCloud className="w-5 h-5" />
            <span className="hidden sm:inline">
              <Link to="/">Upload</Link>
            </span>
          </button>
          <button className="flex items-center space-x-1 text-xl hover:text-[#7965C1] transition">
            <Video className="w-5 h-5" />
            <span className="hidden sm:inline">
              <Link to="/video/:id">Videos</Link>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
