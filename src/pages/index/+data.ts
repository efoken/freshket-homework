import { fetchPlaces } from "../../api";

export async function data() {
  return {
    places: await fetchPlaces(),
  };
}
