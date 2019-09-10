import React from 'react'
import { Card, Row, Col, Statistic, Icon } from 'antd'
import ReactEcharts from 'echarts-for-react';

import HttpRequest from '../../utils/HttpRequest';

import SubmitMonthStatChart from './SubmitMonthStatChart';
import FixedProgress from './FixedProgress';
import OpenYearStatChart from './OpenYearStatChart';
import VulnerLevelStatView from './VulnerLevelStatView';
import DiscoverStatChart from './DiscoverStatChart';
import VulTypeStatChart from './VulTypeStatChart';
import VulTypeTrendChart from './VulTypeTrendChart';
import VulTypeWordCloud from './VulTypeWordCloud';
import StatCard from './StatCard';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (<div>
            <Row gutter={8} >
                <Col span={10}>
                    <VulnerLevelStatView />
                </Col>
                <Col span={11}>
                    <VulTypeWordCloud />
                </Col>
                {/* <Col xs={{ span: 6 }} md={{ span: 5 }} lg={{ span: 4 }} xl={{ span: 3 }} xxl={{ span: 2 }}> */}
                <Col span={3}>
                    <FixedProgress />
                </Col>
                {/* <Col span={3}>
                    <StatCard name={'缺陷产品数'} count={1299}/>
                </Col>
                <Col span={3}>
                    <StatCard name={'公司数量'} count={345}/>
                </Col>
                <Col span={3}>
                    <StatCard name={'CVE'} count={601}/>
                </Col>
                <Col span={3}>
                    <StatCard name={'CVE'} count={601}/>
                </Col> */}
            </Row>
            <Row gutter={8} style={{ marginTop: 8 }}>
                <Col span={16}>
                    <SubmitMonthStatChart />
                </Col>
                <Col span={8}>
                    <OpenYearStatChart />
                </Col>
            </Row>
            <Row gutter={8} style={{ marginTop: 8 }}>
                <Col span={12}>
                    <VulTypeStatChart />
                </Col>
                <Col span={12}>
                    <DiscoverStatChart />
                </Col>
            </Row>
        </div>);
    }
}

export default DashBoard