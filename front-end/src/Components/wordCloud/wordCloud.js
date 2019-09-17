import React, {Fragment, Component} from 'react';
import echarts from 'echarts';
import 'echarts-wordcloud';


class Wordcloud extends Component {
    
  componentDidMount() {
    const {data} = this.props;
    const wordMap = this.createWordMap(data)
    const chartData = this.formatData(wordMap)
    this.setup(chartData)
  }
  componentDidUpdate() {
    const {data} = this.props;
    const wordMap = this.createWordMap(data)
    const chartData = this.formatData(wordMap)
    this.setup(chartData)
  }

  formatData = (wordsMap) => {
    const data = Object.keys(wordsMap).map((key)=>{
      return {
            name: key,
            value: wordsMap[key]
        }
    })
    return data
  }

  createWordMap = (wordsArray) => {

  // create map for word counts
  var wordsMap = {};
  /*
    wordsMap = {
      'Oh': 2,
      'Feelin': 1,
      ...
    }
  */
  wordsArray.forEach(function (key) {
    if (wordsMap.hasOwnProperty(key)) {
      wordsMap[key]++;
    } else {
      wordsMap[key] = 1;
    }
  });

  return wordsMap;

}

  setup = (chartData) => {
    const mychart = echarts.init(document.getElementById('wordcloud-chart'));
    const option = {
                tooltip: {},
        //  title : {
        //   text: 'Red - Already Over - Lyrics',
        // },
                series: [ {
                    type: 'wordCloud',
                    gridSize: 0,
                    drawOutOfBound:true,
                    sizeRange: [9, 50],
                    rotationRange: [-45, 45],
                    shape: 'pentagon',
                    width: 1800,
                    height: 800,
                    right:null,
                    bottom:null,
                    textStyle: {
                        normal: {
                            color: function () {
                                return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: chartData
                } ]
            };

            mychart.setOption(option);
            window.onresize = mychart.resize;
  }

  render() {
    return (
        <div className="container-fluid" id="accordion1" style={{ minWidth: "-webkit-fill-available" }}>
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne1" aria-expanded="true" aria-controls="collapseOne1">
                                Word Cloud
        </button>
                        </h5>
                    </div>

                    <div id="collapseOne1" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion1">
                        <div className="card-body" dtyle={{    minHeight: "200px",
    maxHeight: "500px"}}>
                            <center>
                        <div id="wordcloud-chart" style={{height: '40rem', width:'100%'}}></div></center>
      </div>
                    </div>
                </div>


            </div>
    //   <div id="wordcloud-chart" style={{height: '500px', width:'500px'}}></div>
    );
  }
}

export default Wordcloud;
