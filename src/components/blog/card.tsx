import type { ArticleFrontmatter } from "@/content/shema";

export interface Props {
  href?: string;
  frontmatter: ArticleFrontmatter;
  fullWidth?: boolean;
  minutesRead?: string;
}

export default function Card({
  href,
  frontmatter,
  // fullWidth = false,
  minutesRead,
}: Props) {
  const { title, description, author } = frontmatter;
  return (
    <div className="border-b border-neutral-300 pb-8 pt-6 odd:border-r odd:pr-4 even:pl-4">
      <a
        href={href}
        className="inline-block text-label-lg decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <h2 className="text-label-lg">{title}</h2>
      </a>
      <p className="text-paragraph-sm text-neutral-dark-50">{minutesRead}</p>

      <p className="mb-4 text-paragraph-sm text-neutral-dark-20">
        {description}
      </p>

      <div className="flex items-start">
        <svg
          width="10"
          height="9"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-1"
        >
          <path
            d="M0.4 -9.53674e-07H1.6V16.4H7.2V17.6H0.4V-9.53674e-07ZM6.79219 17.6V16.4H19.1922V17.6H6.79219Z"
            fill="#292D33"
          ></path>
        </svg>
        <div className="flex-1 pl-1">
          <p className="mb-4 text-paragraph-sm text-neutral-dark-50">
            {author}
          </p>
        </div>
      </div>
      <a href={href} className="text-label-md font-bold underline">
        Read more
      </a>
    </div>
  );
}
