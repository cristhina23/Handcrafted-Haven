import fs from "fs";
import path from "path";
import { connectDB } from "./db";
import { Category } from "../models/Category";



/*******************************************
 *  Fetch Category Collection
******************************************/ 
export async function getCategories() {
    try {
        await connectDB();
        const allCategories = await Category.find();

        if (allCategories.length === 0) {
            const filePath = path.join(process.cwd(), "lib/data/seedcategory.json");

            const fileData = fs.readFileSync(filePath, 'utf-8');
            const categoriesData = JSON.parse(fileData);
            
            const response = await Category.insertMany(categoriesData);
            if (!response) {
                throw new Error("Oops! Something went wrong")
            }

            return response;
        }
        return allCategories
    } catch (error) {
        console.log(error)
        throw new Error('Failed to seed category data.')
    }
}

