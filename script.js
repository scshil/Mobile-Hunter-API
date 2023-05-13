// load data
const loadData = async (searchText, limit) => {
  // console.log(limit, searchText);
  const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(URL);
  const data = await res.json();
  showData(data.data, limit);
};

// process data
const showData = (phones, limit) => {
  // console.log(limit);
  const noResult = document.getElementById("no-result");
  const showAllPhone = document.getElementById("show-All-Phone");

  if (limit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAllPhone.classList.remove("d-none");
    // console.log(phones[0]);
  } else {
    showAllPhone.classList.add("d-none");
  }
  //
  //
  if (phones.length === 0) {
    noResult.classList.remove("d-none");
  } else {
    noResult.classList.add("d-none");
  }
  // accessing Phones & show them
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img  src="${phone.image}" class="img-fluid rounded-start p-2" alt="${phone.phone_name}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text"> Brand:${phone.brand}</p>
          <div class="d-grid gap-2">
          <button onclick="getSinglePhone('${phone.slug}')" type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
          </div>
        </div>
        
      </div>
    </div>
  </div>
    `;
    phoneContainer.appendChild(div);
  });
  // stop spinner
  loadingSpinner(false);
};
// loading-spinner
const loadingSpinner = (Isloading) => {
  const spinner = document.getElementById("loading-spinner");
  if (Isloading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};
// searchProcess
const searchProcess = (limit) => {
  loadingSpinner(true);
  const searchField = document.getElementById("search-Phone");
  let phone = searchField.value;
  // console.log(phone, limit);
  loadData(phone ? phone : "iphone", limit);
  // searchField.value = "";
};
// search Phone
const searchPhone = () => {
  // start spinner
  // loadingSpinner(true);
  // const searchField = document.getElementById("search-Phone");
  // let phone = searchField.value;
  // loadData(phone);
  // searchField.value = "";
  searchProcess(10);
};
// search using ENTER Button
document
  .getElementById("search-Phone")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchProcess(10);
    }
  });

// phone details
const getSinglePhone = async (id) => {
  const URL = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(URL);
  const data = await res.json();
  ShowPhoneDetails(data.data);
};
const ShowPhoneDetails = (phone) => {
  // console.log(phone);
  const modalTital = document.getElementById("exampleModalLabel");
  const details = document.getElementById("modalDetails");
  modalTital.innerText = `${phone.name}`;
  let sensors = phone.mainFeatures.sensors;
  // console.log(sensors);
  let sensorContainer = sensors[0];
  sensors = sensors.slice(1, sensors.length);
  sensors.forEach((sensor) => {
    sensorContainer = sensorContainer + "," + sensor;
    // details.innerText = `${sensor}`;
  });
  // console.log(sensorContainer);
  details.innerText = `Display: ${phone.mainFeatures.displaySize}
  Chip: ${phone.mainFeatures.chipSet}
  Storage: ${phone.mainFeatures.memory}
  Sensors: ${sensorContainer}
  Released Date: ${phone.releaseDate ? phone.releaseDate : "Soon"}`;
};
// show all data using Button
const showAllPhones = () => {
  searchProcess();
};
loadData("iphone", 10);
