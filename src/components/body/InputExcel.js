
import React from 'react';
import XLSX from 'xlsx';
import _ from 'lodash';
// import * as type from "../constants";

function InputExcel(props) {

  let ProcessExcel = (data) => {
    var workbook = XLSX.read(data, {
      type: 'binary'
    });
    let dataExcel = workbook.Sheets.Sheet1;
    let rickDataExcel = {
      "Sheet1": []
    };
    for (let j = 2; j <= 5000; j++) {
      let rawPick = _.pick(dataExcel, [`A${j}`, `B${j}`, `C${j}`, `D${j}`, `E${j}`]);
      if (_.size(rawPick) === 5) {
        let rickPick = {
          idClient: rawPick[`A${j}`].w,
          country: rawPick[`B${j}`].w,
          amount: rawPick[`C${j}`].w,
          idDesign: rawPick[`D${j}`].w,
          phoneCase: rawPick[`E${j}`].w,
        }
        rickDataExcel.Sheet1.push(rickPick);
      }
    }

    props.changeInputItems(rickDataExcel.Sheet1);

  };



  let readSingleFile = (e) => {
    if (e.target.files[0] !== undefined) {
      let fileName = e.target.files[0].name;
      props.changeFileName(fileName.slice(0, fileName.length - 5));
      //Validate whether File is valid Excel file.
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
      if (regex.test(e.target.value.toLowerCase())) {
        var reader = new FileReader();
        reader.onload = function (e) {
          ProcessExcel(e.target.result);
        };
        reader.readAsBinaryString(e.target.files[0]);

      } else {
        alert("Please upload a valid Excel file.");
      }
    }
  }
  return (
    <div className="d-flex justify-content-center">
      <input type="file" id="fileinput" className="btn btn-warning" onChange={readSingleFile} style={{ display: "none" }} />
      <label htmlFor="fileinput" className="input_exel_file btn btn-warning">File Excel</label>

    </div>
  );
}

export default InputExcel;