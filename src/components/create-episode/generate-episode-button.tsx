import { type z } from "zod";
import type { UseFormHandleSubmit } from "react-hook-form";
import { useState, useRef } from "react";

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

  const onSubmit = (data: FormValues) => {
    const generatedMarkdown = generateEpisodeMarkdown(data);
    setMarkdown(generatedMarkdown);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <button
        type="submit"
        className="w-full rounded-md bg-gray-500 px-4 py-2 text-white"
        onClick={handleSubmit(onSubmit)}
      >
        Generate Episode
      </button>

      <dialog
        ref={dialogRef}
        className="fixed left-1/2 top-1/2 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-lg p-4 backdrop:bg-gray-500/50"
      >
        <div className="flex flex-col gap-4">
          <div className="pose max-h-[80vh] overflow-scroll bg-slate-200 p-4">
            <code className="whitespace-pre-wrap break-words">{markdown}</code>
          </div>
          <div className="flex gap-2 self-end">
            <button
              onClick={() => {
                navigator.clipboard.writeText(markdown);
              }}
              className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={() => dialogRef.current?.close()}
              className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
