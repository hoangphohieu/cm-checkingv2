import React from 'react';

function ShowFailCase(props) {
    let items = props.items;
    if (items.length !== 0) {
        items = items.map((item, key) => <div className="d-flex justify-content-center">
            <span className="item_thua">{item.idClient}</span>
            <span className="item_thua">{item.idDesign}</span>

            <input type="text"
                placeholder="Recipient's username"
                className="input_item_thua item_thua"
                defaultValue={item.phoneCase}

            />




        </div>)
    }
    return (
        <div style={{ textAlign: 'center' }}>
            {(items.length === 0) ? "" : <h3>PhoneCase lỗi</h3>}

            {items}
        </div>
    );
}

export default ShowFailCase;