//Soal No 2
const countryUrl = 'https://restcountries.eu/rest/v2/all';
let countries;
const regionMenu = document.getElementById('regionMenu');
const searchInput = document.getElementById('searchInput');
const card = document.querySelectorAll('.card');
const result = document.getElementById('result')


fetch('https://restcountries.eu/rest/v2/all')
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        countries = json;
        console.log(countries)
        sessionStorage.setItem('allCountriesData', encodeURIComponent(JSON.stringify(countries)))
        updatedWeb(countries);
    })
    .catch(function(error) {
        console.log(error)
    })

function updatedWeb(countryList) {
    let output = '';
    for (let i = 0; i < countryList.length; i++) {
        output += `
        <div class="card" data-country="${ encodeURIComponent(JSON.stringify(countryList[i])) }">
            <img src=${countryList[i].flag} width="160px" height="80px">
            <ul>
                <li class="countryName"> ${countryList[i].name} </li>
            </ul>
        </div>
        `;
    }
    document.getElementById('result').innerHTML = output;

    document.querySelectorAll('.card').forEach((card) => {
        card.addEventListener('click', (event) => {
            sessionStorage.setItem('country', event.currentTarget.dataset.country);
            window.location = 'country.html'
        })
    });
}

function filterCountries() {
    let filteredList = [];
    for (let i = 0; i < countries.length; i++) {
        if (regionMenu.value === countries[i].region || regionMenu.value === 'all') {
            filteredList.push(countries[i]);
            console.log(countries[i]);
        }
    }
    updatedWeb(filteredList);
}
regionMenu.addEventListener('change', filterCountries);

function searchCountry() {
    let searchResultCountryList = countries.filter(country => {
        const regex = new RegExp(`${searchInput.value}`, 'gi');
        return country.name.match(regex);
    })
    updatedWeb(searchResultCountryList);
}
searchInput.addEventListener('input', searchCountry)



// Soal No 1

function requestUserRepos(username){
    

  const xhr = new XMLHttpRequest();

  const url = `https://api.github.com/users/Shella2702`;
  

  xhr.open('GET', url, true);
  

  xhr.onload = function() {
 
      const data = JSON.parse(this.response);
   
      console.log(data);
      
 
      for (let i in data) {
     
          console.log('Repo:', data[i].name);
          
          // Log the repo description
          console.log('Description:', data[i].description);
          
          // Log the repo url
          console.log('URL:', data[i].html_url);
          
          // Add a separator between each repo
          console.log('=========================')
      
      }

  }
  
  xhr.send();
  
}

requestUserRepos('facebook');
