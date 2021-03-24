import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

 class Survey extends Component {
  constructor(props){
      super(props)
  }

  render(){
      const {survey} = this.props;
      return(
        <div className="card" style="width: 18rem;">
        <div className="card-body">
          <h5 className="card-title">{survey.title}</h5>
          <p className="card-text">{survey.description}</p>
        </div>

        <div className="card-body">
          
        </div>

      </div>
      )
  }

}

const getSurveyById = (surveys, id) => {
    let survey = surveys.filter(suvey_filter => parseInt(suvey_filter.id) === parseInt(id));
    if (survey.length > 0) {
        return survey[0]
    }
    return null;
};



const mapDispatchToProps = (dispatch) => {
    return {
      loadSurveys: bindActionCreators(getSurveys, dispatch)
    };
  };

  const mapStateToProps = ({ surveys: { surveys } }) => {
    let surveyId = ownProps.match.params.id;
    let surveyDetails = {title: '', description: ''};
    if (surveyId && surveys.length > 0) {
        surveyDetails = getSurveyById(surevys, surveyId);
    }

    return {
      surveys,
      survey: surveyDetails
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Survey)