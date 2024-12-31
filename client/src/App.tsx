import { Switch, Route } from "wouter";
import Calculator from "./pages/Calculator";

function App() {
  return (
    <Switch>
      <Route path="/" component={Calculator} />
    </Switch>
  );
}

export default App;
