"use client";

import React from "react";
import { getLaunchData } from "@/app/api";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { ParallaxBanner } from "react-scroll-parallax";
import NotFound from "./NotFound";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loading } from "./Loading";

function LaunchesPage({ page, launchData }) {
  const [localLaunchData, setLaunchData] = useState(launchData);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      if (searchQuery) return;

      const requestData = await getLaunchData({ page });
      if (requestData?.boolean) {
        setLaunchData(requestData?.data);
      } else {
        console.log("Could not fetch data");
      }
    }
    fetchData();
  }, [page, searchQuery]);

  useEffect(() => {
    if (localLaunchData) console.log(localLaunchData);
  }, [localLaunchData]);

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
        const requestData = await getLaunchData({
          name: query,
          page: 1,
        });
        if (requestData?.boolean) {
          setLaunchData(requestData?.data);
          router.push("/launches/page/0");
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

  const ResultCards = ({
    id,
    name,
    links,
    details,
    date,
    cores,
    launchpad,
    payloads,
    rocket,
    ships,
    flight_number,
  }) => (
    <>
      <div className="w-full h-full p-4 border rounded-lg bg-black/50 shadow-sm hover:shadow-md transition-shadow flex gap-12 text-white">
        <div className="h-full min-w-[150px] max-w-[250px] flex justify-center items-center rounded-sm bg-gray-100">
          <img
            src={
              links.flickr.original.length !== 0
                ? links.flickr.original[0]
                : "/imageNotFoundPic.svg"
            }
            alt="Image Not Found"
            className="w-[150px] h-[150px] object-cover"
          />
        </div>

        <div className="flex flex-col justify-start items-start">
          <div className="flex gap-2">
            <h3 className="font-medium">{name}</h3>
            <p>{convertDate(date)}</p>
            <p>Flight Number: {flight_number}</p>
          </div>
          {/* <div className="flex w-full gap-5 justify-center items-center">
            <p className="text-sm text-gray-600 text-wrap">{details}</p>
          </div> */}

          <div className="w-full">
            <div className="flex gap-2">
              <p>Cores:</p>
              {cores?.length ? (
                cores.map((item, index) => (
                  <div key={item?.core?.id}>
                    <Link
                      href={`/cores/${item?.core?.id}`}
                      className=" hover:text-gray-500"
                    >
                      | {item?.core?.serial}
                    </Link>
                  </div>
                ))
              ) : (
                <span>No Cores</span>
              )}
              {"|"}
            </div>
          </div>

          <div className="w-full">
            <div className="flex gap-2">
              <p>Launchpad: </p>
              <Link
                href={`/launchpads/${launchpad?.id}`}
                className=" hover:text-gray-500"
              >
                {launchpad?.name}
              </Link>
            </div>
          </div>

          <div className="w-full">
            <div className="flex gap-2">
              <p>Payloads:</p>
              {payloads?.length ? (
                payloads.map((item, index) => (
                  <div key={item.id}>
                    <Link
                      href={`/payloads/${item.id}`}
                      className=" hover:text-gray-500"
                    >
                      | {item.name}
                    </Link>
                  </div>
                ))
              ) : (
                <span>No Payloads</span>
              )}
              {"|"}
            </div>
          </div>

          <div className="w-full">
            <Link
              href={`/rockets/${rocket?.id}`}
              className=" hover:text-gray-500"
            >
              Rocket: {rocket?.name}
            </Link>
          </div>

          <div className="w-full">
            <div className="flex gap-2">
              <p>Ships:</p>
              {ships?.length ? (
                ships.map((item, index) => (
                  <div key={item.id}>
                    <Link
                      href={`/ships/${item.id}`}
                      className=" hover:text-gray-500"
                    >
                      | {item.name}
                    </Link>
                  </div>
                ))
              ) : (
                <span>No Ships</span>
              )}
              {"|"}
            </div>
          </div>

          <div className="flex justify-start gap-5">
            <Link href={links.article} className=" hover:text-gray-500">
              Know More
            </Link>
            <Link
              href={`/launches/${id}`}
              onClick={() =>
                sessionStorage.setItem(
                  "launchData",
                  JSON.stringify({
                    cores: cores,
                    launchpads: launchpad,
                    payloads: payloads,
                    rockets: rocket,
                    ships: ships,
                  })
                )
              }
              className="hover:text-gray-500"
            >
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
          <Link href={`/launches/page/${page - 1}`} className="text-white">
            <FaAngleLeft className="mt-1" />
          </Link>
        ) : (
          <div></div>
        )}
        {page <= totalPages ? (
          <Link href={`/launches/page/${page}`} className="text-white">
            <div className=" h-6 w-6 border rounded-sm text-center">{page}</div>
          </Link>
        ) : (
          <div></div>
        )}
        {page + 1 <= totalPages ? (
          <Link href={`/launches/page/${page + 1}`} className="text-white">
            <div className=" h-6 w-6 border rounded-sm text-center">
              {page + 1}
            </div>
          </Link>
        ) : (
          <div></div>
        )}
        {page + 2 <= totalPages ? (
          <Link href={`/launches/page/${page + 2}`} className="text-white">
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
          <Link href={`/launches/page/${page + 1}`} className="text-white">
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
                {localLaunchData?.docs && localLaunchData?.docs.length !== 0 ? (
                  localLaunchData.docs.map((data, index) => (
                    <ResultCards
                      key={data?.id}
                      id={data?.id}
                      name={data?.name}
                      links={data?.links}
                      details={data?.details}
                      date={data?.date_local}
                      cores={data?.cores}
                      launchpad={data?.launchpad}
                      payloads={data?.payloads}
                      rocket={data?.rocket}
                      ships={data?.ships}
                      flight_number={data?.flight_number}
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
                <Pages page={page} totalPages={localLaunchData?.totalPages} />
              </div>
            </div>
          </div>
        </div>
      </ParallaxBanner>
    </>
  );
}

export default LaunchesPage;
