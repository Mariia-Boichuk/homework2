const clients = document.getElementsByClassName("card__client-name");
const cardsContainer = document.querySelector(".comments-container__cards");
const textsCollection = document.getElementsByClassName("card__text");
const jobsEls = document.getElementsByClassName(" card__job");
const avatarsEls = document.getElementsByClassName(" card__ava");
const loadButton = document.querySelector(".comments-container > button");
const geoP = document.getElementById("adress-p");
let shyrota;
let dovgota;

const fillElems = (elems, dataFromApi, prop) => {
  for (let i = 0; i < 7; i++) {
    elems[i].innerText = dataFromApi[i][prop];
  }
};

loadButton.onclick = () => {
  cardsContainer.classList.toggle("invisible");
  loadButton.classList.toggle("invisible");
};
Promise.all([
  fetch("https://random-data-api.com/api/users/random_user?size=7"),
  fetch(
    "https://random-data-api.com/api/lorem_ipsum/random_lorem_ipsum?size=7"
  ),
])
  .then(function (responses) {
    return Promise.all(
      responses.map(function (response) {
        return response.json();
      })
    );
  })
  .then(function (data) {
    console.log(data[2]);
    for (let i = 0; i < 7; i++) {
      clients[i].innerText = `${data[0][i].first_name} ${data[0][i].last_name}`;

      jobsEls[i].innerText = `${data[0][i].employment.title}`;

      //  avatarsEls[i].src = `${data[0][i].avatar}`;
    }
    fillElems(textsCollection, data[1], "very_long_sentence");
  })
  .catch(function (error) {
    console.log(error);
  });

//===========geo================

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
navigator.geolocation.getCurrentPosition(success, error, options);

function success(pos) {
  var crd = pos.coords;
  shyrota = crd.latitude;
  dovgota = crd.longitude;
  console.log(shyrota, dovgota);
  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=xml&lat=${shyrota}&lon=${dovgota}&zoom=18&addressdetails=1&format=json`
  )
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((res) => {
      console.log(res);
      geoP.textContent = res.display_name;
    });
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
