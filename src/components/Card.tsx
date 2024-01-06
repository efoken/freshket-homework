import type { Tag } from "../api.js";
import styles from "./Card.module.css";

type CardProps = {
  image: string;
  name: string;
  body: string;
  tags: Tag[];
};

export const Card: React.FC<CardProps> = ({ image, name, body, tags }) => (
  <div className={styles.root}>
    <img src={image} className={styles.image} alt={name} />
    <h2 className={styles.name}>{name}</h2>
    <p className={styles.body}>{body}</p>
    <div className={styles.tags}>
      {tags.map((tag) => (
        <span key={tag.id} data-type={tag.type.toLowerCase()}>
          {tag.name}
        </span>
      ))}
    </div>
  </div>
);
