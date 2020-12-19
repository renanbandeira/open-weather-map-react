import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DataRefreshButton from '../components/DataRefreshButton';

import { getWeatherData } from '../network';

const renderEmptyData = () => (<span> Sem Informações disponíveis no momento</span>);

const renderTemperatureData = (temperatureData) => {
  if (!temperatureData) {
    return renderEmptyData();
  }
  return (
    <>
      <p>
        Embora a temperatura atual seja de <strong>{temperatureData.temp}º</strong>, a sensação térmica é de <strong>{temperatureData.feels_like}º</strong>.
      </p>
      <p>
        A previsão mínima de temperatura é de <strong>{temperatureData.temp_min}º</strong> e a previsão máxima é de <strong>{temperatureData.temp_max}º</strong>.
      </p>
      <p>
        A umidade atual está em <strong>{temperatureData.humidity}%</strong>.
      </p>
    </>
  );
};

const renderWindData = (windData) => {
  if (!windData) {
    return renderEmptyData();
  }
  return (
    <>
      <p>
        A intensidadde atual do é de <strong>{windData.speed}</strong>.
      </p>
    </>
  );
};

function WeatherContainer() {
  const [isRefreshing, setRefresh] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const refresh = () => {
    if (navigator && navigator.geolocation) {
      setRefresh(true);
      navigator.geolocation.getCurrentPosition((position) => {
        setRefresh(false);
        if (position && position.coords) {
          setCurrentPosition(position.coords);
        } else {
          alert('Não foi possível capturar sua localização!');
        }
      }, () => {
        setRefresh(false);
        alert('Não foi possível capturar sua localização!');
      });
    }
  };
  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (currentPosition && currentPosition.latitude && currentPosition.longitude) {
      getWeatherData(currentPosition)
        .then((response) => setWeatherData(response.data))
        .catch((e) => alert('Falha ao capturar dados de clima da localização atual!'));
    }
  }, [currentPosition]);

  return (
    <>
      {weatherData?.name
        && (
        <h1>
          Dados climáticos de {weatherData.name}
        </h1>
        )}
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Temperatura
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {renderTemperatureData(weatherData?.main)}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Vento
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {renderWindData(weatherData?.wind)}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <DataRefreshButton onRefresh={refresh} isRefreshing={isRefreshing} />
    </>
  );
}

export default WeatherContainer;
