import React from 'react'
import { Card, Col, Statistic, Icon } from 'antd'
import ReactEcharts from 'echarts-for-react';

import HttpRequest from '../../utils/HttpRequest';

import { getCardHeaderStyle, getChartHeight } from './ShareStyle'

class OpenYearStatChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openMonthStat: [{ 'value': 0, 'name': '2016-10', 'selected': true }],
        };

        this.fetchOpenMonthStat();
    }

    fetchOpenMonthStatCB = (data) => {
        let openMonthStat = data.payload.map((item, index) => {
            return { 'value': item.year_count, 'name': item._id, 'selected': index === 0 };
        })
        this.setState({ openMonthStat });
    }

    fetchOpenMonthStat = () => {
        HttpRequest.asyncGet(this.fetchOpenMonthStatCB, '/cnvd/yearly-stat', { time_type: 'open' });
    }

    getOption() {
        const { openMonthStat } = this.state;
        return {
            // title: { text: '公开时间统计' },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
            },
            //  legend: {
            //             // orient: 'vertical',
            //             bottom: 2,
            //         },
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                containLabel: true
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name: '公开时间',
                    type: 'pie',
                    center: ['40%', '50%'],
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
                    style={{ width: '100%', height: getChartHeight() + 'px' }}
                />
            </Card>
        );
    }
}

export default OpenYearStatChart