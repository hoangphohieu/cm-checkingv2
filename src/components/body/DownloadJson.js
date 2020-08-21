
import React from 'react';
import _ from 'lodash';

function DownloadJson(props) {
  let rd6 = () => {
    return Math.floor(Math.random() * (99999 - 10000) + 10000);
  }
  let rd1 = () => {
    return Math.floor(Math.random() * (9 - 1) + 1);
  }
  let saveTextAsFile = (param) => {
    let paramToText = JSON.stringify(param)
    var textToWrite = paramToText // file contents
    var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
    // var fileNameToSaveAs = `day${props.date.dayExcel}_${props.date.mouthExcel}.json`// tên file
    let fileNameToSaveAs = `${props.type}-${(props.FileName)}.json`;
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    downloadLink.click();
  }
  let num1 = rd1();
  let numRd = [rd6(), num1, (10 - num1), rd6()].join("");
  let thongso = JSON.parse(localStorage.tableNomal);
  if (props.type === "silicon") thongso = JSON.parse(localStorage.tableSilicon);
  let LocalFileDesign = JSON.parse(localStorage.LocalFileDesign);
  thongso = { ...thongso, LocalFileDesign: LocalFileDesign }

  let strWrite = {
    items: props.items,
    // day: Number(props.date.dayExcel),
    // mounth: Number(props.date.mouthExcel),
    type: props.type,
    FileName: props.FileName,
    key: numRd,
    thongso: thongso
  };

  return (
    <div className="d-flex justify-content-center">
      <button type="button" className="btn btn-secondary  dlp"
        onClick={() => saveTextAsFile(strWrite)}
        style={{ color: "white" }}
      >
        Download JSON
    </button>
    </div>

  );
}

export default DownloadJson;