export const showAllProducts = async (req, res) => {
  throw new Error("Testing Error");
  res.status(200).json({ message: "Testing this route..." });
};

export const showAllProductsStatic = async (req, res) => {
  res.status(200).json({ message: "try lang" });
};
