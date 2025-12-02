import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { starRatingProps } from "@/types";

export default function StarIcon({ rating }: starRatingProps) {
    const maxStar = 5;
    const roundRating = Math.round((rating * 2) / 2);
    const fullStar = Math.floor(roundRating);
    const isHalf = fullStar % 1 !== 0;
    const emptyStar = maxStar - fullStar - (isHalf ? 1 : 0);

    const fullStarList = Array(fullStar).fill('full');
    const emptyStarList = Array(emptyStar).fill('empty');

    return (
        <div className='flex  '>
            {fullStarList.map((_, index) => (
                <FaStar key={`full-${index}`} className="w-4 h-4"/>
            ))}
            {isHalf &&
                <FaStarHalfAlt className='w-4 h-4'/>
            }
            {emptyStarList.map((_, index) => (
                <FaRegStar key={`empty-${index}`} className='w-4 h-4 text-(--brand-pale)' />
            ))}

            <span className="text-base text-(--brand-pale)">({rating})</span>
        </div>
    );
    
}