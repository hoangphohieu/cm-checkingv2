import React, { useState } from 'react';
import XLSX from 'xlsx';
import _ from 'lodash';
import copy from 'copy-to-clipboard';
import InputExcel from './InputExcel';
import DownloadJson from './DownloadJson';
import CheckFileIn from './CheckFileIn';
import * as GLLMTable1 from './GLLMTable1';
import * as GLLMTable2 from './GLLMTable2';
import * as SILICON from './SILICON';
import ShowItems from './ShowItems';
import * as CheckPhoneCase from './CheckPhoneCase';
import ShowFailCase from './ShowFailCase';
import DemPhoi from '../DemPhoi';

function Body(props) {
    // props.pcPro là thuoc tinh pc
    const [Items, setItems] = useState([]);
    const [FileName, setFileName] = useState("");

    let allFileName = Items.map(item => { return item.idDesign });
    let itemsConvert = [], itemsFailCase = [];
    if (Items.length !== 0) {
        itemsConvert = CheckPhoneCase.Convert(Items, props.pcPro.items)[0];
        itemsFailCase = CheckPhoneCase.Convert(Items, props.pcPro.items)[1];
        if (props.pcPro.type === "glass" || props.pcPro.type === "luminous" || props.pcPro.type === "led") {
            let tableType = JSON.parse(localStorage.tableNomal).tableType;
            if (tableType === "table1")
                itemsConvert = GLLMTable1.convertItems(itemsConvert, props.pcPro.items);
            else if (tableType === "table2")
                itemsConvert = GLLMTable2.convertItems(itemsConvert, props.pcPro.items);

        }
        else if (props.pcPro.type === "silicon") {
            itemsConvert = SILICON.convertItems(itemsConvert, props.pcPro.items);
        }
    }
    let arr = _.flattenDeep(JSON.parse(JSON.stringify(itemsConvert))).length;
    // console.log(arr);
    return (
        <React.Fragment>
            <div>
                {/* in [ut nhập excel] */}
                <InputExcel changeInputItems={(items) => { setItems(items) }} changeFileName={(param) => { setFileName(param) }} />
                {/* kiểm tra file design` */}
                <CheckFileIn skus={allFileName} />
                <div className="so-luong"> Tổng tất cả:{arr} </div>

                {/* kiểm tra sku sai đúng */}
                <ShowFailCase items={itemsFailCase} />
                {/* tải Json */}
                <DownloadJson items={itemsConvert} type={props.pcPro.type} FileName={FileName} />
                {/* hiển thị ốp ra màn hình */}
                <ShowItems items={itemsConvert} type={props.pcPro.type} FileName={FileName} />
                <DemPhoi items={itemsConvert} pcPro={props.pcPro} />


            </div>

        </React.Fragment >
    );
}

export default Body;