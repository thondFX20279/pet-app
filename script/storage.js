"use strict";

const navEL = document.getElementById("sidebar");
navEL.addEventListener("click", function (e) {
  this.classList.toggle("active");
});
navEL.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});
const data1 = {
  id: "P001",
  name: "tom",
  age: 3,
  weight: 5,
  length: 50,
  type: "Cat",
  color: "#000000",
  breed: "Tabby",
  vaccinated: false,
  dewormed: true,
  sterilized: false,
};
const data2 = {
  id: "P002",
  name: "bundy",
  age: 5,
  weight: 3,
  length: 40,
  type: "Dog",
  color: "#ff0000",
  breed: "Husky",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
};
const breed1 = {
  breed: "Husky",
  type: "Dog",
};
const breed2 = {
  breed: "Mixed Breed",
  type: "Dog",
};
const breed3 = {
  breed: "Tabby",
  type: "Cat",
};
const breed4 = {
  breed: "Mixed Breed",
  type: "Cat",
};
// initial data
if (!getFromStorage("petArr")) {
  saveToStorage("petArr", [data1, data2]);
}
let petArr = getFromStorage("petArr");
if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr", [breed1, breed2, breed3, breed4]);
}
let breedArr = getFromStorage("breedArr");

// ham` lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
