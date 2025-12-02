'use client';

import Image from "next/image";
import { User as UserIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
  sellerImageUrl?: string; 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;              
}

export default function ProfileImage({ sellerImageUrl, user }: HeaderProps) {
   const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

  // Determinar qué imagen usar
  const imageSrc = sellerImageUrl
    ? sellerImageUrl
    : user?.imageUrl
    ? user.imageUrl
    : null;

    useEffect(() => {
        const close = (e: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsOpen(false);
          }
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
      }, []);
    

  return (
    <div className="w-10 h-10 rounded-full overflow-hidden">
      <motion.button>
        
      </motion.button>
      ) : (
        <div className="w-10 h-10 bg-gray-300 flex items-center justify-center rounded-full">
          <UserIcon className="w-6 h-6 text-white" />
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-6 w-96 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-start justify-between px-4 py-3 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
              <SettingsIcon className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>

            {/* Notifications list */}
            {notifications.length > 0 ? (
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="max-h-72 px-2 overflow-y-auto flex flex-col items-start"
              >
                {notifications.map((notif) => (
                  <motion.div
                    key={notif.id}
                    variants={itemVariants}
                    className="px-4 py-3 w-full hover:bg-gray-100 border-b border-gray-100 cursor-pointer"                 >
                    <p className="font-semibold text-gray-800 text-sm text-start">{notif.title}</p>
                    <p className="text-gray-500 text-xs mt-1 text-start">{notif.message}</p>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="px-4 py-4 text-gray-500 text-sm ">
                No notifications yet
              </div>
            )}

            {/* Footer */}
            <div className="px-4 py-2 border-t border-gray-200 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-700">
              <Link href="/dashboard/notifications">View all Notifications</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
