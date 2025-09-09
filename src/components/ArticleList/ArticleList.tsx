interface Article {
  objectID: string;
  title: string;
  url: string;
}

interface ArticlesListProps {
  items: Article[];
}
export default function ArticleList({ items }: ArticlesListProps) {
  return (
    <>
      <ul>
        {items.map(({ objectID, url, title }) => (
          <li key={objectID}>
            <a href={url} target="_blank">
              {title}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
