import React, {Component} from 'react';
import axios from 'axios';
import * as urlconf from "../../config/config.json";
import "../../styles/newsSection.css";


class NewsComponent extends Component{


    render(){
        let image = this.props.news._source.urlToImage;
        if(image === "")
            image = "";
        return(
            <div className="each-news">
                <div className="parent-image">
                    <img className="news-img" src={image} />
                </div>
                <div className="content-class">
                    <div className="news-heading">{this.props.news._source.headline}</div>
                    <div>{this.props.news._source.content ? this.props.news._source.content.split('[')[0] : null }</div>
                </div>
            </div>
        )
    }
}

export default NewsComponent;