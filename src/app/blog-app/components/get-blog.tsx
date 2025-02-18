"use client";

import { getBlog } from "@/api/gorest";
import { BlogType } from "@/types/blog.type";
import { useQuery } from "@tanstack/react-query";

const GetBlog = () => {
  const { data, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: getBlog,
  });

  if (isPending) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-[70%] space-y-4">
      {data.map((post: BlogType) => (
        <div key={post.id} className="">
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default GetBlog;
