import { BlogType } from "@/types/blog.type";
import axios from "axios";

export const getBlog = async (): Promise<BlogType[]> => {
  try {
    const { data } = await axios.get<BlogType[]>(
      process.env.NEXT_PUBLIC_API_URL!,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch blog posts", error);
    throw error;
  }
};

export const createBlog = async (data: BlogType): Promise<BlogType> => {
  try {
    const response = await axios.post<BlogType>(
      process.env.NEXT_PUBLIC_API_URL!,
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create blog post", error);
    throw error;
  }
};
