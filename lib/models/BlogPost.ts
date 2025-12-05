import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  description: string;
  content: string;
  image: string;
  additionalImages?: string[];
  category: string;
  author: {
    name: string;
    id?: string;
  };
  tags?: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    additionalImages: [{ type: String }],
    category: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      id: { type: String },
    },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const BlogPost =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
