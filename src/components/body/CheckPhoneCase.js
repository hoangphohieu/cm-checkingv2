
import _ from "lodash";
export function Convert(itemsss, pcPro) {
    let items = JSON.parse(JSON.stringify(itemsss));
    let itemSheet = JSON.parse(JSON.stringify(pcPro));




    itemSheet = itemSheet.map(param => {
        let dataparam = [param.nameDefault, Number(param.width), Number(param.hight), param.nameVariant.split(",")];
        dataparam[3] = dataparam[3].filter(param2 => { return param2 !== "" });
        return dataparam
    });

    items = items.filter(item => (item.idClient !== undefined || item.amount !== undefined)); // lọc loại bỏ những item trắng
    items = items.map(item => { return { ...item, amount: parseInt(item.amount) } }) // chuyển amount từ string sang number
    items = items.map(item => {
        if (item.phoneCase === undefined) return item
        else {
            let itemFilter = itemSheet.filter(item2 => {
                let itemFilter2 = item2[3].filter(item3 => {
                    if (item.phoneCase.split(" ").join("").toLowerCase().endsWith(item3.split(" ").join("").toLowerCase()) === true) {
                        return true
                    }
                });
                if (itemFilter2.length !== 0) { return true }
                else { return false }
            });
            if (itemFilter.length === 1) {
                item.phoneCase = itemFilter[0][0];
                return item
            }
            else if (itemFilter.length > 1) {
                alert("kiểm tra lại endWith: " + item.phoneCase);
                window.location.reload();
                return item
            }
            else if (itemFilter.length === 0) {
                return item
            }


        }
    });


    console.log(items);

    let itemsFilter = items.filter(items1 => {
        let itemsFilter2 = itemSheet.filter(itemSheet1 => {
            if (itemSheet1[0] === items1.phoneCase) { return true }
            else { return false }
        })
        if (itemsFilter2.length !== 0) { return true }
        else { return false }
    })
    let itemThua = _.difference(items, itemsFilter);
    // console.log(items);
    // console.log(itemsFilter);
    // console.log(itemThua);

    return ([itemsFilter, itemThua]);
}
