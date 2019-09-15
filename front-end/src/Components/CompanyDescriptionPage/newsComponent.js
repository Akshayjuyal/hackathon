import React, {Component} from 'react';
import "../../styles/newsSection.css";
import newsImage from '../../news-image.png';


class NewsComponent extends Component{

    render(){
        let color = "red";
        let image = this.props.news._source.urlToImage;
        if(image === "" || image === null)
            image = newsImage;
        if(this.props.news._source.sentiment_score > 0.25 && this.props.news._source.sentiment_score < 0.55)
            color = "blue"
        if(this.props.news._source.sentiment_score > 0.55)
            color = "green"
        return(
            <div className="each-news" style={{ border: `2px solid ${color}` }}>
                <div className="parent-image">
                    <img className="news-img" src={image} />
                </div>
                <div className="content-class">
                    <div className="news-heading"><a target="_blank" href={this.props.news._source.url}>{this.props.news._source.headline}</a></div>
                    <div>{this.props.news._source.content ? this.props.news._source.content.split('[')[0] : null }</div>
                </div>
            </div>
        )
    }
}

export default NewsComponent;