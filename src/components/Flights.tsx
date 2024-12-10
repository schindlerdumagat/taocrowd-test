import { ChangeEvent, useEffect, useState } from "react";
import Flight from "./Flight";
import axios from "axios";
import { FlightPropsType } from "../types/flightType";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Flights() {
  const [flights, setFlights] = useState<FlightPropsType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [index, setIndex] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  const filteredFlights = flights.filter((flight) =>
    flight.mission_name.toLocaleLowerCase().includes(searchText)
  );

  async function fetchMoreFlights() {
    const response = await axios.get(`https://api.spacexdata.com/v3/launches?offset=${index}0&limit=12`);
    setFlights((prevItems) => [...prevItems, ...response.data]);

    response.data.length > 0 ? setHasMore(true) : setHasMore(false); 
    setIndex((prevIndex) => prevIndex + 1);
  }

  useEffect(() => {
    async function fetchFlights() {
      const response = await axios.get(
        "https://api.spacexdata.com/v3/launches?offset=10&limit=12"
      );
      setFlights(response.data);
    }
    fetchFlights();
  }, []);

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value.toLocaleLowerCase());
  }

  console.log(hasMore);
  console.log(index);

  return (
    <>
      <input
        onChange={handleSearchChange}
        type="text"
        placeholder="Search..."
      />
      <InfiniteScroll
        next={fetchMoreFlights}
        hasMore={hasMore}
        endMessage="No more Items"
        loader="Loading..."
        dataLength={filteredFlights.length}
        scrollableTarget="flights-container"
      >
        <ul id="flights-container" className="flights">
          {filteredFlights.map((flight, index) => {
            return (
              <Flight
                key={flight.flight_number + flight.mission_name + index}
                {...flight}
              />
            );
          })}
        </ul>
      </InfiniteScroll>
    </>
  );
}
