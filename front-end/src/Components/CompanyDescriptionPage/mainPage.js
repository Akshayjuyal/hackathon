import React, {Component, Fragment} from 'react';
import axios from 'axios';
import defaultImage from '../../default-image.png';
import CommonSubSection from '../SubSections/commonSubSection';
import CompanyDescriptionPage from './componentDescriptionPage';
import NewsSection from './newsSection';
import "../../styles/companyDescriptionPage.css";
import * as urlconf from "../../config/config.json";




export default class MainPage extends Component{

    state = {
        companyDescriptionData : "",
        companyFinancialsData : '',
        word_cloud:[],
        description: "",
        investmentAquisitionData: {},
    }

    componentWillMount(){
        let companyName = this.props.companyName.toLowerCase().replace(" ", "_");
        localStorage.setItem("companyName",companyName)
        
        if(this.props.companyName){

            axios.post(`${urlconf.default.base_url}/getCompanyDetails/${companyName}`).then(
                resp => {
                    this.setState({companyDescriptionData: resp.data})
                }
            ); 
            axios.get(`${urlconf.default.base_url}/getCompanyFinancials/${companyName}`)
            .then(resp => {
                // console.log('resp.data._source=========',resp.data[0]._source)
                this.setState(()=>{
                    return {companyFinancialsData: resp.data[0]?resp.data[0]._source:[]}})
            })
            
            axios.get(`${urlconf.default.base_url}/getCompanyDescription/${companyName}`).then(
                resp => {
                    this.setState({description: resp.data.description})
                }
            );
            axios.get(`${urlconf.default.base_url}/getNewsWordCloud/${companyName}`).then(
                resp => {
                    this.setState(()=>{return{word_cloud: resp.data.word_cloud}})
                }
            );

            axios.get(`${urlconf.default.base_url}/getCompanyInvestments/${companyName}`).then(
                resp => {
                    this.setState(()=>{
                        return {
                            investmentAquisitionData: resp.data[0]._source
                        }
                    })
                }
            );
            
        }
        else{
            this.setState({companyDescriptionData: {}})
        }
    }

    render(){
    return(
        <div>
            <div>
                <CompanyDescriptionPage
                    description={this.state.description}
                    companyName={this.props.companyName}
                    companyDescriptionData={this.state.companyDescriptionData}
                    data={this.state.word_cloud}
                    investmentAquisitionData={this.state.investmentAquisitionData}
                    companyFinancialsData={this.state.companyFinancialsData}
                />
            </div>
        </div>
        )
    }
}