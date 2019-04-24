import React, { Component } from "react";
import StrategyDescription from "./StrategyDescription.jsx";
import SchemeDescription from "./SchemeDescription.jsx";
import DeploymentDescription from "./DeploymentDescription.jsx";
import { strategies, schemes, deployments } from "./data.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <div>
          {strategies.map(it => (
            <StrategyDescription strategy={it} key={it.name} />
          ))}
          {schemes.map(it => <SchemeDescription scheme={it} key={it.name} />)}
          {deployments.map(it => (
            <DeploymentDescription deployment={it} key={it.name} />
          ))}
        </div>
        <div className="footer">
          {"Pics belongs to "}
          <a href="https://www.wyrd-games.net/">WYRD MINIATURES, LLC</a>
        </div>
        {/* bootstrap scripts */}
        <script
          src="https://unpkg.com/react/umd/react.production.js"
          crossOrigin
        />
        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.js"
          crossOrigin
        />
        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossOrigin
        />
        <script>var Alert = ReactBootstrap.Alert;</script>
      </div>
    );
  }
}

export default App;
