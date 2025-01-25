import {
  type FieldErrors,
  type UseFormGetValues,
  type UseFormRegister,
} from "react-hook-form";
import { type z } from "zod";
import { episodeSchemaForm } from "./schema";

type FormValues = z.infer<typeof episodeSchemaForm>;

export default function BasicInfos({
  errors,
  register,
  getValues,
}: {
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
  getValues: UseFormGetValues<FormValues>;
}) {
  const { date, duration } = getValues();

  return (
    <>
      {/* Basic Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm font-medium">Title</label>
          <div className="flex-1">
            <input
              {...register("title")}
              className="w-full rounded-md border p-2"
              placeholder="Episode Title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm font-medium">YouTube URL</label>
          <div className="flex-1">
            <input
              {...register("youtube")}
              className="w-full rounded-md border p-2"
              placeholder="https://youtube.com/..."
              readOnly
            />
            {errors.youtube && (
              <p className="mt-1 text-sm text-red-500">
                {errors.youtube.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center">
            Date : {date ? new Date(date).toISOString().split("T")[0] : ""}
          </label>
          <label className="flex items-center">Duration : {duration}</label>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm font-medium">Category</label>
          <div className="flex-1">
            <select
              {...register("category")}
              className="w-full rounded-md border p-2"
            >
              <option value="dev">Development</option>
              <option value="career">Career</option>
              <option value="ama">AMA</option>
              <option value="mss">MSS</option>
              <option value="book">Book</option>
              <option value="ai">AI</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm font-medium">Tags</label>
          <div className="flex-1">
            <input
              {...register("tags", {
                setValueAs: value => {
                  return value
                    .split?.(",")
                    .map((tag: string) => tag.trim())
                    .filter((tag: string) => tag !== "");
                },
              })}
              className="w-full rounded-md border p-2"
              placeholder="Enter tags separated by commas"
            />
            {errors.tags && (
              <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("published")}
              className="mr-2"
            />
            Published
          </label>
          <label className="flex items-center">
            <input type="checkbox" {...register("featured")} className="mr-2" />
            Featured
          </label>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-1">
            <textarea
              {...register("description")}
              className="w-full rounded-md border p-2"
              placeholder="Episode Description"
              rows={5}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
