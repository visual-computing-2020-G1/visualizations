import React from "react";

import { Card, Typography, Table, Divider, List } from "antd";
import {Link} from 'react-router-dom'
const columns = [
  { title: "Nombre", dataIndex: "name", key: "name" },
  { title: "Tipo", dataIndex: "type", key: "type" },
  { title: "Opcional", dataIndex: "option", key: "option" },
  { title: "Descripción", dataIndex: "description", key: "description" },
];

const tableData = [
  {
    key: 1,
    name: "tripduration",
    type: "Integer",
    option: "False",
    description: "Duración del viaje en minutos",
  },
  {
    key: 2,
    name: "starttime",
    type: "time",
    option: "False",
    description: "Fecha y hora del inicio del viaje",
  },
  {
    key: 3,
    name: "stoptime",
    type: "time",
    option: "False",
    description: "Fecha y hora del fin del viaje",
  },
  {
    key: 4,
    name: "start station id",
    type: "integer",
    option: "False",
    description: "id de la estación de inicio",
  },
  {
    key: 5,
    name: "start station name",
    type: "String",
    option: "False",
    description: "Nombre de la estación de inicio",
  },
  {
    key: 6,
    name: "start station latitude",
    type: "Float",
    option: "False",
    description: "Latitud de la estación de inicio",
  },
  {
    key: 7,
    name: "start station longitude",
    type: "Float",
    option: "False",
    description: "Longitud de la estación de inicio",
  },
  ,
  {
    key: 8,
    name: "end station id",
    type: "Integer",
    option: "False",
    description: "Id de la estación de salida",
  },
  {
    key: 9,
    name: "end station name",
    type: "String",
    option: "False",
    description: "Nombre de la estación de salida",
  },
  {
    key: 10,
    name: "end station latitude",
    type: "float",
    option: "False",
    description: "Latitud de la estación de salida",
  },
  {
    key: 11,
    name: "end station longitude",
    type: "Float",
    option: "False",
    description: "Longitud de la estación de salida",
  },
  {
    key: 12,
    name: "bikeid",
    type: "Integer",
    option: "true",
    description: "id de la cicla",
  },
  {
    key: 13,
    name: "usertype",
    type: "String",
    option: "true",
    description: "Tipo de usuario",
  },
  {
    key: 14,
    name: "birth year",
    type: "Integer",
    option: "true",
    description: "Año de nacimiento del usuario",
  },
  {
    key: 15,
    name: "gender",
    type: "binary",
    option: "true",
    description: "male/female",
  },
];

// start station longitude","end station id","end station name","end station latitude","end station longitude","bikeid","usertype","birth year","gender"

const listData = [
  {
    name: "Nicolás Parra Ramos",
    linkedin: "https://www.linkedin.com/in/nicol%C3%A1s-parra-ramos-366910140/",
    github: "https://github.com/NicolasPrr",
    email: "niparrara@unal.edu.co",
  },
  {
    name: "Johnathan Andrés León Rodriguez",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/jaleonro",
    email: "jaleonro@unal.edu.co",
  },
  {
    name: "Daniel Felipe Leyva",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/dfleyvad",
    email: "dfleyvad@unal.edu.co",
  },
];

const { Title, Text, Paragraph } = Typography;
{
  /* <li>Muestra la cantidad de viajes realizados por cada día.</li>
<li>Muestra la cantidad de viajes por cantidad de minutos.</li>
<li>Muestra la cantidad de viajes dada una estación a las demás.</li>
<li>Muestra el tiempo de viaje dada una estación haca las otras.</li> */
}

const barData = [
  {
    title: "Grafico principal",
    image: "/Barra1.PNG",
    content:
      "Muestra la cantidad de recorridos que se han hecho en los días del mes, esta se puede filtrar de dos maneras \
      as, una es deslizando la barra que se encuentra al lado derecho o la otra es seleccionando un  día de la gráfica de torta, esta nos mostrara directamente\
      los días respectivos. Al hacer click en una de las barras actualizara automanticamente las graficas de barras,\
      el mapa y las tarjetas que contiene la cantidad de personas por sexo.",
  },
  {
    title: "Edad.",
    image: "/Barra2.PNG",
    content:
      "Se representa la cantidad de viajes dada la edad, esta  gráfica cambia cuando se selecciona una barra del grafico principal",
  },
  {
    title: "Viaje por  minuto.",
    image: "/Barra3.PNG",
    content:
      "Representa la cantidad de viajes dada una frecuencia en minutos, esta frecuencia puede cambiar con el campo que se encuentra arriba \
     de ella, esto permite una mejor precisión a la hora de conocer cual es el segmento de tiempo más congestionado durante el día, esta gráfica es suceptible\
     al cambio por día, por lo que inicialmente mostrará los recorridos durante el mes, pero una vez seleccionada una barra de la grafica principal\
     se observaran solo los datos referentes a ese día.",
  },
  {
    title: "Duración de viaje",
    image: "/Barra4.PNG",
    content:
      "Representa la duración del viaje de la estación seleccionada del mapa hacia las otras que ha tenido viajes y de las otras a la de origen donde el color verde\
    representa el tiempo promedio de las otras estaciones hacia la estación seleccionada.",
  },
  {
    title: "Cantidad de viajes",
    image: "/Barra5.PNG",
    content:
      "Muestra la cantidad de viajes que ha tenido la estación seleccionada hacia las otras donde el \
          color verde representa la llegada desde otra estaciones.",
  },
  {
    title: "Promedio por día de semana",
    image: "/pie.PNG",
    content:
      "Muestra el promedio dado el día de la semana, es posible filtrar los días de la grafica principal si se da click en un día, para hacer el reset\
    se debe hacer click en una parte en blanco de la gráfica.",
  },
  {
    title: "Mapa",
    image: "/Map.PNG",
    content:
      "Representación geografica de la ciudad junto a las estaciones y sus conexiones, nos muestra cual ha sido el punto más concurrido durante todo el día\
    y cuales son las rutas más recorridas, donde el tamaño de cada nodo representa la cantidad de usuarios que parten de allí mientras que el color nos dice cuantos bici\
    usuarios llegan de otras estaciones.",
  },
  {
    title: "Gráfico de dispersión",
    image: "/scatter.PNG",
    content:
      "Muestra la relación entre cantidad de viajes y la duración del viaje",
  },
];

