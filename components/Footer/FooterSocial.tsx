import { FaInstagram, FaPinterest, FaFacebook, FaTiktok } from "react-icons/fa";

export default function FooterSocials() {
  return (
    <div className="flex justify-center gap-6 mt-8">
      <FaInstagram className="text-2xl" />
      <FaPinterest className="text-2xl" />
      <FaFacebook className="text-2xl" />
      <FaTiktok className="text-2xl" />
    </div>
  );
}
