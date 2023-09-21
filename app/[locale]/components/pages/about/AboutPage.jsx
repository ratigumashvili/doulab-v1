import ReactMarkdown from "react-markdown";

const AboutPage = ({ data }) => {
  return (
    <article className="prose dark:prose-invert">
      <h2>{data?.page?.title}</h2>
      {data && <ReactMarkdown>{data?.page?.text}</ReactMarkdown>}
    </article>
  );
};

export default AboutPage;
