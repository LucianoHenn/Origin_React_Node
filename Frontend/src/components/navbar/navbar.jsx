import { Header } from "antd/lib/layout/layout";
import { Button, Row, Col, Image, Typography } from "antd";
import authService from "../../services/auth.service";

export const NavBar = (props) => {
  const handleLogOut = () => {
    authService.logout();
    window.location.reload();
  };

  const { Text } = Typography;

  return (
    <Header style={{ position: "sticky", top: "0" }}>
      <Row justify="space-between" align="middle">
        <Col span={12} className={"first-col"}>
          <h1 tex style={{ color: "rgb(24, 144, 255)" }}>
            {props.seeDetails ? (
              <span>
                {props.seeDetails.Simbolo} - {props.seeDetails.Nombre} -
                {" " + props.seeDetails.Moneda}
              </span>
            ) : props.isLoginPage ? (
              <a id="logo" href="/">
                <img
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                  style={{ height: "32px", margin: "0 20px" }}
                />
                Ant Design
              </a>
            ) : (
              "Mis Acciones"
            )}
          </h1>
        </Col>
        <Col>
          <Button onClick={handleLogOut} type="primary">
            Logout
          </Button>
        </Col>
      </Row>
    </Header>
  );
};
