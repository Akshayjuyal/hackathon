import React, { Component } from 'react'
import EnterpriceValChart from "../Financials/enterpriseValuechart"
import axios from 'axios';
import * as urlconf from "../../config/config.json";


export class FinanceComponent
    extends Component {
        state = {
            companyFinancialsData : '',
            companyName : ''
        }

    componentWillMount=()=>{
        console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLKKKKKKKKKKKKKKKKKKKKKKKKK",this.props.companyFinancialsData)
        // this.setState(()=>{
        //     return {companyName : this.props.companyName.toLowerCase().replace(" ", "_")}})
        // let companyName =this.props.companyName.toLowerCase().replace(" ", "_")
        // axios.get(`${urlconf.default.base_url}/getCompanyFinancials/${companyName}`)
        //     .then(resp => {
                
        //         console.log('resp.data._source=========',resp.data[0]._source)
        //         this.setState(()=>{
        //             return {companyFinancialsData: resp.data._source}})
        //     })

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
                            <div className="container-fluid row">
                                <div style={{backgroundColor:"rgba(45, 117, 127, 0.65)",borderRadius:" 1pc"}}><div 
				    				className="d-flex justify-content-between p-3 text-dark font-weight-bold"
				    				
				    			>
					    			<div>Value Chart</div>
					    			
					    		</div></div>
                            <EnterpriceValChart companyFinancialsData={this.props.companyFinancialsData}/>
                            </div>
                            
      </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default FinanceComponent

