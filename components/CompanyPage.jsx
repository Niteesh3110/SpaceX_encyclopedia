"use client";

import React from "react";
import { ParallaxBanner } from "react-scroll-parallax";
import { FaTwitter, FaGlobe, FaFlickr } from "react-icons/fa";
import { SiX } from "react-icons/si";
import Link from "next/link";

export default function CompanyPage({ companyData }) {
  if (!companyData) return null;

  const {
    name,
    founder,
    founded,
    employees,
    vehicles,
    launch_sites,
    test_sites,
    ceo,
    coo,
    cto_propulsion,
    valuation,
    summary,
    headquarters,
    links,
  } = companyData;

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-gray-900 text-white">
      <Link
        href="/"
        className="absolute top-5 left-10 z-30 px-4 py-2 bg-black/50 text-white rounded hover:bg-black/70 transition cursor-pointer"
      >
        Home
      </Link>
      {/* Parallax Banner */}
      <ParallaxBanner
        layers={[
          {
            image: "/pic9.png",
            speed: -20,
            className: "object-cover object-top",
          },
        ]}
        className="w-full h-screen"
      >
        <div className="absolute inset-0 bg-gray-900/50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4">
          <h1 className="text-5xl font-bold mb-6">{name}</h1>
          <p className="max-w-2xl text-lg">{summary}</p>
          <p className="text-white">Scroll Down To Know More</p>
        </div>
      </ParallaxBanner>
      {/* Company Details */}
      <div className="max-w-5xl mx-auto py-12 px-6">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Overview</h2>
          <p className="text-lg">
            Founded in {founded} by {founder}, {name} has grown to employ over{" "}
            {employees.toLocaleString()} people. The company operates {vehicles}{" "}
            vehicles, with {launch_sites} launch sites and {test_sites} test
            sites. Its current valuation stands at ${valuation.toLocaleString()}
            .
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Leadership</h2>
          <ul className="text-lg space-y-2">
            <li>
              <strong>CEO:</strong> {ceo}
            </li>
            <li>
              <strong>COO:</strong> {coo}
            </li>
            <li>
              <strong>CTO of Propulsion:</strong> {cto_propulsion}
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Headquarters</h2>
          <p className="text-lg">
            {headquarters.address}, {headquarters.city}, {headquarters.state}
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Connect with {name}</h2>
          <div className="flex space-x-6 text-2xl">
            <a
              href={links.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
            >
              <FaGlobe />
            </a>
            <a
              href={links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href={links.flickr}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Flickr"
            >
              <FaFlickr />
            </a>
            <a
              href={links.elon_twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Elon Musk's Twitter"
            >
              <SiX />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
