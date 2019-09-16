import React, {Component} from 'react';
import axios from 'axios';
import * as urlconf from "../../config/config.json";
import "../../styles/newsSection.css";
import NewsComponent from "./newsComponent";
import ExpandMore from "@material-ui/icons/ExpandMore";


class NewsSection extends Component{

    state={
        news : [],
        collapseCount: 2
    }

    componentWillMount(){
        let companyName = this.props.companyName.toLowerCase().replace(" ", "_");
        axios.post(`${urlconf.default.base_url}/getCompanyNews/${companyName}`).then(resp => {
            // let sortedData = resp.data.sort((first, second)=> { return first._source.sentiment_score - second._source.sentiment_score })
            // let tempData = [];
            // for(let i=0 ; i<sortedData.length; i++){
            //     debugger
            //     if(sortedData[i]._source.headline !== null && sortedData[i]._source.content !== null && sortedData[i]._source.headline.toLowerCase().includes(companyName) ||  sortedData[i]._source.content.toLowerCase().includes(companyName))
            //         tempData.push(sortedData[i]);
            // }
            // sortedData = sortedData.map( (data) => {
            //    if(data._source.headline.toLowerCase().includes(companyName) ||  data._source.content.toLowerCase().includes(companyName))
            //         return data;
            // });
            // debugger
            this.setState({ news : resp.data});
        // })
        })
    }

    render(){
        return(
            <div>
                <div className="news-text card-header">Latest News</div>
                {
                    this.state.news.map( (eachNews, index) => {
                        if(index <= this.state.collapseCount){
                            return (
                                <div>
                                    <NewsComponent news={eachNews} />
                                </div>
                            )
                        }
                    })
                }
                { this.state.news.length < this.state.collapseCount ? null : (
                <div onClick={() => this.setState({collapseCount: this.state.collapseCount + 2})}><ExpandMore style={{ cursor:"pointer", fontSize: "37px" }} /></div>)
                }
            </div>
        )
    }
}

export default NewsSection;