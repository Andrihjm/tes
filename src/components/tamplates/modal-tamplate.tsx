import React, { useState } from "react";
import { Button, Modal } from "antd";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import DeleteBlogButton from "@/app/blog-app/components/delete-blog-button";
import Link from "next/link";

interface ModalTamplateProps {
  id: string | number;
  title: string;
  body: string;
}

const ModalTamplate = ({ id, title, body }: ModalTamplateProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal} className="ml-4 border-0 px-2">
        <AiOutlineFullscreen />
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{body}</p>

        <div className="mt-4 flex items-center justify-center gap-4">
          <DeleteBlogButton blogId={id} />
          <Link href={`/blog-app/update-blog/${id}`}>
            <CiEdit className="cursor-pointer" />
          </Link>
          <AiOutlineFullscreenExit
            onClick={handleCancel}
            className="cursor-pointer"
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalTamplate;
