import { Form, Row, Col, Button, Table, Input } from "antd";
import React, { Component } from "react";
import "./room.css";
import { Link } from "react-router-dom";
import { db } from "../../Firebase/index";

class AdvancedSearchForm extends Component {
  state = {
    expand: false
  };
  constructor() {
    super();
    this.ref = db.collection("room-list");
    this.state = {
      roomid: "",
      roomname: "",
      perid: "",
      pername: "",
      point: ""
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const { roomid, roomname, perid, pername, point } = this.state;

    this.ref
      .add({
        roomid,
        roomname,
        perid,
        pername,
        point
      })
      .then(docRef => {
        this.setState({
          roomid: "",
          roomname: "",
          perid: "",
          pername: "",
          point: ""
        });
        this.props.history.push("/room");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  // To generate mock Form.Item

  render() {
    const {
        roomid,
        roomname,
        perid,
        pername,
        point
    } = this.state;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.onSubmit}>
        <Row gutter={24}>
          <h2>
            <Link to="/room">Room</Link>
          </h2>
          <Col span={8}>
            <Form.Item label="รหัสห้อง :">
              <Input
                name="roomid"
                value={roomid}
                onChange={this.onChange}
                placeholder="รหัสห้อง"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="ชื่อห้อง :">
              <Input
                name="roomname"
                onChange={this.onChange}
                value={roomname}
                placeholder="ชื่อห้อง"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="รหัสผู้ดูแล :">
              <Input
                name="perid"
                value={perid}
                onChange={this.onChange}
                placeholder="รหัสผู้ดูแล"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="ชื่อผู้ดูแล :">
              <Input
                name="pername"
                value={pername}
                onChange={this.onChange}
                placeholder="ชื่อผู้ดูแล"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="อาคาร :">
              <Input
                name="point"
                onChange={this.onChange}
                value={point}
                placeholder="อาคาร"
              />
            </Form.Item>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
const WrappedAdvancedSearchForm = Form.create({ name: "advanced_search" })(
  AdvancedSearchForm
);

class Room extends Component {
  constructor(props) {
    super(props);
    this.ref = db.collection("room-list");
    this.unsubscribe = null;
    this.state = {
      coments: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const coments = [];
    querySnapshot.forEach(doc => {
      const {
        roomid,
        roomname,
        perid,
        pername,
        point
      } = doc.data();
      coments.push({
        key: doc.id,
        //doc, // DocumentSnapshot
        roomid: roomid,
        roomname: roomname,
        perid: perid,
        pername: pername,
        point: point,
        Edit: (
          <Link to={`/room-show/${doc.id}`}>
            <Button type="primary" shape="round" icon="edit">
              Edit
            </Button>
          </Link>
        )
      });
    });
    this.setState({
      coments
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    const columns = [
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
        title: "อาคาร",
        dataIndex: "point",
        key: "point"
      },
      {
        title: "Edit",
        dataIndex: "Edit",
        key: "Edit"
      }
    ];

    return (
      <div>
        <WrappedAdvancedSearchForm />
        <br />
        <div className="ant-advanced-search-form">
          <div>
            <Table columns={columns} dataSource={this.state.coments} />
          </div>
        </div>
      </div>
    );
  }
}
export default Room;
