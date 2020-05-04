import React from "react";

import { Card, Typography, Table, Divider, List } from "antd";

const columns = [
  { title: "Nombre", dataIndex: "name", key: "name" },
  { title: "Tipo", dataIndex: "type", key: "type" },
  { title: "Opcional", dataIndex: "option", key: "option" },
  { title: "Descripción", dataIndex: "description", key: "description" },
]

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
  }
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
];
const { Title, Text } = Typography;

const Introduction = () => {
  return (
    <Card bordered={false} style={{ textAlign: "center" }}>
      <Title>Dashboard COMPUTACIÓN VISUAL 2020-1</Title>

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

      <Divider orientation="left">Descripción </Divider>
      <Text>
        La pagina muestra la visualización de los datos del sistema de
        bicicletas de NY{" "}
        <a href="https://www.citibikenyc.com/system-data">CitiBike</a> más
        especificamente los datos del mes marzo del 2020 encontrados{" "}
        <a href="https://s3.amazonaws.com/tripdata/JC-202003-citibike-tripdata.csv.zip">
          aquí
        </a>{" "}
        cuya estructura de datos se presenta en la siguiente tabla.
      </Text>
      <div style={{ marginTop: "2%" }}>
        <Table size="small" dataSource={tableData} columns={columns} pagination={{pageSize: 20}} />
      </div>
    </Card>
  );
};

export default Introduction;
