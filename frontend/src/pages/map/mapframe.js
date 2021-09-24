import React, { useState, useEffect } from "react";
import "./mapframe.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
// import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";

const MapFrame = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);


  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://5ecbd07d44637c0016d8d012.mockapi.io/hargun/geoclusion")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value:{ lat: country.lat, lng:  country.long }
          }));
          console.log(data);
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };
    getCountriesData();
  }, []);

  // console.log(casesType);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    console.log(e.target.value);
            setInputCountry(countryCode);
        setMapCenter(e.target.value);
        setMapZoom(4);
        console.log(mapCenter , mapZoom);
  };

  return (
    <div className="app" >
      <div className="app__left">
        <div className="app__header">
          <h1>GeoClusion</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
       
        <Map
          countries={mapCountries}
          casesType="recovered"
          center={mapCenter}
          zoom={mapZoom}
        />
         <br/>
         <h1>Organisation Tags</h1> 
         <br/>
             <div className="app__stats">
           

          <InfoBox
            onClick={(e) => setCasesType("food")}
            title="Food Preferences"
            isRed
            active={casesType === "food"}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Clothing Preferences"
            active={casesType === "recovered"}
          />
          <InfoBox
            onClick={(e) => setCasesType("temperature")}
            title="Temperature Preferences"
            isRed
            active={casesType === "temperature"}
          />
  
              <InfoBox
            onClick={(e) => setCasesType("Email")}
            title="Email"
            active={casesType === "Email"}
          />
               <InfoBox
            onClick={(e) => setCasesType("team")}
            title="Team"
            isRed
            active={casesType === "team"}
          />
              <InfoBox
            onClick={(e) => setCasesType("languages")}
            title="Languages"
            active={casesType === "languages"}
          />
        </div>
      </div>

      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Organisation Members by Country </h3>
            <Table countries={tableData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapFrame;
