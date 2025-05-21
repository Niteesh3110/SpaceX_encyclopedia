"use client";
import Image from "next/image";
import { ParallaxBanner } from "react-scroll-parallax";
import { FaAngleDoubleDown } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import History from "./HistoryCards";

export default function Home({ companyData }) {
  const videoRef = useRef(null);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (companyData) console.log(companyData);
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const AboutSection = ({ image, title, content }) => (
    <div className="w-screen h-screen relative object-cover overflow-y-scroll">
      <ParallaxBanner
        layers={[{ image, speed: -20 }]}
        className="absolute z-20 w-full h-full"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900/50"></div>
        <div className="relative z-30 flex flex-col justify-center items-center text-center w-full h-full text-white">
          <h1 className="text-4xl font-bold mb-10 font-section">{title}</h1>
          <p className="max-w-2xl font-section">{content}</p>
        </div>
      </ParallaxBanner>
    </div>
  );

  return (
    <div className="w-full overflow-x-hidden">
      <div className="relative w-screen h-screen overflow-hidden ">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
          autoPlay
          loop
          muted={isMuted}
        >
          <source src="/video2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900/50"></div>
        <button
          onClick={toggleMute}
          className="absolute top-5 right-5 z-30 px-4 py-2 bg-black/50 text-white rounded hover:bg-black/70 transition cursor-pointer"
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4.5, delay: 0.5, ease: "easeOut" }}
            className="text-6xl font-bold font-mainHeading"
          >
            SpaceX
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4.5, delay: 0.5, ease: "easeOut" }}
            className="text-3xl mt-4 font-mainHeading font-bold"
          >
            Revolutionizing Space Travel, Launch by Launch.
          </motion.p>
        </div>

        {showScrollDown && (
          <motion.div
            className="absolute -bottom-0.5 left-0 w-full z-20 flex flex-col items-center justify-center py-4 text-white text-center"
            animate={{ y: [0, -20, 0] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            <p className="text-l mt-4">Scroll down for more info</p>
            <FaAngleDoubleDown />
          </motion.div>
        )}
      </div>

      <AboutSection
        image="/pic_7.jpg"
        title="About SpaceX Encyclopedia"
        content={`SpaceX Encyclopedia is a comprehensive digital platform that offers detailed insights into various aspects of SpaceX, one of the world’s leading aerospace companies. It encompasses structured data on a wide range of categories including launches, launchpads, cores, payloads, ships, and rockets. From mission timelines and launch outcomes to reusable booster histories and payload specifications, the encyclopedia serves as a centralized resource for understanding SpaceX’s technological advancements and operational infrastructure. Whether exploring autonomous drone ships used for rocket recovery, examining the evolution of Falcon and Starship rockets, or diving into the purpose and content of orbital payloads, users can engage with an in-depth repository that captures the scope and ambition of SpaceX’s contributions to modern space exploration.`}
      />
      <div className="bg-black w-full h-5"></div>
      {/* <AboutSection
        image="/pic4.jpg"
        title="Our Mission"
        content={companyData?.summary || ""}
      /> */}
      <div className="w-screen h-screen relative object-cover overflow-y-scroll">
        <ParallaxBanner
          layers={[{ image: "/pic8.jpg", speed: -20 }]}
          className="absolute z-20 w-full h-full"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gray-900/70"></div>
          <div className="relative z-30 flex flex-col justify-center items-center text-center w-full h-full text-white">
            <h1 className="text-4xl font-bold mb-10 font-section">
              {"More About SpaceX"}
            </h1>
            <div className="flex w-[50%] h-14 justify-around items-center m-8">
              <Link
                href="/history"
                className="border p-7 rounded-md bg-black/90 text-white hover:bg-black/50 transition cursor-pointer"
              >
                Company History
              </Link>
              <Link
                href="/company"
                className="border p-7 rounded-md bg-black/90 text-white hover:bg-black/50 transition cursor-pointer"
              >
                Company Details
              </Link>
            </div>
          </div>
        </ParallaxBanner>
      </div>

      {/* History Section */}
      {/* <div className="relative z-10 w-full min-h-screen">
        <ParallaxBanner layers={[{ image: "/pic5.jpg", speed: -10 }]}>
          <div className="absolute top-0 left-0 w-full h-full bg-gray-900/50"></div>
          <h1 className="text-white text-center text-2xl pt-2 z-20 relative">
            History
          </h1>
          <motion.div
            className="w-full h-full flex flex-wrap justify-center gap-6 p-6"
            initial="hidden"
            whileInView="visible"
            variants={{}}
            viewport={{ once: true }}
          >
            {loading ? (
              <div className="flex justify-center items-center h-64 w-auto">
                <p className="text-xl">Loading history...</p>
              </div>
            ) : (
              companyHistoryData.map((data) => (
                <History key={data.id} history={data} />
              ))
            )}
          </motion.div>
        </ParallaxBanner>
      </div> */}

      <div className="bg-black w-full h-5"></div>
      <div className="relative w-full h-min-screen">
        <ParallaxBanner
          layers={[{ image: "/pic6.jpg", speed: -20 }]}
          className="absolute top-0 left-0 w-full h-min-screen flex flex-col justify-between gap-5 bg-auto"
        >
          <div className="relative border w-[60%] h-[45%] self-start mx-10 flex z-30 bg-cardBackground rounded-sm">
            <Link
              href="/launches/page/0"
              className="w-full h-full justify-between items-center flex gap-2"
            >
              <div className="h-[300px] w-[45%] p-5">
                <img
                  src={"/launches.jpg"}
                  className="h-full w-full object-cover rounded-sm shadow-2xl"
                  alt="Launch Pad"
                />
              </div>
              <div className="p-5 w-full h-auto text-start flex flex-col justify-center items-center sm:overflow-y-scroll md:overflow-y-scroll">
                <div className="w-full max-w-4xl">
                  {" "}
                  <h1 className="text-2xl text-start w-full mb-4">Launches</h1>
                  <p className="w-full">
                    SpaceX launches are transforming space exploration with
                    reusable Falcon 9 and Falcon Heavy rockets. They support
                    satellite deployments, ISS resupply missions, and crewed
                    flights, while pioneering cost-effective booster landings.
                    Each launch advances global communication, scientific
                    research, and the vision for interplanetary travel. To date,
                    SpaceX has achieved 463 successful launches, marking
                    significant progress in humanity's journey to explore and
                    inhabit the cosmos.
                  </p>
                  <p className=" text-gray-500 hover:text-black transition-colors">
                    Click to know more
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Payloads Section */}
          <div className="relative border w-[60%] h-[45%] self-end mx-10 flex z-20 bg-cardBackground rounded-sm">
            <Link
              href="/payloads/page/0"
              className="w-full h-full flex justify-between gap-2"
            >
              <div className="p-5 w-full h-auto flex flex-col justify-center items-center sm:overflow-y-scroll md:overflow-y-scroll">
                <div className="w-full max-w-4xl text-start">
                  {" "}
                  <h1 className="text-2xl text-start w-full mb-4">Payloads</h1>
                  <p className="w-full">
                    SpaceX payloads include satellites, ISS resupply missions,
                    and scientific instruments, delivered by Falcon 9 and Falcon
                    Heavy rockets. Their reusable technology enables
                    cost-effective, reliable launches, advancing global
                    communication, research, and exploration.
                  </p>
                  <p className=" text-gray-500 hover:text-black transition-colors">
                    Click to know more
                  </p>
                </div>
              </div>
              <div className="h-[300px] w-[45%] p-5">
                <img
                  src={"/payloads_pic.jpg"}
                  className="h-full w-full object-cover rounded-sm shadow-2xl"
                  alt="Payloads"
                />
              </div>
            </Link>
          </div>

          {/* Cores Section */}
          <div className="relative border w-[60%] h-[45%] self-start mx-10 flex bg-cardBackground rounded-sm">
            <Link
              href="/cores/page/0"
              className="w-full h-full flex justify-between gap-2"
            >
              <div className="h-[300px] w-[45%] p-5">
                <img
                  src={"/coresPic.jpg"}
                  className="h-full w-full object-cover rounded-sm shadow-2xl"
                  alt="Cores"
                />
              </div>
              <div className="p-5 w-full h-auto flex justify-center items-center sm:overflow-y-scroll md:overflow-y-scroll">
                <div className="max-w-4xl text-start">
                  {" "}
                  <h1 className="text-2xl text-start w-full mb-4">Cores</h1>
                  <p className="w-full">
                    SpaceX cores, the reusable first stages of Falcon 9 and
                    Falcon Heavy rockets, are a cornerstone of the company's
                    innovation. Designed to land vertically after launch, these
                    cores are refurbished and flown multiple times,
                    significantly reducing the cost of space missions. With over
                    200 successful booster landings to date, SpaceX's reusable
                    cores have revolutionized spaceflight, enabling frequent and
                    affordable access to orbit while paving the way for
                    sustainable space exploration.
                  </p>
                  <p className=" text-gray-500 hover:text-black transition-colors">
                    Click to know more
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Rockets Section */}
          <div className="relative border w-[60%] h-[45%] self-end mx-10 flex bg-cardBackground rounded-sm">
            <Link
              href="/rockets/page/0"
              className="w-full h-full flex justify-between gap-2"
            >
              <div className="h-[300px] w-[45%] p-5">
                <img
                  src={"/rocketsPic.jpg"}
                  className="h-full w-full object-cover rounded-sm shadow-2xl"
                  alt="Rockets"
                />
              </div>
              <div className="p-5 w-full h-auto flex justify-center items-center overflow-y-auto">
                <div className="max-w-2xl text-start px-4">
                  {" "}
                  <h1 className="text-2xl text-start w-full mb-4">Rockets</h1>
                  <p className="w-full">
                    SpaceX rockets, like the reusable Falcon 9 and Falcon Heavy,
                    are transforming space travel by enabling satellite
                    launches, ISS missions, and crewed flights at lower costs.
                    The upcoming Starship aims for interplanetary exploration,
                    including Mars. These rockets are making space more
                    accessible and advancing humanity's journey beyond Earth.
                  </p>
                  <p className=" text-gray-500 hover:text-black transition-colors">
                    Click to know more
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Ships Section */}
          <div className="relative border w-[60%] h-[45%] self-start mx-10 flex bg-cardBackground rounded-sm">
            <Link
              href="/ships/page/0"
              className="w-full h-full flex justify-between items-center gap-2"
            >
              <div className="h-[300px] w-[45%] p-5">
                <img
                  src={"/shipsPic.png"}
                  className="h-full w-full object-cover object-left rounded-sm shadow-2xl"
                  alt="Ships"
                />
              </div>
              <div className="p-5 w-full h-auto flex justify-center items-center overflow-y-auto">
                <div className="max-w-2xl text-start px-4">
                  {" "}
                  <h1 className="text-2xl text-start w-full mb-4">Ships</h1>
                  <p className="w-full">
                    SpaceX uses autonomous drone ships like Just Read the
                    Instructions and Of Course I Still Love You to recover
                    Falcon 9 and Falcon Heavy boosters at sea. Support ships
                    like GO Searcher and GO Navigator* assist in crewed mission
                    recoveries. These water ships are essential for reusable
                    rocket technology, enabling cost-effective and sustainable
                    spaceflight operations.
                  </p>
                  <p className=" text-gray-500 hover:text-black transition-colors">
                    Click to know more
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Launchpads Section */}
          <div className="relative border w-[60%] h-full self-end mx-10 flex bg-cardBackground rounded-sm">
            <Link
              href="/launchpads/page/0"
              className="w-full h-full flex justify-between items-center gap-2"
            >
              <div className="p-5 w-full h-auto flex justify-center items-center overflow-y-auto">
                <div className="max-w-2xl text-start px-4">
                  {" "}
                  <h1 className="text-2xl text-start w-full mb-4">
                    Launchpads
                  </h1>
                  <p className="w-full">
                    SpaceX operates launch pads at LC-39A and SLC-40 in Florida,
                    and SLC-4E in California, for Falcon 9 and Falcon Heavy
                    missions. The Starbase facility in Texas is dedicated to
                    Starship launches. These pads support a wide range of
                    missions, from satellite deployments to interplanetary
                    exploration, enabling SpaceX's ambitious launch schedule.{" "}
                  </p>
                  <p className=" text-gray-500 hover:text-black transition-colors">
                    Click to know more
                  </p>
                </div>
              </div>
              <div className="h-[300px] w-[45%] p-5">
                <img
                  src={"/launchpads_pic.jpg"}
                  className="h-full w-full object-cover object-left rounded-sm shadow-2xl"
                  alt="Launch Pad"
                />
              </div>
            </Link>
          </div>
        </ParallaxBanner>
      </div>
    </div>
  );
}
