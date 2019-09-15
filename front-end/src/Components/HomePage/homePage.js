import React, {Component} from 'react';
import axios from 'axios';
import SearchBar from './searchBar';
import CompanyDescriptionPage from '../CompanyDescriptionPage/mainPage';
import SearchIcon from "@material-ui/icons/Search";

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
                        style={{
                            marginRight: "34px",
                            position: "absolute",
                            right: "0",
                            fontSize: "26px",
                            cursor: "pointer",
                            top: "40px"
                        }}
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
                     }}>Search through all the company, legal, merges and acquisitions, gains, loses</div>
                    <SearchBar onSearchSelection={this.onSearchSelection}/>
                    <div style={{
                            fontSize: "42px",
                            width: "61%",
                            margin: "auto",
                            color: "white",
                            position: "absolute",
                            top: "190px",
                            right: "-51px",
                            bottom: "0px",
                            left: "0px",
                            height: "100px"
                    }}>Eval Company</div>
                </div>)      
            }
        </div>)
    }
}

export default Homepage;