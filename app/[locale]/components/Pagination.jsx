import { useTranslations } from "next-intl";
import Link from "next/link";

const Pagination = ({ query, data, path }) => {
  const firstElement = data?.pageInfo?.startCursor;
  const lastElement = data?.pageInfo?.endCursor;
  const hasNext = data?.pageInfo?.hasNextPage;
  const hasPreviouse = data?.pageInfo?.hasPreviousPage;

  const general = useTranslations("General");

  return (
    <div className="flex gap-2">
      {hasPreviouse && (
        <Link
          className="p-3 mt-4 block border shadow-md border-gray-200 dark:border-gray-800 rounded-[0.25rem] hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 transition-all"
          href={{
            pathname: path,
            query: {
              ...query,
              before: firstElement,
              after: null,
            },
          }}
        >
          {general("previous")}
        </Link>
      )}

      {hasNext && (
        <Link
          className="p-3 mt-4 block border shadow-md border-gray-200 dark:border-gray-800 rounded-[0.25rem] hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 transition-all"
          href={{
            pathname: path,
            query: {
              ...query,
              after: lastElement,
              before: null,
            },
          }}
        >
          {general("next")}
        </Link>
      )}
    </div>
  );
};

export default Pagination;
