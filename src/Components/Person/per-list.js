import React, { Component } from "react";
import { Table, Form, InputNumber } from "antd";
import { db } from "../../Firebase/index";

class Perlist extends Component {
  constructor(props) {
    super(props);
    this.ref = db.collection("per-list");
    this.unsubscribe = null;
    this.state = {
      pid: 0,
      peid: 0,
      coments: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const coments = [];

    querySnapshot.forEach(doc => {
      const {
        perid,
        pername,
        position,
        roomid,
        roomname,
        status,
        numlist
      } = doc.data();
      coments.push({
        key: doc.id,
        doc, // DocumentSnapshot
        perid: perid,
        pername: pername,
        position: position,
        roomid: roomid,
        roomname: roomname,
        status: status,
        numlist: numlist
      });
    });
    this.setState({
      coments
    });
  };

  componentDidUpdate() {
    if (this.state !== 0) {
      this.unsubscribe = this.ref
        .where("perid", "==", this.state.pid)
        .onSnapshot(this.onCollectionUpdate);
    } else {
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }
  }

  onChange = value => {
    const state = this.state;
    state.pid = value;
    this.setState(state);
    console.log(this.state.pid);
  };

  render() {
    const columns = [
      {
        title: "รหัส",
        dataIndex: "perid",
        key: "perid"
      },
      {
        title: "ชื่อ",
        dataIndex: "pername",
        key: "pername"
      },
      {
        title: "ตำแหน่ง",
        dataIndex: "position",
        key: "position"
      },
      {
        title: "รหัสห้อง",
        dataIndex: "roomid",
        key: "roomid"
      },
      {
        title: "ชื่อห้อง",
        dataIndex: "roomname",
        key: "roomname"
      },
      {
        title: "สถานะบุคคล",
        dataIndex: "status",
        key: "status"
      },
      {
        title: "รหัสรายการ",
        dataIndex: "numlist",
        key: "numlist"
      }
    ];

    return (
      <div>
        <Form className="ant-advanced-search-form" onSubmit={this.onSubmit}>
          <h3>Person</h3>

          <Form.Item label="รหัส :">
            <InputNumber
              name="pid"
              onChange={this.onChange}
              value={this.state.pid}
              placeholder="รหัส"
            />
          </Form.Item>
        </Form>
        <br />
        <div className="ant-advanced-search-form">
          <div>
            <Table
              columns={columns}
              onFilter
              dataSource={this.state.coments}
              size="middle"
              scroll={{ x: 300 }}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Perlist;
