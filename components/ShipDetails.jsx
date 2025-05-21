"use client";

import React from "react";
import { useState, useEffect } from "react";
import { getLaunchDataById } from "@/app/api";
import NotFound from "./NotFound";
import { ParallaxBanner } from "react-scroll-parallax";
import { Loading } from "@/components/Loading";
import Link from "next/link";

function ShipsDetails({ id, shipData }) {
  //   const data = JSON.parse(sessionStorage.getItem("shipData")) || {};
  const [localShipData, setLocalShipData] = useState(null);
  const [errorFetchingData, setErrorFetchingData] = useState(false);
  const [extraInfo, setExtraInfo] = useState(null);

  async function handleLaunchData(launchpadId) {
    try {
      const result = await getLaunchDataById(launchpadId);
      if (result.boolean) {
        return result.data;
      }
    } catch (error) {
      console.error(
        `Something went wrong when fetching launchpad details: ${error}`
      );
    }
  }

  useEffect(() => {
    if (!localShipData) {
      if (!id) {
        console.error("Error core Id not passed");
        return;
      }
      async function fetchShipData(coreId) {
        console.log(coreId);

        if (!shipData?.boolean) {
          console.error("Error:", result?.error);
          setErrorFetchingData(true);
        }
        setLocalShipData(shipData.data);
      }
      fetchShipData(id);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!localShipData || Object.keys(localShipData).length === 0) return;

      try {
        const result = {
          launches: [],
        };

        for (const item of localShipData?.launches) {
          const launchData = await handleLaunchData(item);
          if (launchData) {
            result.launches.push(launchData);
          }
        }

        setExtraInfo(result);
      } catch (error) {
        console.error("Error fetching launch data:", error);
      }
    };

    fetchData();
  }, [localShipData]);

  useEffect(() => {
    if (localShipData) {
      console.log("localShipData", localShipData);
    }
    if (extraInfo) {
      console.log("ExtaInfo", extraInfo);
    }
  }, [localShipData, extraInfo]);

  function modifyYTLink(link) {
    if (!link || typeof link !== "string") {
      return { boolean: false, error: "Invalid link type" };
    }
    const linkSplit = link.split("watch?v=");
    linkSplit.push("embed/");
    setYtLink(`${linkSplit[0]}${linkSplit[2]}${linkSplit[1]}`);
  }

  if (errorFetchingData) {
    return <Loading />;
  }

  if (!localShipData) return <Loading />;

  return (
    <div>
      <div className="relative w-full h-screen">
        <ParallaxBanner
          layers={[
            {
              image: localShipData?.image || null,
              speed: 0,
              shouldAlwaysCompleteAnimation: true,
              expanded: false,
            },
          ]}
          className="w-full h-full bg-cover object-cover"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gray-900/50"></div>
          <div className="relative z-30 flex flex-col justify-center items-center text-center w-full h-full text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-section">
              {localShipData?.name}
            </h1>
          </div>
          <div className="absolute inset-0 w-full h-full gradient-background-1 z-10"></div>
        </ParallaxBanner>
      </div>
      <div className="w-full bg-detailInfoBackground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Ship Info Card */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 mb-12">
            <div className="flex flex-col md:flex-row">
              {/* Ship Image */}
              <div className="md:w-1/3">
                <img
                  src={localShipData?.image || "/detailsDefaultBg.webp"}
                  alt={localShipData?.name}
                  className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                />
              </div>

              {/* Ship Details */}
              <div className="p-6 md:p-8 md:w-2/3">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                  <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {localShipData?.name}
                    </h2>
                    <p className="text-gray-400 text-lg">
                      {localShipData?.type}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      localShipData?.active
                        ? "bg-green-900/50 text-green-400"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {localShipData?.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-blue-400 mb-1">
                      Home Port
                    </h3>
                    <p className="text-lg font-medium text-white">
                      {localShipData?.home_port}
                    </p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-blue-400 mb-1">
                      Year Built
                    </h3>
                    <p className="text-lg font-medium text-white">
                      {localShipData?.year_built}
                    </p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-blue-400 mb-1">
                      Mass
                    </h3>
                    <p className="text-lg font-medium text-white">
                      {localShipData?.mass_kg} kg ({localShipData?.mass_lbs}{" "}
                      lbs)
                    </p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-blue-400 mb-1">
                      IMO Number
                    </h3>
                    <p className="text-lg font-medium text-white">
                      {localShipData?.imo}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-md font-semibold text-blue-400 mb-2">
                    Roles
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {localShipData?.roles.map((role, index) => (
                      <span
                        key={index}
                        className="bg-gray-800/50 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {localShipData?.link && (
                  <a
                    href={localShipData?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    View on MarineTraffic
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Launches Section (Kept exactly as before) */}
          {extraInfo?.launches.length > 0 && (
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Associated Launches
                </h2>

                <div className="overflow-y-auto max-h-[600px] space-y-4 pr-2">
                  {extraInfo?.launches.map((launch) => (
                    <div
                      key={launch.id}
                      className="bg-gray-800/50 p-5 rounded-lg border border-gray-700"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                        <div className="mb-3 md:mb-0">
                          <Link
                            href={`/launches/${launch.id}`}
                            className="text-white hover:text-gray-700 transition-colors w-full"
                          >
                            <h3 className="text-xl font-bold">{launch.name}</h3>
                          </Link>
                          <p className="text-gray-400">
                            {new Date(launch.date_local).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            launch.success
                              ? "bg-green-900/50 text-green-400"
                              : "bg-red-900/50 text-red-400"
                          }`}
                        >
                          {launch.success ? "Successful" : "Failed"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-md font-semibold text-blue-400 mb-2">
                            Flight Details
                          </h4>
                          <p className="text-gray-300">
                            Flight Number: {launch.flight_number}
                          </p>
                          {launch.details && (
                            <p className="text-gray-300 mt-2">
                              {launch.details}
                            </p>
                          )}
                        </div>

                        {launch.links && (
                          <div>
                            <h4 className="text-md font-semibold text-blue-400 mb-2">
                              Media
                            </h4>
                            <div className="flex space-x-3 items-center">
                              {launch.links.patch?.small && (
                                <a
                                  href={launch.links.patch.large}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src={launch.links.patch.small || null}
                                    alt="Mission patch"
                                    className="h-16 w-16 object-contain bg-gray-800 rounded-lg p-1"
                                  />
                                </a>
                              )}
                              {launch.links.youtube_id && (
                                <a
                                  href={`https://youtube.com/watch?v=${launch.links.youtube_id}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-lg px-3 py-1"
                                >
                                  Watch Video
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {launch.links && (
                        <div className="flex flex-wrap gap-2">
                          {launch.links.article && (
                            <a
                              href={launch.links.article}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg"
                            >
                              Article
                            </a>
                          )}
                          {launch.links.wikipedia && (
                            <a
                              href={launch.links.wikipedia}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg"
                            >
                              Wikipedia
                            </a>
                          )}
                          {launch.links.presskit && (
                            <a
                              href={launch.links.presskit}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg"
                            >
                              Press Kit
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShipsDetails;
