const clients = document.getElementsByClassName("card__client-name");
const cardsContainer = document.querySelector(".comments__cards");
const textsCollection = document.getElementsByClassName("card__text");
const jobsEls = document.getElementsByClassName(" card__job");
const avatartarsEls = document.getElementsByClassName("card__avatar");
const buttonConst = document.getElementById("button");
const geoPosition = document.querySelector(".address-p");

const loadData = async () => {
  try {
    const userApi = "https://random-data-api.com/api/users/random_user?size=7";
    const sentenceApi =
      "https://random-data-api.com/api/lorem_ipsum/random_lorem_ipsum?size=7";

    const res = await Promise.all([fetch(userApi), fetch(sentenceApi)]);
    const data = await Promise.all(res.map((el) => el.json()));

    for (let i = 0; i < 7; i++) {
      clients[i].innerText = `${data[0][i].first_name} ${data[0][i].last_name}`;

      jobsEls[i].innerText = `${data[0][i].employment.title}`;
      textsCollection[i].innerText = data[1][i]["very_long_sentence"];
    }
  } catch (error) {
    console.log("ero", error);
  }
};

buttonConst.onclick = async () => {
  cardsContainer.classList.add("invisible");
  buttonConst.classList.remove("invisible");
  loadData();
};

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
