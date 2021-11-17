const clients = document.getElementsByClassName("card__client-name");
const cardsContainer = document.querySelector(".comments__cards");
const textsCollection = document.getElementsByClassName("card__text");
const jobsEls = document.getElementsByClassName(" card__job");
const avatartarsEls = document.getElementsByClassName("card__avatar");
const loadButton = document.getElementById("button");
const geoPosition = document.querySelector(".address-p");

const fillElems = (elems, dataFromApi, prop) => {
  for (let i = 0; i < 7; i++) {
    elems[i].innerText = dataFromApi[i][prop];
  }
};

loadButton.onclick = () => {
  cardsContainer.classList.toggle("notvisible");
  loadButton.classList.toggle("notvisible");
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

      //   avatartarsEls[i].src = `${data[0][i].avatartar}`;
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

const handleSuccess = async (pos) => {
  const { latitude, longitude } = pos.coords;

  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=xml&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&format=json`
  );
  const geoObject = await res.json();

  geoPosition.textContent = geoObject.display_name;
};

const handleError = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
