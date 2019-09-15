import React, {Component, Fragment} from 'react';
import defaultImage from '../../default-image.png';
import "../../styles/companyDescriptionPage.css"
import NewsSection from './newsSection';


export default class MainPage extends Component{

    render(){
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
            
            <div 
            className="main-parent"
            >
                <div style={{ width: '60%', marginLeft: '50px', minHeight: '70px', marginBottom: '12px', borderBottom: "0.5px solid grey", overflow: "auto" }}>
                    <div style={{ width: '18%', float: 'left', marginBottom: '12px' }}>
                        { logo ? (<Fragment><img style={{ width: '100%' }} src={logo} /><div style={{ fontSize: '13px', fontWeight: 'bold' }}>{headquarters}</div></Fragment>) :  <img style={{ width: '100%' }} src={defaultImage} /> }
                    </div>
                </div>
                <div style={{ clear: 'left', marginLeft: '50px' }}>
                <table className="companyDesc-table">
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
                    {/* <tr>
                        <td>Centro comercial Moctezuma</td>
                        <td>Francisco Chang</td>
                        <td>Mexico</td>
                    </tr>
                    <tr>
                        <td>Ernst Handel</td>
                        <td>Roland Mendel</td>
                        <td>Austria</td>
                    </tr>
                    <tr>
                        <td>Island Trading</td>
                        <td>Helen Bennett</td>
                        <td>UK</td>
                    </tr>
                    <tr>
                        <td>Laughing Bacchus Winecellars</td>
                        <td>Yoshi Tannamuri</td>
                        <td>Canada</td>
                    </tr>
                    <tr>
                        <td>Magazzini Alimentari Riuniti</td>
                        <td>Giovanni Rovelli</td>
                        <td>Italy</td>
                    </tr> */}
                    </table>
                    
                </div>
                <div style={{ float: "left", width: "30%", background: "white", minHeight:"400px", borderRadius: "6px", boxShadow: "2px 2px 2px grey" }}>
                        <NewsSection companyName={this.props.companyName}/>
                    </div>  
            </div>
        )
    }
}