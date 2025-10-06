import { useEffect, useState } from "react";
import type { MovieData } from "../../services/type";
import Button from "./button";

type props = {
  MovieData: MovieData;
  Page?: any;
};

const Pagination = (props: props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    parseInt(props.MovieData.totalResults ?? "0") / 10
  );
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const maxButtons = 5;

  let startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
  let endPage = startPage + maxButtons - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxButtons + 1, 1);
  }

  const visiblePages = pages.slice(startPage - 1, endPage);

  useEffect(() => {
    props.Page(currentPage);
  }, [currentPage]);

  if (props.MovieData.Response == "True") {
    return (
      <div className="flex items-center gap-3">
        <Button
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          &lt;
        </Button>
        <div className="flex gap-1">
          {visiblePages.map((pageNum) => (
            <div key={pageNum}>
              <Button
                className={`${
                  currentPage === pageNum
                    ? "bg-slate-500 text-white border"
                    : "bg-slate-500 text-cyan-300"
                }`}
                onClick={() => {
                  setCurrentPage(pageNum);
                }}
              >
                {pageNum}
              </Button>
            </div>
          ))}
        </div>
        <Button
          disabled={currentPage === pages.length}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          &gt;
        </Button>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default Pagination;
