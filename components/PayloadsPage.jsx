"use client";

import React from "react";
import { getPayloadData } from "@/app/api";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { ParallaxBanner } from "react-scroll-parallax";
import NotFound from "./NotFound";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loading } from "./Loading";

function PayloadsPage({ page, payloadData }) {
  const [localPayloadData, setLocalPayloadData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      if (searchQuery) return;

      const requestData = await getPayloadData({ page });
      if (requestData?.boolean) {
        setLocalPayloadData(requestData?.data);
      } else {
        console.log("Could not fetch data");
      }
    }
    fetchData();
  }, [page, searchQuery]);

  useEffect(() => {
    if (!localPayloadData) {
      setLocalPayloadData(payloadData);
    }
  }, [payloadData]);

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
        const requestData = await getPayloadData({
          name: query,
          page: 1,
        });
        if (requestData?.boolean) {
          setLocalPayloadData(requestData?.data);
          router.push("/payloads/page/1");
        } else {
          console.log("Could not fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }

  function convertDate(date) {
    const newDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    };
    return newDate.toLocaleString("en-US", options);
  }

  const ResultCards = ({ id, name, launch }) => (
    <>
      <div className="w-full min-w-[200px] max-w-[250px] h-[120px] p-4 border rounded-lg bg-black/50 shadow-sm hover:shadow-md transition-shadow flex text-white">
        <div className="flex flex-col justify-between w-full">
          <div>
            <h3 className="font-medium text-sm md:text-base truncate">
              {name}
            </h3>
          </div>
          <div className="flex justify-start">
            <Link
              href={`/payloads/${id}`}
              onClick={() =>
                sessionStorage.setItem(
                  "payloadData",
                  JSON.stringify({ launch })
                )
              }
              className="hover:text-gray-500 text-xs md:text-sm"
            >
              View Details →
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
          <Link href={`/payloads/page/${page - 1}`} className="text-white">
            <FaAngleLeft className="mt-1" />
          </Link>
        ) : (
          <div></div>
        )}
        {page <= totalPages ? (
          <Link href={`/payloads/page/${page}`} className="text-white">
            <div className=" h-6 w-6 border rounded-sm text-center">{page}</div>
          </Link>
        ) : (
          <div></div>
        )}
        {page + 1 <= totalPages ? (
          <Link href={`/payloads/page/${page + 1}`} className="text-white">
            <div className=" h-6 w-6 border rounded-sm text-center">
              {page + 1}
            </div>
          </Link>
        ) : (
          <div></div>
        )}
        {page + 2 <= totalPages ? (
          <Link href={`/payloads/page/${page + 2}`} className="text-white">
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
          <Link href={`/payloads/page/${page + 1}`} className="text-white">
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

          <div className="min-h-full border w-full max-w-8xl flex-1 flex flex-col bg-none rounded-lg shadow-sm overflow-y-hidden z-20">
            <div className="h-full w-full max-w-5xl mx-auto p-4 overflow-y-scroll">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Results
              </h2>
              <div className="space-y-4 flex flex-wrap gap-5 justify-start items-center pl-24">
                {localPayloadData?.docs &&
                localPayloadData?.docs.length !== 0 ? (
                  localPayloadData.docs.map((data, index) => (
                    <ResultCards
                      key={data?.id}
                      id={data?.id}
                      name={data?.name}
                      launch={data?.launch}
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
                <Pages page={page} totalPages={localPayloadData?.totalPages} />
              </div>
            </div>
          </div>
        </div>
      </ParallaxBanner>
    </>
  );
}

export default PayloadsPage;
