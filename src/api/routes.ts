import { api } from "../lib/axios";

export interface PostTrip {
  destination: string;
  starts_at: Date;
  ends_at: Date;
  emails_to_invite: string[];
  owner_name: string;
  owner_email: string;
}

export interface PostTripResponse {
  tripId: string;
}

export interface Trip {
  /*
    "trip": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "destination": "…",
    "starts_at": "2024-07-11T10:12:24.263Z",
    "ends_at": "2024-07-11T10:12:24.263Z",
    "is_confirmed": true
  }
  */
  id: string;
  destination: string;
  starts_at: Date;
  ends_at: Date;
  is_confirmed: boolean;
}

export interface TripGuests {
  /*
  "participants": [
    {
      "id": "…",
      "name": "…",
      "email": "hello@example.com",
      "is_confirmed": true
    }
  ]
  */
  id: string;
  name: string;
  email: string;
  is_confirmed: boolean;
}

export interface Activity {
  /*
  "activity": {
    "id": "…",
    "title": "…",
    "occurs_at": "2024-07-11T10:12:24.263Z"
  }
  */
  id?: string;
  title: string;
  occurs_at: string;
}

export interface PostActivityResponse {
  activityId: string;
}

export interface GetActivitiesResponse {
  /*
  "activities": [
    {
      "date": "2024-07-11T10:00:27.093Z",
      "activities": [
        {
          "id": "123e4567-e89b-12d3-a456-426614174000",
          "title": "…",
          "occurs_at": "2024-07-11T10:00:27.094Z"
        }
      ]
    }
  ]*/
  date: string;
  activities: Activity[];
}

export function postTrip(data: PostTrip): Promise<PostTripResponse> {
  return api
    .post("/trips", data)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
}

export async function getTrip(tripId: string): Promise<Trip> {
  return await api
    .get(`/trips/${tripId}`)
    .then((res) => res.data.trip)
    .catch((err) => {
      console.error(err);
    });
}

export function getTripGuests(tripId: string): Promise<TripGuests[]> {
  return api
    .get(`/trips/${tripId}/participants`)
    .then((res) => res.data.participants)
    .catch((err) => {
      console.error(err);
    });
}

export async function getActivities(
  tripId: string
): Promise<GetActivitiesResponse[]> {
  return await api
    .get(`/trips/${tripId}/activities`)
    .then((res) => res.data.activities)
    .catch((err) => {
      console.error(err);
    });
}

export async function postActivity(
  tripId: string,
  data: Activity
): Promise<PostActivityResponse> {
  return await api
    .post(`/trips/${tripId}/activities`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
}
