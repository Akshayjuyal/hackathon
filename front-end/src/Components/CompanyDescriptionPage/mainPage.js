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
        companyDescriptionData : [],
        companyFinancialsData : '',
        description: "",
        word_cloud:[]
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
            
            axios.get(`${urlconf.default.base_url}/getCompanyDescription/${companyName}`).then(
                resp => {
                    this.setState({description: resp.data.description})
                }
            );
            axios.get(`${urlconf.default.base_url}/getNewsWordCloud/${companyName}`).then(
                resp => {
                    console.log("===============resp.data.word_cloud=============",resp.data.word_cloud)
                    this.setState(()=>{return{word_cloud: resp.data.word_cloud}})
                }
            );
        }
        else{
            this.setState({companyDescriptionData: {}})
        }
    }

    render(){
    return(
        <div className="container-fluid">
            <div className="row" style={{overflow:"hidden"}}>
            <CompanyDescriptionPage companyName={this.props.companyName} companyDescriptionData={this.state.companyDescriptionData} data={this.state.word_cloud}/>
            </div>
            </div>
        )
    }
}