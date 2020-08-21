import React, { useState } from 'react';
import _ from 'lodash';
import copy from 'copy-to-clipboard';
function CheckFileIn(props) {
    const [ArrNameFile, setArrNameFile] = useState([]);

    let checkFilesNone = (event) => {
        let arr = [];
        let input = event.target;
        for (var i = 0; i < input.files.length; i++) {
            let name = input.files[i].name;
            name = name.split(".");
            name = name[0].toLowerCase();
            arr.push(name);
        }
        setArrNameFile(arr)
    }

    let copyText = (param) => {
        copy(param)
    }
    let skus = props.skus;

    skus = skus.map(item => { return item.trim() })
    let itemsNone = _.differenceBy(skus, ArrNameFile, (param) => param.toLowerCase());

    itemsNone = [...new Set(itemsNone)]
    let tableitemsnone = [];
    for (let j = 0; j < itemsNone.length; j++) {
        tableitemsnone.push(
            <tr key={j}>
                <td >{j + 1}</td>
                <td  onClick={() => copyText(itemsNone[j])} style={{ cursor: "pointer" }}>{itemsNone[j]}</td>
            </tr>)
    }
    return (
        <div className="">
            <div className="d-flex justify-content-center">
                <input id='file-input' type='file' className=" btn btn-info" onChange={checkFilesNone} multiple style={{ display: "none" }} />
                <label htmlFor="file-input" className="input_exel btn btn-info">Kiểm tra File Tif (phòng in)</label>
            </div>

            <div className="row justify-content-center">
                <div className="col-5">
                    {
                        (tableitemsnone.length !== 0) ? (<table className="table table-striped table_amounts">
                            <thead>
                                <tr>
                                    <td >STT</td>
                                    <td >Tên</td>
                                </tr>
                            </thead>
                            <tbody>
                                {tableitemsnone}
                            </tbody>
                        </table>) : ""
                    }
                </div>

            </div>
        </div>
    );
}

export default CheckFileIn;