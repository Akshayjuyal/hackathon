import React, {Fragment, Component} from 'react';
import echarts from 'echarts';
import moment from 'moment';

export class GrossProfitChart extends Component {
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

        const data = this.generateData();
        this.enterprisevalueChart(data);

    }
    
    convert= (labelValue)=> {

        // Nine Zeroes for Billions
        return Math.abs(Number(labelValue)) >= 1.0e+9
    
        ? Math.abs(Number(labelValue)) / 1.0e+9
        // Six Zeroes for Millions 
        : Math.abs(Number(labelValue)) >= 1.0e+6
    
        ? Math.abs(Number(labelValue)) / 1.0e+6 
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3
    
        ? Math.abs(Number(labelValue)) / 1.0e+3
    
        : Math.abs(Number(labelValue));
    
    }
    

    generateData = () =>{
        // console.log("oooooooooooooooomeathod called")
        let ydata=[]
        let xdata=[]
        if(this.props.companyFinancialsData.annual_profile){
        this.props.companyFinancialsData.annual_profile.map(dict =>{
            ydata.push(this.convert(parseInt(dict.grossprofit,10)))
            xdata.push(moment(dict.date).format('YYYY'))
            
            
         });
         return ({
            yaxis_data:ydata,
            xaxis_data:xdata
         })
        }
        //  this.setState({
        //     yaxis_data:ydata,
        //     xaxis_data:xdata
        //  })
    }
    componentDidUpdate=()=>{   
        
        // console.log("this.propssss========",this.props.companyFinancialsData)

        const data = this.generateData();
        this.enterprisevalueChart(data);
    }

    enterprisevalueChart = (data) => {
        const mychart = echarts.init(document.getElementById('GrossProfit-chart'));
        const option = {
            xAxis: {
                name:"Years",
                nameLocation:"middle",
                nameGap:25,
                type: 'category',
                data: data?data.xaxis_data.reverse():""
            },
            yAxis: {
                name:"Gross Profit in Billions",
                type: 'value',
                
                nameLocation:"middle",
                nameGap:45,
                // min:Math.round(data.yaxis_data.sort((a,b)=>a-b)-(data.yaxis_data.sort((a,b)=>a-b))*1.2),
                // max:data?Math.round((data.yaxis_data.sort((a,b)=>a-b).reverse()[0])+(data.yaxis_data.sort((a,b)=>a-b).reverse()[0])*0.02):0
                
            },
            title:{
                text:"Gross Profit 10 Years",
                
                textAlign:"left"
            },
            series: [{
                data: data?data.yaxis_data.reverse():"",
                type: 'line',
                itemStyle: {
                    normal: {color: 'rgb(0,145,218)'}
                }

            }],
            grid:{
                containLabel:"true"
            },tooltip: {
                show: true 
            },
        };
        
    
                mychart.setOption(option);
                window.onresize = mychart.resize;
      }

    render() {
        console.log(this.props)
        // debugger
        return (
            <div id="GrossProfit-chart" style={{height: '32rem', width:'100%'}}></div>
        )
    }
}

export default GrossProfitChart
