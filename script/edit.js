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
const formEL = document.getElementById("container-form");
const submitBtn = document.getElementById("submit-btn");
const tbodyEL = document.getElementById("tbody");
let indexOfItem;
rederTableData(petArr);
addEditEvent();
// function //////////////
//////////////////////////

// validate data
function validateData(data) {
  // biến cờ hiệu để nhận kết quả sau khi validate
  let isValidate = true;
  // validate name( không được để trống)
  if (data.name.trim() === "") {
    alert("Name can not be empty!");
    isValidate = false;
  }
  // validate age(không được để trống và phải từ 1 đến 15)
  if (isNaN(data.age)) {
    alert("Age can not be empty!");
    isValidate = false;
  } else if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15");
    isValidate = false;
  }
  // validate length (không được để trống và phải từ 1-100)
  if (isNaN(data.length)) {
    alert("Lenght can not be empty!");
    isValidate = false;
  } else if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100");
    isValidate = false;
  }
  // validate weight (không được để trống và từ 1 đến 15)
  if (isNaN(data.weight)) {
    alert("Weight can not be empty!");
    isValidate = false;
  } else if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15");
    isValidate = false;
  }
  // validate type (bắt buộc phải chọn type)
  if (data.type === "Select Type") {
    alert("Please select type");
    isValidate = false;
  }
  // validate breed (bắt buộc phải chọn breed)
  if (data.breed === "Select Breed") {
    isValidate = false;
    alert("Please select Breed");
  }
  return isValidate;
}
// rederTableData(petArr); function
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
    <td>1</td>
    <td><button type="button" class="btn btn-warning" id ="${
      petItem.id
    }">Edit</button>
    </td>`;
    // đưa dữ liệu lên trang sau khi tạo dữ liệu
    tbodyEL.appendChild(row);
  });
}
// renderBreed function depend on type (condition)
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  // nếu là dog
  if (typeInput.value === "Dog") {
    const dogBreed = breedArr.filter((breedItem) => breedItem.type === "Dog");
    dogBreed.forEach(showOption);

    // nếu là cat
  } else if (typeInput.value === "Cat") {
    const catBreed = breedArr.filter((breedItem) => breedItem.type === "Cat");
    catBreed.forEach(showOption);
  }
  function showOption(item) {
    const option = document.createElement("option");
    option.innerHTML = `${item.breed}`;
    breedInput.appendChild(option);
  }
}
// initial interface (clear value of input after submit succeed)
function startEditPet(petItem) {
  idInput.value = petItem.id;
  nameInput.value = petItem.name;
  ageInput.value = petItem.age;
  typeInput.value = petItem.type;
  weightInput.value = petItem.weight;
  lengthInput.value = petItem.length;
  colorInput.value = petItem.color;
  vaccinatedInput.checked = petItem.vaccinated;
  dewormedInput.checked = petItem.dewormed;
  sterilizedInput.checked = petItem.sterilized;
  renderBreed();
  breedInput.value = petItem.breed;
}

// event ////////////////////////
/////////////////////////////////

// submit click btn event
submitBtn.addEventListener("click", (e) => {
  // chuẩn hóa dữ hiệu
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    type: typeInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  // validete dữ liệu
  const validate = validateData(data);
  // đưa dữ liệu vào petArr khi hợp lệ => hiển thị, update  dữ liệu => xóa value of input
  if (validate) {
    // nếu đúng
    petArr[indexOfItem] = data;
    console.log(petArr);
    saveToStorage("petArr", petArr);
    rederTableData(petArr);
    formEL.classList.add("hide");
    addEditEvent();
  }
});
// type onchange event
typeInput.addEventListener("change", renderBreed);
// edit event
function addEditEvent() {
  document.querySelectorAll(".btn-warning").forEach((e) =>
    e.addEventListener("click", function (e) {
      // determinde data need to edit
      const targetItem = petArr.find((item) => item.id === e.target.id);
      // find index of data (using for swap data after submit)
      indexOfItem = petArr.findIndex((item) => item === targetItem);
      formEL.classList.remove("hide");
      startEditPet(targetItem);
    })
  );
}
/* kinh nghiệm rút ra: không nên gán sự kiện theo cách này cho những đối tượng động (btnEdit) thay đổi liên tục
  , vì phải gán lại tất cả sự kiện mỗi khi render lại data nên xử lý chậm  hơn, chỉ nên sử dụng cho đối tượng tĩnh,
  đối tượng động nên gán sự kiện trực tiếp khi tạo element như trang home 
*/
