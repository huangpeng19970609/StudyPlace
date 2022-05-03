import { Component } from "react";
export default class Content extends Component {
  render() {
    const { curId } = this.props;
    return (
      <>
        <div>{curId}</div>
      </>
    );
  }
}
