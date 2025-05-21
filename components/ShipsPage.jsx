"use client";

import React from "react";
import { getShipData } from "@/app/api";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { ParallaxBanner } from "react-scroll-parallax";
import NotFound from "./NotFound";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loading } from "./Loading.jsx";

function ShipsPage({ page, shipData }) {
  const [localShipData, setLocalShipData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useRouter();

  useEffect(() => {
    async function fetchData() {
      if (searchQuery) return;

      const requestData = await getShipData({ page });
      if (requestData?.boolean) {
        setLocalShipData(requestData?.data);
      } else {
        console.log("Could not fetch data");
      }
    }
    fetchData();
  }, [page, searchQuery]);

  useEffect(() => {
    if (localShipData) console.log("localShipData", localShipData);
  }, [localShipData]);

  function handleInputChange(e) {
    const value = e.target.value.trim();
    console.log("Input Value:", value);
    setSearchQuery(value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch(e.target.value.trim());
    }
  }

  async function handleSearch(query) {
    console.log("Search Query:", query);
    if (query.length > 1) {
      try {
        const requestData = await getShipData({
          name: query,
          page: 1,
        });
        if (requestData?.boolean) {
          setLocalShipData(requestData?.data);
          navigate.push("/ships/page/1");
        } else {
          console.log("Could not fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }

  const ResultCards = ({ id, name, type, isActive, image }) => (
    <>
      <div className="w-full h-full p-4 border rounded-lg bg-black/50 shadow-sm hover:shadow-md transition-shadow flex gap-12 text-white items-center">
        <div className="h-full min-w-[150px] max-w-[250px] flex justify-center items-center rounded-sm bg-gray-100">
          <img
            src={image ? image : "/imageNotFoundPic.svg"}
            alt="Image Not Found"
            className="w-[150px] h-[150px] object-cover"
          />
        </div>

        <div className="flex flex-col justify-start items-start">
          <div className="flex gap-2">
            <h3 className="font-medium">{name}</h3>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400 pr-2">Type:</span>
            <span className="text-white capitalize">{type}</span>
          </div>

          <div className="flex items-center">
            <span className="text-gray-400 pr-2">active:</span>
            <span
              className={`font-medium ${
                isActive ? "text-green-400" : "text-red-400"
              }`}
            >
              {`${isActive}`}
            </span>
          </div>

          <div className="flex justify-start gap-5">
            <Link href={`/ships/${id}`} className="hover:text-gray-500 py-2">
              Details →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
  const Pages = ({ page, totalPages }) => {
    page = Number(page);
    if (page > totalPages) return <div></div>;
    return (
      <>
        {page - 1 >= 0 ? (
          <Link href={`/ships/page/${page - 1}`} className="text-white">
            <FaAngleLeft className="mt-1" />
          </Link>
        ) : (
          <div></div>
        )}
        {page <= totalPages ? (
          <Link href={`/ships/page/${page}`} className="text-white">
            <div className=" h-6 w-6 border rounded-sm text-center">{page}</div>
          </Link>
        ) : (
          <div></div>
        )}
        {page + 1 <= totalPages ? (
          <Link href={`/ships/page/${page + 1}`} className="text-white">
            <div className=" h-6 w-6 border rounded-sm text-center">
              {page + 1}
            </div>
          </Link>
        ) : (
          <div></div>
        )}
        {page + 2 <= totalPages ? (
          <Link href={`/ships/page/${page + 2}`} className="text-white">
            <div className=" h-6 w-6 border rounded-sm text-center">
              {page + 2}
            </div>
          </Link>
        ) : (
          <div></div>
        )}
        {page + 2 >= totalPages ? (
          <div></div>
        ) : (
          <Link href={`/ships/page/${page + 1}`} className="text-white">
            <FaAngleRight className="mt-1" />
          </Link>
        )}
      </>
    );
  };
  return (
    <>
      <ParallaxBanner
        layers={[{ image: "/space-background.jpg", speed: -10 }]}
        className="z-1"
      >
        <div className="w-screen min-h-screen bg-black flex flex-col items-center p-4 gap-4 z-20 ">
          <div className="border w-full max-w-8xl h-16 flex items-center justify-between px-4 bg-none rounded-lg shadow-sm z-20">
            <Link
              href="/"
              className="text-white dark:text-white font-semibold hover:text-gray-800 dark:hover:text-gray-400 transition-colors duration-200 px-4 py-2 rounded-md hover:bg-red-50 dark:hover:bg-gray-900/20 border border-white hover:border-gray-200 dark:hover:border-gray-800 ml-4 flex items-center gap-1"
            >
              <span>Home</span>
            </Link>

            <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Search..."
                  className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:text-gray-600 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                  onClick={() => handleSearch(searchQuery)}
                >
                  <IoMdSearch className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Empty div to balance the flex layout */}
            <div className="w-[72px]"></div>
          </div>

          <div className="min-h-screen border w-full max-w-8xl flex-1 flex flex-col bg-none rounded-lg shadow-sm overflow-y-hidden z-20">
            <div className="h-screen w-full max-w-5xl mx-auto p-4 overflow-y-scroll">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Results
              </h2>
              <div className="space-y-4">
                {localShipData?.docs && localShipData?.docs.length !== 0 ? (
                  localShipData.docs.map((data, index) => (
                    <ResultCards
                      key={data?.id}
                      id={data?.id}
                      name={data?.name}
                      type={data?.type}
                      isActive={data?.active}
                      image={data?.image}
                    />
                  ))
                ) : (
                  <Loading />
                )}
              </div>
            </div>
            <div className="mt-auto w-full max-w-4xl mx-auto">
              <hr className="w-full border-t border-gray-200 my-2" />
              <div className="flex p-1 justify-center gap-1 z-20 bg-none">
                <Pages page={page} totalPages={localShipData?.totalPages} />
              </div>
            </div>
          </div>
        </div>
      </ParallaxBanner>
    </>
  );
}

export default ShipsPage;
