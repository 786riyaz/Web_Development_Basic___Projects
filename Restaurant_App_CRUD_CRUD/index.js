let priceMapping = {
  "Chicken Biryani": 200,
  Pulav: 150,
  "Butter Milk": 50,
  "Daal Rice": 100,
  Chapati: 20,
};

let table = document.getElementById("tableDD");
let item = document.getElementById("itemDD");
let price = document.getElementById("price");
let table1 = document.getElementById("table1");
let table2 = document.getElementById("table2");
let table3 = document.getElementById("table3");
const BASE_URL = "https://crudcrud.com/api/4f2d085beb8444f1a6d6ab1a85ab44eb/restaurant";

function handleFormSubmit(event) {
  event.preventDefault();
  console.log("Button Clicked");
  console.log("Order Details ::", table.value, item.value, price.value);
  addRecord(table.value, item.value, price.value);
}

item.addEventListener("change", (event) => {
  console.log(item.value);
  price.value = priceMapping[item.value];
});

window.addEventListener("DOMContentLoaded", () => {
  price.value = priceMapping[item.value];
  displayUpdatedData();
});

function addRecord(table, item, price) {
  axios
    .post(BASE_URL, { table, item, price })
    .then((res) => {
      console.log("Success:", res.data);
      displayUpdatedData();
    })
    .catch((err) => {
      console.log(err);
    });
}

function displayUpdatedData() {
  table1.innerHTML = "";
  table2.innerHTML = "";
  table3.innerHTML = "";
  axios
    .get(BASE_URL)
    .then((res) => {
      let data = res.data;
      console.log("Fetched Added ::", data);
      console.log(data.length);
      if (data.length) {
        for (let record of data) {
          let element = document.createElement("li");
          element.innerText = record.item + " :: " + record.price;
          element.id = record._id;
          let button = document.createElement("button");
          button.innerText = "Delete";
          button.id = `delete-${record._id}`;
          button.onclick = deleteRecord;
          element.appendChild(button);
          if (record.table == "Table 1") {
            table1.appendChild(element);
          }
          if (record.table == "Table 2") {
            table2.appendChild(element);
          }
          if (record.table == "Table 3") {
            table3.appendChild(element);
          }
        }
      }
    })
    .catch((err) => console.error(err));
}
function deleteRecord(event) {
  console.log("Delete Button Clicked");
  let buttonID = event.target.id;
  let id = buttonID.split("-")[1];
  axios
    .delete(BASE_URL + "/" + id)
    .then((res) => {
      console.log("Delete Response ::", res);
      displayUpdatedData();
    })
    .catch((err) => console.err(err));
}
