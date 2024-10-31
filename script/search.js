"use strict";
// get element
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const findBtn = document.getElementById("find-btn");
const tbodyEL = document.getElementById("tbody");
// rederTableData(petArr);
rederTableData(petArr);
// function/////////////////////
function rederTableData(petArr) {
  tbodyEL.innerHTML = "";
  // duyệt qua từng phần tử của mảng
  petArr.forEach(function (petItem) {
    // mỗi phần tử tạo 1 hàng dữ liệu
    const row = document.createElement("tr");
    // đưa dữ liệu vào hàng mới tạo
    row.innerHTML = `<th scope="row">${petItem.id}</th>
    <td>${petItem.name}</td>
    <td>${petItem.age}</td>
    <td>${petItem.type}</td>
    <td>${petItem.weight} kg</td>
    <td>${petItem.length} cm</td>
    <td>${petItem.breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petItem.color}"></i>
    </td>
    <td><i class="bi ${
      petItem.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petItem.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petItem.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>1</td>`;
    // đưa dữ liệu lên trang sau khi tạo dữ liệu
    tbodyEL.appendChild(row);
  });
}
renderBreed();
// event ////////////////////////////
findBtn.addEventListener("click", function () {
  // neu trong
  if (
    !idInput.value.trim() &&
    !nameInput.value.trim() &&
    typeInput.value === "Select Type" &&
    breedInput.value === "Select Breed" &&
    !vaccinatedInput.checked &&
    !dewormedInput.checked &&
    !sterilizedInput.checked
  ) {
    rederTableData(petArr);
    // có data: xóa các trường không có data
  } else {
    let findArr = petArr;
    console.log(findArr);
    findArr = findArr.filter(
      (item) =>
        item.id.includes(idInput.value) && item.name.includes(nameInput.value)
    );
    console.log(findArr);
    if (typeInput.value !== "Select Type") {
      findArr = findArr.filter((item) => item.type === typeInput.value);
    }
    if (breedInput.value !== "Select Breed") {
      findArr = findArr.filter((item) => item.breed === breedInput.value);
    }
    if (vaccinatedInput.checked) {
      findArr = findArr.filter(
        (item) => item.vaccinated === vaccinatedInput.checked
      );
    }
    if (dewormedInput.checked) {
      findArr = findArr.filter(
        (item) => item.dewormed === dewormedInput.checked
      );
    }
    if (sterilizedInput.checked) {
      findArr = findArr.filter(
        (item) => item.sterilized === sterilizedInput.checked
      );
    }
    rederTableData(findArr);
  }
});
function renderBreed() {
  breedArr.forEach(function (breeditem, index, breedarr) {
    const option = document.createElement("option");
    option.innerHTML = `${breeditem.breed}`;
    breedInput.appendChild(option);
  });
}
