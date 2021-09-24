import React, { useState, useEffect } from "react";
import "./mapframe.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,Button,TextField , Dialog, DialogTitle , DialogContentText,DialogActions , DialogContent
} from "@material-ui/core";

import InfoBox from "./InfoBox";
import Table from "./Table";
import { sortData } from "./util";
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <Button variant="outlined" onClick={handleClickOpen}>
        Update Your Profile
      </Button>
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
          {/* profile */}
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your details to create or Update your profile !
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
             <TextField
            autoFocus
            margin="dense"
            id="firstname"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
          />
           <TextField
            autoFocus
            margin="Last"
            id="firstname"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="Last"
            id="lat"
            label="Latitude"
            type="text"
            variant="standard"
          />
            <TextField
            autoFocus
            margin="Last"
            id="long"
            label="Longitude"
            type="text"
            variant="standard"
          />
            <TextField
            autoFocus
            margin="Last"
            id="code"
            label="Country Code"
            type="text"
            variant="standard"
          />
            <TextField
            autoFocus
            margin="Last"
            id="country"
            label="Country"
            type="text"
            variant="standard"
          />
           <TextField
            autoFocus
            margin="Last"
            id="team"
            label="Team"
            type="text"
            variant="standard"
          />
           <TextField
            autoFocus
            margin="Last"
            id="company"
            label="company"
            type="text"
            variant="standard"
          />
             <TextField
            autoFocus
            margin="Last"
            id="food"
            label="What are your Food Preferences ?"
            type="text"
            fullWidth
            variant="standard"
          />
              <TextField
            autoFocus
            margin="Last"
            id="language"
            label="What languages you can speak?"
            type="text"
            fullWidth
            variant="standard"
          />
           <TextField
            autoFocus
            margin="Last"
            id="interest"
            label="Any hobbies or interest ?"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Update Profile</Button>
        </DialogActions>
      </Dialog>

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
