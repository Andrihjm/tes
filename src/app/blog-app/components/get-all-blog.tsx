"use client";

import { getBlog } from "@/api/gorest";
import { useQuery } from "@tanstack/react-query";
import { BlogType } from "@/types/blog.type";
import Link from "next/link";
import { useState } from "react";
import Pagination from "@/components/globals/pagination";
import { Button, Card, Space } from "antd";
import LoadingPage from "@/components/globals/loading-page";
import UserOption from "./user-option";
import ModalTamplate from "@/components/tamplates/modal-tamplate";
import ErrorLoadingPage from "@/components/globals/error-loading-page";

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
    <div className="container mx-auto w-full px-4 py-4 sm:py-6 md:py-8">
      <div>
        {isLoading ? (
          <LoadingPage />
        ) : error ? (
          <ErrorLoadingPage />
        ) : (
          <>
            <div className="mb-4 flex w-full items-center justify-between sm:mb-6">
              <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
                Blogs
              </h1>
              <Link href="/blog-app/create-blog">
                <Button type="default" className="text-sm">
                  Create Blog
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 sm:gap-4 sm:pt-4 lg:grid-cols-3">
              {blogsData?.data.map((blog: BlogType) => (
                <Space
                  key={blog.id}
                  direction="vertical"
                  className="w-full transform transition-all duration-200 hover:-translate-y-1"
                >
                  <Card
                    title={
                      <div className="truncate text-sm sm:text-base">
                        {blog.title}
                      </div>
                    }
                    extra={
                      <ModalTamplate
                        id={blog.id}
                        title={blog.title}
                        body={blog.body}
                      />
                    }
                    className="h-full w-full shadow-sm hover:shadow"
                  >
                    <p className="line-clamp-3 text-xs sm:line-clamp-4 sm:text-sm">
                      {blog.body}
                    </p>
                  </Card>
                </Space>
              ))}
            </div>

            <div className="mt-4 sm:mt-8">
              <Pagination
                currentPage={blogsData?.pagination.currentPage ?? 1}
                totalPages={blogsData?.pagination.totalPages ?? 1}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
