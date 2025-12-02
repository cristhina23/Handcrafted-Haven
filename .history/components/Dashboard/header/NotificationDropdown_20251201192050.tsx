"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellIcon } from "lucide-react";

interface Notification {
  id: string;
  message: string;
}

interface Props {
  notifications: Notification[];
}

export default function NotificationDropdown({ notifications }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown si se hace click fuera
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // Variants para animar la lista y los items
  const listVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  };

  return (
    <div className="relative rounded-md hover:bg-gray-500 dark:hover:bg-gray-700 text-slate-300" ref={dropdownRef}>
     
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className=" rounded-full transition-all"
      >
        <BellIcon className="w-6 h-6 text-SLATE-700" />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden z-50"
          >
            {notifications.length > 0 ? (
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {notifications.map((notif) => (
                  <motion.div
                    key={notif.id}
                    variants={itemVariants}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 text-sm border-b last:border-b-0"
                  >
                    {notif.message}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="px-4 py-2 text-gray-500 text-sm">
                No notifications yet
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
