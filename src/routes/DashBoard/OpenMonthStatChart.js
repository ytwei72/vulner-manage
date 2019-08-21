import React from 'react'
import { Card, Col, Statistic, Icon } from 'antd'
import ReactEcharts from 'echarts-for-react';

import HttpRequest from '../../utils/HttpRequest';

import { getCardHeaderStyle } from './ShareStyle'

class OpenMonthStatChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openMonthStat: [{ 'value': 0, 'name': '2016-10', 'selected': true }],
        };

        this.fetchOpenMonthStat();
    }

    fetchOpenMonthStatCB = (data) => {
        let openMonthStat = data.payload.map((item, index) => {
            return { 'value': item.month_count, 'name': item._id, 'selected': index === 0 };
        })
        this.setState({ openMonthStat });
    }

    fetchOpenMonthStat = () => {
        HttpRequest.asyncGet(this.fetchOpenMonthStatCB, '/cnvd/month-stat', { time_type: 'open' });
    }

    getOption() {
        const { openMonthStat } = this.state;
        return {
            // title: { text: '公开时间统计' },
            legend: {
                // orient: 'vertical',
                bottom: 2,
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name: '公开时间',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: ['40%', '60%'],
                    data: openMonthStat
                },

            ]

        };
    }

    render() {
        // let onEvents = {
        //     'click': this.onChartClick.bind(this)
        // }
        return (
            <Card title="公开时间统计" headStyle={getCardHeaderStyle()}>
                <ReactEcharts
                    option={this.getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                    // onEvents={onEvents}
                    style={{ width: '100%', height: '300px' }}
                />
            </Card>
        );
    }
}

export default OpenMonthStatChart