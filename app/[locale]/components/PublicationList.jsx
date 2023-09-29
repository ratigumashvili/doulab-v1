import { separate } from "@/lib/helpers";
import Link from "next/link";

const PublicationList = ({ data }) => {
  return (
    <ul className="my-6">
      {data?.edges?.map(({ node }) => (
        <li
          key={node.id}
          className="py-4 px-2 border-0 border-gray-200 border-b-[0.01rem] hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
        >
          {node?.author?.map((name, idx) => (
            <em key={idx} className="font-bold">
              {name}
              {separate(node?.author, idx)}
            </em>
          ))}
          . <Link href={`/publications/${node?.slug}`}>{node?.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default PublicationList;
