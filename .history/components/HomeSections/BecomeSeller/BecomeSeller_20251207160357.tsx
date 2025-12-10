'use client';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BecomeSeller() {
  return (
    <section className="w-full bg-slate-100 py-16 px-6 md:px-12 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl bg-white rounded-2xl shadow-lg p-10 text-slate-900"
      >
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
            Your craft has the power to change your life. 
            <br />
            <span className="text-slate-800 font-bold">We’re here to help you make it happen.</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
            At Hancrated, we believe every artisan deserves real opportunities. Together, we can bring your work to people who value authenticity and products made with heart. Join us and be part of something bigger.
          </p>

          <Link href="/seller/create">
            <Button
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-8 py-6 text-lg transition-all"
            >
              Create my shop
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
