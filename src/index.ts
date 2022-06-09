//import { default as fetch } from "node-fetch";
// import axios from "axios";

import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Country } from "./entity/Country";
import { average } from "./entity/rates-average";
const axios = require("axios");
var countryData: Country[] = [];
AppDataSource.initialize();
var ratesDates = [];
var avg: average = {};
var avgList: average[] = [];

export async function getCountries() {
  const { data } = await axios.get("https://restcountries.com/v3.1/all");
  data.forEach(async (country) => {
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
  const { data } = await axios.get(
    "https://api.apilayer.com/fixer/timeseries?start_date=2022-05-08&end_date=2022-06-08&symbols=BRL%2C%20USD%2C%20GBP%2C%20AUD%2C%20CNY",
    {
      headers: { apikey: "5D152LR4teyyVwgnicyK3XUz7Owf08BK" },
    }
  );
  const { rates } = data;
  var i = 0;
  ratesDates = Object.values(rates);
  avg.BRL = 0;
  avg.USD = 0;
  avg.GBP = 0;
  avg.AUD = 0;
  avg.CNY = 0;
  ratesDates.forEach((element) => {
    i++;
    avg.BRL += element.BRL;
    avg.USD += element.USD;
    avg.GBP += element.GBP;
    avg.AUD += element.AUD;
    avg.CNY += element.CNY;
  });
  avg.BRL = avg.BRL / 30;
  avg.USD = avg.USD / 30;
  avg.GBP = avg.GBP / 30;
  avg.AUD = avg.AUD / 30;
  avg.CNY = avg.CNY / 30;
  console.log(avg);
}

//getCountries();
getRates();
