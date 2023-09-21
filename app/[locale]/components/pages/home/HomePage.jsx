import ReactMarkdown from "react-markdown";

const HomePage = ({ data }) => {
  return (
    <article className="prose dark:prose-invert">
      <h2>{data?.page?.title}</h2>
      <ReactMarkdown>{data?.page?.text}</ReactMarkdown>
    </article>
  );
};

export default HomePage;
