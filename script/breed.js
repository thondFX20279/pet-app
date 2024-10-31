"use strict";
const breedInput = document.getElementById("input-breed");
const BreedTypeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const tbodyEL = document.getElementById("tbody");
renderBreedData(breedArr);
// submit breed click event
submitBtn.addEventListener("click", function (e) {
  // chuan hoa du lieu
  const newBreed = {
    breed: breedInput.value,
    type: BreedTypeInput.value,
  };
  // validatedata
  const validate = validateBreed(newBreed);
  // if true, push data to localstrored
  if (validate) {
    // getdata from localstorage
    breedArr.push(newBreed);
    saveToStorage("breedArr", breedArr);
    // renderdata
    renderBreedData(breedArr);
    // clear input
    clearBreedInput();
  }
});

// validate breed data
function validateBreed(newBreed) {
  let isValidate = true;
  // breed khong duoc de trong va` breed khong duoc trung
  if (!newBreed.breed.trim().length) {
    alert("Breed can not be empty");
    isValidate = false;
  } else {
    breedArr.forEach(function (breedItem) {
      if (
        newBreed.breed === breedItem.breed &&
        newBreed.type === breedItem.type
      ) {
        alert("Data already exist");
        isValidate = false;
      }
    });
  }
  // bat buoc phai chon type
  if (newBreed.type === "Select Type") {
    alert("Please Select Type");
    isValidate = false;
  }
  return isValidate;
}
// renderBreeddata
function renderBreedData() {
  tbodyEL.innerHTML = "";
  // duyet qua tung tung tu cua mang
  breedArr.forEach(function (obj, index) {
    // create a row
    const row = document.createElement("tr");
    // add data to row
    row.innerHTML = `<td>${index + 1}</ td>
    <td>${obj.breed}</td>
    <td>${obj.type}</td>
    <td>
      <button type="button" class ="btn btn-danger" onclick = "deleteBreed('${
        obj.breed
      }','${obj.type}')">
      Delete
      </button>
    </td>`;
    // put row in tBody
    tbody.appendChild(row);
  });
}
// clear breed input
function clearBreedInput() {
  breedInput.value = "";
  BreedTypeInput.value = "Select Type";
}
// delete breed
function deleteBreed(breed, type) {
  const isDeleteBreed = confirm("Are you sure");
  if (isDeleteBreed) {
    // determine breed need to deleted using filter and deleted breed
    breedArr = breedArr.filter(
      (obj, index, arr) => !(obj.breed === breed && obj.type === type)
    );
    // update breed to localstroage
    saveToStorage("breedArr", breedArr);
    // renderbreed agian
    renderBreedData(breedArr);
  }
}

// filter
