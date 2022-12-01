

const flexContainer = document.createElement('div');
document.body.appendChild(flexContainer);
flexContainer.setAttribute('id', 'flex-container');

const btn = document.getElementById('input-btn');
btn.addEventListener('click', getInput);

function getInput(event) {
    event.preventDefault();

    flexContainer.innerText = '';

    const inputField = document.getElementById('input-field');
    const langInput = inputField.value;

    fetchLang(langInput);
    inputField.value = '';
}

function fetchLang(langPara) {

    const url = `https://restcountries.com/v3.1/lang/${langPara}`;
    fetch(url).then(response => {

        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        else {
            throw 'Inget land hittades, kontrollera stavning och försök igen.';
        }
    })

        .then(data => {

            const populationsArr = [];

            data.forEach((country, index) => {

                const card = document.createElement('div');
                card.classList.add('country-cards');
                flexContainer.appendChild(card);

                const countryFlag = document.createElement('img');
                card.appendChild(countryFlag);
                countryFlag.src = country.flags.png;

                const countryName = document.createElement('h2');
                card.appendChild(countryName);
                countryName.innerText = country.name.common;

                const countrySubregion = document.createElement('h3');
                card.appendChild(countrySubregion);
                countrySubregion.innerText = country.subregion;

                const countryCapital = document.createElement('h3');
                card.appendChild(countryCapital);
                countryCapital.innerText = `Huvudstad: ${country.capital}`;

                const countryPopulation = document.createElement('h3');
                card.appendChild(countryPopulation);
                countryPopulation.innerText = `Population: ${country.population}`;


                populationsArr.push(country.population);

                console.log(`Land: ${country.name.common}, plats ${index + 1} index ${index}`);
                console.log(`Population: ${country.population}`);
                console.log('----------------------------------------------------------------');
            })


            console.log(populationsArr);
            const indexHighest = populationsArr.indexOf(Math.max(...populationsArr));
            console.log(indexHighest);

            document.querySelectorAll('.country-cards')[indexHighest].style.color = 'red';

        })

        .catch(error => {
            console.log(error);

            const errorMessage = document.createElement('h1');
            errorMessage.setAttribute('id', 'errorMessage')
            flexContainer.appendChild(errorMessage);
            errorMessage.innerText = error;
        })
}

