const search = document.querySelector("#search");
const city = document.querySelector("#city");
const dates = document.querySelector("#date");
const temp = document.querySelector("#temp");
const cloud = document.querySelector("#cloud");
const hi_low = document.querySelector("#hi_low");

//url
const url = {
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
    appId: 'appid=411c56e1f8ecb3a3fb59e894b1fd5329'
}

//fetchApi
function fetchApi(url, q){
    let path = url + q;
    
    fetch(path).then(res => res.json()).then(data => resultData(data));
}

//resultData
function resultData(data){
    console.log(data);
    //city
    city.innerHTML = `${data.name}, ${data.sys.country}`;

    //date
    let d = new Date();
    let day = d.getDay();
    let date = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();

    let defaultMonth = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
    let defaultDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    dates.innerHTML = `${defaultDay[day]}, ${date}, ${defaultMonth[month]}, ${year}`

    //temp
    temp.innerHTML = data.main.temp.toFixed(0) + "⚬C";

    //cloud
    cloud.innerHTML = data.weather[0].main;

    //hi_low
    hi_low.innerHTML = data.main.temp_min.toFixed(0)+"'C/"+data.main.temp_max.toFixed(0)+"'C";
}

//weatherUrl
const weatherUrl = url.baseUrl + "weather?units=metric&" + url.appId;

//search
search.addEventListener("keypress", (e) => {
    if(e.keyCode === 13){
        let queryValue = e.target.value;
        
        if(queryValue){
            let query = "&q="+queryValue
            fetchApi(weatherUrl, query);
        }else{
            val = "Taungoo";
            let q = "&q="+val;
        
            fetchApi(weatherUrl,q);
        }  
    }
})  

// Window Load Default data

window.addEventListener('load',() => {
    let val = "Taungoo";
    let q = "&q="+val;

    fetchApi(weatherUrl,q);
})