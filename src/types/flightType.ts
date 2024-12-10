export interface FlightPropsType {
    flight_number: number,
    mission_name: string,
    upcoming: boolean,
    details: string,
    launch_success: boolean,
    launch_date_utc: string
    links: {
        mission_patch_small: string,
        article_link: string,
        video_link: string
    }
}

export interface FlightStatusPropsType {
    upcoming: boolean,
    launch_success: boolean
}