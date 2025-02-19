"use client";

import { getBlog } from "@/api/gorest";
import { useQuery } from "@tanstack/react-query";
import { BlogType } from "@/types/blog.type";
import { BsThreeDotsVertical, BsTrash3Fill } from "react-icons/bs";
import Link from "next/link";
import DeleteBlogButton from "./delete-blog-button";

export default function BlogPage() {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const posts = await getBlog();
      console.log(posts);
      return posts;
    },
  });

  return (
    <div className=" container mx-auto px-4 py-8">
      <div>
        <Link
          href={"/blog-app/create-blog"}
          className="text-xl font-semibold mb-4 p-4 border max-w-max"
        >
          Create blog
        </Link>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error loading blogs</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blogs?.map((blog: BlogType) => (
              <div key={blog.id} className="group p-4 border rounded shadow">
                <div className="hidden group-hover:block cursor-pointer">
                  <Link
                    href={`/blog-app/update-blog/${blog.id}`}
                    className="hidden group-hover:block cursor-pointer"
                  >
                    <BsThreeDotsVertical />
                  </Link>
                  <DeleteBlogButton blogId={blog.id} />
                </div>

                <h3 className="font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600">
                  {blog.body.substring(0, 100)}...
                </p>
                <div className="mt-2 text-sm text-gray-500">
                  User ID: {blog.user_id}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  User ID: {blog.id}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
