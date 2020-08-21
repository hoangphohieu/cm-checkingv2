import React from 'react';
import _ from "lodash";
function DemPhoi(props) {
    let items = _.flattenDeep(props.items);
    let pcPro = props.pcPro.items;
    let amountAllPhoneCase = [];
    let listPC = pcPro.map(param => param.nameDefault);
    console.log(items);
    for (let i = 0; i < listPC.length; i++) {
        let data2 = items.filter(param => param.case === listPC[i]);
        // console.log(data2);

        if (data2.length !== 0) {
            let am = 0;
            data2.forEach(element => {
                am = am + 1
            });
            amountAllPhoneCase = [...amountAllPhoneCase, <tr key={i}>
                <td >{amountAllPhoneCase.length + 1}</td>
                <td>{listPC[i]}</td>
                <td >{am}</td>
            </tr>];
        }

    }
    return (
        <div className="container">
            {(items.length !== 0 ? <div className="row">
                <div className="col-5">
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <td >STT</td>
                                <td >Tên</td>
                                <td >Số lượng</td>
                            </tr>
                        </thead>

                        <tbody>
                            {amountAllPhoneCase}
                        </tbody>
                    </table>
                </div>
            </div> : "")}

        </div>

    )
}

export default DemPhoi;