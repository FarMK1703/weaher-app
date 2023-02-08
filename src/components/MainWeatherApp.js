import React, { Component } from "react";

import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

export default class MainWeatherApp extends Component {
  constructor(props) {
    super(props);

    this.apiURl = "http://api.weatherapi.com/v1/";
    this.apiKey = "3fa743c3e9b04625974143520230702";

    this.state = {
      userInput: "",
      apiCurrentData: "",
      networkError: false,
    };
  }

  btnClicked = (userInput) => {
    this.setState({
      userInput: userInput,
    });



    if (this.state.userInput !== "") {
      axios
        .get(
          `${this.apiURl}current.json?key=${this.apiKey}&q=${this.state.userInput}&aqi=no`
        )
        .then((response) => {
          this.setState({
            networkError:false
          })
          this.setState({
            apiCurrentData: response.data.current
          });
         
        })
        .catch(error=>{
            console.log(error)
            this.setState({
                networkError:true
            })
        })
    }


    else{
        alert('Ничего не введено')
    }



  };




handleChange=(e)=>{
this.setState({
    userInput:e.target.value
})
}

  render() {
    return (
      <>
        <WeatherInfo
          networkError={this.state.networkError}
          btnClicked={this.btnClicked}
          ApiData={this.state.apiCurrentData}
          userInput={this.userInput}
        />
        <FormControl  margin="dense" >
          <TextField
            fullWidth={true}
            variant={"outlined"}
            label={"Название города"}
            onChange={this.handleChange}
            
          />
          <Button onClick={this.btnClicked} variant={"contained"}>Узнать</Button>
        </FormControl>
      </>
    );
  }
}
