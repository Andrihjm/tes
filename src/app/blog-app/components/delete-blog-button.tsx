"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog } from "@/api/gorest";
import { toast } from "sonner";
import { GoTrash } from "react-icons/go";
import Spinner from "@/components/ui/spinner";

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
    <button onClick={handleDelete} disabled={mutation.isPending}>
      {mutation.isPending ? (
        <Spinner color="#4A5565" className="!h-4 !w-4" />
      ) : (
        <GoTrash />
      )}
    </button>
  );
};

export default DeleteBlogButton;
