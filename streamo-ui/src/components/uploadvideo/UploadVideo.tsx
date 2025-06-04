/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { ArrowDownToLine, Loader } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({
    video: "",
    title: "",
    description: ""
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showSuccessMessage = () => {
    toast.success("File Uploaded Successfully", {
      position: "top-right",
    });
  };
  const showErrorMessage = () => {
    toast.error("Error While Uploading File. Please Try Again!", {
      position: "top-right",
    });
  };

  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setErrors((prev) => ({ ...prev, video: "" }));
    } else {
      setVideoFile(null);
      setErrors((prev) => ({
        ...prev,
        video: "Only video files are allowed.",
      }));
    }
  };

  const handleDrop = (e:any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setErrors((prev) => ({ ...prev, video: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        video: "Only video files are allowed.",
      }));
    }
  };

  const handleUpload = (e:any) => {
    e.preventDefault();

    const newErrors = {
      video: "",
      title: "",
      description: "",
    };
    if (!videoFile) newErrors.video = "Video file is required.";
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";

    if (
      newErrors.video.length > 0 ||
      newErrors.title.length > 0 ||
      newErrors.description.length > 0
    ) {
      setErrors(newErrors);
      return;
    }

    // ✅ Form is valid - handle the upload logic here
    console.log("Uploading:", { videoFile, title, description });
    saveVideoToServer(videoFile, title, description);
    setVideoFile(null);
    setTitle("");
    setDescription("");
    setUploading(false);
  };

  async function saveVideoToServer(videoFile:any, title:any, description:any) {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("title", title);
    formData.append("description", description);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try {
      const resp = await axios.post(`${baseUrl}/videos/save`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (resp?.data?.statusOP?.statusErrorCode == "SUCCESS") {
        showSuccessMessage();
      } else {
        showErrorMessage();
      }
    } catch (error) {
      console.log(error);
      showErrorMessage();
    }
  }

  const handleClick = () => {
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
};

  return (
    <form
      onSubmit={handleUpload}
      className="w-full flex items-center justify-center pt-4 pl-4"
    >
      <div className="min-w-full max-w-md bg-[#11182C] rounded-2xl p-6 md:p-8 md:pt-4 shadow-2xl">
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
          Upload Video
        </h2>

        {/* Drag & Drop Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer ${
            errors.video ? "border-red-500" : "border-[#483AA0]"
          } bg-[#0E2148] text-white mb-2`}
          onClick={handleClick}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <ArrowDownToLine className="w-6 h-6 text-[#7965C1]" />
            <p className="text-base">
              {videoFile ? videoFile.name : "Drag & drop your video here"}
            </p>
            <p className="text-sm text-gray-400">Or click to browse</p>
          </div>
          <input
            type="file"
            accept="video/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        {errors.video && (
          <p className="text-red-500 text-sm mb-2">{errors.video}</p>
        )}

        {/* Title Input */}
        <div className="mb-3">
          <label className="block text-sm text-gray-300 mb-1">Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2 bg-[#1C2A4A] text-white rounded-md focus:outline-none focus:ring-2 ${
              errors.title ? "ring-red-500" : "focus:ring-[#7965C1]"
            } placeholder-gray-400`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* Description Input */}
        <div className="mb-3">
          <label className="block text-sm text-gray-300 mb-1">
            Description
          </label>
          <textarea
            placeholder="Description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-4 py-2 bg-[#1C2A4A] text-white rounded-md focus:outline-none focus:ring-2 ${
              errors.description ? "ring-red-500" : "focus:ring-[#7965C1]"
            } placeholder-gray-400`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Upload Button */}
        <button
          type="submit"
          disabled={uploading}
          className={` ${
            uploading
              ? "text-[#ffffff] bg-gradient-to-r from-[#ae73fb] to-[#3b00a8]"
              : "bg-gradient-to-r from-[#ae73fb] to-[#3b00a8] text-white"
          } w-full  hover:opacity-90  font-semibold py-2 rounded-md transition flex align-middle justify-center items-center`}
        >
          {uploading ? (
            <>
              <span>Uploading</span>{" "}
              <Loader className="w-6 h-6 text-[#ffffff]" />
            </>
          ) : (
            "Upload Video"
          )}
        </button>
        <ToastContainer />
      </div>
    </form>
  );
};

export default UploadVideo;
