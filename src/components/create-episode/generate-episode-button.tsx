import { type z } from "zod";
import type { UseFormHandleSubmit } from "react-hook-form";
import { useState, useRef, useEffect } from "react";

import { episodeSchemaForm } from "./schema";
import { generateEpisodeMarkdown } from "./generate-episode-markdown";

type FormValues = z.infer<typeof episodeSchemaForm>;

export const GenerateEpisodeButton = ({
  handleSubmit,
}: {
  handleSubmit: UseFormHandleSubmit<FormValues>;
}) => {
  const [markdown, setMarkdown] = useState<string>("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    const handleShowModal = () => {
      document.body.style.overflow = "hidden";
    };

    const handleCloseModal = () => {
      document.body.style.overflow = "unset";
    };

    dialog?.addEventListener("close", handleCloseModal);
    dialog?.addEventListener("showModal", handleShowModal);

    return () => {
      dialog?.removeEventListener("close", handleCloseModal);
      dialog?.removeEventListener("showModal", handleShowModal);
    };
  }, []);

  const onSubmit = (data: FormValues) => {
    const generatedMarkdown = generateEpisodeMarkdown(data);
    setMarkdown(generatedMarkdown);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-500 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
        onClick={handleSubmit(onSubmit)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="18" x2="12" y2="12"></line>
          <line x1="9" y1="15" x2="15" y2="15"></line>
        </svg>
        Generate Episode File
      </button>

      <dialog
        ref={dialogRef}
        className="fixed left-1/2 top-1/2 m-0 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl backdrop:bg-gray-500/50"
      >
        <div className="relative flex flex-col gap-4">
          <div className="absolute right-0 top-0 flex gap-2">
            <button
              onClick={() => dialogRef.current?.close()}
              className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100"
              title="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <h2 className="text-xl font-semibold text-gray-800">
            Generated Episode Markdown
          </h2>
          <h2 className="max-w-lg text-sm text-gray-600">
            Copy the episode content and create a pull request in the repository
            to add this episode. The file should be placed in
            episodes/episode-XXXX.md
          </h2>

          <div className="relative mt-4 max-h-[70vh] overflow-y-auto rounded-lg border border-gray-200">
            <div className="absolute right-0 top-0 flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(markdown);
                }}
                className="flex items-center gap-2 rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100"
                title="Copy to clipboard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Copy</span>
              </button>
            </div>
            <pre className="bg-gray-50 p-4">
              <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-800">
                {markdown}
              </code>
            </pre>
          </div>
        </div>
      </dialog>
    </>
  );
};
