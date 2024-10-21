import { useParams } from "react-router-dom";
import { useProduct, useProductAnalysis } from "../lib/state";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { COLORS } from "../lib/constant";
import { Rate } from "antd";
import PageLoading from "./PageLoading";

const Product = () => {
  const { id } = useParams();
  const { product, isLoading: isProductLoading } = useProduct(id);
  const { analysis: aiAnalysis, isLoading } = useProductAnalysis(id);

  const reviews = product?.reviews;
  const features = aiAnalysis?.keyFeatures;
  const issues = aiAnalysis?.commonIssues;
  const sentimentAnalysis = aiAnalysis?.sentimentAnalysis;

  const data = Object.keys(sentimentAnalysis || {}).map((key) => ({
    name: key,
    value: sentimentAnalysis[key],
  }));

  const colors = [
    COLORS.SENTIMENTS.POSITIVE,
    COLORS.SENTIMENTS.NEUTRAL,
    COLORS.SENTIMENTS.NEGATIVE,
  ];

  if (isProductLoading) {
    return <PageLoading />;
  }

  return (
    <section className="p-16">
      <p>{product?.asin}</p>
      <p>{product?.name}</p>

      <section className="flex">
        <div className="w-3/4 pt-4 pr-4 pb-4">
          <h4 className="mb-4">Reviews</h4>

          <div className="grid grid-cols-3 gap-4">
            {reviews?.map((review, idx) => (
              <div
                key={idx}
                className="border border-solid border-rose-400 p-4"
              >
                <p>{review.date}</p>

                <div className="flex items-center gap-2">
                  <Rate allowHalf defaultValue={+review.rating} disabled />
                  <span>({review.rating})</span>
                </div>

                <p>{review.review}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/4 p-4">
          <h4>{isLoading ? "Getting AI Analytics..." : "AI Analytics"}</h4>

          {aiAnalysis ? (
            <>
              <div className="h-64 w-64">
                <p>Sentiment Analysis</p>

                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={400} height={400}>
                    <Pie
                      dataKey="value"
                      isAnimationActive={false}
                      data={data}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4">
                <h5 className="text-rose-600">Issues Faced By Customers</h5>
                <ul>
                  {issues?.map((feature, idx) => (
                    <li key={idx}>
                      {idx + 1} {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h5 className="text-rose-600">Features Liked By Customers</h5>
                <ul>
                  {features?.map((feature, idx) => (
                    <li key={idx}>
                      {idx + 1} {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}
        </div>
      </section>
    </section>
  );
};

export default Product;
