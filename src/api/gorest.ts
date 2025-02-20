import { BlogPaginationResponseType, BlogType } from "@/types/blog.type";
import axios from "axios";

export const getBlog = async (
  page: number = 1,
  perPage: number = 10,
): Promise<BlogPaginationResponseType> => {
  try {
    const { data, headers } = await axios.get<BlogType[]>(
      process.env.NEXT_PUBLIC_API_URL!,
      {
        params: {
          page,
          per_page: perPage,
        },
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    const totalItems = parseInt(headers["x-pagination-total"] ?? "0");
    const totalPages = Math.ceil(totalItems / perPage);

    return {
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        perPage,
      },
    };
  } catch (error) {
    console.error("Failed to fetch blog posts", error);
    throw error;
  }
};

export const getBlogById = async (id: string): Promise<BlogType> => {
  const { data } = await axios.get<BlogType>(
    `${process.env.NEXT_PUBLIC_API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );
  return data;
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
      },
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create blog post", error);
    throw error;
  }
};

export const updateBlog = async (
  id: string | number,
  data: BlogType,
): Promise<BlogType> => {
  try {
    const response = await axios.put<BlogType>(
      `${process.env.NEXT_PUBLIC_API_URL}/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update blog post", error);
    throw error;
  }
};

export const deleteBlog = async (id: string | number): Promise<void> => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to delete blog post", error);
    throw error;
  }
};
