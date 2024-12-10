import { FlightStatusPropsType } from "../types/flightType";


export default function FlightStatus({ upcoming, launch_success }: FlightStatusPropsType) {
    
    const status = upcoming ? "upcoming" : launch_success ? "success" : "failed";
    const statusBackgroundColor = upcoming ? "cyan" : launch_success ? "yellowgreen" : "red";
    const statusColor = upcoming || launch_success ? "black" : "white";

    return <span style={{
        backgroundColor: statusBackgroundColor,
        color: statusColor
    }}>{status}</span>

}