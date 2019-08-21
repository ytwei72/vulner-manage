import React from 'react'
import { Card, Row, Col, Progress, Icon } from 'antd'
import ReactEcharts from 'echarts-for-react';

import HttpRequest from '../../utils/HttpRequest';

import { getCardHeaderStyle } from './ShareStyle'

class FixedProgress extends React.Component {
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

    render() {
        let percent = this.state.percent;
        if (!!percent) {
            percent = percent.toFixed(2) - 0;
        } else {
            percent = 0.0;
        }

        return (
            <Card title="修复率" headStyle={getCardHeaderStyle()}>
                <div style={{ align: 'center' }}>
                    <Progress type="circle" percent={percent} status={'active'} width={86} strokeWidth={10} />
                </div>
            </Card>
        );
    }
}

export default FixedProgress