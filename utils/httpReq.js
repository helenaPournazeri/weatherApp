
const apiKey = "9f838acaadd1002965e655d0f93ca6dd";
const BASE_URL = "https://api.openweathermap.org/data/2.5"

const msg = document.querySelector(" .top-banner .msg");
const loader = document.getElementById("loader");

async function getWeatherData (type, data) {
    let url = null;

    switch (type) {
        case "current":
            if(typeof data === "string") {
                url = `${BASE_URL}/weather?q=${data}&appid=${apiKey}&units=metric`
            } else {
                url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${apiKey}&units=metric`
            }
            
            break;
        case "forecast":
                if (typeof data === "string") {
                    url = `${BASE_URL}/forecast?q=${data}&appid=${apiKey}&units=metric`
                } else {
                    url = `${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${apiKey}&units=metric`
                }
            break;
    
        default: 
                url = url = `${BASE_URL}/weather?q=tehran&appid=${apiKey}&units=metric`
            break;
    }

    try {
        const response = await fetch(url);
        const json = await response.json();
        if(+json.cod === 200) {
            return json;
        } else {
            loader.style.display = "none"
            msg.innerText = "city not found";
            return;
        }
    }catch (error) {
        console.log("error")
    }
    
}
export default getWeatherData;
