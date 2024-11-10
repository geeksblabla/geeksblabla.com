import {
  useFieldArray,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import { type z } from "zod";
import { episodeSchemaForm } from "./schema";

type FormValues = z.infer<typeof episodeSchemaForm>;

export default function Notes({
  control,
  register,
}: {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
}) {
  const {
    fields: noteFields,
    append: appendNote,
    remove: removeNote,
  } = useFieldArray({
    control,
    name: "notes",
  });
  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Notes</h2>
        {noteFields.map((field, index) => (
          <div key={field.id} className="flex gap-4">
            <input
              {...register(`notes.${index}.timestamp`)}
              placeholder="HH:MM:SS"
              className="w-32 rounded-md border p-2"
            />
            <input
              {...register(`notes.${index}.content`)}
              placeholder="Note content"
              className="flex-1 rounded-md border p-2"
            />
            <button
              type="button"
              onClick={() => removeNote(index)}
              className="rounded-md bg-red-500 px-3 py-2 text-white"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendNote({ timestamp: "", content: "" })}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Add Note
        </button>
      </div>
    </>
  );
}
