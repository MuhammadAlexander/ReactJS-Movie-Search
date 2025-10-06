import { useEffect, useRef, useState } from "react";
import Button from "./ui/button";
import Input from "./ui/input";
import { Fetch } from "../services/apis/fetch";
import Cardlist from "./cardlist";
import type { MovieData } from "../services/type";
import Pagination from "./ui/pagination";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const isMounted = useRef(true);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    setInputValue(e.target.value);
  }

  const fetchMovieData = async () => {
    if (!inputValue) return;
    const result = await Fetch(
      `http://www.omdbapi.com/?apikey=85dbd32e&s=${inputValue}&page=${page}`
    );
    setData(result);
    setLoading(false);
  };

  async function handleKey(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      fetchMovieData();
    }
  }

  const pageHandler = (data: number) => {
    setPage(data);
  };

  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      return;
    }
    fetchMovieData();
  }, [page]);

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            placeholder="Search Movie"
            className="text-white border p-5 border-white rounded-xl"
            onChange={handleChange}
            onKeyDown={handleKey}
          />
          <Button onClick={fetchMovieData}>Search</Button>
        </div>
        {!loading && data && (
          <Pagination MovieData={data} Page={pageHandler}></Pagination>
        )}
      </div>
      <div className="mt-6">{!loading && <Cardlist data={data} />}</div>
    </>
  );
};
export default Header;
