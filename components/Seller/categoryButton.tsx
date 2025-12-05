
"use client"
import { useEffect, useState } from "react"
interface categoryProps{
    _id: string,
    name: string,
    image: string
    description: string
}

export default function CategoryNames() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch("/api/categories")
            .then(res => res.json())
            .then(data => setCategories(data));
    })
    return (
        <ul className="grid grid-cols-5 grid-row-2 gap-5">
            {categories.map((category: categoryProps) => (
                <li
                key={category._id}
                className="bg-(--brand-dark) text-(--brand-light) text-center border-1 rounded-sm px-1 py-1">{category.name}</li>
            ))}
        </ul>
    )
}