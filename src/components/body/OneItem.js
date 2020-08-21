import React from 'react';
import copy from 'copy-to-clipboard';

function OneItem(props) {
    let copyText = (param) => {
        copy(param)
    }
    // console.log(props.type);
    let convertDate = (FileName, type) => {

        var nameDate = FileName + " " + type;
        return nameDate
    }
    return (
        <div className={"  gll-ctn1 "}>
            {(props.item.amount > 1) ? <p className="gll-amount">{props.item.amount}</p> : ""}
            <p className={"cursor-pointer gll-name" + ((props.item.amount > 1) ? " gll-name-more " : "")} onClick={() => copyText(props.item.name)}>{props.item.name}</p>
            <p className=" gll-country">{convertDate(props.FileName, props.type)}</p>
            <p className=" gll-date">{props.item.stt} {props.item.country}</p>
            <p className="gll-sku cursor-pointer" onClick={() => copyText(props.item.sku)}>{props.item.sku}</p>
            <p className="gll-phoneCase">{props.item.case}</p>
        </div>


    );
}

export default OneItem;