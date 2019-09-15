import React, {Component} from 'react';
import axios from 'axios';
import * as urlconf from "../../config/config.json"


class NewsSection extends Component{

    componentWillMount(){
        let companyName = this.props.companyName.toLowerCase().replace(" ", "_");
        axios.post(`${urlconf.default.base_url}/getCompanyNews/${companyName}`).then(resp => {
        })
    }

    render(){
        return(
            <div>
                <div style={{ fontSize: "23px", fontWeight: "bold", marginTop: "8px" }}>Latest News</div>
                <div>

                </div>
            </div>
        )
    }
}

export default NewsSection;