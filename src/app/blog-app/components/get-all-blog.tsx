"use client";

import { getBlog } from "@/api/gorest";
import { useQuery } from "@tanstack/react-query";
import { BlogType } from "@/types/blog.type";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import DeleteBlogButton from "./delete-blog-button";
import { useState } from "react";
import Pagination from "@/components/globals/pagination";

export default function BlogPage() {
  const [page, setPage] = useState<number>(1);
  const perPage = 6;

  const {
    data: blogsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs", page],
    queryFn: async () => getBlog(page, perPage),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <Link
          href="/blog-app/create-blog"
          className="text-xl font-semibold mb-4 p-4 border max-w-max"
        >
          Create blog
        </Link>

        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error loading blogs</div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {blogsData?.data.map((blog: BlogType) => (
                <div key={blog.id} className="group p-4 border rounded shadow">
                  <div className="hidden group-hover:flex justify-between">
                    <Link
                      href={`/blog-app/update-blog/${blog.id}`}
                      className="cursor-pointer"
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
                    Blog ID: {blog.id}
                  </div>
                </div>
              ))}
            </div>

            <Pagination
              currentPage={blogsData?.pagination.currentPage ?? 1}
              totalPages={blogsData?.pagination.totalPages ?? 1}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
