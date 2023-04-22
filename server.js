const express = require("express");

const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/express-demo", {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
});
/**
 * 定义表model
 */
const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    title: String,
  })
);

/**
 * 测试往数据库插入数据
 */
// Product.insertMany([
//   { title: "product1" },
//   { title: "product2" },
//   { title: "product3" },
// ]);

// app.get("/", (req, res) => {
//   res.send({
//     page: "home",
//   });
// });

/**
 * 使用 cors 包解决跨域问题
 */
app.use(require("cors")());

/**
 * app.use() 处理静态文件的托管
 */
app.use("/", express.static("public"));

app.get("/about", (req, res) => {
  res.send({
    page: "About Us",
  });
});

/**
 * 产品接口
 */
app.get("/products", async (req, res) => {
  // const data = await Product.find().skip(1).limit(2);
  // const data = await Product.find().where({
  //   title: "product1",
  // });
  const data = await Product.find().sort({
    _id: -1,
  });
  res.send(data);
});

/**
 * 产品详情接口
 */
app.get("/products/:id", async (req, res) => {
  const data = await Product.findById(req.params.id);
  res.send(data);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
