import React, { Component } from "react";
import {getSurveys} from "../Redux/actions/surveys";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

 class Surveys extends Component {
  constructor(props){
      super(props)
  }

  componentDidMount(){
    this.props.loadSurveys();
  }

  render(){
    const {surveys} = this.props;
    return(
        <div className="hello">
              <div className="mb-5">
                <button type="button" className="btn btn-primary">Add Survey</button>
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      surveys.map(({title}, index)=>(
                        <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{title}</td>
                        <td><button type="button" class="btn btn-link">View</button></td>
                      </tr>
                      ))
                    }
                </tbody>
              </table>
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSurveys: bindActionCreators(getSurveys, dispatch)
  };
};
const mapStateToProps = ({ surveys: { surveys } }) => {
  return {
    surveys
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Surveys)
