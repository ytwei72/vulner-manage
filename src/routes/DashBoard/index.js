import React from 'react'
import { Card, Row, Col, Statistic, Icon } from 'antd'
import ReactEcharts from 'echarts-for-react';

import HttpRequest from '../../utils/HttpRequest';

import SubmitMonthStatChart from './SubmitMonthStatChart';
import FixedProgress from './FixedProgress';
import OpenMonthStatChart from './OpenMonthStatChart';
import VulnerLevelStatView from './VulnerLevelStatView';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vulnerLevelStat: [{ level: '低', count: 0 }, { level: '中', count: 0 }, { level: '高', count: 0 }],
        };

        this.fetchVulnerLevelStat();
    }

    getLevelCount = (stat, level) => {
        for (let data of stat) {
            if (data._id === level) {
                return data.count;
            }
        }
        return 0;
    }

    fetchVulnerLevelStatCB = (data) => {
        let vulnerLevelStat = [];
        vulnerLevelStat.push({ level: '低', count: this.getLevelCount(data.payload, '低') });
        vulnerLevelStat.push({ level: '中', count: this.getLevelCount(data.payload, '中') });
        vulnerLevelStat.push({ level: '高', count: this.getLevelCount(data.payload, '高') });

        this.setState({ vulnerLevelStat });
    }

    fetchVulnerLevelStat = () => {
        HttpRequest.asyncGet(this.fetchVulnerLevelStatCB, '/cnvd/level-stat');
    }

    getVulnerLevelStat = (index) => {
        if (index < 0 || index > 2) {
            return (<Card><Statistic title={'漏洞严重程度--未知'} /></Card>);
        }
        const { vulnerLevelStat } = this.state;
        let title = '漏洞严重程度--' + vulnerLevelStat[index].level;
        let color = ['#ba68c8', 'gold', 'red'][index];
        let count = vulnerLevelStat[index].count;
        return (
            <Card>
                <Statistic
                    title={title}
                    value={count}
                    valueStyle={{ fontSize: 40, color: color, textAlign: 'center' }}
                />
            </Card>
        );
    }

    render() {
        return (<div>
            <Row gutter={8} >
                <Col span={10}>
                    <VulnerLevelStatView />
                </Col>
                <Col span={3}>
                    <FixedProgress />
                </Col>
            </Row>
            <Row gutter={8} style={{marginTop: 8}}>
                <Col span={17}>
                    <SubmitMonthStatChart />
                </Col>
                <Col span={7}>
                    <OpenMonthStatChart />
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={4}>
                    {this.getVulnerLevelStat(0)}
                </Col>
                <Col span={4}>
                    {this.getVulnerLevelStat(1)}
                </Col>
                <Col span={4}>
                    {this.getVulnerLevelStat(2)}
                </Col>
                <Col span={4}>
                    <FixedProgress />
                </Col>
            </Row>
        </div>);
    }
}

export default DashBoard