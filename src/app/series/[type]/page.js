import SeriesList from "./seriesList";
import { notFound } from "next/navigation";

export default async function Page({ params }) {

  const { type } = await params; // in your setup params may be Promise

  const allowed = new Set(["popular", "top_rated", "airing_today", "on_the_air"]);
  if (!allowed.has(type)) notFound();

  return <SeriesList type={type} />;
}
