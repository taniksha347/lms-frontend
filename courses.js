import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";

const Courses = () => {
  const [courseData, setCourseData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // State to track selected course
  const { user } = useContext(UserContext);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  const API_KEY = "AIzaSyAUsvMQaxZad-7TE_7_tfkO6UkxhiWIdn0";

  const fetchRelatedVideos = async (videoId) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&key=${API_KEY}`
    );
    const data = await response.json();
    console.log("YouTube API Response:", data);  // This is the debugging line
    return Array.isArray(data.items) ? data.items : [];
  } catch (error) {
    console.log("Related videos fetch failed", error);
    return [];
  }
};


  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await fetch(
          "https://lms-course-data.onrender.com/view/data"
        );
        const data = await response.json();
        console.log(data);
        setCourseData(data);
      } catch (error) {
        console.log("data fetch nhi hua", error);
      }
    };

    FetchData();
  }, []); // Add dependency array to avoid infinite loop

  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = "hidden"; // lock background
    } else {
      document.body.style.overflow = "auto"; // unlock background
    }

    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedCourse) {
      const videoId = extractVideoId(selectedCourse.src);
      console.log("Extracted Video ID:", videoId); // <-- ADD THIS

      setCurrentVideoId(videoId); // <-- add this line
      fetchRelatedVideos(videoId).then((videos) => {
        console.log("Related Videos:", videos); // <-- AND THIS



        console.log("🔍 VIDEO URL:", selectedCourse.src);
        console.log("🎯 VIDEO ID:", extractVideoId(selectedCourse.src));


        setRelatedVideos(videos);

      });
    }
  }, [selectedCourse]);

  const extractVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:.*v=|v\/|embed\/|shorts\/)|youtu\.be\/)([^&?/]+)/;
  const match = url?.match(regex);
  const videoId = match ? match[1] : null;
  console.log("Extracted Video ID:", videoId);  // This is the debugging line
  return videoId;
};



  const handleReadMore = (course) => {
    if (user) {
      console.log("ab aap course dekh skte ho");
      setSelectedCourse(course);
    } // Set the selected course to show details
    else {
      alert("Please log in to view course details."); // Alert if not logged in
    }
  };

  const renderVideo = (videoId) => {
    return (
      <iframe
        width="550"
        height="300"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Course Video"
        className="p-5 border-4 border-slate-200 my-6"
      />
    );
  };



  const closeDetails = () => {
    setSelectedCourse(null); // close modal
    setCurrentVideoId(null); // reset the main video
    setRelatedVideos([]); // clear the sidebar
  };

  return (
    <div className="pt-[160px] px-[100px]">
      <h1 className="text-3xl text-center mb-4 font-bold">
        Our Online Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courseData.map((course) => (
          <div
            key={course.id}
            className="h-[400px] w-[370px] bg-gray-800 text-white p-2"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-[200px] object-cover"
            />
            <h1 className="text-2xl text-center p-4 font-semibold">
              {course.title}
            </h1>
            <h1 className="text-2xl text-green-400 text-center p-2 font-semibold">
              {course.price}
            </h1>
            <button
              className="bg-green-500 text-white p-2 rounded w-full"
              onClick={() => handleReadMore(course)} // Pass the entire course object
            >
              Read More
            </button>
          </div>
        ))}
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-slate-400 bg-opacity-60 z-50 flex justify-center items-center p-6">
          {/* close */}
          <div
            onClick={closeDetails}
            className="absolute top-4 right-4 bg-transparent text-gray-600 p-3 border-[5px] border-white hover:bg-gray-100 hover:text-red-600 hover:border-black transition-all duration-300 ease-in-out cursor-pointer"
          >
            <span className="text-xl font-semibold">❌</span>
          </div>

          {/* details */}
          <div className="bg-white p-[40px] border-black border-[10px]  outline-dashed outline-white outline-offset-[20px] w-[650px] h-[90vh] overflow-y-auto">
            {/* Master Course Badge */}
            <h1 className="inline-block text-4xl font-semibold text-gray-800 border-t-4 border-b-4 border-gray-300 px-8 py-4 tracking-wide font-serif shadow-sm">
              Master Course
            </h1>

            {/* Course Title */}
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-400 mt-4 mb-6 uppercase tracking-wide">
              {selectedCourse.title}
            </h2>

            {/* Course Thumbnail */}
            <div className="flex justify-center mb-6">
              <img
                src={selectedCourse.thumbnail}
                alt={selectedCourse.title}
                className="w-full max-w-[500px] h-[270px] object-cover rounded-lg shadow-md border-4 border-gray-200"
              />
            </div>

            {/* course details */}
            <h2 className="text-4xl font-bold text-gray-800 mb-8 border-b pb-4">
              📚 Course Overview
            </h2>

            <div className="space-y-[10px] text-gray-800 text-[17px]">
              {/* Title */}
              <div className="flex items-start space-x-6  space-y-1">
                <span className="text-blue-500 text-2xl">📘</span>
                <div className="space-y-[10px]">
                  <p className="text-gray-500 text-sm font-medium">Title</p>
                  <p className="text-xl font-semibold  bg-red-100 border border-red-300 py-1 px-3 text-red-800">
                    {selectedCourse.title}
                  </p>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-start space-x-6 space-y-1">
                <span className="text-orange-500 text-2xl">👨‍🏫</span>
                <div className="space-y-[10px]">
                  <p className="text-gray-500 text-sm font-medium">
                    Instructor
                  </p>
                  <p className="text-md  font-medium  bg-gray-100 text-gray-800 py-1 px-3">
                    {selectedCourse.instructor}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-start space-x-6 space-y-1">
                <span className="text-purple-500 text-2xl">⏱️</span>
                <div className="space-y-[10px]">
                  <p className="text-gray-500 text-sm font-medium">Duration</p>
                  <p className="text-md font-medium bg-gray-100 text-gray-800 py-1 px-3">
                    {selectedCourse.duration}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-start space-x-6 space-y-1">
                <span className="text-green-500 text-2xl">💰</span>
                <div className="space-y-[10px]">
                  <p className="text-gray-500 text-sm font-medium">Price</p>
                  <span className="inline-block px-4 py-1 bg-green-100 text-green-800 font-semibold border border-green-300 shadow-sm">
                    {selectedCourse.price}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="flex items-start space-x-4 space-y-1">
                <span className="text-gray-400 text-2xl">📝</span>
                <div className="flex-1 space-y-5">
                  <p className="text-gray-500 text-sm font-medium">
                    Description
                  </p>
                  <div className="text-gray-800 leading-relaxed border border-gray-300 p-4 rounded-2xl bg-gray-100 shadow-inner italic tracking-wide">
                    {selectedCourse.description}
                  </div>
                </div>
              </div>
            </div>

            {/* video */}
            <div className="mt-8">
              <div className="flex gap-6 flex-wrap">
                {/* Main Video */}
                <div>{renderVideo(currentVideoId)}</div>

                {/* Related Videos Sidebar */}
                <div className="sidebar w-[270px] h-[300px] overflow-y-auto border-l border-gray-300 pl-4">
                  <h2 className="text-lg font-semibold mb-2">
                    🎞 Related Videos
                  </h2>
                  {Array.isArray(relatedVideos) && relatedVideos.map((video) => (
                    <div
                      key={video.id.videoId}
                      className="mb-3 cursor-pointer hover:opacity-80 transition"
                      onClick={() => setCurrentVideoId(video.id.videoId)}
                    >
                      <img
                        src={video.snippet.thumbnails.default.url}
                        alt={video.snippet.title}
                        className="w-full h-[80px] object-cover mb-1 rounded"
                      />
                      <p className="text-sm font-medium">
                        {video.snippet.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
