import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import ArticleList from "../ArticleList/ArticleList";
import { fetchArticles } from "../../services/articleService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import css from "./paginator.module.css";

export default function App() {
  const [topic, setTopic] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const handleSearch = async (topic: string) => {
    setTopic(topic);
    setCurrentPage(0);
  };

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["articles", topic, currentPage],
    queryFn: () => fetchArticles(topic, currentPage),
    enabled: topic !== "",
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <SearchForm onSubmit={handleSearch} />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Whoops, something wrong...</p>}
      {error && <p>Whoops, something went wrong! Please try again!</p>}
      {data && <ArticleList items={data.hits} />}

      {isSuccess && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={() => setCurrentPage(currentPage + 1)}
          pageRangeDisplayed={5}
          pageCount={data?.nbPages ?? 0}
          previousLabel="< "
          renderOnZeroPageCount={null}
          forcePage={currentPage}
          containerClassName={css.pagination}
        />
      )}
    </>
  );
}
