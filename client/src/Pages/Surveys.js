import React, { Component } from "react";
export default class Surveys extends Component {
  constructor(props){
      super(props)
  }

  render(){
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
                    <th scope="col">Author</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </table>
        </div>
    )
  }
}
