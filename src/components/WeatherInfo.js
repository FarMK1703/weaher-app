import React from "react";
import celcius from "../static/celcius.png";
import wind from "../static/wind.svg";
import raindrop from "../static/raindrop.svg";

export default function WeatherInfo(props) {
  const data = props.apiData;
  let date = new Date();
  let day=props.day
  let lastDay=props.lastDay
  let month=date.getMonth()

  const monthes = [
    "Янв",
    "Фев",
    "Март",
    "Апр",
    "Май",
    "Июнь",
    "Июль",
    "Авг",
    "Сен",
    "Окт",
    "Нояб",
    "Дек",
  ];
  


  if(day>lastDay){
    day=1
    month=month+1
  }

 

  return (
    <>
      <div className="weatherCard">
        <div className="weatherCardImg">
          <img alt="#" src={data.condition.icon} />
        </div>
        <div className="weatherCardSubinfo">
          <div className="tempDate">
            <p>
              {data.avgtemp_c}
              <img src={celcius} />
            </p>
            <p>
               {day} {monthes[month]}
            </p>
          </div>
          <div className="windHum">
            <span>
              <img src={wind} />
              <p>{data.maxwind_kph} км/ч</p>
            </span>
            <span>
              <img src={raindrop} />
              <p>{data.avghumidity}%</p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
