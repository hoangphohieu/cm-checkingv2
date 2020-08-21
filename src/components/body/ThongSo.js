import React, { useState, useEffect } from 'react';
import axios from "axios";
function ThongSo(props) {
    // const [FetchIP, setFetchIP] = useState();
    const [FetchIP, setFetchIP] = useState(localStorage.myIp);
    const [Input, setInput] = useState("");
    const [FileDesign, setFileDesign] = useState("");
    const [Table, setTable] = useState({ w: 2400, h: 1300, oIn: { w: 90, h: 180 }, tableType: "table1", status: 'default' });
    const [TableSilicon, setTableSilicon] = useState({ row: 3, column: 8, space: 10, oIn: { w: 90, h: 180 }, mLeft: 20, mBottom: 10, status: 'default' });
    // const [TableType, setTableType] = useState("table1");
    if (localStorage.myIp === undefined) localStorage.myIp = "113.190.234.22";
    if (localStorage.tableNomal === undefined) localStorage.tableNomal = "{}";
    if (localStorage.tableSilicon === undefined) localStorage.tableSilicon = "{}";

    useEffect(() => {
        console.log(localStorage.myIp);

    }, []);
    useEffect(() => { // fetch ip

        let ignore = false;
        async function fetchData() {
            const result = await axios("https://api.ipify.org?format=json");
            if (!ignore) {
                setFetchIP(JSON.stringify(result.data.ip));
            };
        }
        fetchData();
        return () => { ignore = true; }
    }, []);
    let setLocal = () => {
        localStorage.myIp = JSON.stringify(Input);
        window.location.reload(true)
    }
    let setLocalFileDesign = () => {
        localStorage.LocalFileDesign = JSON.stringify(FileDesign.split("\\").join("/"));
        window.location.reload(true)
    }
    let setTableLocalStorage = () => {
        localStorage.tableNomal = JSON.stringify({ ...Table, status: 'change' });
        window.location.reload(true)

    }
    let setTableSiliconLocalStorage = () => {
        localStorage.tableSilicon = JSON.stringify({ ...TableSilicon, status: 'change' });
        window.location.reload(true)

    }
    let activeTime = Date.parse(new Date()) - Date.parse(new Date(2021, 0, 1));

    let showStatus = "";
    if (activeTime >= 0
        || (JSON.parse(localStorage.tableNomal)).status !== "change"
        || (JSON.parse(localStorage.tableSilicon)).status !== "change"
        || (JSON.parse(localStorage.LocalFileDesign)) === "") showStatus = <div className="back-login">
            <div className="login">
                {(activeTime <= 0) ? "" : <p>hết thời gian sử dụng</p>}
                {((JSON.parse(localStorage.LocalFileDesign)) === "") ? < div >
                    <p> Nơi lưu file design:</p>
                    <input type="text" placeholder="D:\DATA\file design" onChange={(e) => setFileDesign(e.target.value)} />
                    <button type="button" className="btn btn-secondary" onClick={setLocalFileDesign}>lưu</button>
                </div> : ""}
                {(FetchIP !== localStorage.myIp) ? <div className="card">
                    <p> Đăng nhập:</p>

                    <div>
                        <input type="password" placeholder="key" defaultValue={Input} onChange={(e) => setInput(e.target.value)} />
                        <button type="button" className="btn btn-secondary" onClick={setLocal}>Đăng nhập</button>
                    </div>
                </div> : ""}
                {/* thong so ban kinh binh thuong */}
                {(JSON.parse(localStorage.tableNomal).status !== "change") ? <div>
                    <p> Thông số bàn bình thường:</p>
                    <div className="ts-table-nomal">
                        <div className="mt-1">
                            <span>chiều rộng bàn in : </span>
                            <input type="text" placeholder="w-table (mm)" defaultValue={Table.w} onChange={(e) => setTable({ ...Table, w: Number(e.target.value) })} />
                        </div >
                        <div className="mt-1">
                            <span>Chiều dài bàn in: </span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={Table.h} onChange={(e) => setTable({ ...Table, h: Number(e.target.value) })} />
                        </div >

                        <div className="form-check mt-1">
                            <input className="form-check-input"
                                type="radio" onChange={(e) => setTable({ ...Table, tableType: e.target.value })}
                                name="exampleRadios"
                                id="exampleRadios1" value="table1"
                                checked={Table.tableType === 'table1'} />
                            <label className="form-check-label" htmlFor="exampleRadios1">
                                Table 1: xếp crop sát nhau
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio" onChange={(e) => setTable({ ...Table, tableType: e.target.value })}
                                name="exampleRadios"
                                id="exampleRadios2" value="table2"
                                checked={Table.tableType === 'table2'} />
                            <label className="form-check-label" htmlFor="exampleRadios2">
                                Table 2: xếp crop cách đều
                            </label>
                        </div>
                        <div className="mt-1">
                            <span>Chiều rộng ô in(Table 2):</span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={Table.oIn.w} onChange={(e) => setTable({ ...Table, oIn: { ...Table.oIn, w: Number(e.target.value) } })} />
                        </div >
                        <div className="mt-1">
                            <span>Chiều dài ô in(Table 2):</span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={Table.oIn.h} onChange={(e) => setTable({ ...Table, oIn: { ...Table.oIn, h: Number(e.target.value) } })} />
                        </div >
                        <button type="button" className="btn btn-secondary" onClick={setTableLocalStorage}>Cập nhật</button>
                    </div>
                </div> : ""}






                {/* thong so ban silicon */}
                {(JSON.parse(localStorage.tableSilicon).status !== "change") ? <div>
                    <p className="mt-4"> Thông số bàn silicon:</p>
                    <div className="ts-table-nomal">
                        <div className="mt-1">
                            <span>Số hàng: </span>
                            <input type="text" placeholder="" defaultValue={TableSilicon.row} onChange={(e) => setTableSilicon({ ...TableSilicon, row: Number(e.target.value) })} />
                        </div >
                        <div className="mt-1">
                            <span>Số cột: </span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={TableSilicon.column} onChange={(e) => setTableSilicon({ ...TableSilicon, column: Number(e.target.value) })} />
                        </div >
                        <div className="mt-1">
                            <span>Khoảng cách 2 ô: </span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={TableSilicon.space} onChange={(e) => setTableSilicon({ ...TableSilicon, space: Number(e.target.value) })} />
                        </div >
                        <div className="mt-1">
                            <span>căn lề trái(m-l): </span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={TableSilicon.mLeft} onChange={(e) => setTableSilicon({ ...TableSilicon, mLeft: Number(e.target.value) })} />
                        </div >
                        <div className="mt-1">
                            <span>căn lề dưới(m-b):</span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={TableSilicon.mBottom} onChange={(e) => setTableSilicon({ ...TableSilicon, mBottom: Number(e.target.value) })} />
                        </div >
                        <div className="mt-1">
                            <span>Chiều rộng ô in:</span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={TableSilicon.oIn.w} onChange={(e) => setTableSilicon({ ...TableSilicon, oIn: { ...TableSilicon.oIn, w: Number(e.target.value) } })} />
                        </div >
                        <div className="mt-1">
                            <span>Chiều dài ô in:</span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={TableSilicon.oIn.h} onChange={(e) => setTableSilicon({ ...TableSilicon, oIn: { ...TableSilicon.oIn, h: Number(e.target.value) } })} />
                        </div >
                        <button type="button" className="btn btn-secondary" onClick={setTableSiliconLocalStorage}>Cập nhật</button>
                    </div>
                </div> : ""
                }




            </div>
        </div >;

    return (
        <React.Fragment>


            {showStatus}

        </React.Fragment>
    );
}

export default ThongSo;