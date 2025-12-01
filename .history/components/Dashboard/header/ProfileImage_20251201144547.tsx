import Image from "next/image";
import { User as UserIcon } from "lucide-react";

interface HeaderProps {
  sellerImageUrl?: string; /
  user?: any;              // objeto de Clerk
}

export default function ProfileImage({ sellerImageUrl, user }: HeaderProps) {
  // Determinar qué imagen usar
  const imageSrc = sellerImageUrl
    ? sellerImageUrl
    : user?.imageUrl
    ? user.imageUrl
    : null;

  return (
    <div className="w-10 h-10 rounded-full overflow-hidden">
      {imageSrc ? (
        <Image
          width={40}
          height={40}
          src={imageSrc}
          alt="user profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 bg-gray-300 flex items-center justify-center rounded-full">
          <UserIcon className="w-6 h-6 text-white" />
        </div>
      )}
    </div>
  );
}
