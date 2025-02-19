"use client";

import Link from "next/link";
import DeleteBlogButton from "./delete-blog-button";
import { LuPencilLine } from "react-icons/lu";
import { Dropdown, MenuProps } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import clsx from "clsx";
import { useRef } from "react";

interface UserOptionProps {
  id: string | number;
  className?: string;
}

const UserOption = ({ id, className }: UserOptionProps) => {
  const iconRef = useRef(null);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href={`/blog-app/update-blog/${id}`} className="cursor-pointer">
          <LuPencilLine />
        </Link>
      ),
    },
    {
      key: "2",
      label: <DeleteBlogButton blogId={id} />,
    },
  ];

  return (
    <div
      className={clsx(
        "hidden cursor-pointer rounded-md px-1 py-2 backdrop-blur-md group-hover:block",
        className,
      )}
    >
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
        <div ref={iconRef} className="max-w-max">
          <BsThreeDotsVertical />
        </div>
      </Dropdown>
    </div>
  );
};

export default UserOption;
