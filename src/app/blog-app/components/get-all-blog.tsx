"use client";

import { getBlog } from "@/api/gorest";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BlogType } from "@/types/blog.type";

export default function BlogPage() {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const posts = await getBlog();
      console.log("Data yang di-fetch:", posts);
      return posts;
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error loading blogs</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blogs?.map((blog: BlogType) => (
              <div key={blog.id} className="p-4 border rounded shadow">
                <h3 className="font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600">
                  {blog.body.substring(0, 100)}...
                </p>
                <div className="mt-2 text-sm text-gray-500">
                  User ID: {blog.user_id}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
