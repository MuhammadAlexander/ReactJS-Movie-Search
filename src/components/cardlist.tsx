import type { MovieData } from "../services/type";
import Card from "./ui/card";

type Props = {
  data?: MovieData | null;
};

const Cardlist = ({ data }: Props) => {
  if (!data || !data.Search || data.Search.length === 0) {
    return <div>No results</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.Search.map((movie) => (
        <Card key={movie.imdbID} data={movie} />
      ))}
    </div>
  );
};

export default Cardlist;
