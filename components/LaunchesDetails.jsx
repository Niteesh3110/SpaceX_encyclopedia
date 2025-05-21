"use client";

import React from "react";
import { useState, useEffect } from "react";
import {
  getCoreById,
  getLaunchPadsById,
  getPayloadById,
  getRocketById,
  getShipsById,
} from "@/app/api";
import NotFound from "./NotFound";
import { ParallaxBanner } from "react-scroll-parallax";
import Link from "next/link";
import { Loading } from "./Loading";

function LaunchDetails({ id, launchData }) {
  //   const data = JSON.parse(sessionStorage.getItem("launchData")) || {};
  const [localLaunchData, setLaunchData] = useState(null);
  const [errorFetchingData, setErrorFetchingData] = useState(false);
  const [extraInfo, setExtraInfo] = useState(null);
  const [ytLink, setYtLink] = useState("");

  async function handleCoreData(coreId) {
    try {
      const result = await getCoreById(coreId);
      if (result.boolean) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error(
        `Something went wrong when fetching core details: ${error}`
      );
      return null;
    }
  }

  async function handleLaunchpadsData(launchpadId) {
    try {
      const result = await getLaunchPadsById(launchpadId);
      if (result.boolean) {
        return result.data;
      }
    } catch (error) {
      console.error(
        `Something went wrong when fetching launchpad details: ${error}`
      );
    }
  }

  async function handlePayloadData(payloadId) {
    try {
      const result = await getPayloadById(payloadId);
      if (result.boolean) {
        return result.data;
      }
    } catch (error) {
      console.error(
        `Something went wrong when fetching payload details: ${error}`
      );
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

  async function handleShipData(shipId) {
    try {
      const result = await getShipsById(shipId);
      if (result.boolean) {
        return result.data;
      }
    } catch (error) {
      console.error(
        `Something went wrong when fetching ship details: ${error}`
      );
    }
  }

  useEffect(() => {
    console.log(1, launchData);
    if (launchData.boolean) {
      //   console.error("Launch Data Not Found In Front-End");
      if (!id) {
        console.error("Error launch Id not passed");
        return;
      }
      async function fetchLaunchData(launchId) {
        console.log(launchId);

        if (!launchData?.boolean) {
          console.error("Error:", result?.error);
          setErrorFetchingData(true);
        }
        setLaunchData(launchData.data);
        if (launchData.data.links?.webcast) {
          modifyYTLink(launchData.data.links.webcast);
        }
      }
      fetchLaunchData(id);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!localLaunchData || Object.keys(localLaunchData).length === 0) return;

      try {
        const result = {
          cores: [],
          payloads: [],
          ships: [],
          launchpads: null,
          rockets: null,
        };

        for (const item of localLaunchData.cores) {
          const coreData = await handleCoreData(item.core);
          if (coreData) {
            result.cores.push({ core: coreData });
          }
        }

        for (const item of localLaunchData.payloads) {
          const payloadData = await handlePayloadData(item);
          if (payloadData) {
            result.payloads.push(payloadData);
          }
        }

        for (const item of localLaunchData.ships) {
          const shipData = await handleShipData(item);
          if (shipData) {
            result.ships.push(shipData);
          }
        }

        if (localLaunchData.launchpad) {
          result.launchpads = await handleLaunchpadsData(
            localLaunchData.launchpad
          );
        }

        if (localLaunchData.rocket) {
          result.rockets = await handleRocketData(localLaunchData.rocket);
        }

        setExtraInfo(result);
      } catch (error) {
        console.error("Error fetching launch data:", error);
      }
    };

    fetchData();
  }, [localLaunchData]);

  useEffect(() => {
    if (localLaunchData) {
      console.log("launchData", localLaunchData);
      console.log(localLaunchData.links.webcast);
    }
    if (extraInfo) {
      console.log("ExtaInfo", extraInfo);
    }
  }, [localLaunchData, extraInfo]);

  function modifyYTLink(link) {
    if (!link || typeof link !== "string") {
      return { boolean: false, error: "Invalid link type" };
    }
    const linkSplit = link.split("watch?v=");
    linkSplit.push("embed/");
    setYtLink(`${linkSplit[0]}${linkSplit[2]}${linkSplit[1]}`);
  }

  if (!localLaunchData) return <Loading />;

  return (
    <>
      <div>
        <div className="relative w-full h-screen">
          <ParallaxBanner
            layers={[
              {
                image:
                  localLaunchData?.links?.flickr?.original.length > 1
                    ? localLaunchData?.links?.flickr?.original[0]
                    : null,
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
                {localLaunchData?.name}
              </h1>
            </div>
            <div
              className="absolute inset-0 w-full h-full 
              gradient-background-1 z-10"
            />
          </ParallaxBanner>
        </div>
        <div className="w-full h-20 bg-detailInfoBackground"></div>
        <div className="bg-gray-900">
          <div className="flex flex-col justify-center items-center bg-detailInfoBackground">
            <h1 className="text-2xl text-white">Webcast</h1>
            {ytLink && (
              <div className="aspect-w-16 aspect-h-9 w-full flex justify-center items-center p-5">
                <iframe
                  width="640"
                  height="500"
                  src={
                    ytLink.includes("?") ? `${ytLink}&rel=0` : `${ytLink}?rel=0`
                  }
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-[80%]"
                />
              </div>
            )}
          </div>
        </div>
        {/* Core Info */}
        <div className="bg-detailInfoBackground flex flex-col justify-center items-center">
          {extraInfo?.cores?.length > 0
            ? extraInfo.cores.map((item) => (
                <div
                  key={item?.core?.id}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700 max-w-2xl mx-auto my-5 w-full"
                >
                  <h3 className="text-xl font-bold text-blue-400 mb-4">
                    Core Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      {item?.core?.last_update && (
                        <div className="flex items-center">
                          <span className="text-gray-400 w-32 flex-shrink-0">
                            Last Update:
                          </span>
                          <span className="text-white font-medium">
                            {item.core.last_update}
                          </span>
                        </div>
                      )}

                      {item?.core?.reuse_count !== undefined && (
                        <div className="flex items-center">
                          <span className="text-gray-400 w-32 flex-shrink-0">
                            Reuse Count:
                          </span>
                          <span className="text-white font-medium">
                            {item.core.reuse_count}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      {item?.core?.serial && (
                        <div className="flex items-center">
                          <span className="text-gray-400 w-32 flex-shrink-0">
                            Serial:
                          </span>
                          <Link
                            href={`/cores/${item?.core?.id}`}
                            className="text-white hover:text-gray-700 transition-colors w-full p-0"
                          >
                            <span className="font-mono font-medium">
                              {item.core.serial}
                            </span>
                          </Link>
                        </div>
                      )}

                      {item?.core?.status && (
                        <div className="flex items-center">
                          <span className="text-gray-400 w-32 flex-shrink-0">
                            Status:
                          </span>
                          <span
                            className={`font-medium ${
                              item.core.status === "active"
                                ? "text-green-400"
                                : item.core.status === "retired"
                                ? "text-red-400"
                                : "text-yellow-400"
                            }`}
                          >
                            {item.core.status}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {item?.cores?.core?.launches?.length > 0 ? (
                    <div className="mt-8 pt-6 border-t border-gray-700">
                      <h4 className="text-lg font-semibold text-blue-300 mb-3">
                        Launches Using This Core
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {item?.cores?.core?.launches.map((localLaunchData) => (
                          <a
                            key={localLaunchData?.id}
                            href={`/launches/${localLaunchData?.id}`}
                            className="group flex items-center p-2 rounded-lg hover:bg-gray-800/50 transition-colors w-full"
                          >
                            <span className="text-white group-hover:text-blue-300 transition-colors">
                              {localLaunchData?.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))
            : null}
        </div>
        <div className=" bg-detailInfoBackground flex flex-col justify-center items-center">
          {extraInfo?.launchpads ? (
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700 max-w-2xl mx-auto mt-6 w-full my-5">
              <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4"
                  />
                </svg>
                Launchpad Details
              </h3>

              {/* Main Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-3">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {extraInfo?.launchpads?.name &&
                      extraInfo?.launchpads?.id ? (
                        <Link
                          href={`/launchpads/${extraInfo?.launchpads?.id}`}
                          className=" hover:text-gray-700 transition-colors"
                        >
                          {extraInfo?.launchpads?.name}
                        </Link>
                      ) : (
                        "Unnamed Payload"
                      )}
                    </h4>

                    <div className="flex items-center mt-1">
                      <span
                        className={`inline-block w-3 h-3 rounded-full mr-2 ${
                          extraInfo.launchpads.status === "active"
                            ? "bg-green-500"
                            : extraInfo.launchpads.status === "retired"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      ></span>
                      <span className="text-gray-300 capitalize">
                        {extraInfo.launchpads.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-400">Location</p>
                    <p className="text-white">
                      {extraInfo.launchpads.locality},{" "}
                      {extraInfo.launchpads.region}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Launch Attempts</p>
                    <p className="text-2xl font-bold text-white">
                      {extraInfo.launchpads.launch_attempts}
                    </p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Successful Launches</p>
                    <p className="text-2xl font-bold text-green-400">
                      {extraInfo.launchpads.launch_successes}
                    </p>
                  </div>

                  {extraInfo.launchpads.launch_attempts > 0 && (
                    <div className="mt-2">
                      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{
                            width: `${
                              (extraInfo.launchpads.launch_successes /
                                extraInfo.launchpads.launch_attempts) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-right text-xs text-gray-400 mt-1">
                        Success rate:{" "}
                        {Math.round(
                          (extraInfo.launchpads.launch_successes /
                            extraInfo.launchpads.launch_attempts) *
                            100
                        )}
                        %
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="bg-detailInfoBackground flex flex-col justify-center items-center">
          {extraInfo?.payloads?.length > 0 && (
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700 max-w-2xl mx-auto mt-6 w-full my-5 justify-center flex flex-col">
              <h3 className="text-xl font-bold text-blue-400 mb-4 flex">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                Payload Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {extraInfo.payloads.map((item) => (
                  <div
                    key={item?.id}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-blue-400 transition-colors max-w-full"
                  >
                    <div className="flex justify-between items-start mb-2 gap-5">
                      <h4 className="text-lg font-semibold text-white">
                        {item?.name && item?.id ? (
                          <Link
                            href={`/payloads/${item?.id}`}
                            className=" hover:text-gray-700 transition-colors"
                          >
                            {item?.name}
                          </Link>
                        ) : (
                          "Unnamed Payload"
                        )}
                      </h4>
                      {item?.manufacturers?.[0] && (
                        <span className="bg-blue-900/30 text-blue-300 text-xs px-2 py-1 rounded">
                          {item.manufacturers[0]}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div>
                        <p className="text-gray-400 text-sm">Mass (kg)</p>
                        <p className="text-white font-medium">
                          {item?.mass_kg ? `${item.mass_kg} kg` : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Mass (lbs)</p>
                        <p className="text-white font-medium">
                          {item?.mass_lbs ? `${item.mass_lbs} lbs` : "N/A"}
                        </p>
                      </div>
                      {item?.mean_anomaly && (
                        <div className="col-span-2">
                          <p className="text-gray-400 text-sm">Mean Anomaly</p>
                          <p className="text-white font-mono">
                            {item.mean_anomaly}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="bg-detailInfoBackground flex flex-col justify-center items-center">
          {extraInfo?.rockets && (
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700 w-full max-w-2xl mx-auto mt-6">
              <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Rocket Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div>
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-white">
                      {extraInfo?.rockets?.name && extraInfo?.rockets?.id ? (
                        <Link
                          href={`/rockets/${extraInfo?.rockets?.id}`}
                          className=" hover:text-gray-700 transition-colors"
                        >
                          {extraInfo?.rockets?.name}
                        </Link>
                      ) : (
                        "Unnamed Payload"
                      )}
                    </h4>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        extraInfo.rockets.active
                          ? "bg-green-900/50 text-green-400"
                          : "bg-red-900/50 text-red-400"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${
                          extraInfo.rockets.active
                            ? "bg-green-400"
                            : "bg-red-400"
                        }`}
                      ></span>
                      {extraInfo.rockets.active ? "Active" : "Retired"}
                    </div>
                  </div>
                </div>

                {/* Right Column - Additional Stats (if available) */}
                <div className="space-y-3">
                  {extraInfo.rockets.cost_per_launch && (
                    <div className="flex items-center">
                      <span className="text-gray-400 w-32 flex-shrink-0">
                        Cost per Launch:
                      </span>
                      <span className="text-white font-medium">
                        ${extraInfo.rockets.cost_per_launch.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {extraInfo.rockets.success_rate_pct && (
                    <div className="flex items-center">
                      <span className="text-gray-400 w-32 flex-shrink-0">
                        Success Rate:
                      </span>
                      <div className="flex-1">
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-blue-500 h-2.5 rounded-full"
                            style={{
                              width: `${extraInfo.rockets.success_rate_pct}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-white text-sm ml-2">
                          {extraInfo.rockets.success_rate_pct}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Optional: Additional details section */}
              {(extraInfo.rockets.description ||
                extraInfo.rockets.wikipedia) && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  {extraInfo.rockets.description && (
                    <p className="text-gray-300 mb-4">
                      {extraInfo.rockets.description}
                    </p>
                  )}
                  {extraInfo.rockets.wikipedia && (
                    <a
                      href={extraInfo.rockets.wikipedia}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Wikipedia Page
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {/* SHIPS */}
        {extraInfo?.ships?.length > 0 && (
          <div className="bg-detailInfoBackground flex flex-col justify-center items-center">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700 max-w-2xl mx-auto mt-6 flex gap-5">
              <div className="mt-8 w-full">
                {" "}
                <h3 className="text-xl font-bold text-blue-400 mb-6 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Support Ships
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {extraInfo.ships.map((item) => (
                    <div
                      key={item?.id}
                      className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-400 transition-all duration-300 hover:shadow-lg flex flex-col h-full" // Added flex flex-col h-full
                    >
                      <div className="h-48 bg-gray-800 overflow-hidden flex-shrink-0">
                        {" "}
                        <img
                          src={item?.image || null}
                          alt={item?.name || "Ship"}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            e.target.src = "/pic1.jpg";
                          }}
                        />
                      </div>

                      <div className="p-4 flex flex-col flex-grow">
                        {" "}
                        <div className="flex justify-between items-start mb-2">
                          <Link
                            href={`/ships/${item?.id}`}
                            className="text-white hover:text-gray-700 transition-colors w-full"
                          >
                            <h4 className="text-lg font-semibold">
                              {item?.name || "Unnamed Ship"}
                            </h4>
                          </Link>
                          {item?.roles?.[0] && (
                            <span className="bg-blue-900/30 text-blue-300 text-xs px-2 py-1 rounded-full">
                              {item.roles[0]}
                            </span>
                          )}
                        </div>
                        <div className="flex-grow"></div>{" "}
                        <a
                          href={item?.link || "#"}
                          className="mt-4 inline-flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          View Details
                          <svg
                            className="ml-2 -mr-1 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default LaunchDetails;
