//import { default as fetch } from "node-fetch";
// import axios from "axios";

import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Country } from "./entity/Country";
const axios = require("axios");
var countryData: Country[] = [];
AppDataSource.initialize();

export async function getCountries() {
  const { data } = await axios.get("https://restcountries.com/v3.1/all");
  const countryRepository = data.forEach(async (country) => {
    if (
      country.cca3 === "AUS" ||
      country.cca3 === "CHN" ||
      country.cca3 === "USA" ||
      country.cca3 === "BRA" ||
      country.cca3 === "GBR"
    ) {
      var countryNew = new Country();
      countryNew.name = country.name.common;
      countryNew.capital = country.capital[0];
      countryNew.callingCode = country.idd;
      countryNew.population = country.population;
      countryNew.currency = country.currencies;
      countryData.push(countryNew);
      // await AppDataSource.manager.save(countryNew);
    }
  });
}

export async function getRates() {
  const { data } = await axios.get("https://api.apilayer.com/fixer/latest?", {
    headers: { apikey: "cqMNFLecUQ51HaY5hNzJqhhoAWE2WC6E" },
  });
}

getCountries();
getRates();
