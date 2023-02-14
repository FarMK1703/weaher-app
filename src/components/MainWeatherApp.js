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
      city: "",
      apiCurrentData: "",
      networkError: false,
      isLoading: false,
    };
  }

  btnClicked = (e) => {
    e.preventDefault();

    if (this.state.userInput !== "") {
      this.setState({ isLoading: true });
      this.setState((state) => ({
        city: state.userInput,
      }));
      axios
        .get(
          `${this.apiURl}forecast.json?key=${this.apiKey}&q=${this.state.userInput}&days=7&aqi=no`
        )
        .then((response) => {
          this.setState({
            networkError: false,
          });
          this.setState({
            apiCurrentData: response.data.forecast.forecastday.map((item) => {
              return item.day;
            }),
          });
          console.log(this.state.apiCurrentData);

          this.setState({ isLoading: false });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            networkError: true,
          });
        });
    } else {
      alert("Ничего не введено");
    }
  };

 componentDidMount(){

    
 }







  handleChange = (e) => {
    this.setState({
      userInput: e.target.value,
    });
  };

  render() {
   let date=new Date()
    return (
      <>
        {this.state.apiCurrentData? 
        
        this.state.networkError? <div className="">Возникла ошибка соединения</div>:
         <>
         {this.state.isLoading ? (
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          this.state.apiCurrentData.map((item, index) => {
            return (
              <WeatherInfo day={date.getDate()+index} key={index} apiData={item} city={this.state.city} />
            );
          })
        )}
         </>
        
        :
        <div className="PreLoadInfo">Введите название города и узнайте прогноз погоды на неделю</div>
        }

        <form onSubmit={this.btnClicked} className="mainForm">
          <input onChange={this.handleChange} />
          <button type="submit">Узнать</button>
        </form>
      </>
    );
  }
}
