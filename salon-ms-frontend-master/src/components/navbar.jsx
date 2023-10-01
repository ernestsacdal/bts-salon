import { GrLanguage } from "react-icons/gr";
import { Link as ScrollLink, Element } from "react-scroll";
import logo from "../assets/bts.png";
import { Link } from "react-router-dom";
import { FaXmark, FaBars } from "react-icons/fa6";
import { Outlet, useNavigate } from "react-router-dom";
import banner from "../assets/banner.png";
import Banner from "../shared/banner";
import cards from "../assets/card.png";
import about from "../assets/about.png";
import greenImage from "../assets/green.png";
import { useState } from "react";
import Flogo from "../assets/bts.png";
import fb from "../assets/fb.png";
import IG from "../assets/ig.png";
import LinkIn from "../assets/linkin.png";
import X from "../assets/x.png";
function Navbar() {
  const menu = [
    { name: "Overview", Link: "home" },
    { name: "Feature", Link: "feature" },
    { name: "About", Link: "about" },
    { name: "Pricing", Link: "price" },
  ];
  const [isYearly, setISYearly] = useState(false);

  const packages = [
    {
      name: "Start",
      monthlyPrice: 19,
      yearlyPrice: 199,
      description:
        "A common form of Lorem ipsum reads: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      green: greenImage,
    },
    {
      name: "Advance",
      monthlyPrice: 29,
      yearlyPrice: 299,
      description:
        "A common form of Lorem ipsum reads: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      green: greenImage,
    },
    {
      name: "Premium",
      monthlyPrice: 199,
      yearlyPrice: 1999,
      description:
        "A common form of Lorem ipsum reads: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      green: greenImage,
    },
  ];
  const Nav = useNavigate();

  const Navigation = (
    <div className="bg-white md:px-14 max-w-screen-4xl mx-auto text-primary fixed top-0 right-0 left-0">
      <div className="text-lg mx-auto flex items-center justify-between font-medium">
        <div className="flex space-x-14 items-center">
          <a
            href="/"
            className="text-2xl font-semibold flex items-center space-x-3 text-primary"
          >
            <img src={logo} alt="" className="w-20 inline-block items-center" />
            <span>BTS</span>
          </a>
          {/* <ul className="md:flex space-x-12 hidden"> */}
          {menu.map((Nab, i) => (
            <ScrollLink
              key={i}
              to={Nab.Link}
              spy={true}
              smooth={true}
              offset={-100}
              duration={500} // Adjust the duration as needed
              className="block hover:text-gray-300 cursor-pointer"
            >
              {Nab?.name}
            </ScrollLink>
          ))}

          {/* </ul> */}
        </div>
        <div className="space-x-12 hidden md:flex items-center">
          <a href="" className="hidden lg:flex item-center hover:text-second">
            <GrLanguage className="mr-3 mt-1 " />
            <span>Language</span>
          </a>
          <button
            onClick={() => Nav("/AdminSignup")}
            className="btnPrimary py-1 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600 "
          >
            <Link to="/AdminSignup"> Salon Owner </Link>
          </button>
          <button
            onClick={() => Nav("/ClientSignup")}
            className="btnPrimary py-1 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600 "
          >
            <Link to="/ClientSignup">Salon Client</Link>
          </button>
        </div>
      </div>
    </div>
  );
  const HomePage = (
    <div className="md:px-12 p-4 max-w-screen-4x mx-auto mt-24" id="home">
      <Banner
        banner={banner}
        heading="Elevate your elegance"
        subheading="Elevate your salon business with our Salon Management System. Streamline appointments, client management, and inventory tracking effortlessly. Join us for a smoother, more efficient salon experience."
        btn1={"Get Started"}
        btn2={"Discount"}
      />
    </div>
  );
  const FeaturesPage = (
    <div className="my-24 md:px-14 px-4 max-w-screen-4x mx-auto" id="feature">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        <div className="lg:w-1/4 ">
          <h3 className="text-3xl text-primary font-bold lg:w-1/2 mb-3">
            Why we are better than others
          </h3>
          <p className="text-base  text-tart">
            Our Salon Management System outshines others with user-friendliness,
            advanced features, and reliability. We prioritize simplicity and
            offer powerful tools for efficiency, enhancing the client experience
            and gaining a competitive edge in the beauty industry. Choose us for
            smarter salon management and thrive..”
          </p>
        </div>

        {/* CARDS */}
        <div className="w-full lg:w-3/4">
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8">
            <div
              className="bg-[(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center items-center hover:-translate-y-4 transition-all
          duration-300 cursor-pointer  "
            >
              <div>
                <img src={cards} alt="" />
                <h5 className="text-2xl font-semibold text-primary px-5 text-center mt-5">
                  Streamline Appointments
                </h5>
              </div>
            </div>
            <div
              className="bg-[(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center items-center hover:-translate-y-4 transition-all
          duration-300 cursor-pointer md:mt-16  "
            >
              <div>
                <img src={cards} alt="" />
                <h5 className="text-2xl font-semibold text-primary px-5 text-center mt-5">
                  Track Inventory
                </h5>
              </div>
            </div>
            <div
              className="bg-[(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center items-center hover:-translate-y-4 transition-all
          duration-300 cursor-pointer "
            >
              <div>
                <img src={cards} alt="" />
                <h5 className="text-2xl font-semibold text-primary px-5 text-center mt-5">
                  Client Profiling
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const AboutPage = (
    <div
      className="md:px-14 p-4 max-w-screen-4xl max-w-s mx-auto space-y-10"
      id="about"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap 8">
        <div className="md:w-1/2">
          <img src={about} alt="" />
        </div>

        {/* about content */}
        <div className="md:w-2/5">
          <h2 className="md:text-5xl text-3xl font-bold text-primary mb-5 leading-normal">
            We have been improving our product
            <span className="text-second"> for many years.</span>
          </h2>
          <p className="text-tart text-lg mb-7">
            "A compelling illustration of effective salon management includes an
            optimized appointment system, efficient client communication tools,
            and streamlined inventory management. Experience this comprehensive
            solution for your salon today!"
          </p>
          <button className="btnPrimary">Get Started</button>
        </div>
      </div>
      {/* 2nd contents */}
      <div className="flex flex-col md:flex-row-reverse justify-between items-center gap 8">
        <div className="md:w-1/2">
          <img src={about} alt="" />
        </div>

        {/* about content */}
        <div className="md:w-2/5">
          <h2 className="md:text-5xl text-3xl font-bold text-primary mb-5 leading-normal">
            "Take control of your salon, anytime, anywhere."
            <span className="text-second"> time convinent for you.</span>
          </h2>
          <p className="text-tart text-lg mb-7">
            Manage your salon anytime, anywhere. Our system provides real-time
            control over appointments, clients, and inventory, ensuring maximum
            efficiency and convenience.
          </p>
          <button className="btnPrimary">Get Started</button>
        </div>
      </div>
    </div>
  );
  const PricePage = (
    <div className="md:px-14 p-4  max-w-screen-4xl mx-auto py-10" id="price">
      <div className="text-center ">
        <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">
          Here are all our plans
        </h2>
        <p className="text-tart md:w-1/3 mx-auto px-4">
          A simple paragraph is comprised of three major components. The which
          is often a declarative sentence.
        </p>

        {/* pricing */}

        <div className="mt-16">
          <label
            htmlFor="toggle"
            className="inline-flex item-center cursor-pointer"
          >
            <span className="mr-8 text-2xl font-semibold">Monthly</span>
            <div className="w-14 h-6 bg-gray-300 rounded-full transition duration-200 ease-in-out">
              <div
                className={`w-6 h-6 rounded-full transition duration-300 ease-in-out ${
                  isYearly ? "bg-primary ml-8" : "bg-gray-300"
                }`}
              ></div>
            </div>
            <span className="ml-8 text-2xl font-semibold">Yearly</span>
          </label>
          <input
            type="checkbox"
            id="toggle"
            className="hidden"
            checked={isYearly}
            onChange={() => setISYearly(!isYearly)}
          ></input>
        </div>
      </div>

      {/* cards */}
      <div className="grid sm:grid-cols-3 gap-10 mt-20 md:w-11/12 mx-auto">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="border py-10 md:px-6 px-4 rounded-lg shadow-3xl"
          >
            <h3 className="text-3xl font-bold text-center text-primary">
              {pkg.name}
            </h3>
            <p className="text-tart text-center my-5">{pkg.description}</p>
            <p className="mt-5 text-center text-second text-4xl font-bold">
              {isYearly ? `$${pkg.yearlyPrice}` : `$${pkg.monthlyPrice}`}
              <span className="text-base text-tart font-medium">
                /{isYearly ? "year" : "month"}
              </span>
            </p>
            <ul className="mt-4 space-y-2 px-4">
              <li className="flex gap-3 items-center">
                <img src={pkg.green} alt="" className="w-4 h-4" />
                Videos of Lessons
              </li>
              <li className="flex gap-3 items-center">
                <img src={pkg.green} alt="" className="w-4 h-4" />
                Homework check
              </li>
              <li className="flex gap-3 items-center">
                <img src={pkg.green} alt="" className="w-4 h-4" />
                Additional practical task
              </li>
              <li className="flex gap-3 items-center">
                <img src={pkg.green} alt="" className="w-4 h-4" />
                Monthly conferences
              </li>
              <li className="flex gap-3 items-center">
                <img src={pkg.green} alt="" className="w-4 h-4" />
                Personal advice from teachers
              </li>
            </ul>
            <div className="w-full mx-auto mt-8 flex items-center justify-center">
              <button className="btnPrimary"> Get Started</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  const Footer = (
    <div className="bg-[#010851] md:px-4 p-4 max-w-screen-4xl mx-auto text-white">
      <div className="my-12 flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 space-y-8">
          <a
            href="/"
            className="text-2xl font-semibold flex items-center space-x-3 text-primary"
          >
            <img
              src={Flogo}
              alt=""
              className="w-10 inline-block items-center"
            />
            <span className="text-white">BTS</span>
          </a>
          <p className="md:w-1/2 text-white">
            A simple paragraph is comprised of three major components. The first
            sentence, which is often a declarative sentence.
          </p>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              className="bg-[#9a7af159] py-2 px-4 rounded-md focus:outline-none"
            />
            <input
              type="submit"
              value="Subscribe"
              className="px-4 py-2 bg-second rounded-md -ml-2 cursor-pointer hover:bg-white hover:text-primary duration-300 transition-all"
            />
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col md:flex-row flex-wrap justify-between gap-5 items-start">
          <div className="space-y-6 mt-5">
            <h4 className="text-xl">Platform</h4>
            <ul className="space-y-3">
              <a href="/" className="block hover:text-gray-300">
                Overview
              </a>
              <a href="/" className="block hover:text-gray-300">
                Features
              </a>
              <a href="/" className="block hover:text-gray-300">
                About
              </a>
              <a href="/" className="block hover:text-gray-300">
                Pricing
              </a>
            </ul>
          </div>
          <div className="space-y-6 mt-5">
            <h4 className="text-xl">Help</h4>
            <ul className="space-y-3">
              <a href="/" className="block hover:text-gray-300">
                How does it works?
              </a>
              <a href="/" className="block hover:text-gray-300">
                Where to ask question?
              </a>
              <a href="/" className="block hover:text-gray-300">
                How to play?
              </a>
              <a href="/" className="block hover:text-gray-300">
                What is needed for this?
              </a>
            </ul>
          </div>
          <div className="space-y-6 mt-5">
            <h4 className="text-xl">Contacts</h4>
            <ul className="space-y-3">
              <p className="hover:text-gray-300">(012) 1234-567-890</p>
              <p className="hover:text-gray-300">123 xyz xyz</p>
              <p className="hover:text-gray-300">qwuerybaihefv, qiwu - hrebc</p>
              <p className="hover:text-gray-300">095467</p>
            </ul>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex flex-col sm:flex-row gap-8 sm:items-center justify-between my-8">
        <p>@ XYZ 20XX --- 20XX. All rights reserved.</p>
        <div className="flex items-center space-x-5">
          <img
            src={fb}
            alt=""
            className="w-8 cursor-pointer hover:translate-y-4 transition-all duration-300"
          />
          <img
            src={IG}
            alt=""
            className="w-8 cursor-pointer hover:translate-y-4 transition-all duration-300"
          />
          <img
            src={LinkIn}
            alt=""
            className="w-8 cursor-pointer hover:translate-y-4 transition-all duration-300"
          />
          <img
            src={X}
            alt=""
            className="w-8 cursor-pointer hover:translate-y-4 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
  return (
    <div>
      {Navigation}
      <Outlet />
      {HomePage}
      {FeaturesPage}
      {AboutPage}
      {PricePage}
      {Footer}
    </div>
  );
}

export default Navbar;
