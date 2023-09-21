import { useTranslations } from "next-intl";

const Table = ({ children }) => {
  const fields = useTranslations("Data");
  const general = useTranslations("General");
  return (
    <table className="w-full order-collapse border border-slate-400 shadow-lg">
      <thead className="bg-gray-200 dark:bg-gray-900 dark:text-gray-300">
        <tr>
          <th className="border border-slate-300 dark:border-slate-900 text-left px-2 py-4">
            <span>{fields("name")}</span>
          </th>
          <th className="border border-slate-300 dark:border-slate-900 text-left px-2 py-4">
            {fields("patronym")}
          </th>
          <th className="border border-slate-300 dark:border-slate-900 text-left px-2 py-4">
            {fields("surname")}
          </th>
          <th className="border border-slate-300 dark:border-slate-900 px-2 py-4">
            {fields("age")}
          </th>
          <th className="border border-slate-300 dark:border-slate-900 px-2 py-4">
            {fields("dob")}
          </th>
          <th className="border border-slate-300 dark:border-slate-900 px-2 py-4">
            {fields("dod")}
          </th>
          <th className="border border-slate-300 dark:border-slate-900 px-2 py-4">
            {general("action")}
          </th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
