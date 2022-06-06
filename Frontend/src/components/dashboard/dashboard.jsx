import { Button, AutoComplete, Row, Col, Table, Form, Typography } from "antd";
import { useState, useEffect } from "react";
import userService from "../../services/user.service";
import { StockDetail } from "../stock-detail/stock-detail";
import { NavBar } from "../navbar/navbar";

export const Dashboard = () => {
  const { Option } = AutoComplete;
  const API_URL = "https://api.twelvedata.com/stocks?source=docs&exchange=NYSE";
  const [stocks, setStocks] = useState([]);
  const [seeDetails, setSeeDetails] = useState();

  const fetchSymbols = async () => {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    setOptions(data.data);
    console.log(data);
  };

  useEffect(() => {
    fetchSymbols();
    userService.getAllStocks().then((res) => {
      console.log("myStocks", res);
      if (res.data) {
        setData(
          res.data.map((stock) => {
            return {
              Simbolo: stock.symbol,
              Moneda: stock.currency,
              Nombre: stock.name,
            };
          })
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("stockss", stocks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stocks]);

  const [form] = Form.useForm();

  const columns = [
    {
      title: "Simbolo",
      dataIndex: "Simbolo",
      key: "Simbolo",
      render: (text, record) => (
        <Typography.Link onClick={() => setSeeDetails(record)}>
          {text}
        </Typography.Link>
      ),
    },
    {
      title: "Moneda",
      dataIndex: "Moneda",
      key: "Moneda",
    },
    {
      title: "Nombre",
      dataIndex: "Nombre",
      key: "Nombre",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Typography.Link onClick={() => handleClick(record)}>
          Eliminar
        </Typography.Link>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [selectedStock, setSelectedStock] = useState();

  const [options, setOptions] = useState([]);

  const handleAddSymbols = () => {
    if (selectedStock.length) {
      var array = [...data]; // make a separate copy of the array
      console.log("array", array);
      if (array.some((stock) => stock.Simbolo === selectedStock)) {
        alert("Ya posees esa accion!");
        setSelectedStock("");
        return;
      }
      const newStock = options.find((e) => e.symbol === selectedStock);
      console.log("newStock", newStock);
      userService.addStock(newStock).then(() => {
        setData([
          ...data,
          {
            Simbolo: newStock.symbol,
            Moneda: newStock.currency,
            Nombre: newStock.name,
          },
        ]);

        console.log("stock seleccionada", selectedStock);
        form.resetFields();
      });
    } else alert("Debes seleccionar una accion para agregarla!");
  };

  const onSelect = (value) => {
    console.log("onSelect", value);
    setSelectedStock(value);
  };

  const handleClick = (e) => {
    userService.deleteStock(e.Simbolo).then((res) => {
      console.log("delete stock", res);
      var array = [...data]; // make a separate copy of the array
      var index = array.indexOf(e);
      if (index !== -1) {
        array.splice(index, 1);
        setData(array);
      }
    });
  };
  if (seeDetails)
    return (
      <>
        <NavBar seeDetails={seeDetails} />
        <StockDetail props={seeDetails} />
      </>
    );

  return (
    <>
      <NavBar isLoginPage={false} />
      <Row>
        <Col offset={8} style={{ marginTop: "80px" }}>
          <Row>
            <Col flex={1}>
              <Form form={form}>
                <Form.Item name="stock">
                  <AutoComplete
                    block
                    onSelect={onSelect}
                    placeholder="Selecciona un Simbolo para Agregarlo"
                    filterOption={(inputValue, option) =>
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                  >
                    {options.map((stock) => (
                      <Option key={stock.symbol} value={stock.symbol}>
                        {stock.symbol}
                      </Option>
                    ))}
                  </AutoComplete>
                </Form.Item>
                <Button
                  type="primary"
                  block
                  style={{ marginBottom: "30px" }}
                  onClick={handleAddSymbols}
                >
                  Agregar Simbolo
                </Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col flex={1}>
              <Table
                block
                columns={columns}
                dataSource={data}
                pagination={false}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
