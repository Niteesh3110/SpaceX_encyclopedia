"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ParallaxBanner } from "react-scroll-parallax";
import HistoryCards from "@/components/HistoryCards";

export default function HistoryPage({ companyHistoryData }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (companyHistoryData) {
      console.log(companyHistoryData);
      setLoading(false);
    }
  }, [companyHistoryData]);
  return (
    <div className="relative z-10 w-full min-h-screen">
      <ParallaxBanner layers={[{ image: "/pic5.jpg", speed: -10 }]}>
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900/50"></div>
        <h1 className="text-white text-center text-2xl pt-2 z-20 relative">
          History
        </h1>
        <motion.div
          className="w-full h-full flex flex-wrap justify-center gap-6 p-6"
          initial="hidden"
          whileInView="visible"
          variants={{}}
          viewport={{ once: true }}
        >
          {loading ? (
            <div className="flex justify-center items-center h-64 w-auto">
              <p className="text-xl">Loading history...</p>
            </div>
          ) : (
            companyHistoryData.map((data) => (
              <HistoryCards key={data.id} history={data} />
            ))
          )}
        </motion.div>
      </ParallaxBanner>
    </div>
  );
}
