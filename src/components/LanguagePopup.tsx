import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { BiSolidUpArrow } from "react-icons/bi";
import { LANGUAGES } from "utils/constants";

export default function LanguagePopup({ open }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ scale: 0, y: 10, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: 10,
            scale: 0,
          }}
          style={{ transformOrigin: "top right" }}
          className=" ygpt-absolute ygpt-top-[104%] ygpt-w-[200px] ygpt-z-[4] ygpt-right-0 ygpt-flex ygpt-flex-col  "
        >
          <div className="ygpt-text-white ygpt-mb-[-4px] ygpt-self-end ygpt-scale-x-[1.4]">
            <BiSolidUpArrow />
          </div>

          <div className=" ygpt-max-h-[400px] ygpt-overflow-auto ygpt-rounded-lg ygpt-bg-white ygpt-shadow-md ygpt-text-gray-800">
            <div className="ygpt-flex ygpt-flex-col ygpt-items-start ygpt-divide-y-1 ygpt-divide-gray-200">
              {LANGUAGES.map((i) => {
                return (
                  <div className="ygpt-bg-white ygpt-text-sm hover:ygpt-bg-gray-100 ygpt-py-2 ygpt-px-2 ygpt-self-stretch ygpt-text-left" key={i.code}>
                    {i.name}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
