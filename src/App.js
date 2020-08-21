import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as constants from "./constants";
import Body from './components/body/Body';
import Button from '@material-ui/core/Button';
import ThongSo from "./components/body/ThongSo";
import Loading from './components/Loading';
function App() {
  const [Pc_pro, setPc_pro] = useState({ items: [], type: null });
  const [FetchAPI, setFetchAPI] = useState(true);
  if (localStorage.myIp === undefined) localStorage.myIp = "113.190.234.22";
  if (localStorage.tableNomal === undefined) localStorage.tableNomal = "{}";
  if (localStorage.tableSilicon === undefined) localStorage.tableSilicon = "{}";
  if (localStorage.LocalFileDesign === undefined) localStorage.LocalFileDesign = JSON.stringify("");

  useEffect(() => { // fetch glass
    let ignore = false;
    async function fetchData() {
      const result = await axios(constants.glass);
      if (!ignore) {
        setPc_pro({ items: result.data, type: "glass" });
        setFetchAPI(false);
      };
    }
    fetchData();
    return () => { ignore = true; }
  }, []);


  let fetchPcPro = (param) => {
    setFetchAPI(true);
    async function fetchData() {
      const result = await axios(constants[param]);
      setPc_pro({ items: result.data, type: param });
      setFetchAPI(false);

    }
    fetchData();
  }

console.log(Pc_pro);
  return (
    <React.Fragment>
      {(FetchAPI === true) ? <Loading /> : ""}
      {/* render khi cai lai thong so */}
      <ThongSo />

      <div className="App" style={{ background: "#f5f5f5", "minHeight": "100vh" }}>
        {/* nav bar */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="navbar-brand" >Local-CheckingV2</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                  <ul className="navbar-nav mr-auto">
                    {/* <li className="nav-item active">
                      <div className="nav-link" >Home <span className="sr-only">(current)</span></div>
                    </li> */}
                    <li className="nav-item dropdown active">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Thông số excel
                      </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="https://docs.google.com/spreadsheets/d/1RZPCTotAZWxDrP9ljQ4UMhM-VgMMOnf2zFMUMTpE6uw">glass/luminous</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="https://docs.google.com/spreadsheets/d/1IibJEuDgzXciev1S0PMs1T4dlzIrPVG6ERmYJqcc_oY">led</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="https://docs.google.com/spreadsheets/d/1dBE7r3vAlEt8dkgjB25NMUjh3eibqm4SQat8MDDisqg/edit#gid=0">silicon</a>
                      </div>
                    </li>
                    <li className="nav-item">
                      <div className="nav-link" >Hướng dẫn sử dụng</div>
                    </li>

                  </ul>

                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* danh sach table type */}
        <div className="container mt-3">
          <div className="row">
            <div className={"col-3 btn-select-type"} >
              <Button variant="outlined" className={"mb-1 w-100  " + (Pc_pro.type === "glass" ? " bt-show" : "")}
                onClick={() => fetchPcPro("glass")}>glass
            </Button>
              {/* <a className="link-xlsx" href="https://docs.google.com/spreadsheets/d/1RZPCTotAZWxDrP9ljQ4UMhM-VgMMOnf2zFMUMTpE6uw" target="_blank">v</a> */}
            </div>
            <div className={"col-3"}>
              <Button variant="outlined" className={"mb-1 w-100  " + (Pc_pro.type === "luminous" ? " bt-show" : "")}
                onClick={() => fetchPcPro("luminous")}>luminous
            </Button>
            </div>
            <div className={"col-3"}>
              <Button variant="outlined" className={"mb-1 w-100  " + (Pc_pro.type === "led" ? " bt-show" : "")}
                onClick={() => fetchPcPro("led")}>led
            </Button>
            </div>
            <div className={"col-3"}>
              <Button variant="outlined" className={"mb-1 w-100  " + (Pc_pro.type === "silicon" ? " bt-show" : "")}
                onClick={() => fetchPcPro("silicon")}>silicon
            </Button>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Body pcPro={Pc_pro} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>

  );
}

export default App;
