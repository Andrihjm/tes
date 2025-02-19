"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog, updateBlog } from "@/api/gorest";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BlogType } from "@/types/blog.type";

interface CreateBlogFormProps {
  type?: "CREATE" | "UPDATE";
  blog?: BlogType;
}

const CreateBlogFrom = ({ type = "CREATE", blog }: CreateBlogFormProps) => {
  const [title, setTitle] = useState(blog?.title || "");
  const [body, setBody] = useState(blog?.body || "");
  const [userId, setUserId] = useState(blog?.user_id.toString() || "");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const queryClient = useQueryClient();

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
          : "Blog post updated successfully!"
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

    const formData: BlogType = { title, body, user_id: 7706655 };

    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4">
      {errorMessage && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {mutation.isPending ? (
          <span className="flex items-center justify-center">
            <AiOutlineLoading3Quarters className="animate-spin mr-2" />
            {type === "CREATE" ? "Creating..." : "Updating..."}
          </span>
        ) : type === "CREATE" ? (
          "Create Blog"
        ) : (
          "Update Blog"
        )}
      </button>
    </form>
  );
};

export default CreateBlogFrom;
