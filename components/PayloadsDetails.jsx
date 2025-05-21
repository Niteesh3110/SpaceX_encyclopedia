"use client";

import React from "react";
import { useState, useEffect } from "react";
import { getLaunchDataById } from "@/app/api";
import NotFound from "./NotFound";
// import defaultBackgroundImage from "../assets/detailsDefaultBg.webp";
// import pic1 from "../assets/pic1.jpg";
import { ParallaxBanner } from "react-scroll-parallax";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loading } from "./Loading";

function PayloadsDetails({ id, payloadData }) {
  //   const data = JSON.parse(sessionStorage.getItem("payloadData")) || {};
  const [localPayloadData, setLocalPayloadData] = useState(null);
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
    if (!localPayloadData) {
      if (!id) {
        console.error("Error launch Id not passed");
        return;
      }
      async function fetchPayloadData(payloadId) {
        console.log(payloadId);
        if (!payloadData?.boolean) {
          console.error("Error:", result?.error);
          setErrorFetchingData(true);
        }
        setLocalPayloadData(payloadData.data);
      }
      fetchPayloadData(id);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localPayloadData && Object.keys(localPayloadData).keys !== 0) {
          if (localPayloadData?.launch) {
            const resultData = await getLaunchDataById(localPayloadData.launch);
            if (resultData) {
              setExtraInfo({ launch: resultData.data });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching launch data:", error);
      }
    };
    fetchData();
  }, [localPayloadData]);

  useEffect(() => {
    if (localPayloadData) {
      console.log("localPayloadData", localPayloadData);
    }
    if (extraInfo) {
      console.log("ExtaInfo", extraInfo);
    }
  }, [localPayloadData, extraInfo]);

  if (!localPayloadData) return <Loading />;

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
                {localPayloadData?.name}
              </h1>
            </div>
            <div
              className="absolute inset-0 w-full h-full 
                gradient-background-1 z-10"
            ></div>
          </ParallaxBanner>
        </div>
        <div className="w-full h-full bg-detailInfoBackground">
          <div className="bg-detailInfoBackground backdrop-blur-sm rounded-lg p-6 border border-gray-700 max-w-[90%] mx-auto">
            <h3 className="text-xl font-semibold text-blue-400 mb-4 border-b border-gray-700 pb-2">
              Payload Specifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Mass:</span>
                  <div className="text-right">
                    {localPayloadData?.mass_kg && (
                      <p className="text-white font-medium">
                        {localPayloadData.mass_kg} kg
                      </p>
                    )}
                    {localPayloadData?.mass_lbs && (
                      <p className="text-gray-300 text-sm">
                        {localPayloadData.mass_lbs} lbs
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {localPayloadData?.inclination_deg && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Inclination:</span>
                  <span className="text-white font-mono">
                    {localPayloadData.inclination_deg}°
                  </span>
                </div>
              )}

              {localPayloadData?.type && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Payload Type:</span>
                  <span className="text-white capitalize">
                    {localPayloadData.type}
                  </span>
                </div>
              )}

              {localPayloadData?.regime && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Orbit Regime:</span>
                  <span className="text-white capitalize">
                    {localPayloadData.regime}
                  </span>
                </div>
              )}

              {localPayloadData?.orbit && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Orbit Type:</span>
                  <span className="text-white capitalize">
                    {localPayloadData.orbit}
                  </span>
                </div>
              )}

              {localPayloadData?.mean_anomaly && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Mean Anomaly:</span>
                  <span className="text-white capitalize">
                    {localPayloadData.mean_anomaly}
                  </span>
                </div>
              )}

              {localPayloadData?.manufacturers?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-gray-400 text-sm font-medium mb-2">
                    Manufactured by
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {localPayloadData.manufacturers.map(
                      (manufacturer, index) => (
                        <span
                          key={`${manufacturer}-${index}`}
                          className="bg-gray-800/60 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {manufacturer}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
              {localPayloadData?.nationalities?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-gray-400 text-sm font-medium mb-2">
                    Manufacturers Nationality:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {localPayloadData.nationalities.map(
                      (nationality, index) => (
                        <span
                          key={`${nationality}-${index}`}
                          className="bg-gray-800/60 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {nationality}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
              {localPayloadData?.customers?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-gray-400 text-sm font-medium mb-2">
                    Customers:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {localPayloadData.customers.map((customer, index) => (
                      <span
                        key={`${customer}-${index}`}
                        className="bg-gray-800/60 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {customer}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 max-w-3xl mx-auto mt-5">
              <h2 className="text-3xl font-bold text-blue-400 py-5">
                Launch Info
              </h2>
              {extraInfo?.launch && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-400">
                        {extraInfo.launch.name}
                      </h3>
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center">
                          <span
                            className={`w-3 h-3 rounded-full mr-2 ${
                              extraInfo.launch.success
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                          <span className="text-gray-300">
                            {extraInfo.launch.success ? "Successful" : "Failed"}
                          </span>
                        </div>
                        <p className="text-gray-400">
                          {convertDate(extraInfo.launch.date_local)}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/launches/${extraInfo.launch.id}`}
                      className="flex items-center justify-center md:justify-end px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white"
                    >
                      View Details
                      <svg
                        className="ml-2 w-4 h-4"
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
                    </Link>
                  </div>

                  {/* Details and Image */}
                  {extraInfo.launch.details && (
                    <p className="text-gray-300 leading-relaxed">
                      {extraInfo.launch.details}
                    </p>
                  )}

                  {/* Launch Image */}
                  {extraInfo?.launch?.links?.flickr?.original?.length > 0 && (
                    <div className="rounded-lg overflow-hidden border border-gray-700">
                      <img
                        src={extraInfo.launch.links.flickr.original[0] || null}
                        alt="Launch"
                        className="w-full h-auto max-h-96 object-cover hover:scale-[1.01] transition-transform"
                        onError={(e) => {
                          e.target.src = "/placeholder-launch.jpg";
                          e.target.className =
                            "w-full h-auto max-h-96 object-contain bg-gray-800 p-4";
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-detailInfoBackground h-5"></div>
      </div>
    </>
  );
}

export default PayloadsDetails;
