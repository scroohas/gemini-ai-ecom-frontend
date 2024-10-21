import { Rate } from "antd";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ product }) => {
  const navigate = useNavigate();

  const reviews = product.reviews;
  const reviewCount = reviews.length;

  const avgRating = (
    reviews.reduce((acc, review) => acc + +review.rating, 0) / reviewCount
  ).toFixed(1);

  return (
    <div
      className="border border-solid border-rose-400 p-4"
      onClick={() => navigate(`products/${product.asin}`)}
    >
      <p>{product.asin}</p>
      <p>{product.name}</p>

      <div className="flex items-center gap-2">
        <Rate allowHalf defaultValue={avgRating} disabled />
        <p>
          {avgRating}({reviewCount})
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
