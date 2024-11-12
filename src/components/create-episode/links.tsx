import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormTrigger,
  type UseFormWatch,
} from "react-hook-form";
import { type z } from "zod";
import { actions } from "astro:actions";
import { episodeSchemaForm } from "./schema";
import { useRef, useState } from "react";
import { AddIcon, EditIcon, RemoveIcon } from "./icons";
import { DeleteDialog, EditDialog } from "./dialogs";
import CopyScriptButton from "./copy-script-button";

type FormValues = z.infer<typeof episodeSchemaForm>;

export const Links = ({
  control,
  register,
  watch,
  errors,
  trigger,
}: {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  watch: UseFormWatch<FormValues>;
  errors: FieldErrors<FormValues>;
  trigger: UseFormTrigger<FormValues>;
}) => {
  const editDialogRef = useRef<HTMLDialogElement>(null);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);
  const pasteLinksRef = useRef<HTMLTextAreaElement>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control,
    name: "links",
  });
  const links = watch("links");
  const youtubeUrl = watch("youtube");

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    editDialogRef.current?.showModal();
  };

  const handleDeleteClick = (index: number) => {
    setDeletingIndex(index);
    deleteDialogRef.current?.showModal();
  };

  const handleConfirmDelete = () => {
    if (deletingIndex !== null) {
      removeLink(deletingIndex);
      deleteDialogRef.current?.close();
      setDeletingIndex(null);
    }
  };

  // Update the textarea onChange handler
  const handlePasteLinks = async () => {
    const urls = pasteLinksRef.current?.value.split(",").filter(Boolean);
    if (!urls) return;
    try {
      const { data, error } = await actions.getPageTitles({
        urls,
      });

      if (data) {
        const newLinks = data.filter(
          newLink =>
            !links.some(existingLink => existingLink.url === newLink.url)
        );
        if (newLinks.length) {
          appendLink(newLinks);
        }
      }
      if (error) {
        console.error("Failed to fetch title for:", urls);
      }
    } catch {
      console.error("Failed to fetch title for:", urls);
      appendLink(urls.map(link => ({ title: link, url: link })));
    }
  };

  return (
    <>
      <div className="space-y-4 pt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Links:</h2>
        </div>
        <div className="rounded-md bg-gray-50 p-4 text-sm text-gray-600">
          <div className="flex items-start justify-between">
            <div className="w-full space-y-2">
              <p className="font-medium">
                To extract links from YouTube chat automatically:
              </p>
              <ol className="ml-6 list-decimal space-y-1">
                <li>
                  <div className="flex items-center gap-2">
                    Copy the script
                    <CopyScriptButton />
                  </div>
                </li>
                <li>
                  Open the{" "}
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline"
                  >
                    YouTube video
                  </a>{" "}
                  in a new tab
                </li>
                <li>Make sure the video is playing and the chat is open</li>
                <li>Open browser DevTools (F12 or Right-click → Inspect)</li>
                <li>Paste the script in the Console tab and press Enter</li>
                <li>Wait for the script to finish scanning the video</li>
                <li>
                  The links will be automatically copied to your clipboard
                </li>
              </ol>

              <div className="mt-4">
                <p className="mb-2 font-medium">Paste extracted links here:</p>
                <textarea
                  ref={pasteLinksRef}
                  className="w-full rounded-md border border-gray-300 p-2"
                  rows={3}
                  placeholder="Paste the comma-separated links here..."
                />
                <button
                  className="mt-2 w-full rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                  onClick={handlePasteLinks}
                >
                  Load Links
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {links
            .filter(field => field.title || field.url)
            .map((field, index) => (
              <div key={field.title} className="group relative">
                <div
                  className={`flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1.5 ${errors.links?.[index] ? "border border-red-400" : ""}`}
                >
                  <span>{field.title}</span>
                  <div className="flex gap-1">
                    <EditIcon onClick={() => handleEdit(index)} />
                    <RemoveIcon onClick={() => handleDeleteClick(index)} />
                  </div>
                </div>
                <div className="absolute left-0 top-10 z-10 hidden rounded-md bg-black p-2 text-sm text-white group-hover:block">
                  {field.url}
                </div>
              </div>
            ))}
          <button
            className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-1.5"
            onClick={() => {
              appendLink({ title: "", url: "" });
              handleEdit(linkFields.length);
            }}
          >
            <span>Add Link</span>
            <div className="flex gap-1">
              <AddIcon />
            </div>
          </button>
        </div>
      </div>

      <DeleteDialog
        dialogRef={deleteDialogRef}
        onClose={() => setDeletingIndex(null)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
      />
      <EditDialog
        dialogRef={editDialogRef}
        title={editingIndex !== null ? "Edit Link" : "Add Link"}
        onClose={() => setEditingIndex(null)}
      >
        {editingIndex !== null && (
          <div className="space-y-4">
            <div>
              <input
                {...register(`links.${editingIndex}.title`, {})}
                placeholder="Link Name"
                className={`w-full rounded-md border p-2 ${errors.links?.[editingIndex]?.title ? "border-red-500" : ""}`}
              />
              {errors.links?.[editingIndex]?.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.links[editingIndex]?.title?.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register(`links.${editingIndex}.url`)}
                placeholder="URL"
                className={`w-full rounded-md border p-2 ${errors.links?.[editingIndex]?.url ? "border-red-500" : ""}`}
              />
              {errors.links?.[editingIndex]?.url && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.links[editingIndex]?.url?.message}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  trigger(`links.${editingIndex}`);
                  editDialogRef.current?.close();
                  setEditingIndex(null);
                }}
                className="rounded-md bg-blue-500 px-4 py-2 text-white"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </EditDialog>
    </>
  );
};
