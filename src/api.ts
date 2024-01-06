export type Tag = {
  id: number;
  name: string;
  type: string;
};

export type Place = {
  id: number;
  tags: Tag[];
  name: string;
  body: string;
  img_url: string;
};

/**
 * Fetches places and tags and merges them together.
 */
export async function fetchPlaces() {
  const [tags, places] = await Promise.all([
    fetch(
      "https://gist.githubusercontent.com/knot-freshket/fa49e0a5c6100d50db781f28486324d2/raw/55bc966f54423dc73384b860a305e1b67e0bfd7d/freshket-tags.json"
    ),
    fetch(
      "https://gist.githubusercontent.com/knot-freshket/142c21c3e8e54ef36e33f5dc6cf54077/raw/94ebab16839484f06d42eb799e30d0a945ff1a1b/freshket-places.json"
    ),
  ]).then(([tags, places]) =>
    Promise.all([
      tags.json() as Promise<Tag[]>,
      places.json() as Promise<(Omit<Place, "tags"> & { tags: number[] })[]>,
    ])
  );

  return places.map<Place>((place) => ({
    ...place,
    tags: place.tags
      .map((tag) => tags.find(({ id }) => id === tag))
      .filter((tag): tag is Tag => !!tag),
  }));
}
