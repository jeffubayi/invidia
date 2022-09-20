import axios from "axios";
import { supabase } from "./supabaseClient";

export const fetcher: any = (url: string) =>
  axios.get(url).then((res) => res.data);

export interface StoryProps {
  label: string;
  id: number | string;
  content: string;
  created_at?: number;
}

export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

export interface ProjectProp {
  title?: string;
  id: number | string;
  description?: string;
  created_at?: number;
  assigned?: string;
  completed: boolean;
  statuses?: string;
}
export interface TaskProp {
  id?: number | string;
  task?: string;
  created_at?: number;
  isComplete?: boolean;
}

export const greeting = () => {
  const myDate = new Date();
  const hrs = myDate.getHours();

  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs <= 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs <= 24) greet = "Good Evening";
  return greet;
};

export const getToday = () => {
  var objToday = new Date(),
    weekday = new Array(
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ),
    dayOfWeek = weekday[objToday.getDay()],
    dayOfMonth =
      today + (objToday.getDate() < 10)
        ? "0" + objToday.getDate() + " "
        : objToday.getDate() + " ",
    months = new Array(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear(),
    curHour =
      objToday.getHours() > 12
        ? objToday.getHours() - 12
        : objToday.getHours() < 10
        ? "0" + objToday.getHours()
        : objToday.getHours(),
    curMinute =
      objToday.getMinutes() < 10
        ? "0" + objToday.getMinutes()
        : objToday.getMinutes(),
    curSeconds =
      objToday.getSeconds() < 10
        ? "0" + objToday.getSeconds()
        : objToday.getSeconds(),
    curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
  var today =
    curHour +
    ":" +
    curMinute +
    "." +
    curSeconds +
    curMeridiem +
    " " +
    dayOfWeek +
    " " +
    dayOfMonth +
    " of " +
    curMonth +
    ", " +
    curYear;
  return today;
};

// export async function getProfile() {
//   try {
//     const user = supabase.auth.user();

//     let { data, error, status } = await supabase
//       .from("profiles")
//       .select(`username,avatar_url`)
//       .eq("id", user?.id)
//       .single();

//     if (error && status !== 406) {
//       throw error;
//     }

//     if (data) {
//       if (typeof window !== "undefined") localStorage.setItem("user", data.username);

//       return data;
//     }
//   } catch (error) {
//     error instanceof Error && console.log(error);
//   }
// }
