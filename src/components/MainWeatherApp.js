import React, { Component } from "react";

import axios from "axios";
import WeatherInfo from "./WeatherInfo";


export default class MainWeatherApp extends Component {
  constructor(props) {
    super(props);

    this.apiURl = "http://api.weatherapi.com/v1/";
    this.apiKey = "3fa743c3e9b04625974143520230702";

    this.state = {
      userInput: "",
      city:'',
      apiCurrentData: "",
      networkError: false,
      isLoading: false,
    };
  }

  btnClicked = (e) => {
    e.preventDefault()
    



    if (this.state.userInput !== "") {
        this.setState({isLoading:true})
        this.setState(state=>({
            city:state.userInput
        }))
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
          })
          
          this.setState({isLoading:false})
          
         
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
          city={this.state.city}
          isLoading={this.state.isLoading}
        />
        
            <form onSubmit={this.btnClicked} className="mainForm">
                <input onChange={this.handleChange}/>
                <button type="submit">Узнать</button>
            </form>
        
      </>
    );
  }
}
