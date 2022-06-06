import { Button, Row, Col, Radio, Form, Space, DatePicker, Select } from "antd";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import moment from "moment";

export const StockDetail = (props) => {
  console.log("props", props);

  const { Option } = Select;

  const API_URL = "https://api.twelvedata.com/time_series?";

  const [stock, setStock] = useState();

  const [value, setValue] = useState(1);
  const [interval, setInterval] = useState("1min");
  const [data, setData] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  const format = "HH:mm";

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const fetchStock = async () => {
    let url = `${API_URL}symbol=${props.props.Simbolo}&interval=${interval}&apikey=ebc3f31f2a17450c9073d7950713ef47`;
    console.log("to", to);
    console.log("from", from);
    if (value === 2 && to && from)
      url += "&start_date=" + from + "&end_date=" + to;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!data.values) {
          alert("No hay valores entre esas fechas");
        } else {
          setData(data.values);
          console.log("data", data);
        }
      });
  };

  const handleChange = (e) => {
    setInterval(e);
  };

  const handleClick = () => {
    fetchStock();
  };

  const onDateChangeFrom = (date, dateString) => {
    setFrom(dateString);
  };
  const onDateChangeTo = (date, dateString) => {
    setTo(dateString);
  };

  const renderLineChart = (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="close" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  return (
    <>
      <Row>
        <Col offset={8} style={{ marginTop: "80px" }}>
          <Radio.Group
            onChange={onChange}
            value={value}
            style={{ marginBottom: "80px" }}
          >
            <Space direction="vertical">
              <Radio value={1}>Tiempo Real</Radio>
              <Radio value={2}>
                <span style={{ marginRight: "80px" }}>Historico</span>
                <DatePicker
                  placeholder="Fecha desde"
                  onChange={onDateChangeFrom}
                />{" "}
                <DatePicker
                  placeholder="Fecha hasta"
                  onChange={onDateChangeTo}
                />
              </Radio>
              <Form.Item label="Intervalo" name="Intervalo">
                <Select
                  defaultValue={interval}
                  style={{ width: 120, marginLeft: "92px" }}
                  onChange={handleChange}
                >
                  <Option value="1min">1 min</Option>
                  <Option value="5min">5 min</Option>
                  <Option value="15min">15 min</Option>
                </Select>
              </Form.Item>
              <Space>
                <Button type="primary" onClick={handleClick}>
                  Graficar
                </Button>
                <Button onClick={() => window.location.reload()}>Volver</Button>
              </Space>
            </Space>
          </Radio.Group>
          {data ? renderLineChart : ""}
        </Col>
      </Row>
    </>
  );
};
