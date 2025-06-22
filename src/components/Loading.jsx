import React from "react";
import { Loader2 } from "lucide-react"; // or use your preferred icon

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-sm text-slate-600 font-medium animate-pulse">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;