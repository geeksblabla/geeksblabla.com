import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { actions } from "astro:actions";
import { type z } from "zod";
import { episodeSchemaForm } from "./schema";
import BasicInfos from "./basic-infos";
import { Links } from "./links";
import Notes from "./notes";
import { useState } from "react";
import { Guests } from "./guests";
import { Hosts } from "./hosts";
import { GenerateEpisodeButton } from "./generate-episode-button";

type FormValues = z.infer<typeof episodeSchemaForm>;

const getYoutubeId = (url: string) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get("v");
};

const DEFAULT_VALUES = {
  links: [{ title: "", url: "" }],
  guests: [{ title: "", url: "" }],
  hosts: [{ title: "", url: "" }],
  notes: [
    { timestamp: "00:00:00", content: "Introduction and welcoming guests" },
    { timestamp: "00:05:00", content: "" },
    { timestamp: "00:10:00", content: "" },
    { timestamp: "00:25:00", content: "" },
    { timestamp: "00:45:00", content: "" },
    { timestamp: "00:55:00", content: "" },
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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-12">
        <p className="text-center text-gray-600">
          Enter a Notion URL to fetch episode details
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <div className="flex gap-2">
          <input
            type="text"
            id="notionUrl"
            name="notionUrl"
            className="flex-1 border border-gray-300 px-4 py-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="Paste your Notion URL Episode page here"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-500 px-6 py-3 text-white transition-colors hover:bg-green-600 disabled:bg-green-300"
          >
            {isLoading ? "Loading..." : "Search"}
          </button>
        </div>
        {error && (
          <p className="mt-3 text-center text-sm text-red-500">{error}</p>
        )}
      </form>
    </div>
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
    watch,
    trigger,
    setError,
    clearErrors,
  } = useForm<FormValues>({
    resolver: zodResolver(episodeSchemaForm),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="grid grid-cols-2 gap-16">
      <div className="space-y-2">
        <Notes
          control={control}
          register={register}
          errors={errors}
          setError={setError}
          watch={watch}
          clearErrors={clearErrors}
        />

        <Links
          control={control}
          register={register}
          watch={watch}
          errors={errors}
          trigger={trigger}
        />
        <GenerateEpisodeButton handleSubmit={handleSubmit} />
        <button onClick={handleSubmit(onSubmit)}>Submit</button>
      </div>
      <div className="space-y-2">
        <div className="aspect-h-9 aspect-w-16 w-full">
          {defaultValues.youtube && (
            <iframe
              src={`https://www.youtube.com/embed/${getYoutubeId(
                defaultValues.youtube
              )}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
        </div>
        <BasicInfos errors={errors} register={register} getValues={getValues} />
        <Guests
          control={control}
          register={register}
          watch={watch}
          errors={errors}
          trigger={trigger}
        />
        <Hosts
          control={control}
          register={register}
          watch={watch}
          errors={errors}
          trigger={trigger}
        />
      </div>
    </div>
  );
}
