"use client";

import React from "react";
import { useState, useEffect } from "react";
import { getLaunchDataById, getLaunchPadsById, getRocketById } from "@/app/api";
import { ParallaxBanner } from "react-scroll-parallax";
import { Loading } from "./Loading";
import Link from "next/link";

function LaunchpadsDetails({ id, launchpadData }) {
  // const data = JSON.parse(sessionStorage.getItem("rocketData")) || {};
  const [loading, setLoading] = useState(true);
  const [localLaunchpadData, setLocalLaunchpadData] = useState(null);
  const [errorFetchingData, setErrorFetchingData] = useState(false);
  const [extraInfo, setExtraInfo] = useState(null);

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

  async function handleLaunchData(launchId) {
    try {
      const result = await getLaunchDataById(launchId);
      if (result.boolean) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error(
        `Something went wrong when fetching launch details: ${error}`
      );
      return null;
    }
  }

  async function handleRocketData(rocketId) {
    try {
      const result = await getRocketById(rocketId);
      if (result.boolean) {
        return result.data;
      }
    } catch (error) {
      console.error(
        `Something went wrong when fetching rocket details: ${error}`
      );
    }
  }

  useEffect(() => {
    if (!localLaunchpadData) {
      if (!id) {
        console.error("Error rocket Id not passed");
        return;
      }
      async function fetchLaunchpadData(id) {
        console.log("l", launchpadData);
        if (!launchpadData?.boolean) {
          console.error("Error:", launchpadData?.error);
          setErrorFetchingData(true);
        }
        setLocalLaunchpadData(launchpadData.data);
      }
      fetchLaunchpadData(id);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!localLaunchpadData || Object.keys(localLaunchpadData).length === 0)
        return;

      try {
        const result = {
          launches: [],
          rockets: [],
        };

        for (const item of localLaunchpadData.launches) {
          const launchData = await handleLaunchData(item);
          if (launchData) {
            result.launches.push(launchData);
          }
        }

        for (const item of localLaunchpadData.rockets) {
          const rocketData = await handleRocketData(item);
          if (rocketData) {
            result.rockets.push(rocketData);
          }
        }

        setExtraInfo(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching launch data:", error);
      }
    };

    fetchData();
  }, [localLaunchpadData]);

  useEffect(() => {
    if (localLaunchpadData) {
      console.log("localLaunchpadData", localLaunchpadData);
    }
    if (extraInfo) {
      console.log("ExtaInfo", extraInfo);
    }
  }, [localLaunchpadData, extraInfo]);

  if (!localLaunchpadData) return <Loading />;

  return (
    <>
      <div>
        <div className="relative w-full h-screen">
          <ParallaxBanner
            layers={[
              {
                speed: 0,
                shouldAlwaysCompleteAnimation: true,
                expanded: false,
              },
            ]}
            className="w-full h-full bg-cover object-contain"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gray-900/50"></div>
            <div className="relative z-30 flex flex-col justify-center items-center text-center w-full h-full text-white">
              <h1 className="text-4xl font-bold mb-10 font-section">
                {localLaunchpadData?.name}
              </h1>
            </div>
            <div
              className="absolute inset-0 w-full h-full 
              gradient-background-1 z-10"
            ></div>
          </ParallaxBanner>
        </div>

        <div className="w-full h-full bg-detailInfoBackground">
          <div className="bg-detailInfoBackground h-20"></div>
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-1">
                <div className="flex flex-col items-center justify-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-white">
                    {localLaunchpadData?.name}
                  </h2>
                  <div className="relative z-30 flex flex-col justify-center items-center text-center w-full h-full text-white">
                    <h1 className="text-4xl font-bold mb-10 font-section">
                      {localLaunchpadData?.full_name}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Launches Section */}
          {loading ? (
            <div className="flex justify-center items-center my-10">
              <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
              <span className="ml-3 text-white">Loading launches...</span>
            </div>
          ) : extraInfo?.launches.length !== 0 ? (
            <div className="max-w-4xl mx-auto my-8">
              <h2 className="text-2xl font-bold text-white mb-6 px-4">
                Recent Launches
              </h2>
              <div className="overflow-y-auto max-h-[600px] space-y-4 px-4">
                {extraInfo?.launches.map((launch) => (
                  <div
                    key={launch.id}
                    className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        {launch?.name && launch?.id ? (
                          <Link
                            href={`/launches/${launch.id}`}
                            className="text-white hover:text-gray-700 transition-colors"
                          >
                            <h3 className="text-xl font-bold">{launch.name}</h3>
                          </Link>
                        ) : (
                          "Unnamed Launch"
                        )}
                        <p className="text-gray-400">
                          {new Date(launch.date_local).toLocaleDateString()}
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
                          <p className="text-gray-300 mt-2">{launch.details}</p>
                        )}
                      </div>

                      <div>
                        <h4 className="text-md font-semibold text-blue-400 mb-2">
                          Media
                        </h4>
                        <div className="flex space-x-3">
                          {launch.links.patch.small && (
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
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {launch.links.article && (
                        <a
                          href={launch.links.article}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-lg"
                        >
                          Article
                        </a>
                      )}
                      {launch.links.wikipedia && (
                        <a
                          href={launch.links.wikipedia}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-lg"
                        >
                          Wikipedia
                        </a>
                      )}
                      {launch.links.presskit && (
                        <a
                          href={launch.links.presskit}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-lg"
                        >
                          Press Kit
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 max-w-2xl mx-auto shadow-lg my-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {localLaunchpadData?.name}
                </h2>
                <p className="text-gray-400">{localLaunchpadData?.full_name}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  localLaunchpadData?.status === "active"
                    ? "bg-green-900/50 text-green-400"
                    : "bg-red-900/50 text-red-400"
                }`}
              >
                {localLaunchpadData?.status.charAt(0).toUpperCase() +
                  localLaunchpadData?.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <div>
                    <p>{localLaunchpadData?.locality}</p>
                    <p className="text-gray-400">
                      {localLaunchpadData?.region}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-gray-300">
                  <p>{localLaunchpadData?.timezone.replace("_", " ")}</p>
                </div>
                <div className="flex items-center text-gray-300">
                  <p>
                    {localLaunchpadData?.latitude.toFixed(6)},{" "}
                    {localLaunchpadData?.longitude.toFixed(6)}
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                  Launch Record
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Attempts</span>
                    <span className="text-white">
                      {localLaunchpadData?.launch_attempts}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Successes</span>
                    <span className="text-green-400">
                      {localLaunchpadData?.launch_successes}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Success Rate</span>
                    <span className="text-white">
                      {Math.round(
                        (localLaunchpadData?.launch_successes /
                          localLaunchpadData?.launch_attempts) *
                          100
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Embed (optional) */}
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              <iframe
                src={`https://maps.google.com/maps?q=${localLaunchpadData?.latitude},${localLaunchpadData?.longitude}&z=15&output=embed`}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        </div>
        <div className="bg-detailInfoBackground h-5"></div>
      </div>
    </>
  );
}

export default LaunchpadsDetails;
