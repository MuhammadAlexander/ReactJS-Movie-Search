import { Link, useParams } from "react-router";
import Image from "./ui/image";
import { useEffect, useState } from "react";
import type { MovieDetail, Rating } from "../services/type";
import { Fetch } from "../services/apis/fetch";
import Header from "./header";
const CardDetail = () => {
  const [data, setData] = useState<MovieDetail | null>();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const fetchDetailMovie = async () => {
    const response = await Fetch(
      `http://www.omdbapi.com/?i=${params.id}&apikey=85dbd32e`
    );
    setData(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetailMovie();
  }, [data?.imdbID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link to={"/"}>
        <Header />
      </Link>
      <div className="flex gap-5">
        <Image src={data?.Poster} />
        <div className="flex justify-between flex-col text-left font-bold">
          <div>
            <p>Title: {data?.Title}</p>
            <p>Rated: {data?.Rated}</p>
          </div>
          <p>Released: {data?.Released}</p>
          <p>Duration: {data?.Runtime}</p>
          <p>Language: {data?.Language}</p>
          <p>Plot: {data?.Plot}</p>

          <div>
            <p>Ratings: </p>
            {data?.Ratings.map((e: Rating) => (
              <div key={data.imdbID}>
                <p>{e.Source}</p>
                <p>{e.Value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default CardDetail;
