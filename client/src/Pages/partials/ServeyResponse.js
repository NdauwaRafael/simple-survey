import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TextInput from "../../components/common/form/TextInput";

class SurveyResponse extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          response: "",
          file: null
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        let field = event.target.name;
        let value = event.target.value;
    
        this.setState({
          [field]: value
        });
      }

      onFileChange = event => { 
        this.setState({ file: event.target.files[0] }); 
      }; 

      handleSubmit(){
        const formData = new FormData();
        formData.append( 
            "file", 
            this.state.file, 
            this.state.file.name 
          );
      }

      selectedFile = () =>{
        if (this.state.file) { 
          
            return ( 
              <div> 
                <h2>File Details:</h2> 
                <p>File Name: {this.state.file.name}</p> 
                <p>File Type: {this.state.file.type}</p> 
                <p> 
                  Last Modified:{" "} 
                  {this.state.file.lastModifiedDate.toDateString()} 
                </p> 
              </div> 
            ); 
          } else { 
            return ( 
              <div> 
                <br /> 
                <h4>Choose before Pressing the Upload button</h4> 
              </div> 
            ); 
          }

      }

      render() {
        const { file, response } = this.state;
    
        return (
          <div className="justify-content-center row">
          <div className="card col-6">
            <div className="card-body">
              <TextInput
                error={errors.response}
                label="Response"
                name="response"
                type="text"
                value={response}
                onChange={this.handleChange}
              />

            <div className="form-group mt-3">
                <input class="form-control"  type="file" onChange={this.onFileChange} />
            </div>

            <div className="form-group mt-2">
                {this.selectedFile()}
            </div>
    
    
              <div className="mt-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
    
              </div>
            </div>
          </div>
          </div>
        );
      }
}

const mapDispatchToProps = (dispatch) => {
    return {
      addSurvey: bindActionCreators(createSurvey, dispatch)
    };
  };

  const mapStateToProps = ({ surveys: { surveys } }) => {
    return {
      
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(SurveyResponse)