import { ErrorMessageProps } from "@/src/types/general";
import React from "react";

const ErrorMessage = ({ message, onRetry }:ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-red-500 bg-red-100 rounded-lg p-4">
      <p className="font-semibold">{message || "Something went wrong. Please try again."}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
