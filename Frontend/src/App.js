import Layout, { Footer } from "antd/lib/layout/layout";
import { AppNavigation } from "./navigation/app-navigation";
import { NavBar } from "./components/navbar/navbar";

const App = () => {
  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <AppNavigation></AppNavigation>
        <Footer style={{ position: "absolute", bottom: "0" }}>Footer</Footer>
      </Layout>
    </div>
  );
};

export default App;
