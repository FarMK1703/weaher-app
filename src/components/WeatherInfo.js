import React from "react";
import Paper from "@mui/material/Paper";
import wind from "../static/wind.png";
import celcius from "../static/celcius.png";
import cold from '../static/cold.png'
import hot from '..//static/hot.png'


export default function WeatherInfo(props) {
  const data = props.ApiData;
  let is_hot=data.temp_c>=15;
  let temp_value_style={
    width:30,
    height:30
}

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
        <Paper className="infoCard" elevation={3}>
          {data ? (
            
         <div>
         <div className="City">{props.userInput}</div>
         <div className="Preview">
              <div className="temp">
                <p>{data.temp_c} </p>
               
                <img
                  style={{
                    height: 15,
                    width: 15,
                    marginBottom: 5,
                    marginLeft: 5,
                  }}
                  src={celcius}
                />
                <img alt="#" src={data.condition.icon}></img>
                {is_hot?<img style={temp_value_style} src={hot}/>:<img style={temp_value_style} src={cold}/>}
              </div>
              <div className="temp">
                <img src={wind} />
                <p>{data.wind_mph}mph</p>
              </div>
            </div>
         </div>
          ) : null}
        </Paper>
      </div>
    );
  }
}
