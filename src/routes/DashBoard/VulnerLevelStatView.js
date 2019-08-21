import React from 'react'
import { Card, Tag, Col, Statistic, Icon } from 'antd'
import ReactEcharts from 'echarts-for-react';

import HttpRequest from '../../utils/HttpRequest';

import SubmitMonthStatChart from './SubmitMonthStatChart';
import FixedProgress from './FixedProgress';
import OpenMonthStatChart from './OpenMonthStatChart';
import { getCardHeaderStyle } from './ShareStyle'

class VulnerLevelStatView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vulnerLevelStat: [{ level: '低', count: 0 }, { level: '中', count: 0 }, { level: '高', count: 0 }],
            totalCount: 0,
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

        let totalCount = 0;
        for (let item of vulnerLevelStat) { totalCount += item.count; }

        this.setState({ vulnerLevelStat, totalCount });
    }

    fetchVulnerLevelStat = () => {
        HttpRequest.asyncGet(this.fetchVulnerLevelStatCB, '/cnvd/level-stat');
    }

    getTitle = (index) => {
        // return (<div>
        //     <Tag color={color}>{level}</Tag>
        //     </div>);
    }

    getVulnerLevelStat = (index) => {
        if (index < 0 || index > 2) {
            return (<Statistic title={'未知'} />);
        }
        const { vulnerLevelStat, totalCount } = this.state;
        let level = vulnerLevelStat[index].level;
        let color = ['#ba68c8', 'gold', 'red'][index];
        let count = vulnerLevelStat[index].count;
        let percent = (count * 100.0 / totalCount).toFixed(1);
        return (
            // <Card>
            <Statistic
                // style={{ marginLeft: 0}}
                title={<Tag color={color}>{level + "(" + percent + "%)"}</Tag>}
                // prefix={<Tag color={color}>{level}</Tag>}
                // suffix={"(" + percent + "%)"}
                value={count}
                valueStyle={{ fontSize: 40, color: color, textAlign: 'center' }}
            />
            // </Card>
        );
    }

    getExtra() {
        const { totalCount } = this.state;
        return (<div style={{ color: 'white' }}>
            {'总计' + totalCount + '条'}
        </div>);
    }

    render() {
        return (<div>
            <Card title="漏洞严重程度统计" extra={this.getExtra()} headStyle={getCardHeaderStyle()}>
                <Card.Grid style={{ width: '32%', textAlign: 'center', marginLeft: '1%' }}>{this.getVulnerLevelStat(0)}</Card.Grid>
                <Card.Grid style={{ width: '32%', textAlign: 'center', marginLeft: '1%' }}>{this.getVulnerLevelStat(1)}</Card.Grid>
                <Card.Grid style={{ width: '32%', textAlign: 'center', marginLeft: '1%' }}>{this.getVulnerLevelStat(2)}</Card.Grid>
                {/* <Card.Grid style={{ width: '15%', textAlign: 'center', marginLeft: 0}}>漏洞严重程度统计漏洞严重程度统计漏洞严重程度统计漏洞严重程度统计漏洞严重程度统计漏洞严重程度统计漏洞严重程度统计</Card.Grid> */}
            </Card>
        </div>);
    }
}

export default VulnerLevelStatView