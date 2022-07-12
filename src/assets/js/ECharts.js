// 导入echarts
import echarts from 'echarts';

const install = function (Vue, option) {
    Object.defineProperties(Vue.prototype, {
        $myCharts: {
            get() {
                return {
                    User(id, data) {
                        var myChart = echarts.init(document.getElementById(id));
                        var option = {
                            legend: {
                                top: '5%',
                                left: 'center'
                            },
                            tooltip: {
                                trigger: 'item'
                            },
                            series: [
                                {
                                    name: '商品价格数量',
                                    type: 'pie',
                                    radius: ['40%', '60%'],
                                    avoidLabelOverlap: false,
                                    itemStyle: {
                                        borderRadius: 10,
                                        borderColor: '#fff',
                                        borderWidth: 2
                                    },
                                    label: {
                                        show: false,
                                        position: 'center'
                                    },
                                    emphasis: {
                                        label: {
                                            show: true,
                                            fontSize: '35',
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    data: [
                                        { value: data[0].length, name: '0~50元' },
                                        { value: data[1].length, name: '50~100元' },
                                        { value: data[2].length, name: '100~200元' },
                                        { value: data[3].length, name: '200~500以上' },
                                        { value: data[4].length, name: '500元以上' },
                                    ]
                                }
                            ]
                        };
                        myChart.setOption(option);
                    },
                    OrderData(id, data) {
                        var myChart = echarts.init(document.getElementById(id));
                        const xData = data.map(item => {
                            return Number(item.detail_price)
                        })
                        // const average = (xData.reduce((a, b) => a + b, 0) / data.length).toFixed(2);
                        const yData = data.map(item => {
                            return item.orderId.slice(0, 2) + '-' + item.orderId.slice(2, 4) + '-' + item.orderId.slice(4, 6) + ':' + item.orderId.slice(6, 8)
                        })
                        var option = {
                            xAxis: {
                                type: 'category',
                                data: yData,
                                boundaryGap: false
                            },
                            yAxis: {
                                type: 'value'
                            },

                            series: [
                                {
                                    type: 'line',
                                    data: xData,
                                    label: {
                                        show: true,	// 是否可见
                                        rotate: 0 	// 旋转角度
                                    },
                                    smooth: true,
                                    areaStyle: {
                                        color: 'pink'
                                    },
                                    markPoint: {
                                        data: [
                                            {
                                                type: 'max',
                                                name: '最大值'
                                            },
                                            {
                                                type: 'min',
                                                name: '最小值'
                                            }
                                        ]
                                    },
                                    markLine: {
                                        data: [
                                            {
                                                type: 'average',
                                                name: 'average'
                                            }
                                        ]
                                    },
                                },
                            ]
                        }
                        myChart.setOption(option);
                    },
                    PriceContrast(id, data) {
                        // console.log(data);
                        var myChart = echarts.init(document.getElementById(id));
                        var xAxisData = [];
                        var data1 = [];
                        var data2 = [];
                        data.forEach(item => {
                            xAxisData.push(item.name);
                            data1.push(item.pprice);
                            data2.push(item.price);
                        }, this)
                        var option = {
                            title: {
                                text: '商品价格对比',
                            },
                            legend: {
                                data: ['打折前', '打折后']
                            },
                            toolbox: {
                                // y: 'bottom',
                                feature: {
                                    magicType: {
                                        type: ['stack']
                                    },
                                    dataView: {},
                                    saveAsImage: {
                                        pixelRatio: 2
                                    }
                                }
                            },
                            tooltip: {},
                            xAxis: {
                                data: xAxisData,
                                splitLine: {
                                    show: false
                                }
                            },
                            yAxis: {},
                            series: [
                                {
                                    name: '打折前',
                                    type: 'bar',
                                    data: data1,
                                    emphasis: {
                                        focus: 'series'
                                    },
                                    animationDelay: function (idx) {
                                        return idx * 10;
                                    }
                                },
                                {
                                    name: '打折后',
                                    type: 'bar',
                                    data: data2,
                                    emphasis: {
                                        focus: 'series'
                                    },
                                    animationDelay: function (idx) {
                                        return idx * 10 + 100;
                                    }
                                }
                            ],
                            animationEasing: 'elasticOut',
                            animationDelayUpdate: function (idx) {
                                return idx * 5;
                            }
                        }
                        myChart.setOption(option);
                    }
                }
            }
        }
    });
};

export default {
    install
};