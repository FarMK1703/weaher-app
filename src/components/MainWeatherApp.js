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
      apiData: "",
      networkError: false,
      isLoading: false,
    };
  }


 callApi=(value,setSessionstorage)=>{
  axios
  .get(
    `${this.apiURl}forecast.json?key=${this.apiKey}&q=${value}&days=7&aqi=no`
  )
  .then((response) => {
    this.setState({
      networkError: false,
    });
    this.setState({
      apiData: response.data.forecast.forecastday.map((item) => {
        return item.day;
      }),
    });
    if(setSessionstorage===true){
      sessionStorage.setItem(`userInput`, value);
    }

    this.setState({ isLoading: false });
  })
  .catch((error) => {
    console.log(error);
    this.setState({
      networkError: true,
    });
  });
 }




  btnClicked = (e) => {
    e.preventDefault();

    if (this.state.userInput !== "") {
      this.setState({ isLoading: true });
      this.setState({ networkError: false });
      this.setState((state) => ({
        city: state.userInput,
      }));

      this.callApi(this.state.userInput,true)
      
    } else {
      alert("Ничего не введено");
    }
  };

  

  handleChange = (e) => {
    this.setState({
      userInput: e.target.value,
    });
  };



  componentDidMount() {
    if (sessionStorage.getItem("userInput")) {
     this.callApi(sessionStorage.getItem('userInput'),false)
     this.setState({userInput:sessionStorage.getItem('userInput')})
    }
  }


  render() {
    let date = new Date();
    let lastDayDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let lastDay = lastDayDate.toLocaleString('RU', {day: 'numeric'});
    


    return (
      <>
        {this.state.networkError ? (
          <div className="GuidenceInfo">
            Возникла ошибка соединения. Возможно неверно указано название города
          </div>
        ) : this.state.isLoading ? (
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
        ) : this.state.apiData ? (
          this.state.apiData.map((item, index) => {
            return (
              <WeatherInfo
                lastDay={lastDay}
                day={date.getDate()+index}
                key={index}
                apiData={item}
                city={this.state.city}
              />
            );
          })
        ) : (
          <div className="GuidenceInfo">
            Введите название города и узнайте прогноз погоды на 3 дня
          </div>
        )}

        <form onSubmit={this.btnClicked} className="mainForm">
          <input value={this.state.userInput} onChange={this.handleChange} />
          <button type="submit">Узнать</button>
        </form>
      </>
    );
  }
}
