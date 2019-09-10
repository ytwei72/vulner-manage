import React from 'react'
import { Card, Statistic, Tag, Progress, Icon } from 'antd'
import ReactEcharts from 'echarts-for-react';

import HttpRequest from '../../utils/HttpRequest';

import { getCardHeaderStyle, getChartHeight } from './ShareStyle'

class StatCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.name,
            value: this.props.count,
        };

        // this.fetchFixedStat();
    }

    // fetchFixedStatCB = (data) => {
    //     let fixed = data.payload.fixed;
    //     let unfixed = data.payload.unfixed;
    //     let percent = fixed * 100.0 / (fixed + unfixed);
    //     this.setState({ percent });
    // }

    // fetchFixedStat = () => {
    //     HttpRequest.asyncGet(this.fetchFixedStatCB, '/cnvd/fix-stat');
    // }

    render() {
        const { title, value } = this.state; 

        return (
            <Card title={title} headStyle={getCardHeaderStyle()}>
                <Statistic
                // style={{ marginLeft: 0}}
                title={<Tag color={'gold'}>{title}</Tag>}
                // prefix={<Tag color={color}>{level}</Tag>}
                // suffix={"(" + percent + "%)"}
                style={{ textAlign: 'center' }}
                value={value}
                valueStyle={{ fontSize: 40, color: 'purple', textAlign: 'center' }}
            />
            </Card>
        );
    }
}

export default StatCard