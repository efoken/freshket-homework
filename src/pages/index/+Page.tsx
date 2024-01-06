import { CardDisplay } from "../../components/CardDisplay";
import { data } from "./+data";

type PageProps = {
  data: Awaited<ReturnType<typeof data>>;
};

export const Page: React.FC<PageProps> = ({ data }) => (
  <CardDisplay places={data.places} />
);
