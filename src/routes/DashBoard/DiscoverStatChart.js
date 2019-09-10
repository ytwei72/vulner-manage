import React from 'react'
import { Card, Col, Statistic, Icon } from 'antd'
import ReactEcharts from 'echarts-for-react';

import HttpRequest from '../../utils/HttpRequest';

import { getCardHeaderStyle, getChartHeight } from './ShareStyle'

class DiscoverStatChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            discoverStat: [{ 'value': 0, 'name': 'Simons', 'selected': true }],
            included: {},
            legendName: [],
            totalCount: 0,
        };

        this.fetchDiscoverStat();
    }

    fetchDiscoverStatCB = (data) => {
        let legendName = [];
        let included = {};
        let totalCount = data.payload.total;
        let discoverStat = data.payload.stat.map((item, index) => {
            let alias = item._id.slice(0, 16);
            legendName.push(alias);
            included[alias] = (index < 10);
            return { 'value': item.count, 'name': alias, 'selected': index === 0 };
        })
        // let discoverStat = data.payload.slice(0, 10).map((item, index) => {
        //     return { 'value': item.count, 'name': item._id, 'selected': index === 0 };
        // })
        // let others = 0;
        // for (let item of data.payload.slice(10)) {
        //     others += item.count;
        // }
        // discoverStat.push({ 'value': others, 'name': '其它' })
        this.setState({ discoverStat, legendName, included, totalCount });
    }

    fetchDiscoverStat = () => {
        HttpRequest.asyncGet(this.fetchDiscoverStatCB, '/cnvd/discoverer-stat', {max_count: 50});
    }

    getOption() {
        const { discoverStat, legendName, included } = this.state;
        return {
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: legendName,
                selected: included
            },
            // legend: {
            //     orient: 'vertical',
            //     bottom: 2,
            // },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                containLabel: true
            },
            series: [
                {
                    name: '发现者',
                    type: 'pie',
                    radius: '55%',
                    center: ['40%', '50%'],
                    data: discoverStat,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
            // series: [
            //     {
            //         name: '发现者',
            //         type: 'pie',
            //         selectedMode: 'single',
            //         radius: ['40%', '60%'],
            //         data: discoverStat
            //     },

            // ]

        };
    }

    getExtra() {
        const { totalCount } = this.state;
        return (<div style={{ color: 'white' }}>
            {'共有发现者：' + totalCount}
        </div>);
    }

    render() {
        // let onEvents = {
        //     'click': this.onChartClick.bind(this)
        // }
        return (
            <Card title="发现者贡献统计" extra={this.getExtra()} headStyle={getCardHeaderStyle()}>
                <ReactEcharts
                    option={this.getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                    // onEvents={onEvents}
                    style={{ width: '100%', height: getChartHeight() + 'px' }}
                />
            </Card>
        );
    }
}

export default DiscoverStatChart