const Introduction = () => {
  return (
    <Card bordered={false} style={{ textAlign: "center" }}>
      <Title>Dashboard CitiBike - COMPUTACIÓN VISUAL 2020-1</Title>

      <Divider orientation="left">Integrantes </Divider>

      <List
        size="small"
        // bordered
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a href={item.linkedin}> Linkedin</a>,
              <a href={item.github}>Github</a>,
            ]}
          >
            <div style={{ textAlign: "left" }}>
              <List.Item.Meta title={item.name} description={item.email} />
            </div>
          </List.Item>
        )}
      />

      <Divider orientation="left">Introducción </Divider>
      <Paragraph style={{ textAlign: "left" }}>
        Citibike es un sistema inaugurado en el 2013, el sistema apoya el
        proceso de intercambio de bicicletas publicas de gestión privada y
        actualmente es el sistema de bicicletas más grande en los estados
        unidos, actualmente cuenta con más de 900 estaciones y más de 14500
        bicicletas. <br />
        Actualmente existen trabajos para la visualización de estos datos e
        incluso cursos para con herramientas como tableau en coursera tales como{" "}
        <a href="https://www.visualization.bike/"> visualization.bike</a> y
        <a href="https://www.coursera.org/projects/visualizing-citibike-trips-tableau">
          {" "}
          coursera tableau
        </a>
        , estas paginas tienen como proposito mostrar las rutas más frecuentes,
        viajes promedio por día , entre otra información que podria ser util a
        la hora de la toma de decisiones por parte de la empresa encargada, sin
        embargo estas paginas tienen como defecto mostrar la información de un
        periodo estatico, es decir, sin que el usuairo pueda interactuar en el
        tiempo.
        <br />
        La pagina muestra la visualización de los datos del sistema de
        bicicletas de NY{" "}
        <a href="https://www.citibikenyc.com/system-data">CitiBike</a> más
        especificamente los datos del mes marzo del 2020 encontrados{" "}
        <a href="https://s3.amazonaws.com/tripdata/JC-202003-citibike-tripdata.csv.zip">
          aquí
        </a>{" "}
        cuya estructura de datos se presenta en la siguiente tabla.
      </Paragraph>
      <div style={{ marginTop: "2%" }}>
        <Table
          size="small"
          dataSource={tableData}
          columns={columns}
          pagination={{ pageSize: 20 }}
        />
      </div>

      <Divider orientation="left">Objetivo </Divider>
      <Paragraph style={{ textAlign: "left" }}>
        <ul>
          <li>
            Extraer, procesar y mostrar la información obtenida del dataset
            suministrado por el sistema citibike.
          </li>
          <li>
            Generar distintos tipos de visualizaciones utiles para la toma de
            decisiones
          </li>
          <li>Briandar una buena experiencia al usuario</li>
          <li>
            Brindar la posibilidad de analizar cualquier mes del dataset de
            citibike sin necesidad de hacer cambios en el codigo fuente
          </li>
          <li>_</li>
        </ul>
        {/* -Mostrar información de manera interactiva que ofrece lo de tal manera que los usuarios puedan interpretar el estado del sistema en el mes o día deseado  */}
      </Paragraph>
      <Divider orientation="left">Diseño de la solución </Divider>
      <Paragraph style={{ textAlign: "left" }}>
        La solución propuesta se basa en una pagina web creada con la libreria{" "}
        <Text code> React</Text>, la pagina cuenta con distintas
        representaciones visuales de información tales como gráfica de barras,
        gráfica de torta y una representación de las estaciones y rutas mediante
        un mapa Actualemente se tiene cinco grafico de barras, un grafico de
        dispersión, un grafico de tortas y tres tarjetas.
      </Paragraph>
      <List
        style={{ textAlign: "left" }}
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 10,
        }}
        dataSource={barData}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            extra={
              <img
                width={272}
                alt="logo"
                src={process.env.PUBLIC_URL + item.image}
              />
            }
          >
            <List.Item.Meta title={item.title} />
            {item.content}
          </List.Item>
        )}
      />

      <Divider orientation="left">Demo </Divider>
      Click <Link to="/citybike"> aquí</Link> para ir al dashboard.
      <Divider orientation="left">Conclusiones </Divider>
    </Card>
  );
};

export default Introduction;
