// `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
// https://api.openweathermap.org/data/2.5/weather?q=tehran&appid=edc228562ac0a8aa3116d41c0687cf56&units=metric


const input = document.querySelector(".top-banner form input");
const form = document.querySelector(".top-banner form");
const list = document.querySelector(".ajax-section .cities");
const msg = document.querySelector(" .top-banner .msg")


let apiKey = "9f838acaadd1002965e655d0f93ca6dd";


form.addEventListener("submit", addCity);


function addCity(event) {
    event.preventDefault();
    let inputVal = input.value
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(Response => Response.json())
        .then(data => 
            {const {main, name, sys, weather} = data;
            let icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`

            const li = document.createElement("li");

            const liContain = `
                <h2 class="city-name">
                    <span>${name}</span>
                    <span>${sys.country}</span>
                </h2>
                <div class="city-temp">${Math.round(main.temp)} c</div>
                <div>
                    <img src=${icon} alt="clouds img" class="city-icon">
                    <div class="weather-discription">${weather[0]["description"]}</div>
                </div>
            `
            li.innerHTML = liContain;
            list.appendChild(li)
            msg.innerText = ""
        })
        .catch (() => {
            msg.innerText = "search for a valid city"
        })
    input.value = ""

}