import { useState } from "react";
import { CopyIcon } from "./icons";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import script from "./extract-links.js?raw"; // get script as row

export default function CopyScriptButton() {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopyScript = async () => {
    await navigator.clipboard.writeText(script);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000); // Hide after 2 seconds
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopyScript}
        className="flex items-center gap-1 rounded-md bg-gray-200 px-3 py-1 hover:bg-gray-300"
      >
        <CopyIcon />
        <span>Copy</span>
      </button>

      {showCopied && (
        <div className="motion motion-preset-slide-up absolute -top-8 left-1/2 min-w-[150px] -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-center text-sm text-white">
          Script copied!
        </div>
      )}
    </div>
  );
}
