import axios from "axios";
import type { Article } from "../types/article";

interface ArticlesHttpResponse {
  hits: Article[];
  nbPages: number;
}

export const fetchArticles = async (topic: string, currentPage: number) => {
  const reponse = await axios.get<ArticlesHttpResponse>(
    `https://hn.algolia.com/api/v1/search?query=${topic}`,
    { params: { page: currentPage } }
  );
  return reponse.data;
};
