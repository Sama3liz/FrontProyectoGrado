import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();
  return (
    <div>
      Product <b>{id}</b>
    </div>
  );
}