import React, { Component } from "react";
export default class List extends Component {
  changeId() {
    console.log(this);
  }
  render() {
    const { item, change } = this.props;
    return (
      <>
        <div>
          <div onClick={() => change(item.id)}>{item.name}</div>
        </div>
      </>
    );
  }
}
