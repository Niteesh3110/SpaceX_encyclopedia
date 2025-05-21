"use client";

import React from "react";
import { useState, useEffect } from "react";
import { getLaunchDataById } from "@/app/api";
import NotFound from "./NotFound";
import { ParallaxBanner } from "react-scroll-parallax";
import { Loading } from "./Loading";
import Link from "next/link";

function CoresDetails({ id, coresData }) {
  //   const data = JSON.parse(sessionStorage.getItem("localCoresData")) || {};
  const [localCoresData, setLocalCoresData] = useState(coresData.data);
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
    if (!coresData || !coresData.boolean) {
      if (!id) {
        console.error("Error core Id not passed");
        return;
      }
      async function fetchCoreData(coreId) {
        console.log("client: coreId", coreId);

        if (!coresData?.boolean) {
          console.error("Error:", result?.error);
          setErrorFetchingData(true);
        }
        setLocalCoresData(coresData.data);
        if (coresData.data.links?.webcast) {
          modifyYTLink(coresData.data.links.webcast);
        }
      }
      fetchCoreData(id);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!localCoresData || Object.keys(localCoresData).length === 0) return;

      try {
        const result = {
          launches: [],
        };

        for (const item of localCoresData.launches) {
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
  }, [localCoresData]);

  useEffect(() => {
    if (localCoresData) {
      console.log("localCoresData", localCoresData);
    }
    if (extraInfo) {
      console.log("ExtaInfo", extraInfo);
    }
  }, [localCoresData, extraInfo]);

  function modifyYTLink(link) {
    if (!link || typeof link !== "string") {
      return { boolean: false, error: "Invalid link type" };
    }
    const linkSplit = link.split("watch?v=");
    linkSplit.push("embed/");
    setYtLink(`${linkSplit[0]}${linkSplit[2]}${linkSplit[1]}`);
  }

  if (errorFetchingData) {
    return <NotFound />;
  }

  // if (loading || !localCoresData) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  if (!localCoresData) {
    return <Loading />;
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-screen">
        <ParallaxBanner
          layers={[
            {
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
              {localCoresData?.serial}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              {localCoresData?.status === "active"
                ? "Active Booster"
                : "Retired Booster"}
            </p>
          </div>
          <div className="absolute inset-0 w-full h-full gradient-background-1 z-10"></div>
        </ParallaxBanner>
      </div>

      {/* Content Section */}
      <div className="w-full bg-detailInfoBackground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Core Booster Info Card */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 mb-12">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Core Booster Details
                  </h2>
                  <p className="text-gray-400 text-lg">
                    Serial: {localCoresData?.serial}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    localCoresData?.status === "active"
                      ? "bg-green-900/50 text-green-400"
                      : localCoresData?.status === "inactive"
                      ? "bg-yellow-900/50 text-yellow-400"
                      : localCoresData?.status === "retired"
                      ? "bg-purple-900/50 text-purple-400"
                      : localCoresData?.status === "expended" ||
                        localCoresData?.status === "lost"
                      ? "bg-red-900/50 text-red-400"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {localCoresData?.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-blue-400 mb-1">
                    Block Version
                  </h3>
                  <p className="text-2xl font-bold text-white">
                    {localCoresData?.block || "-"}
                  </p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-blue-400 mb-1">
                    Reuse Count
                  </h3>
                  <p className="text-2xl font-bold text-white">
                    {localCoresData?.reuse_count || "-"}
                  </p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-blue-400 mb-1">
                    RTLS Landings
                  </h3>
                  <p className="text-2xl font-bold text-white">
                    {localCoresData?.rtls_landings || "-"}/
                    {localCoresData?.rtls_attempts || "-"}
                  </p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-blue-400 mb-1">
                    ASDS Landings
                  </h3>
                  <p className="text-2xl font-bold text-white">
                    {localCoresData?.asds_landings || "-"}/
                    {localCoresData?.asds_attempts || "-"}
                  </p>
                </div>
              </div>

              {localCoresData?.last_update && (
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-md font-semibold text-blue-400 mb-2">
                    Last Update
                  </h3>
                  <p className="text-white">
                    {localCoresData?.last_update || "-"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Launches Section */}
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

export default CoresDetails;
