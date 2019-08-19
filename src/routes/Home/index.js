import React from 'react'
import { Card, Table } from 'antd'
import './style.css'

import HttpRequest from '../../utils/HttpRequest';

const DEFAULT_PAGE_SIZE = 10;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vulColls: [],
      pageId: 0,
      pageSize: 10,
      totalVuls: 0,
      totalPages: 0,
    };

    this.fetchVulnerData(this.state.pageId, this.state.pageSize);
  }

  fetchVulnerDataCB = (data) => {
    const { pageId, pageSize } = this.state;
    let totalVuls = data.payload.total;
    let totalPages = parseInt(totalVuls / pageSize, 10);
    if (totalVuls % pageSize !== 0) {
      totalPages++;
    }

    let vulColls = data.payload.coll.map((item, index) => { item['index'] = index + pageId * pageSize + 1; return item; });

    this.setState({ totalVuls, totalPages, vulColls: data.payload.coll });
  }

  fetchVulnerData = (pageId, pageSize) => {
    HttpRequest.asyncGet(this.fetchVulnerDataCB, '/cnvd/fetch', { page_id: pageId, page_size: pageSize });
  }

  getColumns = () => {
    return [
      { title: '序号', width: 80, dataIndex: 'index', key: 'index', fixed: 'left' },
      { title: '编号', width: 150, dataIndex: 'number', key: 'cnvd_num', fixed: 'left' },
      { title: '标题', dataIndex: 'title', key: 'title' },
      { title: '等级', dataIndex: 'serverity', key: 'severity', width: 100 },
      // { title: '影响产品', dataIndex: 'products', key: 'products', width: 200 },
      { title: '事件类型', dataIndex: 'isEvent', key: 'isEvent', width: 150 },
      { title: '提交时间', dataIndex: 'submitTime', key: 'submitTime', width: 150 },
      { title: '发现者', dataIndex: 'discovererName', key: 'discovererName', width: 150 },
      // { title: '参考链接', dataIndex: 'referenceLink', key: 'referenceLink', width: 150 },
      // { title: '描述', dataIndex: 'description', key: 'description', width: 150 },
      // { title: '解决方案', dataIndex: 'formalWay', key: 'formalWay', width: 150 },
      // { title: '补丁名称', dataIndex: 'patchName', key: 'patchName', width: 150 },
      // { title: '补丁描述', dataIndex: 'patchDescription', key: 'patchDescription', width: 150 },
      // { title: 'CVE', dataIndex: 'cves', key: 'cves' },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a>查看</a>,
      },
    ];
  }

  /** 处理页面变化（页面跳转/切换/每页记录数变化） */
  handlePageChange = (currentPage, pageSize) => {
    this.setState({ pageId: currentPage - 1, pageSize }, this.fetchVulnerData(currentPage - 1, pageSize));
  }

  getPagination = () => {
    const { pageSize, totalVuls } = this.state;
    let self = this;
    return {
      showTotal: (total, range) => `${range[0]}-${range[1]} / ${total}`,
      pageSizeOptions: [DEFAULT_PAGE_SIZE.toString(), '20', '30', '50'],
      defaultPageSize: DEFAULT_PAGE_SIZE,
      showQuickJumper: true,
      showSizeChanger: true,
      total: totalVuls,
      onShowSizeChange(current, pageSize) {  //当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        self.handlePageChange(current, pageSize);
      },
      onChange(current, pageSize) {  //点击改变页数的选项时调用函数，current:将要跳转的页数
        self.handlePageChange(current, pageSize);
      },
    };
  }

  render() {
    const { vulColls } = this.state;

    return (
      <div style={styles.bg} className='home'>
        <Card bordered={false} title='漏洞数据集合' style={{ marginBottom: 10, minHeight: 440 }} id='fixed'>
          <Table
            dataSource={vulColls}
            columns={this.getColumns()}
            bordered
            style={styles.tableStyle}
            pagination={this.getPagination()}
            scroll={{ x: 1500, y: 500 }} />
        </Card>
      </div>
    )
  }
}

const styles = {
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 'calc(100vh - 64px)'
  },
  tableStyle: {
    width: '100%'
  },
}

export default Home