import React, { Component } from "react";
import { Table, Form, InputNumber } from "antd";
import { db } from "../../Firebase/index";

class Prolist extends Component {
  constructor(props) {
    super(props);
    this.ref = db.collection("product-list");
    this.unsubscribe = null;
    this.state = {
      id: 0,
      coments: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const coments = [];

    querySnapshot.forEach(doc => {
      const {
        id,
        productname,
        status,
        roomid,
        roomname,
        perid,
        pername,
        numlist
      } = doc.data();
      coments.push({
        key: doc.id,
        doc, // DocumentSnapshot
        id: id,
        productname: productname,
        status: status,
        roomid: roomid,
        roomname: roomname,
        perid: perid,
        pername: pername,
        numlist: numlist,
      });
    });
    this.setState({
      coments
    });
  };

  componentDidUpdate() {
    if (this.state !== 0) {
      this.unsubscribe = this.ref
        .where("id", "==", this.state.id)
        .onSnapshot(this.onCollectionUpdate);
    } else {
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }
  }

  onChange = value => {
    const state = this.state;
    state.id = value;
    this.setState(state);
    console.log(this.state.id);
  };

  render() {
    const columns = [
      {
        title: "รหัส",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "ชื่อ",
        dataIndex: "productname",
        key: "productname"
      },
      {
        title: "สถานะ",
        dataIndex: "status",
        key: "status"
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
        title: "รหัสผู้ดูแล",
        dataIndex: "perid",
        key: "perid"
      },
      {
        title: "ชื่อผู้ดูแล",
        dataIndex: "pername",
        key: "pername"
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
        <h3>
        Inventory
          </h3>

          <Form.Item label="รหัส :">
            <InputNumber
              name="id"
              onChange={this.onChange}
              value={this.state.id}
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

export default Prolist;
