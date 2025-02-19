"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog } from "@/api/gorest";
import { toast } from "sonner";

interface DeleteBlogButtonProps {
  blogId: string | number;
}

const DeleteBlogButton = ({ blogId }: DeleteBlogButtonProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteBlog(blogId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
      toast.success("Blog post deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete the blog post.");
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleDelete}
      disabled={mutation.isPending}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300 transition"
    >
      {mutation.isPending ? "Deleting..." : "Delete Blog"}
    </button>
  );
};

export default DeleteBlogButton;
