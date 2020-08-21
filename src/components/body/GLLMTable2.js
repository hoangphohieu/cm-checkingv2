import _ from 'lodash';

let tableNomal = {};
if (localStorage.tableNomal !== undefined) tableNomal = JSON.parse(localStorage.tableNomal);


export function convertItems(itemsss, pcPro) {
    let items = JSON.parse(JSON.stringify(itemsss));
    let itemSheet = JSON.parse(JSON.stringify(pcPro));
    let arr = [];
    if (items.length !== 0) {
        for (let i = 0; i <= items.length - 1; i++) {  // lặp lại những item có amount >1
            if (items[i].amount > 1) {
                for (let j = 1; j < items[i].amount; j++) {
                    items.push({ ...items[i], amount: 0 })
                }
            }
        }

        { // hiển thị items trùng, kể cả những cái khác sku, pc
            items = items.sort(function (a, b) {
                var x = a.idClient.toLowerCase();
                var y = b.idClient.toLowerCase();
                if (x < y) { return -1; }
                if (x > y) { return 1; }
                return 0;
            });
            let obj = {}
            for (let k = 0; k < items.length; k++) {
                if (obj[items[k].idClient] === undefined) {
                    obj[items[k].idClient] = [items[k]]
                }
                else {
                    obj[items[k].idClient] = [...obj[items[k].idClient], items[k]]
                }
            }
            obj = _.toPairs(obj);
            obj = obj.map(param1 => {
                return param1[1].map(param2 => {
                    param2["amount"] = param1[1].length;
                    return param2
                })
            })
            obj = _.flattenDeep(obj);
        }
        items = _.orderBy(items, ['phoneCase', 'idClient', 'idDesign'], ['asc', 'asc', 'desc']);
        items = items.map((item, key) => { return { ...item, stt: key + 1 } });

        items = items.map(item => {
            return {
                date: item.date,
                name: item.idClient,
                case: item.phoneCase,
                sku: item.idDesign.trim(),
                stt: item.stt,
                pixel: toPixel(item.phoneCase),
                country: item.country,
                amount: item.amount
            }
        })


        function toPixel(toPixel1) {// toPixel1 là nameDefault
            let dataToPixel1 = itemSheet.filter(itemSheet1 => {
                if (toPixel1 === itemSheet1.nameDefault) { return true }
                else { return false }
            })
            console.log(dataToPixel1);
            if (dataToPixel1.length > 1) {
                alert("trên sheet có dòng đt bị lặp", dataToPixel1);
            }
            return { w: Number(dataToPixel1[0].width), h: Number(dataToPixel1[0].hight) }
        };
        // chia khay
        let soOpMotBan = Math.floor(tableNomal.h / tableNomal.oIn.h) * Math.floor(tableNomal.w / tableNomal.oIn.w);
        arr = _.chunk(items, soOpMotBan);

    } // het if param!==undefi param.namened

    return (arr)
}