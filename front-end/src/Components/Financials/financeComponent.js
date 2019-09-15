import React, { Component } from 'react'

export class FinanceComponent
    extends Component {


    componentDidMount=()=>{

    }
    render() {
        return (
            <div className="container-fluid" id="accordion" style={{ minWidth: "-webkit-fill-available" }}>
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Financial Details
        </button>
                        </h5>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body">
                            
      </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default FinanceComponent

