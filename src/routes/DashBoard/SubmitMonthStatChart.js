import React from 'react'
import { Card, Row, Col, Statistic, Icon } from 'antd'
import ReactEcharts from 'echarts-for-react';

import HttpRequest from '../../utils/HttpRequest';

import { getCardHeaderStyle } from './ShareStyle'

class SubmitMonthStatChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitMonthStat: [{ _id: "2016-10", month_count: 0 }],
        };

        this.fetchSubmitMonthStat();
    }

    fetchSubmitMonthStatCB = (data) => {
        this.setState({ submitMonthStat: data.payload });
    }

    fetchSubmitMonthStat = () => {
        HttpRequest.asyncGet(this.fetchSubmitMonthStatCB, '/cnvd/month-stat', { time_type: 'submit' });
    }

    getSubmitMonthStatChart = () => {
        const { submitMonthStat } = this.state;
        return (
            <ReactEcharts
                option={{
                    // title: { text: '按提交月份统计' },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    dataset: { source: submitMonthStat },
                    grid: {
                        left: '3%',
                        right: '3%',
                        top: '60',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis: {
                        name: '数量',
                    },
                    xAxis: {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            rotate: 60,
                            // formatter: function(value) {
                            //     return value.slice(0, 6);
                            // }
                        }
                    },
                    dataZoom: [{
                        type: 'inside',
                        xAxisIndex: 0,
                        minSpan: 5
                    }, {
                        type: 'slider',
                        xAxisIndex: 0,
                        minSpan: 5,
                        height: 20,
                        top: 0,
                        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '100%',
                        showDetail: false
                    }],
                    series: [
                        {
                            name: '漏洞数',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    color: '#27727B',
                                    label: {
                                        show: true,
                                        position: 'top',
                                    }
                                }
                            },
                            encode: {
                                // Map the "month_count" column to Y axis.
                                y: 'month_count',
                                // Map the "_id" column to X axis
                                x: '_id'
                            }
                        }
                    ]
                }}
                notMerge={true}
                lazyUpdate={true}
                // onEvents={onEvents}
                style={{ width: '100%', height: '300px' }}
            />
        );
    }

    getExtra() {
        return (<div style={{color: 'white'}}>
            {'用鼠标滚轮或按键拖动滑动条两端来缩放'}
        </div>);
    }

    render() {
        return (<div>
            <Card title="按提交月份统计" extra={this.getExtra()} headStyle={getCardHeaderStyle()}>
                {this.getSubmitMonthStatChart()}
            </Card>
        </div>);
    }
}

export default SubmitMonthStatChart