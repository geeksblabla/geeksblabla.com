import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormTrigger,
  type UseFormWatch,
} from "react-hook-form";
import { type z } from "zod";
import { episodeSchemaForm } from "./schema";
import { useRef, useState } from "react";
import { AddIcon, EditIcon, RemoveIcon } from "./icons";
import { DeleteDialog, EditDialog } from "./dialogs";

type FormValues = z.infer<typeof episodeSchemaForm>;

export const Hosts = ({
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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  const {
    fields: hostFields,
    append: appendHost,
    remove: removeHost,
  } = useFieldArray({
    control,
    name: "hosts",
  });
  const hosts = watch("hosts");

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
      removeHost(deletingIndex);
      deleteDialogRef.current?.close();
      setDeletingIndex(null);
    }
  };

  return (
    <>
      <div className="space-y-4 pt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Guests:</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {hosts
            .filter(field => field.title || field.url)
            .map((field, index) => (
              <div key={field.title} className="group relative">
                <div
                  className={`flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1.5 ${errors.hosts?.[index] ? "border border-red-400" : ""}`}
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
              appendHost({ title: "", url: "" });
              handleEdit(hostFields.length);
            }}
          >
            <span>Add Host</span>
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
        title={editingIndex !== null ? "Edit Host" : "Add Host"}
        onClose={() => setEditingIndex(null)}
      >
        {editingIndex !== null && (
          <div className="space-y-4">
            <div>
              <input
                {...register(`hosts.${editingIndex}.title`, {})}
                placeholder="Host Name"
                className={`w-full rounded-md border p-2 ${errors.hosts?.[editingIndex]?.title ? "border-red-500" : ""}`}
              />
              {errors.hosts?.[editingIndex]?.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.hosts[editingIndex]?.title?.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register(`hosts.${editingIndex}.url`)}
                placeholder="URL"
                className={`w-full rounded-md border p-2 ${errors.hosts?.[editingIndex]?.url ? "border-red-500" : ""}`}
              />
              {errors.hosts?.[editingIndex]?.url && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.hosts[editingIndex]?.url?.message}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  trigger(`hosts.${editingIndex}`);
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
