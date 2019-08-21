import React from 'react'
import { Card, Row, Col, Statistic, Icon } from 'antd'
import ReactEcharts from 'echarts-for-react';

import HttpRequest from '../../utils/HttpRequest';

class FixedGauge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '解决率',
            percent: 0.0,
        };

        this.fetchFixedStat();
    }

    fetchFixedStatCB = (data) => {
        let fixed = data.payload.fixed;
        let unfixed = data.payload.unfixed;
        let percent = fixed * 100.0 / (fixed + unfixed);
        this.setState({ percent });
    }

    fetchFixedStat = () => {
        HttpRequest.asyncGet(this.fetchFixedStatCB, '/cnvd/fix-stat');
    }

    getOption() {
        const { name } = this.state;
        return {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    name: '漏洞',
                    type: 'gauge',
                    // radius: "100%",
                    detail: {formatter:'{value}%'},
                    data: [{value: 50, name}]
                }
            ]
        };
    }

    render() {
        const { percent } = this.state;
        let option = this.getOption();
        if (!!percent) {
            option.series[0].data[0].value = percent.toFixed(2) - 0;
        }

        return (
            <ReactEcharts option={option} />
        );
    }
}

export default FixedGauge