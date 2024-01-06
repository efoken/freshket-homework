import type { Place } from "../api";
import { Card } from "./Card";
import styles from "./CardDisplay.module.css";

type CardDisplayProps = {
  places: Place[];
};

export const CardDisplay: React.FC<CardDisplayProps> = ({ places }) => (
  <div className={styles.root}>
    {places.map((place) => (
      <Card
        key={place.id}
        image={place.img_url}
        name={place.name}
        body={place.body}
        tags={place.tags}
      />
    ))}
  </div>
);
