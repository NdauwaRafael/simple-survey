import React, { Component } from "react";
import {createSurvey} from "../Redux/actions/surveys";

 class AddSurvey extends Component {
  constructor(props){
      super(props);
      this.state = {
          errors: {},
          title: "",
          description: ""
      }

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount(){
    this.props.loadSurveys();
  }

  handleChange(event) {
    let field = event.target.name;
    let value = event.target.value;

    this.setState({
      [field]: value
    });
  }

  handleSave(){

  }

  render(){
      const {title, description} = this.state
    return(
        <div className="card">
        <div className="card-body">
            <form>
            <TextInput
                error={errors.title}
                label="Title"
                name="title"
                type="text"
                value={title}
                onChange={this.handleChange}
          />

            <TextInput
                error={errors.description}
                label="Description"
                name="description"
                type="text"
                value={description}
                onChange={this.handleChange}
          />

          
            <div className="mt-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleSave}
            >
              Submit
            </button>
          </div>
            </form>
        </div>
        </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
      addSurvey: bindActionCreators(createSurvey, dispatch)
    };
  };

  const mapStateToProps = ({ surveys: { surveys } }) => {
    return {
      surveys
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddSurvey)