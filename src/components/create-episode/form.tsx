import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { actions } from "astro:actions";
import { type z } from "zod";
import { episodeSchemaForm } from "./schema";
import BasicInfos from "./basic-infos";
import Links from "./links";
import Notes from "./notes";
import { useState } from "react";

type FormValues = z.infer<typeof episodeSchemaForm>;

const DEFAULT_VALUES = {
  links: [{ title: "", url: "" }],
  guests: [{ title: "", url: "" }],
  hosts: [{ title: "", url: "" }],
  notes: [
    { timestamp: "00:00:00", content: "Introduction and welcoming guests" },
  ],
  tags: [],
  published: true,
  featured: false,
} satisfies Partial<FormValues>;

export default function Form() {
  const [episodeData, setEpisodeData] = useState<Partial<FormValues> | null>(
    null
  );
  if (!episodeData) {
    return <NotionUrlSearch onDataFetch={setEpisodeData} />;
  }

  return <NewEpisodeForm defaultValues={episodeData} />;
}

function NotionUrlSearch({
  onDataFetch,
}: {
  onDataFetch: (data: FormValues) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const url = formData.get("notionUrl") as string;
    const { error, data } = await actions.getEpisodeDetails({ url });
    console.log(data);

    if (error) {
      setIsLoading(false);
      setError("Failed to fetch episode details. Please try again.");
      return;
    }
    console.log(data);
    const episodeData = {
      ...DEFAULT_VALUES,
      title: data.title,
      date: new Date(data.publishedAt || data.date),
      youtube: data.youtube,
      category: data.category,
      guests: data.guests,
      hosts: data.hosts,
      description: data.description,
      duration: data.duration,
    };
    onDataFetch(episodeData);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-4">
      <div>
        <label
          htmlFor="notionUrl"
          className="block text-sm font-medium text-gray-700"
        >
          Notion URL
        </label>
        <input
          type="text"
          id="notionUrl"
          name="notionUrl"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="Paste your Notion URL here"
          required
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-green-500 px-4 py-2 text-white disabled:bg-green-300"
      >
        {isLoading ? "Loading..." : "Fetch Episode Details"}
      </button>
    </form>
  );
}

// Updated main component
function NewEpisodeForm({
  defaultValues = DEFAULT_VALUES,
}: {
  defaultValues: Partial<FormValues>;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    resolver: zodResolver(episodeSchemaForm),
    defaultValues,
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-2xl space-y-8"
    >
      <BasicInfos errors={errors} register={register} getValues={getValues} />

      <Links control={control} register={register} />

      <Notes control={control} register={register} />

      <button
        type="submit"
        className="w-full rounded-md bg-green-500 px-4 py-2 text-white"
      >
        Create Episode
      </button>
    </form>
  );
}
