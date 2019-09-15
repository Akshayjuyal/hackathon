import React, {Component} from 'react';
import axios from 'axios';
import SearchBar from './searchBar';
import CompanyDescriptionPage from '../CompanyDescriptionPage/mainPage';
import SearchIcon from "@material-ui/icons/Search";
import "../../styles/homepage.css";

class Homepage extends Component{

    state = {
        selectedCompany: "",
        companies: []
    }

    onSearchSelection = (companyName) => {
        this.setState({selectedCompany: companyName })
    }

    loadSearchPage = () => {
        this.setState({selectedCompany: ""})
    }
   

    render(){
        return (
            <div>
            {this.state.selectedCompany ? (
                <div>
                    <SearchIcon 
                    className ="search-icon-fixed"
                    onClick={this.loadSearchPage} />
                    <CompanyDescriptionPage companyName={this.state.selectedCompany}/>
                </div>) : (
                <div className="search-page" style={{ height: "100vh" }}>
                    <div style={{ 
                        fontSize: "24px",
                        width: "70%",
                        margin: "auto",
                        color: "white",
                        position: "absolute",
                        margin: "auto",
                        top: "-123px",
                        right: "-49px",
                        bottom: "0",
                        left: "0",
                        width: "61%",
                        height: "100px"
                     }}>Ask fin-buddy for info about any company!</div>
                    <SearchBar onSearchSelection={this.onSearchSelection}/>
                    <div style={{
                            fontSize: "42px",
                            width: "50%",
                            margin: "auto",
                            color: "white",
                            position: "absolute",
                            top: "184px",
                            bottom: "0px",
                            left: "25%",
                            height: "100px"
                    }}>Fin-Buddy</div>
                </div>)      
            }
        </div>)
    }
}

export default Homepage;