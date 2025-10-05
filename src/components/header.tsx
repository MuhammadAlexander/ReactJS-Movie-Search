import { useState } from "react";
import Button from "./ui/button";
import Input from "./ui/input";
import { Fetch } from "../services/apis/fetch";
import Cardlist from "./cardlist";
import type { MovieData } from "../services/type";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(true);

  function handleChange(e: any) {
    setInputValue(e.target.value);
  }

  const fetchMovieData = async () => {
    const result = await Fetch(
      `http://www.omdbapi.com/?apikey=85dbd32e&s=${inputValue}`
    );
    setData(result);
    setLoading(false);
  };

  async function handleKey(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      fetchMovieData();
    }
  }
  return (
    <>
      <div className="flex  gap-3">
        <Input
          value={inputValue}
          placeholder="Search Movie"
          className="text-white border p-5 border-white rounded-xl"
          onChange={handleChange}
          onKeyDown={handleKey}
        />
        <Button onClick={fetchMovieData}>Search</Button>
      </div>
      <div className="mt-6">{!loading && <Cardlist data={data} />}</div>
    </>
  );
};
export default Header;
