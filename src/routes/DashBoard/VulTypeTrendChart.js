import React from 'react'
import { Card, Row, Col, Statistic, Icon } from 'antd'
import ReactEcharts from 'echarts-for-react';

import HttpRequest from '../../utils/HttpRequest';

import { getCardHeaderStyle, getChartHeight } from './ShareStyle'

class VulTypeTrendChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vulTypeTrends: [{ _id: "HTML注入漏洞", count: 0 }],
        };

        this.fetchVulTypeTrend();
    }

    fetchVulTypeTrendCB = (data) => {
        this.setState({ vulTypeTrends: data.payload });
    }

    fetchVulTypeTrend = () => {
        HttpRequest.asyncGet(this.fetchVulTypeTrendCB, '/cnvd/vul-type-trend');
    }

    getOption() {
        return {
            legend:{},
            // legend: {
            //     type: 'scroll',
            //     orient: 'vertical',
            //     right: 10,
            //     top: 20,
            //     bottom: 20,
            //     // data: legendName,
            //     // selected: included
            // },
            // title: { text: '常见漏洞趋势' },
            grid: {
                left: '0%',
                right: '0%',
                top: '5%',
                bottom: '0%',
                // containLabel: true
            },
            tooltip: {},
            xAxis: {
                data: ['系统服务', '账号配置', '防火墙', '审计配置', 'SQL注入', 'DDos', '自定义']
            },
            yAxis: {
                // type: 'value',
                // axisLabel: {
                //     formatter: '{value}'
                // }
            },
            series: [
                {
                    name: '内存访问漏洞',
                    type: 'line',
                    barGap: 0,
                    data: [320, 332, 301, 334, 97, 156, 390]
                },
                {
                    name: 'SQL注入漏洞',
                    type: 'line',
                    data: [220, 182, 191, 234, 197, 56, 290]
                },
                {
                    name: '拒绝服务漏洞',
                    type: 'line',
                    data: [150, 232, 201, 154, 67, 256, 190]
                },
                {
                    name: '跨站脚本漏洞',
                    type: 'line',
                    data: [98, 77, 101, 99, 297, 36, 40]
                }
            ]

        };
    }

    getExtra() {
        return (<div style={{ color: 'white' }}>
            {/* {'用鼠标滚轮或按键拖动滑动条两端来缩放'} */}
        </div>);
    }

    render() {
        return (<div>
            <Card>
                <ReactEcharts option={this.getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                    // onEvents={onEvents}
                    style={{ width: '100%', height: 142}}
                />
            </Card>
        </div>);
    }
}

export default VulTypeTrendChart