import React, { Component } from "react";
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
      console.log(res);
    });
  }
  render() {
    return (
      <>
        <p>123qqqq456</p>
      </>
    );
  }
}
