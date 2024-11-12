import {
  useFieldArray,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import { type z } from "zod";
import { episodeSchemaForm } from "./schema";

type FormValues = z.infer<typeof episodeSchemaForm>;

export default function Links({
  control,
  register,
}: {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
}) {
  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control,
    name: "links",
  });
  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Links</h2>
        {linkFields.map((field, index) => (
          <div key={field.id} className="flex gap-4">
            <input
              {...register(`links.${index}.title`)}
              placeholder="Link Title"
              className="flex-1 rounded-md border p-2"
            />
            <input
              {...register(`links.${index}.url`)}
              placeholder="URL"
              className="flex-1 rounded-md border p-2"
            />
            <button
              type="button"
              onClick={() => removeLink(index)}
              className="rounded-md bg-red-500 px-3 py-2 text-white"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendLink({ title: "", url: "" })}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Add Link
        </button>
      </div>
    </>
  );
}
