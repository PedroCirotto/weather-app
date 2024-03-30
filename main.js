const apiKey = "113757df14b35460a023a72d51d5bc65";
const inputEl = document.querySelector(".busca");
const btnEl = document.querySelector(".btn");

async function getApi(local, apiKey) {
  let place;
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${local}&appid=${apiKey}`
    );
    const data = await res.json();
    place = data;
  } catch (error) {
    console.log(error);
  }
  return place;
}

function kelvinToCelcius(temp) {
  const celcius = temp - 273.15;
  return celcius.toFixed(0);
}

function atualizaTela(celcius, vento, humidade, clima, description) {
  const resultado = document.querySelector(".resultado");
  const ventoNumEl = document.querySelector(".vento-num");
  const humidadeEl = document.querySelector(".humidade-num");
  const descriptionEl = document.querySelector(".description");
  const celciusEl = document.querySelector(".cel");
  const imgEl = document.querySelector(".img");

  resultado.style.display = "flex";

  switch (clima) {
    case "Clouds":
      imgEl.src = "./imgs/cloud.png";
      break;
    case "Rain":
      imgEl.src = "./imgs/rain.png";
      break;
    case "Snow":
      imgEl.src = "./imgs/snow.png";
      break;
    case "Clear":
      imgEl.src = "./imgs/clear.png";
      break;
    case "Mist":
      imgEl.src = "./imgs/mist.png";
      break;
  }

  celciusEl.innerHTML = celcius;
  descriptionEl.innerHTML = description;
  ventoNumEl.innerHTML = `${vento}Km/h`;
  humidadeEl.innerHTML = `${humidade}%`;
}

btnEl.addEventListener("click", async () => {
  let lugar;
  try {
    const place = await getApi(inputEl.value.toLowerCase(), apiKey);
      lugar = place;
      console.log(lugar);
  } catch (error) {
    console.log(error);
  }

  const celcius = kelvinToCelcius(lugar.main.temp);
  const vento = lugar.wind.speed;
  const humidade = lugar.main.humidity;
  const clima = lugar.weather[0].main;
  const description = lugar.weather[0].description;

  atualizaTela(celcius, vento, humidade, clima, description);
});
