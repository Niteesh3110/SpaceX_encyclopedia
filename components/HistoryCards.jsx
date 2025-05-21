"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function HistoryCards({ history }) {
  const { title, event_date_utc, details, links } = history;
  console.log(history);

  useEffect(() => {
    if (history) console.log(history);
  }, [history]);

  const cardVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="w-80 h-80 flex flex-col justify-between border rounded-lg shadow-lg bg-gray-600/30 overflow-hidden z-20"
      variants={cardVariants}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.9 }}
      transition={{
        scale: {
          duration: 0.1,
          ease: "easeOut",
        },
      }}
    >
      <div className="flex flex-col justify-start p-4 h-full">
        <div>
          <h5 className="text-xl font-bold tracking-tight text-gray-300">
            {title}
          </h5>
          <p className="text-sm text-gray-300 mt-2">
            {new Date(event_date_utc).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-4 overflow-y-auto">
          <p className="text-sm font-normal text-gray-300">{details.trim()}</p>
        </div>

        <div className="mt-4">
          <a
            href={links?.article || "https://www.spacex.com/"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white text-sm"
            aria-label="Learn more about this event"
          >
            Learn more
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default HistoryCards;
