import React from "react";
import wind from "../static/wind.png";
import celcius from "../static/celcius.png";
import cold from "../static/cold.png";
import hot from "..//static/hot.png";

export default function WeatherInfo(props) {
  const data = props.ApiData;
  let date=new Date()
 

  if (props.networkError) {
    return (
      <div>
        Произошла ошибка. Возможно, такого города не существует. Попробуйте еще
        раз
      </div>
    );
  } else {
    return (
      <div className="weatherInfo">
        {props.isLoading ? (
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
          <div className="weatherCard">
            {data ? (
             <>
             <div className="weatherCardImg">
                <img alt="#" src={data.condition.icon}/>
              </div>
              <div className="weatherCardLabel">
                <h1>{data.temp_c}<img style={{width:25,height:25, marginLeft:3}} src={celcius}/></h1>
                <h2>{props.city}</h2>
                <p>{`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`}</p>
              </div>
              <div className="weatherCardSubinfo">
                <ul>
                  <li>Скорость ветра: <span>{data.wind_kph}км/ч</span> </li>
                  <li>Влажность: <span>{data.humidity}%</span></li>
                  <li>Облачность: <span>{data.cloud}%</span></li>
                </ul>
              </div>
             </>
              
            ) : (
              <div>Нет данных</div>
            )}
          </div>
        )}
      </div>
    );
  }
}
