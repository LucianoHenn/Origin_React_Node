import { Button, Col, Form, Alert, Input, Row, Tabs } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useState } from "react";
import AuthService from "../../services/auth.service";
import { NavBar } from "../navbar/navbar";

export const LoginOrRegisterComponent = () => {
  const { TabPane } = Tabs;
  const [tabActiveKey, setTabActiveKey] = useState("1");
  const onChangeTab = (activeKey) => {
    setTabActiveKey(activeKey === "1" ? "1" : "2");
  };
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [email, setEmail] = useState("");
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [loginError, setLoginError] = useState();
  const [registerError, setRegisterError] = useState();

  const isAuth = () => {
    AuthService.isUserAuthenticated();
  };

  const register = () => {
    AuthService.register(usernameReg, passwordReg, email)
      .then((response) => {
        if (response.status !== 201) {
          setRegisterError(true);
        }
      })
      .catch((e) => {
        setRegisterError(true);
      });
  };

  const login = () => {
    AuthService.login(usernameLog, passwordLog)
      .then((response) => {
        if (response.auth) {
          window.location.reload();
        } else {
          setLoginError(true);
        }
      })
      .catch((e) => {
        setLoginError(true);
      });
  };

  return (
    <>
      <NavBar isLoginPage={true}></NavBar>
      <Row
        justify="space-around"
        style={{ margin: "20vh 0", minHeight: "60vh" }}
      >
        <Col xl={6}>
          {loginError ? (
            <Alert
              type="error"
              message="Credenciales incorrectas"
              banner
              closable
              onClose={() => setLoginError(false)}
            />
          ) : (
            ""
          )}
          {registerError ? (
            <Alert
              onClose={() => setRegisterError(false)}
              type="error"
              message="Error text"
              banner
              closable
            />
          ) : (
            ""
          )}

          <Content>
            <Tabs
              className={"login-form"}
              activeKey={tabActiveKey}
              onChange={onChangeTab}
            >
              <TabPane tab="Iniciar Sesion" key="1">
                <Form
                  name="basic"
                  layout={"vertical"}
                  initialValues={{ remember: true }}
                  onFinish={login}
                >
                  <Form.Item name="username">
                    <Input
                      required
                      placeholder="Nombre de Usuario"
                      value={usernameLog}
                      onChange={(e) => setUsernameLog(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item name="password">
                    <Input.Password
                      required
                      placeholder="Contraseña"
                      value={passwordLog}
                      onChange={(e) => setPasswordLog(e.target.value)}
                    />
                  </Form.Item>

                  <div className={"login-forgot-container"}>
                    <Button type="primary" block={true} htmlType="submit">
                      Iniciar Sesion
                    </Button>
                  </div>
                </Form>
              </TabPane>

              <TabPane tab="Registrarse" key="2">
                <Form name="basic" layout={"vertical"} onFinish={register}>
                  <Form.Item name="firstName" rules={[{ required: true }]}>
                    <Input
                      placeholder="Nombre de Usuario"
                      value={usernameReg}
                      onChange={(e) => setUsernameReg(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item name="email" rules={[{ required: true }]}>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </Form.Item>

                  <Form.Item name="password" rules={[{ required: true }]}>
                    <Input.Password
                      placeholder={"Contraseña"}
                      value={passwordReg}
                      onChange={(e) => setPasswordReg(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    dependencies={["password"]}
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Contraseñas no coinciden")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="Repita la Contraseña" />
                  </Form.Item>

                  <Button
                    type="primary"
                    block={true}
                    htmlType="submit"
                    loading={false}
                  >
                    Register
                  </Button>
                </Form>
              </TabPane>
            </Tabs>
          </Content>
        </Col>
      </Row>
    </>
  );
};
