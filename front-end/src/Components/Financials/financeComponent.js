import React, { Component } from 'react'
import EnterpriceValChart from "../Financials/enterpriseValuechart"
import CapitalValChart from "../Financials/marcketCapitalChart"
import NetIncome from "../Financials/NetIncomeChart"
import GrossProfit from "../Financials/GrossProfit"
import axios from 'axios';
import * as urlconf from "../../config/config.json";


export class FinanceComponent
    extends Component {
        state = {
            companyFinancialsData : '',
            companyName : ''
        }

    // componentWillMount=()=>{
    //     console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLKKKKKKKKKKKKKKKKKKKKKKKKK",this.props.companyFinancialsData)
    //     // this.setState(()=>{
    //     //     return {companyName : this.props.companyName.toLowerCase().replace(" ", "_")}})
    //     // let companyName =this.props.companyName.toLowerCase().replace(" ", "_")
    //     // axios.get(`${urlconf.default.base_url}/getCompanyFinancials/${companyName}`)
    //     //     .then(resp => {
                
    //     //         console.log('resp.data._source=========',resp.data[0]._source)
    //     //         this.setState(()=>{
    //     //             return {companyFinancialsData: resp.data._source}})
    //     //     })

    // }
    render() {
        // debugger
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
                            <div className="row">
                            <div className="container-fluid col row">
                                
                                {this.props.companyFinancialsData===""?"":
                            <EnterpriceValChart companyFinancialsData={this.props.companyFinancialsData}/>}
                            
                            </div>
                            <div className="container-fluid col row">
                                
                            {this.props.companyFinancialsData===""?"":
                            <CapitalValChart companyFinancialsData={this.props.companyFinancialsData}/>}
                            
                            </div>
                            </div>
                            <div className="row">
                            <div className="container-fluid col row">
                                
                                {this.props.companyFinancialsData===""?"":
                            <NetIncome companyFinancialsData={this.props.companyFinancialsData}/>}
                            
                            </div>
                            <div className="container-fluid col row">
                                
                            {this.props.companyFinancialsData===""?"":
                            <GrossProfit companyFinancialsData={this.props.companyFinancialsData}/>}
                             
                            </div>
                            </div>
                            
      </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default FinanceComponent

