"use client";
import { useEffect, useState } from "react";

interface CategoryType {
    _id: string;
    name: string;
    image?: string;
    description?: string;
}

interface CategoryNamesProps {
    onCategoryClick: (categoryName: string) => void;
    activeCategoryId: string | null;
}

export default function CategoryNames({
    onCategoryClick,
    activeCategoryId
}: CategoryNamesProps) {
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        fetch("/api/categories")
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    return (
        <ul className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-5 my-5">
            {categories.map(category => {
                const isActive = category.name === activeCategoryId;

                return (
                    <li
                        key={category._id}
                        onClick={() => onCategoryClick(category.name)}
                        className={`text-center border rounded-sm px-1 py-1 cursor-pointer transition-colors
                            ${
                                isActive
                                    ? "bg-(--brand-pale) text-(--brand-dark) font-bold"
                                    : "bg-(--brand-dark) text-(--brand-light) hover:bg-indigo-700"
                            }`}
                    >
                        {category.name}
                    </li>
                );
            })}
        </ul>
    );
}
