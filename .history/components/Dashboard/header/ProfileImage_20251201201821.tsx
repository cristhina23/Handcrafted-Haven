'use client';

import Image from "next/image";
import { Settings, Store, User as UserIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";

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
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full overflow-hidden"
      >
        {imageSrc ? (
              <Image
                width={40}
                height={40}
                src={imageSrc}
                alt="user profile"
                className="w-10 h-10 rounded-full object-cover"
              />
      
      ) : (
        
          <UserIcon className="w-6 h-6 text-white" />
        
      )}
      </motion.button>
  

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
              <h3 className="text-sm font-semibold text-gray-700 capitalize">Hi, {user?.fullName}</h3>
              
            </div>

            
            
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="max-h-72 px-2 overflow-y-auto flex flex-col items-start"
              >
                
                  <motion.div  
                    className="px-4 py-3 w-full hover:bg-gray-100 border-b border-gray-100 cursor-pointer"                 >
                    <p className="font-semibold text-gray-800 text-sm text-start"><Profile Edit Profile</p>
                  </motion.div>
                
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="max-h-72 px-2 overflow-y-auto flex flex-col items-start"
              >
                
                  <motion.div  
                    className="px-4 py-3 w-full hover:bg-gray-100 border-b border-gray-100 cursor-pointer"                 >
                    <p className="flex items-center gap-2 font-semibold text-gray-800 text-sm text-start"><Store size={18} /> My Store</p>
                  </motion.div>
                
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="max-h-72 px-2 overflow-y-auto flex flex-col items-start"
              >
                
                  <motion.div  
                    className="px-4 py-3 w-full hover:bg-gray-100 border-b border-gray-100 cursor-pointer"                 >
                    <p className="flex items-center gap-2 font-semibold text-gray-800 text-sm text-start"><Settings size={18} /> Settings</p>
                  </motion.div>
                
              </motion.div>
            
            

            {/* Footer */}
            <div className="px-4 py-2 border-t border-gray-200 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-700">
              <Link href="/">Go back to home page</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
