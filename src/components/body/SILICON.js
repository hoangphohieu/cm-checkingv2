import _ from 'lodash';


export function convertItems(itemsss, pcPro) {
    let items = JSON.parse(JSON.stringify(itemsss));
    let itemSheet = JSON.parse(JSON.stringify(pcPro));
    let z9Json = [], z10Json = [];
    // let arr = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
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

        // items = items.map(item => {
        //     return {
        //         idClient: item.idClient,
        //         name: item.phoneCase,
        //         idDesign: item.idDesign.trim(),
        //         stt: item.stt,
        //         pixel: toPixel(item.phoneCase),
        //         country: item.country,
        //         amount: item.amount
        //     }
        // })

        items = items.map(item => {
            return {
                date: item.date,
                name: item.idClient,
                case: item.phoneCase,
                sku: item.idDesign.trim(),
                stt: item.stt,
                pixel: toPixel(item.phoneCase),
                country: item.country,
                amount: item.amount,
                numberMica: toZ(item.phoneCase)[0],
                zPosition: toZ(item.phoneCase)[1]
            }
        })

        function toPixel(toPixel1) {// toPixel1 là nameDefault
            let dataToPixel1 = itemSheet.filter(itemSheet1 => {
                if (toPixel1 === itemSheet1.nameDefault) { return true }
                else { return false }
            })
            // console.log(dataToPixel1);
            if (dataToPixel1.length > 1) {
                alert("trên sheet có dòng đt bị lặp", dataToPixel1);
            }
            return { w: Number(dataToPixel1[0].width), h: Number(dataToPixel1[0].hight) }
        };

        function toZ(param) {// toPixel1 là nameDefault
            let dataToPixel1 = itemSheet.filter(itemSheet1 => {
                if (param === itemSheet1.nameDefault) { return true }
                else { return false }
            })
            // console.log(dataToPixel1);
            if (dataToPixel1.length > 1) {
                alert("trên sheet có dòng đt bị lặp", dataToPixel1);
            }
            return [dataToPixel1[0].numberMica, dataToPixel1[0].zPosition]
        };

        let z9 = items.filter(items1 => items1.zPosition < 8);
        let z10 = items.filter(items1 => items1.zPosition >= 8);
        // chia khay


        function chiaban(zx) {
            zx = JSON.parse(JSON.stringify(zx));
            let z9Sort = [[]];
            while (zx.length > 0) {
                if (z9Sort[z9Sort.length - 1].length === 24) { z9Sort.push([]) };// nếu đã đủ 24 thì thêm arr mới để lưu

                let z9L2 = zx.length;
                let j = 0;
                while (z9L2 === zx.length) {
                    let z9End = z9Sort[z9Sort.length - 1];
                    if (zx[j].numberMica > z9End.filter(z9End1 => z9End1.name === zx[j].name).length) {
                        z9Sort[z9Sort.length - 1].push(zx[j]);
                        zx[j] = null;
                        zx = zx.filter(z91 => { return z91 !== null });
                    } else {
                        j = j + 1;
                    }
                    if (j >= zx.length) {
                        if (zx.length !== 0) {
                            z9Sort.push([]);
                            j = 0;
                        }
                    }
                }
            }


            // console.log(z9Sort);

            return z9Sort
        }
        // z9Screen = chiaban(z9);
        // z10Screen = chiaban(z10);
        // { // chunk 8 
        //     z10Screen = z10Screen.map(z9Sort1 => {
        //         while (z9Sort1.length < 24) {
        //             z9Sort1.push({
        //                 idClient: null,
        //                 country: null,
        //                 amount: null,
        //                 idDesign: null,
        //                 phoneCase: null,
        //                 stt: null
        //             })
        //         }

        //         let a = _.chunk(z9Sort1, 8); return a
        //     });
        //     z9Screen = z9Screen.map(z9Sort1 => {
        //         while (z9Sort1.length < 24) {
        //             z9Sort1.push({
        //                 idClient: null,
        //                 country: null,
        //                 amount: null,
        //                 idDesign: null,
        //                 phoneCase: null,
        //                 stt: null
        //             })
        //         }

        //         let a = _.chunk(z9Sort1, 8); return a
        //     })
        // }

        z9Json = chiaban(z9);
        z10Json = chiaban(z10);
        // z9Json = z9Json.map(z9Sort1 => {
        //     let a = _.chunk(z9Sort1, 8); return a
        // });
        // z10Json = z10Json.map(z9Sort1 => {
        //     let a = _.chunk(z9Sort1, 8); return a
        // });
    } // het if param!==undefi param.namened







    return ([z9Json, z10Json])
}