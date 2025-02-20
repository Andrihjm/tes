import { Button } from "antd";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface SubmitButtonProps {
  submitType: "button" | "submit" | "reset";
  type: "link" | "text" | "default" | "primary" | "dashed" | undefined;
  className?: string;
  isLoading?: boolean;
  mode?: "CREATE" | "UPDATE";
  onCancel?: () => void;
}

const SubmitButton = ({
  type,
  submitType,
  className,
  isLoading = false,
  mode = "CREATE",
  onCancel,
}: SubmitButtonProps) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        type="default"
        onClick={onCancel}
        className="w-full max-w-max rounded p-5 hover:bg-gray-100"
      >
        Cancel
      </Button>

      <Button
        type={type}
        htmlType={submitType}
        disabled={isLoading}
        className={`w-full max-w-max rounded bg-blue-500 p-5 text-white hover:bg-blue-600 disabled:bg-blue-300 ${className || ""}`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
            {mode === "CREATE" ? "Creating..." : "Updating..."}
          </span>
        ) : mode === "CREATE" ? (
          "Create Blog"
        ) : (
          "Update Blog"
        )}
      </Button>
    </div>
  );
};

export default SubmitButton;
