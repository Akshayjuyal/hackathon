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
        description: ""
    }

    componentWillMount(){
        let companyName = this.props.companyName.toLowerCase().replace(" ", "_");
        
        if(this.props.companyName){

            axios.post(`${urlconf.default.base_url}/getCompanyDetails/${companyName}`).then(
                resp => {
                    this.setState({companyDescriptionData: resp.data})
                }
            ); 
            
            axios.post(`${urlconf.default.base_url}/getCompanyDescription/${companyName}`).then(
                resp => {
                    this.setState({description: resp.data.description})
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
            <div><CompanyDescriptionPage description={this.state.description} companyName={this.props.companyName} companyDescriptionData={this.state.companyDescriptionData} /></div>
        </div>
        )
    }
}