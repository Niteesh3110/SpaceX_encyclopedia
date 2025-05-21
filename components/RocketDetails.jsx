"use client";

import React from "react";
import { useState, useEffect } from "react";
import { getRocketById } from "@/app/api";
import NotFound from "./NotFound";
import { ParallaxBanner } from "react-scroll-parallax";
import { Loading } from "./Loading";

function RocketsDetails({ id, rocketData }) {
  // const data = JSON.parse(sessionStorage.getItem("rocketData")) || {};
  const [localRocketData, setLocalRocketData] = useState(null);
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

  useEffect(() => {
    if (!localRocketData) {
      if (!id) {
        console.error("Error rocket Id not passed");
        return;
      }
      async function fetchRocketData(payloadId) {
        console.log(payloadId);
        if (!rocketData?.boolean) {
          console.error("Error:", result?.error);
          setErrorFetchingData(true);
        }
        setLocalRocketData(rocketData.data);
      }
      fetchRocketData(id);
    }
  }, []);

  useEffect(() => {
    if (localRocketData) {
      console.log("localRocketData", localRocketData);
    }
    if (extraInfo) {
      console.log("ExtaInfo", extraInfo);
    }
  }, [localRocketData, extraInfo]);

  if (!localRocketData) return <Loading />;

  return (
    <>
      <div>
        <div className="relative w-full h-screen">
          <ParallaxBanner
            layers={[
              {
                image:
                  localRocketData?.flickr_images.length !== 0
                    ? localRocketData?.flickr_images[0]
                    : "/detailsDefaultBg.webp",
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
                {localRocketData?.name}
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
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-white">
                    {localRocketData?.name}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      localRocketData?.active
                        ? "bg-green-900/50 text-green-400"
                        : "bg-red-900/50 text-red-400"
                    }`}
                  >
                    {localRocketData?.active ? "Active" : "Retired"}
                  </span>
                </div>
                <p className="text-gray-300">{localRocketData?.description}</p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center text-gray-400">
                    <span>First flight: {localRocketData?.first_flight}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <span>
                      Cost: ${localRocketData?.cost_per_launch.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <span>Success: {localRocketData?.success_rate_pct}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">
                  Dimensions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400">Height</p>
                    <p className="text-white">
                      {localRocketData?.height.meters}m /{" "}
                      {localRocketData?.height.feet}ft
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Diameter</p>
                    <p className="text-white">
                      {localRocketData?.diameter.meters}m /{" "}
                      {localRocketData?.diameter.feet}
                      ft
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Mass</p>
                    <p className="text-white">
                      {localRocketData?.mass.kg.toLocaleString()}kg /{" "}
                      {localRocketData?.mass.lb.toLocaleString()}lb
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Stages</p>
                    <p className="text-white">{localRocketData?.stages}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">
                  First Stage
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Engines</span>
                    <span className="text-white">
                      {localRocketData?.first_stage.engines}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Thrust (Sea Level)</span>
                    <span className="text-white">
                      {localRocketData?.first_stage.thrust_sea_level.kN}kN /{" "}
                      {localRocketData?.first_stage.thrust_sea_level.lbf.toLocaleString()}
                      lbf
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fuel</span>
                    <span className="text-white">
                      {localRocketData?.first_stage.fuel_amount_tons} tons
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Reusable</span>
                    <span
                      className={`${
                        localRocketData?.first_stage.reusable
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {localRocketData?.first_stage.reusable ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">
                  Second Stage
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Engines</span>
                    <span className="text-white">
                      {localRocketData?.second_stage.engines}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Thrust</span>
                    <span className="text-white">
                      {localRocketData?.second_stage.thrust.kN}kN /{" "}
                      {localRocketData?.second_stage.thrust.lbf.toLocaleString()}
                      lbf
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payload Fairing</span>
                    <span className="text-white">
                      {
                        localRocketData?.second_stage.payloads.composite_fairing
                          .height.meters
                      }
                      m height
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Reusable</span>
                    <span
                      className={`${
                        localRocketData?.second_stage.reusable
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {localRocketData?.second_stage.reusable ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">
                  Payload Capacity
                </h3>
                <div className="space-y-3">
                  {localRocketData?.payload_weights.map((payload) => (
                    <div
                      key={payload.id}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-400">{payload.name}</span>
                      <span className="text-white">
                        {payload.kg.toLocaleString()}kg /{" "}
                        {payload.lb.toLocaleString()}lb
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700 flex justify-end">
              <a
                href={localRocketData?.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-400 hover:text-blue-300"
              >
                Wikipedia
              </a>
            </div>
          </div>
        </div>
        <div className="bg-detailInfoBackground h-5"></div>
      </div>
    </>
  );
}

export default RocketsDetails;
