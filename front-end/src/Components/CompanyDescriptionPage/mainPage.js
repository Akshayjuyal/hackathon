import React, {Component, Fragment} from 'react';
import axios from 'axios';
import defaultImage from '../../default-image.png';
import CommonSubSection from '../SubSections/commonSubSection';
import CompanyDescriptionPage from './componentDescriptionPage';
import NewsSection from './newsSection';
import "../../styles/companyDescriptionPage.css";
import * as urlconf from "../../config/config.json";
import Financials from "../Financials/financeComponent"



export default class MainPage extends Component{

    state = {
        companyDescriptionData : [],
        companyFinancialsData : ''
    }

    componentWillMount(){
        let companyName = this.props.companyName.toLowerCase().replace(" ", "_");
        
        if(this.props.companyName){

            axios.post(`${urlconf.default.base_url}/getCompanyDetails/${companyName}`).then(
                resp => {
                    this.setState({companyDescriptionData: resp.data})
                }
            ); 
            axios.get(`${urlconf.default.base_url}/getCompanyFinancials/${companyName}`)
            .then(resp => {
                console.log('resp.data._source=========',resp.data[0]._source)
                this.setState({companyFinancialsData: resp.data._source})
            })
        }
        else{
            this.setState({companyDescriptionData: {}})
        }
    }

    render(){
    return(
        <div className="container-fluid">
            <div className="row" style={{overflow:"hidden"}}>
            <CompanyDescriptionPage companyName={this.props.companyName} companyDescriptionData={this.state.companyDescriptionData} />
            </div>
            <div className="row" style={{marginTop:"1rem",marginBottom:'2rem'}}><Financials companyName={this.props.companyName} /></div>
        </div>
        )
    }
}