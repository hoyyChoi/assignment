import { RecoilRoot } from "recoil";
import { Router } from "./Router/Router";
import { GlobalStyle } from "./style/global";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Router />
    </RecoilRoot>
  );
}

export default App;
