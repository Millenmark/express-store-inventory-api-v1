/** IMPORT: MODEL */
import Product from "../models/Product.js";

export const showAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  if (featured) queryObject.featured = featured === "true" ? true : false;
  if (company) queryObject.company = company;
  if (name) queryObject.name = { $regex: name, $options: "i" };
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    const options = ["price", "rating"];

    const filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    filters.split(",").forEach((item) => {
      const [field, ...rest] = item.split("-");
      // console.log(rest); // [ '$gte', '40', '$lte', '45' ]

      if (options.includes(field)) {
        const obj = rest.reduce((acc, curr, index) => {
          if (index % 2 === 0) {
            acc[curr] = Number(rest[index + 1]);
          }
          return acc;
        }, {});

        queryObject[field] = obj;
      }
    });
  }

  let result = Product.find(queryObject).skip(skip).limit(limit);

  if (sort) result = result.sort(sort.split(",").join(" "));
  else result = result.sort("createdAt");
  if (fields) result.select(fields.split(",").join(" "));

  const products = await result;

  res.status(200).json({ products });
};
