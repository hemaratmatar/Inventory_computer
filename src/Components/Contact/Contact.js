import React, { Component } from "react";
import { Row } from "antd";


export default class Contact extends Component {
    render() {
        return (
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4>ติดต่อเรา</h4>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">เกี่ยวกับผู้จัดทำ</h5>
                                <h6 class="card-title">รายชื่อผู้จัดทำ</h6>
                                <p class="card-text"> นาย เหมรัตน์ มาตรา </p>
                                <p class="card-text"> นาย เอกรินทร์ ศรีมุงคุณ </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}