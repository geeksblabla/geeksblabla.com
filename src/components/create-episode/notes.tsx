import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormClearErrors,
  type UseFormRegister,
  type UseFormSetError,
  type UseFormWatch,
} from "react-hook-form";
import { type z } from "zod";
import { episodeSchemaForm } from "./schema";
import { AddIcon, RemoveIcon } from "./icons";
import React from "react";

type FormValues = z.infer<typeof episodeSchemaForm>;

const timestampToSeconds = (timestamp: string) => {
  const [hours, minutes, seconds] = timestamp.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const getNextTimestamp = (notes: { timestamp: string; content: string }[]) => {
  const lastNote = notes[notes.length - 1];
  let newTimestamp = "00:00:00";

  if (lastNote?.timestamp) {
    const [hours, minutes, seconds] = lastNote.timestamp.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + 15;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    newTimestamp = `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return newTimestamp;
};

export default function Notes({
  control,
  register,
  errors,
  setError,
  clearErrors,
  watch,
}: {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  setError: UseFormSetError<FormValues>;
  watch: UseFormWatch<FormValues>;
  clearErrors: UseFormClearErrors<FormValues>;
}) {
  const {
    fields: noteFields,
    append: appendNote,
    remove: removeNote,
  } = useFieldArray({
    control,
    name: "notes",
  });

  const notes = watch("notes");

  const triggerOrderValidation = () => {
    if (!notes?.length) return;

    const timestamps = notes.map(note => note.timestamp);
    const secondsArray = timestamps.map(timestampToSeconds);

    let isSorted = true;
    let firstUnsortedIndex = -1;

    for (let i = 0; i < secondsArray.length - 1; i++) {
      if (secondsArray[i] >= secondsArray[i + 1]) {
        isSorted = false;
        firstUnsortedIndex = i;
        break;
      }
    }

    if (!isSorted) {
      setError(`notes`, {
        type: "manual",
        message: `Timestamps out of order: ${timestamps[firstUnsortedIndex + 1]}`,
      });
    } else {
      clearErrors("notes");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Notes</h2>
      </div>

      <div className="space-y-4">
        {noteFields.map((field, index) => (
          <div key={field.id}>
            <div className="group relative flex items-start gap-4">
              <input
                {...register(`notes.${index}.timestamp`, {
                  onChange: () => triggerOrderValidation(),
                })}
                placeholder="00:00:00"
                pattern="^(?:[0-9]{2}:){2}[0-9]{2}$"
                className="w-[100px] rounded-md border-0 bg-gray-200 px-2 py-0.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                title="Please use format: HH:MM:SS"
              />

              <div className="flex-1">
                <input
                  {...register(`notes.${index}.content`)}
                  placeholder="Add your note here..."
                  className="w-full border-0 bg-transparent p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                />
              </div>

              <RemoveIcon
                className="h-4 w-4"
                onClick={() => removeNote(index)}
              />
            </div>
            <div className="space-y-1">
              {errors.notes?.[index]?.timestamp?.message && (
                <div className="text-sm text-red-500">
                  {errors.notes?.[index]?.timestamp?.message}
                </div>
              )}
              {errors.notes?.[index]?.content?.message && (
                <div className="text-sm text-red-500">
                  {errors.notes?.[index]?.content?.message}
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="space-y-1">
          {errors.notes?.message && (
            <div className="text-sm text-red-500">{errors.notes?.message}</div>
          )}
        </div>
        <button
          className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-1.5"
          onClick={() => {
            appendNote({ timestamp: getNextTimestamp(notes), content: "" });
          }}
        >
          <span>Add Note</span>
          <div className="flex gap-1">
            <AddIcon />
          </div>
        </button>
      </div>
    </div>
  );
}
