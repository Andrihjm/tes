"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog, updateBlog } from "@/api/gorest";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BlogType } from "@/types/blog.type";
import { Input } from "antd";
import SubmitButton from "../buttons/submit-button";

interface CreateBlogFormProps {
  type?: "CREATE" | "UPDATE";
  blog?: BlogType;
}

const { TextArea } = Input;

const CreateBlogFrom = ({ type = "CREATE", blog }: CreateBlogFormProps) => {
  const [title, setTitle] = useState(blog?.title || "");
  const [body, setBody] = useState(blog?.body || "");
  const [userId, setUserId] = useState(blog?.user_id.toString() || "");
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const router = useRouter();

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
      setUserId(blog.user_id.toString());
    }
  }, [blog]);

  const mutation = useMutation({
    mutationFn: (formData: BlogType) => {
      if (type === "CREATE") {
        return createBlog(formData);
      } else {
        return updateBlog(blog!.id!, formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success(
        type === "CREATE"
          ? "Blog post created successfully!"
          : "Blog post updated successfully!",
      );
      router.push("/blog-app");
    },
    onError: () => {
      toast.error("Failed to submit the blog post.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !body) {
      setErrorMessage("All fields are required");
      toast.error("All fields are required");
      return;
    }

    const formData: any = { title, body, user_id: 7706655 };

    mutation.mutate(formData);
  };

  return (
    <div className="mx-auto my-4 w-full rounded-lg bg-slate-600/20 p-4 shadow-lg backdrop-blur-md sm:my-6 sm:w-4/5 sm:p-6 md:my-8 md:w-3/4 md:p-8 lg:w-2/3 lg:p-12 xl:w-1/2">
      <h2 className="mb-4 text-xl font-bold text-gray-100 sm:mb-6 sm:text-2xl">
        {type === "CREATE" ? "Create New Blog" : "Update Blog"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {errorMessage && (
          <div className="rounded-md border border-red-400 bg-red-100 p-3 text-sm text-red-700 sm:p-4">
            {errorMessage}
          </div>
        )}

        <div className="space-y-1 sm:space-y-2">
          <label className="block text-xs font-medium text-gray-200 sm:text-sm">
            Title
          </label>
          <TextArea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoSize={{ minRows: 1, maxRows: 4 }}
            placeholder="Enter your title..."
            className="text-sm sm:text-base"
          />
        </div>

        <div className="space-y-1 sm:space-y-2">
          <label className="block text-xs font-medium text-gray-200 sm:text-sm">
            Body
          </label>
          <TextArea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter your description..."
            autoSize={{ minRows: 3, maxRows: 5 }}
            className="text-sm sm:text-base"
          />
        </div>

        <div className="flex flex-col gap-2 pt-2 sm:flex-row-reverse sm:gap-4 sm:pt-4">
          <SubmitButton
            submitType="submit"
            type="primary"
            isLoading={mutation.isPending}
            onCancel={() => router.back()}
            className="w-full sm:w-auto"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateBlogFrom;
