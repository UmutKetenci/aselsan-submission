import * as React from "react";

export interface IAppProps {}

export default class App extends React.Component<IAppProps> {
  public render() {
    return (
      <div className="vending-machine-container">
        <h1>Vending Machine</h1>
      </div>
    );
  }
}
