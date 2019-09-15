import React, {Component, Fragment} from 'react';
import defaultImage from '../../default-image.png';
import "../../styles/companyDescriptionPage.css"
import NewsSection from './newsSection';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import InvestmentAndAcquisition from '../InvestmentAndAcquisition/InvestmentAndAcquisition';
import "../../styles/newsSection.css";


export default class MainPage extends Component{

    state = {
        collapse: true
    }

    render(){
        console.log(this.props.description);
       let logo = "";
       let headquarters = "";
       let founders = "";
       let foundedDate = "";
       let areasServer = "";
       let noOfEmployess = "";
       let industry = "";
       let revenue = "";
       let netIncome = "";
       let operatingIncome = "";
       let totalAssest = "";
       let products = [];
       let totalEquity = "";
       let website = "";
       
       if(this.props.companyDescriptionData.length > 0 && Object.keys(this.props.companyDescriptionData[0]).includes('_source')){
            if(Object.keys(this.props.companyDescriptionData[0]._source).includes('logo'))
                logo = this.props.companyDescriptionData[0]._source.logo;
            if(Object.keys(this.props.companyDescriptionData[0]._source).includes('headquarters'))
                headquarters = this.props.companyDescriptionData[0]._source.headquarters;
            if(Object.keys(this.props.companyDescriptionData[0]._source).includes('founder'))
                founders = this.props.companyDescriptionData[0]._source.founder;
            if(Object.keys(this.props.companyDescriptionData[0]._source).includes('founded'))
                foundedDate = this.props.companyDescriptionData[0]._source.founded;
            if(Object.keys(this.props.companyDescriptionData[0]._source).includes('area_served'))
                areasServer = this.props.companyDescriptionData[0]._source.area_served;
            if(Object.keys(this.props.companyDescriptionData[0]._source).includes('employee_count'))
                noOfEmployess = this.props.companyDescriptionData[0]._source.employee_count;       
            if(Object.keys(this.props.companyDescriptionData[0]._source).includes('industry'))
                industry = this.props.companyDescriptionData[0]._source.industry
            if(Object.keys(this.props.companyDescriptionData[0]._source).includes('revenue'))  
                revenue = this.props.companyDescriptionData[0]._source.revenue
            if(Object.keys(this.props.companyDescriptionData[0]._source).includes('net_income'))  
                netIncome = this.props.companyDescriptionData[0]._source.net_income  
            if(Object.keys(this.props.companyDescriptionData[0]._source).includes('operating_income'))
                operatingIncome = this.props.companyDescriptionData[0]._source.operating_income 
            if(Object.keys(this.props.companyDescriptionData[0]._source).includes('total_assets'))
                totalAssest = this.props.companyDescriptionData[0]._source.total_assets
            if(Object.keys(this.props.companyDescriptionData[0]._source).includes('product'))
                products = this.props.companyDescriptionData[0]._source.product
            if(Object.keys(this.props.companyDescriptionData[0]._source).includes('total_equity'))
                totalEquity = this.props.companyDescriptionData[0]._source.total_equity
            if(Object.keys(this.props.companyDescriptionData[0]._source).includes('website'))
                website = this.props.companyDescriptionData[0]._source.website
       }
        return(
            <div className="main-parent">
                <div className="custom-conatiner">
                { this.state.collapse ? (
                <Fragment><table className="companyDesc-table">
                        <tr>
                            <td><div className="logo-location">{logo ? (<Fragment><img style={{ width: '100%' }} src={logo} /><div style={{ fontSize: '13px', fontWeight: 'bold' }}>{headquarters}</div></Fragment>) :  <img style={{ width: '100%' }} src={defaultImage} />}</div></td>
                            <td width="40%" className="text-description">{ this.props.description }</td>
                        </tr>
                        { founders ?
                            (<tr>
                                <td width="7%" className="td-class bold">Founder</td>
                                <td width="40%" className="td-class">{founders}</td>
                            </tr>) : null
                        }
                        {foundedDate ?
                        (<tr>
                            <td width="7%" className="td-class bold">Founded Date</td>
                            <td width="40%" className="td-class">{foundedDate.split('[')[0]}</td>
                        </tr>) : null}
                        { headquarters ? 
                        (<tr>
                            <td width="7%" className="td-class bold">Headquarters</td>
                            <td width="40%" className="td-class">{headquarters}</td>
                        </tr>): null}
                        { areasServer ? 
                        (<tr>
                            <td width="7%" className="td-class bold">Areas Served</td>
                            <td width="40%" className="td-class">{areasServer}</td>
                        </tr>) : null }
                        { 
                            noOfEmployess && typeof(noOfEmployess) === "string" ? 
                            (<tr>
                                <td width="7%" className="td-class bold">No of Employess</td>
                                <td width="40%" className="td-class">{noOfEmployess}</td>
                            </tr>) : [
                                noOfEmployess && typeof(noOfEmployess) === "object" ? (
                                <tr>
                                    <td width="7%" className="td-class bold">No of Employess</td>
                                    <td width="40%" className="td-class">
                                    {noOfEmployess.map( emp => {
                                    return emp
                                    })}
                                    </td>
                                </tr>
                                ) : null ]
                        }
                    </table>
                    <div><div className="expand-collapse" onClick={() => this.setState({collapse: false})}><ExpandMore style={{ fontSize: "37px" }} /></div></div>
                    </Fragment>
                    ):(
                        <Fragment>
                        <table className="companyDesc-table">
                            <tr>
                                <td><div className="logo-location">{logo ? (<Fragment><img style={{ width: '100%' }} src={logo} /><div style={{ fontSize: '13px', fontWeight: 'bold' }}>{headquarters}</div></Fragment>) :  <img style={{ width: '100%' }} src={defaultImage} />}</div></td>
                                <td width="40%" className="text-description">{ this.props.description }</td>
                            </tr>
                            { founders ?
                                (<tr>
                                    <td width="7%" className="td-class bold">Founder</td>
                                    <td width="40%" className="td-class">{founders}</td>
                                </tr>) : null
                            }
                            {foundedDate ?
                            (<tr>
                                <td width="7%" className="td-class bold">Founded Date</td>
                                <td width="40%" className="td-class">{foundedDate.split('[')[0]}</td>
                            </tr>) : null}
                            { headquarters ? 
                            (<tr>
                                <td width="7%" className="td-class bold">Headquarters</td>
                                <td width="40%" className="td-class">{headquarters}</td>
                            </tr>): null}
                            { areasServer ? 
                            (<tr>
                                <td width="7%" className="td-class bold">Areas Served</td>
                                <td width="40%" className="td-class">{areasServer}</td>
                            </tr>) : null }
                            { 
                                noOfEmployess && typeof(noOfEmployess) === "string" ? 
                                (<tr>
                                    <td width="7%" className="td-class bold">No of Employess</td>
                                    <td width="40%" className="td-class">{noOfEmployess}</td>
                                </tr>) : [
                                    noOfEmployess && typeof(noOfEmployess) === "object" ? (
                                    <tr>
                                        <td width="7%" className="td-class bold">No of Employess</td>
                                        <td width="40%" className="td-class">
                                        {noOfEmployess.map( emp => {
                                        return emp
                                        })}
                                        </td>
                                    </tr>
                                    ) : null ]
                            }
                            { 
                                industry && typeof(industry) === "string" ? 
                                (<tr>
                                <td width="7%" className="td-class bold">Industry</td>
                                <   td width="40%" className="td-class">{industry}</td>
                                </tr>) : [
                                    industry && typeof(industry) === "object" ? (
                                    <tr>
                                        <td width="7%" className="td-class bold">Industry</td>
                                        <td width="40%" className="td-class">
                                        {industry.map( (ind, index) => {
                                            if(industry.length -1 === index)
                                                return ind
                                            else
                                                return ind+", "
                                        })}
                                        </td>
                                    </tr>
                                    ) : null ]
                            }
                            {
                                products.length > 0 ? (
                                    <tr>
                                    <td width="7%" className="td-class bold">Products</td>
                                        <td width="40%" className="td-class">{products.map( (prod, index) => {
                                            if(products.length -1 === index)
                                                return prod;
                                            else
                                                return prod+", ";
                                        })}</td>
                                    </tr>
                                ): null
                            }
                            {
                                revenue ? (
                                <tr>
                                    <td width="7%" className="td-class bold">Revenue</td>
                                    <td width="40%" className="td-class">{revenue}</td>
                                </tr>) : null
                            }
                            { netIncome ? (
                            <tr>
                                <td width="7%" className="td-class bold">Net Income</td>
                                <td width="40%" className="td-class">{netIncome}</td>
                            </tr>) : null }
                            { operatingIncome ? 
                                (<tr>
                                    <td width="7%" className="td-class bold">Operating Income</td>
                                    <td width="40%" className="td-class">{operatingIncome}</td>
                                </tr>) : null
                            }
                            { totalAssest ?
                                (<tr>
                                    <td width="7%" className="td-class bold">Total Asset</td>
                                    <td width="40%" className="td-class">{totalAssest}</td>
                                </tr>) : null
                            }
                            { totalEquity ?
                                (<tr>
                                    <td width="7%" className="td-class bold">Total Equity</td>
                                    <td width="40%" className="td-class">{totalEquity}</td>
                                </tr>) : null
                            }
                            { website ?
                                (<tr>
                                    <td width="7%" className="td-class bold">Website</td>
                                    <td width="40%" className="td-class"><a href={website}>{website}</a></td>
                                </tr>) : null
                            }
                        </table> 
                        <div className="expand-collapse" onClick={() => this.setState({collapse: true})}><ExpandLess style={{ fontSize: "37px" }}/></div>
                        </Fragment>)} 
                </div>
                <div className="news-section" 
                style={{ minHeight: "auto"}}>
                    <InvestmentAndAcquisition data={this.props.investmentAquisitionData}/>
                </div> 
                <div className="news-section">
                    <NewsSection companyName={this.props.companyName}/>
                </div>  
            </div>
        )
    }
}