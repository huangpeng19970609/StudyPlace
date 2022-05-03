import { Component } from "react";
import List from "../../components/List/index";
import Content from "../../components/Content";

import { connect } from "react-redux";
import { changeId } from "../../store/action/list";

class IndexPage extends Component {
  render() {
    const { change, curId } = this.props;
    console.log("reload render");
    return (
      <div className="main">
        <div className="left">
          <List change={change}></List>
        </div>
        <div className="right">
          <Content curId={curId}></Content>
        </div>
      </div>
    );
  }
}
export default connect(
  function mapStateToProps(state) {
    return {
      curId: state.curId,
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      change: (id) => dispatch(changeId(id)),
    };
  }
)(IndexPage);
