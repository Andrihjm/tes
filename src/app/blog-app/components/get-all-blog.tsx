"use client";

import { getBlog } from "@/api/gorest";
import { useQuery } from "@tanstack/react-query";
import { BlogType } from "@/types/blog.type";

import Link from "next/link";
import DeleteBlogButton from "./delete-blog-button";
import { useState } from "react";
import Pagination from "@/components/globals/pagination";
import { Button } from "antd";
import Spinner from "@/components/ui/spinner";
import LoadingPage from "@/components/globals/loading-page";
import UserOption from "./user-option";

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
        {isLoading ? (
          <LoadingPage />
        ) : error ? (
          <div className="text-red-500">Error loading blogs</div>
        ) : (
          <>
            <Link
              href="/blog-app/create-blog"
              className="flex w-full items-center justify-end"
            >
              <Button type="default" className="py-4">
                Create Blog
              </Button>
            </Link>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {blogsData?.data.map((blog: BlogType) => (
                <div
                  key={blog.id}
                  className="group relative rounded border p-4 shadow"
                >
                  <UserOption id={blog.id} className="absolute right-1 top-2" />

                  <h3 className="mb-2 font-semibold">{blog.title}</h3>
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
