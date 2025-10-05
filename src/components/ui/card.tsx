import { useNavigate } from "react-router";
import type { Movie } from "../../services/type";
import Button from "./button";
import Image from "./image";

type Props = {
  data: Movie;
};

const Card = ({ data }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-xs h-80 rounded-sm overflow-hidden border"
      key={data.imdbID}
    >
      <Image src={data.Poster} className="object-cover h-1/2 w-full" />
      <div className="p-2 flex flex-col items-start gap-2 h-1/2 justify-between">
        <p className="font-semibold">{data.Title}</p>
        <p className="text-sm text-gray-400">{data.Year}</p>
        <div className="flex justify-between w-full">
          <p>Type: {data.Type}</p>
          <Button
            className="w-1/4"
            onClick={() => {
              navigate(`/movie/${data.imdbID}`);
            }}
          >
            Detail
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
