import React, {Fragment, Component} from 'react';
import echarts from 'echarts';
import axios from 'axios';
import * as urlconf from "../../config/config.json";

export class EnterpriseValueChart extends Component {
    state={
        companyFinancialsData:[],
        yaxis_data:[],
        xaxis_data:[]
    }

    componentDidMount=()=>{
        console.log("...............>>>>>>>>>>>>>><<<<<<<<<<<<<",this.props.companyFinancialsData)
        // this.setState(()=>{
        //     return {companyName : this.props.companyName.toLowerCase().replace(" ", "_")}})
        // let companyName =localStorage.getItem('companyName')
        // axios.get(`${urlconf.default.base_url}/getCompanyFinancials/${companyName}`)
        //     .then(resp => {
                
        //         console.log('resp.data._source=========',resp.data[0]._source.annual_enterprise_profile)
        //         let rsdata=resp.data[0]?resp.data[0]._source.annual_enterprise_profile:[]
        //         let ydata=[]
        //         let xdata=[]
        //         rsdata.map(dict =>{ 
        //             if (dict.key==="enterprisevalue"){
        //                 ydata.push(dict.value)
        //                 console.log("----------- called",ydata)                    }
        //             if(dict.key==="date"){
        //                 xdata.push(dict.value)
        //             }
                    
                    
        //          });
                 
        //         this.setState(()=>{
        //             return {companyFinancialsData: rsdata,
        //                 yaxis_data:ydata,
        //                 xaxis_data:xdata}})
        //     })

        //     this.generateData()

    }
    componentDidUpdate=()=>{
        
        console.log("...............>>>>>>>>>>>>>><<<<<<<<<<<<<",this.props.companyFinancialsData)

            const {data} = this.state;
            const wordMap = this.createWordMap(data)
            const chartData = this.formatData(wordMap)
            this.setup(chartData)
          
    }

    generateData = () =>{
        // console.log("oooooooooooooooomeathod called")
        let ydata=[]
        let xdata=[]
        this.state.companyFinancialsData.map(dict =>{ 
            if (dict.key==="enterprisevalue"){
                ydata.push(dict.value)
            }
            if(dict.key==="date"){
                xdata.push(dict.value)
            }
            
            
         });
         this.setState({
            yaxis_data:ydata,
            xaxis_data:xdata
         })
    }
    componentDidUpdate=()=>{   
        
        // console.log("this.propssss========",this.props.companyFinancialsData)

        this.enterprisevalueChart()
    }

    enterprisevalueChart = () => {
        const mychart = echarts.init(document.getElementById('financeValueEnterprise-chart'));
        const option = {
            xAxis: {
                type: 'category',
                data: this.state.xaxis_data
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: this.state.yaxis_data,
                type: 'line'
            }]
        };
        
    
                mychart.setOption(option);
                window.onresize = mychart.resize;
      }

    render() {
        return (
            <div id="financeValueEnterprise-chart" style={{height: '450%', width:'100%'}}></div>
        )
    }
}

export default EnterpriseValueChart
