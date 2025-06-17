import React from "react";
import { Award, Search, User } from "lucide-react";
import girl from "../assets/girl.jpeg";
import CountUp from "react-countup";

const Welcome = () => {
  return (
    <div className="bg-gray-700 pt-[180px] h-[800px] w-full p-12 flex">
      {/* text section */}
      <div>
        <h1 className=" text-gray-100 text-[60px] font-bold pb-3">
          Explore Our <span className="text-green-400 text-[75px]">14000+ </span>{" "}
          <br />
          Online Courses
        </h1>
        <p className="text-gray-300 text-xl pb-16">
          The place to get support, ask and answer questions and contribute
          <br /> to the open source learning platform, Bright LMS.
        </p>
        <input
          className="bg-gray-200 w-[350px] outline-none rounded-l-lg p-4 text-2xl font-bold "
          type="text"
          placeholder="Search your course here .... "
        ></input>
        <button className="bg-blue-500 p-4 rounded-r-lg text-2xl font-bold text-gray-200">
          Search
          <Search className="inline-block h-[20px] w-[20px] ml-2 font-bold" />
        </button>
      </div>

      {/* image section */}
      <div className="absolute right-20">
        <div className="">
          {/* active user */}
          <div className="shadow shadow-white  bg-white w-[250px] rounded-lg absolute top-[10px] -right-[20px]">
            <p className="pl-20 text-4xl font-bold ">
              <CountUp end={4500} />+
            </p>
            <User className="inline-block text-blue-600 h-[30px] w-[30px] ml-5 -mt-3" />
            <p className="inline-block text-gray-600 pl-4 mb-2 tracking-widest font-semibold italic">
              Active Students
            </p>
          </div>

          {/* girl image */}
          <img
            className="mr-[100px] -pt-20 w-[500px] shadow shadow-gray-400 rounded-full"
            src={girl}
            alt="girl bg"
          ></img>

          {/* certified students     */}
          <div className="shadow shadow-white bg-white w-[250px] rounded-lg absolute right-[470px] bottom-[20px]">
            <p className="pl-20 text-4xl font-bold ">
              <CountUp end={1128} />+
            </p>
            <Award className="inline-block text-blue-600 h-[30px] w-[30px] ml-5 -mt-3" />
            <p className="inline-block text-gray-600 pl-4 mb-2 tracking-widest font-semibold italic">
              Certified Students
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
