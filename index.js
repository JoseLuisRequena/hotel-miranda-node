const fs = require('fs');
const dataCountries = fs.readFileSync('./dataCountries.txt', 
    {
        encoding: "utf8",
        flag: "r",
    })
    .split('\n')

let header = [dataCountries.shift()];

const arrayDataCountries = dataCountries
  .map( country => country.split(" "))
  .map( country => {
        const name = country.splice(0, country.length - 2).join().replace(/,/g, " ");
        const population = parseInt(country[country.length - 2].replace(/,/g, ""));
        const area = parseInt(country[country.length - 1].replace(/,/g, ""));
        const density = population / area;
        const dataCountry = {
            countryDensity: density,
            countryName: name,
            countryPopulation: population,
            countryArea: area,
        };

    return dataCountry;
});

const sortCountryByDensity = arrayDataCountries.sort((a, b) => b.countryDensity - a.countryDensity);

header.splice(0, 0, 'Density');

const countryDataToSave = 
    header.join().replace(/,/g, " ").replace(/ /g, " - ")+
    '\n' +
    '\n' +
    sortCountryByDensity
        .map( country => Object.values(country)
        .join(' - ') + ';' + '\n')
        .join('\n');

fs.writeFileSync('countries.csv', countryDataToSave);