import { useState } from "react";
import { FlightPropsType } from "../types/flightType";
import FlightStatus from "./FlightStatus";

export default function Flight({
  flight_number,
  mission_name,
  upcoming,
  details,
  launch_success,
  launch_date_utc,
  links,
}: FlightPropsType) {
  const [showDetails, setShowDetails] = useState(false);

  const yearOfLaunch =
    new Date().getFullYear() - new Date(launch_date_utc).getFullYear();

  function handleViewClick() {
    setShowDetails((prev) => !prev);
  }

  return (
    <li className="flight-card">
      <div className="title">
        <h1>{mission_name}</h1>
        <FlightStatus upcoming={upcoming} launch_success={launch_success} />
      </div>

      {showDetails && (
        <>
          <div className="links">
            <p>{yearOfLaunch ? `${yearOfLaunch} years ago` : "in a year"} </p>
            <div style={{ borderRight: "1px solid gray" }}></div>
            <a href={links.article_link} target="_blank">
              article
            </a>
            <div style={{ borderRight: "1px solid gray" }}></div>
            <a href={links.video_link} target="_blank">
              video
            </a>
          </div>
          <div className="description">
            <img src={links.mission_patch_small} alt="flight patch" />
            <p>{details}</p>
          </div>
        </>
      )}
      <button onClick={handleViewClick}>{showDetails ? "HIDE" : "VIEW"}</button>
    </li>
  );
}
