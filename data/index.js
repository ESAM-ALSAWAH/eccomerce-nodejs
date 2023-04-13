const categoryModal = require("../models/category");
let categories = [];
const db = require("../config/db");

const seadData = async () => {
  for (let i = 0; i <= 10000; i++) {
    categories.push({ name: `category-[${i}]` });
  }
  console.log(categories[0]);
  await categoryModal.insertMany(categories).then(() => console.log("finish"));
};
db().then(() => seadData());

// console.log("e");
