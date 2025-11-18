const cors = require("cors");
const express = require("express");
const { sequelize } = require("./models");
const categoryRoutes = require("./routes/category.route");
const productRoutes = require("./routes/product.route");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// test db
sequelize
  .authenticate()
  .then(() => console.log("MySQL connected"))
  .catch((err) => console.error("MySQL connection error:", err.message));

sequelize.sync();

app.use("/category", categoryRoutes);
app.use("/product", productRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
