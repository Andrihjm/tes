"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "@/api/gorest";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateBlogFrom = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });

      setTitle("");
      setBody("");
      setUserId("");
      setErrorMessage("");

      router.push("/blog-app");
      toast.success("Blog post created successfully!");
    },
    onError: (error: any) => {
      console.error("Error creating post:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    const user_id = 7706655;

    e.preventDefault();
    if (!title || !body) {
      setErrorMessage("All fields are required");
      toast.error("All fields are required");
      return;
    }
    mutation.mutate({ title, body, user_id });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-red-500 space-y-4 max-w-2xl mx-auto p-4"
    >
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
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
        />
      </div>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
      >
        {mutation.isPending ? (
          <span className="flex items-center justify-center">
            <AiOutlineLoading3Quarters /> Creating...
          </span>
        ) : (
          "Create Blog"
        )}
      </button>
    </form>
  );
};

export default CreateBlogFrom;
