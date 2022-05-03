import React, { Component } from "react";
import Item from "../Item/index.js";

export default class List extends Component {
  state = {
    list: [],
  };
  getData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        let index = 0;
        const arr = Array.from({ length: 10 }, () => {
          const i = index++;
          return {
            id: i,
            name: "my-" + i,
          };
        });
        resolve(arr);
      }, 1000);
    });
  }
  componentDidMount() {
    this.getData().then((res) => {
      this.setState({
        list: res,
      });
    });
  }
  render() {
    const { list } = this.state;
    const { change } = this.props;
    return (
      <>
        <div className="menu-wrapper">
          {list.map((item, index) => {
            return <Item key={index} item={item} change={change}></Item>;
          })}
        </div>
      </>
    );
  }
}
