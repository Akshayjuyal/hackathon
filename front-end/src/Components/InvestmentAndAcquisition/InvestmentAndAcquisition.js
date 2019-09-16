import React, {Fragment, Component} from 'react';
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";


class InvestmentAndAcquisition extends Component {
  state={
  		isCardCollapse: false,
        isCollapse: false,
    }

  formatHeadings = (heading) => {
  	heading = heading.replace('_', ' ');
  	const titleCase = (str) => {
  		str = str.toLowerCase().split(' ');
  		let final = [ ];
  		for(let  word of str){
      		final.push(word.charAt(0).toUpperCase()+ word.slice(1));
    	}
    	return final.join(' ')
	}
  	return titleCase(heading);
  }



  render() {
  	const { data } = this.props;
  	let investments_details_keys = [];
  	let acquisitions_details_keys = [];
  	if(Object.keys(data).length>0) {
  		investments_details_keys = Object.keys(data.investments.investments_details[0]);
  		acquisitions_details_keys = Object.keys(data.acquisitions.acquisitions_details[0]);
  	}
  	
    return (
    	<Fragment>
    		<div 
    			className="news-text m-auto card-header"
    			style={{ cursor:"pointer"}}
    			onClick={() => this.setState(()=>{return {isCardCollapse: !this.state.isCardCollapse}})}
    		>
    			Investments & Acquisitions
    		</div>
    		{
    			this.state.isCardCollapse
    			? ""
    			: (
    				<div className="container p-0">
		    			<div className="row m-2 d-flex justify-content-between w-100">
							<div className="card" style={{width: '18rem'}}>
				    			<div 
				    				className="d-flex justify-content-between p-3 text-dark font-weight-bold"
				    				style={{backgroundColor: "rgba(0,0,0,.05)"}}
				    			>
					    			<div>No Of Investments</div>
					    			<div>
					    				{
					    					Object.keys(data).length>0
					    					? data.investments.num_investments
					    					: 0
					    				}
					    			</div>
					    		</div>
				    		</div>
				    		<div className="card" style={{width: '18rem'}}>
				    			<div
				    				className="d-flex justify-content-between p-3 text-dark font-weight-bold"
				    				style={{backgroundColor: "rgba(0,0,0,.05)"}}
				    			>
					    			<div>No Of Acquisitions</div>
					    			<div>
					    				{
						    				Object.keys(data).length>0
						    				? data.acquisitions.num_acquisitions
						    				: 0
					    				}
					    			</div>
					    		</div>
				    		</div>
						</div>
		    			<div className="m-0 w-100 row m-2">    				
				    		<div className="w-100 card" style={{fontSize: '14px'}}>
	    						<div className="w-100 d-flex  justify-content-center font-weight-bold" style={{fontSize: '20px'}}>
	    							{this.formatHeadings('investments_details')}
	    						</div>
				    			{
				    				Object.keys(data).length>0
				    				? (
				    					<table className="table table-striped">
						    				<thead className="thead-dark" style={{fontSize: '16px'}}>
						    					<tr>
						    						{
						    							investments_details_keys.map((value, key)=>{
						    								return (
																<th key={key}>{this.formatHeadings(value)}</th>
															);
						    							})
						    						}    						
						    					</tr>
						    				</thead>
						    				<tbody>
						    					{
						    						data.investments.investments_details.map((item, key1)=>{
						    							return (
															<tr key={key1} cla>
									    						{
							    									investments_details_keys.map((key, key2)=>{
									    								return (
									    										<td key={key2}>{item[key]}</td>
									    									);
									    							})
									    						}    						
									    					</tr>
														);
						    						})
						    					}    					
						    				</tbody>
						    			</table>
				    				  )
				    				: ""
				    			}
				    		</div>
		    			</div>
		    			{
		    				this.state.isCollapse
		    				? (
		    					<div className="m-0 w-100 row m-2" >
						    		<div className="card w-100" style={{fontSize: '14px'}}>						    			
			    						<div className="w-100 d-flex  justify-content-center font-weight-bold" style={{fontSize: '20px'}}>
			    							{this.formatHeadings('acquisitions_details')}
			    						</div>
						    			{
						    				Object.keys(data).length>0
						    				? (
						    					<table className="table table-striped">
								    				<thead className="thead-dark" style={{fontSize: '16px'}}>
								    					<tr>
								    						{
								    							acquisitions_details_keys.map((value, key)=>{
								    								return (
																		<th key={key}>{this.formatHeadings(value)}</th>
																	);
								    							})
								    						}    						
								    					</tr>
								    				</thead>
								    				<tbody>
								    					{
								    						data.acquisitions.acquisitions_details.map((item, key1)=>{
								    							return (
																	<tr key={key1} cla>
											    						{
									    									acquisitions_details_keys.map((key, key2)=>{
											    								return (
											    										<td key={key2}>{item[key]}</td>
											    									);
											    							})
											    						}    						
											    					</tr>
																);
								    						})
								    					}    					
								    				</tbody>
								    			</table>
						    				  )
						    				: ""
						    			}
						    			
						    		</div>
				    			</div>
		    				  )
		    				: ""
		    			}
		    			
		    			<div onClick={() => this.setState(()=>{return {isCollapse: !this.state.isCollapse}})}>
		    				{
		    					this.state.isCollapse
		    					? <ExpandLess style={{ cursor:"pointer", fontSize: "37px" }} />
		    					: <ExpandMore style={{ cursor:"pointer", fontSize: "37px" }} />
		    				}
		    			</div>
		    		</div>
    			  )
    		}
    	</Fragment>
      
    );
  }
}

export default InvestmentAndAcquisition;