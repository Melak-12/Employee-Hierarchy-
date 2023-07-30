import { Table } from 'antd'
import React from 'react'

const TableData = ({columns,dataSource,style}) => {
  return (
      <>
      <Table
        columns={columns}
        dataSource={dataSource}
        style={style}
        rowKey="id"
        className="tables custom-table"
        pagination={{ pageSize: 5 }}
        rowClassName={() => 'custom-row'}

      />
      </>
  )
}

export default TableData