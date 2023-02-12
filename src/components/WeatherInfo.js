import React from "react";
import Paper from "@mui/material/Paper";
import wind from "../static/wind.png";
import celcius from "../static/celcius.png";
import cold from "../static/cold.png";
import hot from "..//static/hot.png";

export default function WeatherInfo(props) {
  const data = props.ApiData;
  let is_hot = data.temp_c >= 15;
  let temp_value_style = {
    width: 30,
    height: 30,
  };

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
        {props.isLoading ? 
          
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
          
         : 
          
          <Paper className="infoCard" elevation={3}>
            {data ? 
              <div>
                <div className="City"></div>
                <div className="Preview">
                   
                  <div className="temp">
                  <p>{props.city}</p>
                    {is_hot ? (
                      <img alt="#" style={temp_value_style} src={hot} />
                    ) : (
                      <img alt="#" style={temp_value_style} src={cold} />
                    )}
                    <p>{data.temp_c} </p>

                    <img
                      alt="#"
                      style={{
                        height: 15,
                        width: 15,
                        marginBottom: 5,
                        marginRight: 5,
                      }}
                      src={celcius}
                    />
                    <img alt="#" src={data.condition.icon}></img>
                  </div>
                  <div className="temp">
                    <img alt="#" src={wind} />
                    <p>{data.wind_kph}kph</p>
                  </div>
                </div>
              </div>
             : null}
          </Paper>
          
        }
      </div>
    );
  }
}
