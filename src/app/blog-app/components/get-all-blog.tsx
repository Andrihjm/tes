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

            <div className="grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3">
              {blogsData?.data.map((blog: BlogType) => (
                <Space
                  key={blog.id}
                  direction="vertical"
                  className="transform cursor-pointer transition-all duration-200 hover:-translate-y-1"
                >
                  <Card
                    title={blog.title}
                    extra={
                      <ModalTamplate
                        id={blog.id}
                        title={blog.title}
                        body={blog.body}
                      />
                    }
                    className="relative"
                  >
                    <p className="line-clamp-4">{blog.body}</p>
                  </Card>
                </Space>
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
