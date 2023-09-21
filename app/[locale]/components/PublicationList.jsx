import { separate } from "@/lib/helpers";
import Link from "next/link";

const PublicationList = ({ data }) => {
  return (
    <ul className="my-6">
      {data?.map(({ id, title, author, slug }) => (
        <li
          key={id}
          className="py-4 px-2 border-0 border-gray-200 border-b-[0.01rem] hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
        >
          {author?.map((name, idx) => (
            <em key={idx} className="font-bold">
              {name}
              {separate(author, idx)}
            </em>
          ))}
          . <Link href={`/publications/${slug}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default PublicationList;
