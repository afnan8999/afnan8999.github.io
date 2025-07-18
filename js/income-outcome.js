let no = 1; // 2
let total = 0; // 1400
let rowEditElement;
let oldEditAmount;
let income_array = [];//การเก็บค่าทั้งหมดในตารางเมื่อรีเฟสแล้วก็ยังไม่หาย {detail: "dad", amount: 156, now: "25/06/2025"}
let tableBodyElement = document.getElementById("table-body");
let totalElement = document.getElementById('total');


if(localStorage.getItem('income_array') != undefined) {//การเช็กข้อมูลในlocalStorage.getItem('income_array') จะต้องมีค่าถึงจะเช็คได้ถ้าไม่มีไม่ต้องเช็ก

    income_array = JSON.parse(localStorage.getItem('income_array')); //การเอาข้อมูลlocalStorage มาอยู่ในincome_array 
    console.log(income_array);


    for(let i=0; i<income_array.length; i++) {//การวนลูปของincome_array
        if(income_array[i]["amount"] > 0) {//ข้อมูลในincome_array amount > 0 มาเช็กตรงนี้
            // สร้างบรรทัดมามี5คอลัมเป็นสีเขียว
            // 1สร้างมามีปุมยกเลิกกับแก้ไข
            // 2สร้างมาให้บอกลำดับ
            // 3สร้างมาเพื่อใส่คำที่เราป้อนใน detail ซึ่งดึงมาจากincome_array
            // 4สร้างมาเพื่อให้โชว์ตัวเลขที่เราป้อน ซึ่งดึงมาจากincome_array
            // 5สร้างมาเพื่อบอกว/ด/ป ซึ่งดึงมาจากincome_array
            row =`<tr class="table-success">
                            <td>`+
                                '<button type="button" class="btn btn-success me-3" data-bs-toggle="modal" data-bs-target="#edit-income" onclick="edit_income_outcome(event)">edit</button>'+
                                '<button type="button" class="btn btn-danger" onclick="delete_row(event)">delete</button>'+
                            `</td>
                            <td>`+(i+1)+`</td>
                            <td class="">`+income_array[i]["detail"]+`</td>
                            <td class="fw-bolder">`+Number(income_array[i]["amount"]).toLocaleString(undefined)+`</td>
                            <td class="">`+income_array[i]["now"]+`</td>
                    </tr>`
            total = total + Number(income_array[i]["amount"]);     
        }
        else if(income_array[i]["amount"] < 0){//ข้อมูลในincome_array amount < 0 มาเช็กตรงนี้
            // สร้างบรรทัดมามี5คอลัมเป็นสีแดง
            // 1สร้างมามีปุมยกเลิกกับแก้ไข
            // 2สร้างมาให้บอกลำดับ
            // 3สร้างมาเพื่อใส่คำที่เราป้อนใน detail ซึ่งดึงมาจากincome_array
            // 4สร้างมาเพื่อให้โชว์ตัวเลขที่เราป้อน ซึ่งดึงมาจากincome_array
            // 5สร้างมาเพื่อบอกว/ด/ป ซึ่งดึงมาจากincome_array
            row =`<tr class="table-danger">
                            <td>`+
                                '<button type="button" class="btn btn-success me-3" data-bs-toggle="modal" data-bs-target="#edit-income" onclick="edit_income_outcome(event)">edit</button>'+
                                '<button type="button" class="btn btn-danger" onclick="delete_row(event)">delete</button>'+
                            `</td>
                            <td>`+(i+1)+`</td>
                            <td class="">`+income_array[i]["detail"]+`</td>
                            <td class="fw-bolder">`+Number(income_array[i]["amount"]).toLocaleString(undefined)+`</td>
                            <td class="">`+income_array[i]["now"]+`</td>
                        </tr>`
            total = total + Number(income_array[i]["amount"]); //การเอาค่า amount income_array มาบวกกับ total แล้วไว้ในtotalอันเดิม
        }
        tableBodyElement.insertAdjacentHTML('beforeend', row);//การสร้างบรรทัดลงมาด้านล่าง
        totalElement.innerText = total.toLocaleString(undefined);//ผลรวมใส่คอมมาแล้วโชว์ในหน้าจอ
    }
    no = income_array.length + 1;//การใส่ลำดับ ถ้าบรรทัดคือ1 =0+1 
}




function income_outcome(type) {
    let detailElement; //สร้างตัวแปรที่มีชื่อว่า detailElement เพื่อให้แยกออกว่าใาจากปุมไหน
    let amountElement;//สร้างตัวแปรที่มีชื่อว่า amountElement เพื่อให้แยกออกว่าใาจากปุมไหน
    let tableBodyElement = document.getElementById("table-body");//สร้างตัวแปรเพื่อดึงค่าจาก ไอดีtable-body
    let totalElement = document.getElementById('total');//สร้างตัวแปรเพื่อดึงค่าจาก ไอดีtotal

    if(type == 'income') { //สร้างเพิ่อให้รู้ว่ากดปุมอันไหน
        detailElement = document.getElementById('income1');//ดึงค่าขออง income1
        amountElement = document.getElementById('income2');//ดึงค่าขออง income2
    }
    else {
        detailElement = document.getElementById('outcome1');//ดึงค่าขออง outcome1
        amountElement = document.getElementById('outcome2');//ดึงค่าขออง outcome2
    }

    if(detailElement.value == '' || amountElement.value == '') {//สร้างเพื่อถ้าในช่องอันใดอันหนึ่งว่างต้องขึ้นแจ้งเตือน
        alert("กรุณาใส่ตัวเลขก่อนครับ");
    }
    else {//พอกรอกครบแล้วมาอันนี้
        let now = new Date();//สร้างตัวแปรที่ทำให้มีวันเวลา
        now = dateFns.format(now, 'dd/MM/yyyy');//เอาไลบราลีมาใส่เพื่อให้เป็นว/ด/ปที่เราต้องการ
        let row;//สร้างบรรทัดใหม่
        if(type == 'income') {//เช็กช่อง income
            // สร้างบรรทัดมามี5คอลัมเป็นสีเขียว
            // 1สร้างมามีปุมยกเลิกกับแก้ไข
            // 2สร้างมาให้บอกลำดับ
            // 3สร้างมาเพื่อใส่คำที่เราป้อนใน detail
            // 4สร้างมาเพื่อให้โชว์ตัวเลขที่เราป้อน
            // 5สร้างมาเพื่อบอกว/ด/ป
            row =`<tr class="table-success">
                        <td>`+
                            '<button type="button" class="btn btn-success me-3" data-bs-toggle="modal" data-bs-target="#edit-income" onclick="edit_income_outcome(event)">edit</button>'+
                            '<button type="button" class="btn btn-danger" onclick="delete_row(event)">delete</button>'+
                        `</td>
                        <td class="">`+no+`</td>
                        <td class="">`+detailElement.value+`</td>
                        <td class="fw-bolder">`+Number(amountElement.value).toLocaleString(undefined)+`</td>
                        <td class="">`+now+`</td>
                    </tr>`;
            total = total + Number(amountElement.value);//เอาค่าเก่ามาบวกบวกรวมกับอันใหม่แล้วใส่ในค่าเดิม
            let temp = {detail: detailElement.value, amount: Number(amountElement.value), now: now};//สร้างตัวแปร temp เพื่อให้รวบรวมข้อมูลทั้งหมด
            income_array.push(temp);//เอาตัวแปร temp มาเก็บใน income_array

            localStorage.setItem('income_array', JSON.stringify(income_array));//เอาข้อมูลใน income_array มาบันทึกค่าในคอม
        }
        else if(type == 'outcome') {
            // สร้างบรรทัดมามี5คอลัมเป็นสีแดง
            // 1สร้างมามีปุมยกเลิกกับแก้ไข
            // 2สร้างมาให้บอกลำดับ
            // 3สร้างมาเพื่อใส่คำที่เราป้อนใน detail
            // 4สร้างมาเพื่อให้โชว์ตัวเลขที่เราป้อน
            // 5สร้างมาเพื่อบอกว/ด/ป
            row =`<tr class="table-danger">
                        <td>`+
                            '<button type="button" class="btn btn-success me-3" data-bs-toggle="modal" data-bs-target="#edit-income" onclick="edit_income_outcome(event)">edit</button>'+
                            '<button type="button" class="btn btn-danger" onclick="delete_row(event)">delete</button>'+
                        `</td>
                        <td class="">`+no+`</td>
                        <td class="">`+detailElement.value+`</td>
                        <td class="fw-bolder ">-`+Number(amountElement.value).toLocaleString(undefined)+`</td>
                        <td class="">`+now+`</td>
                    </tr>`
            total = total - Number(amountElement.value);//เอาค่าเก่ามาบวกบวกรวมกับอันใหม่แล้วใส่ในค่าเดิม
            let temp = {detail: detailElement.value, amount: -Number(amountElement.value), now: now};//สร้างตัวแปร temp เพื่อให้รวบรวมข้อมูลทั้งหมด
            income_array.push(temp);//เอาตัวแปร temp มาเก็บใน income_array

            localStorage.setItem('income_array', JSON.stringify(income_array));//เอาข้อมูลใน income_array มาบันทึกค่าในคอม
        }
        tableBodyElement.insertAdjacentHTML('beforeend', row);//การสร้างบรรทัดใหม่เอาไว้ล่างสุด
        no = no + 1;//การเอาค่าเดิมมา+1เรื่อยๆถ้ามีการสร้างบรรทัดใหม่
        detailElement.value = "";//การเคลียช่องให้ว่าง
        amountElement.value = "";//การเคลียช่องให้ว่าง
        totalElement.innerText = total.toLocaleString(undefined);//การโชว์ข้อมูลของtotal
    }
}

function delete_row(event) {//eventคือแท็กพิเศษที่เก็บค่าตัวนั้ไว้
    let cf_flag = confirm("Confirm to delete this row?"); // true, false สร้างตัวแปรมาเพื่อเตือนว่ายืนยันการลบไหม
    if(cf_flag == true) {//ถ้ายืนยันมาตนงนี้
        let totalElement = document.getElementById('total');//ดึงค่าจาก
        let deleteButtonElement = event.target;//การดึงค่าตัวที่เรากด total
        let rowElement = deleteButtonElement.parentNode.parentNode; // <tr> การขยับหาตัวแม่2ขั้น
        let no = rowElement.children[1].innerText;//หาช่องที่2ของบรรทัดที่เราต้องการ
        let deleteAmount = rowElement.children[3].innerText.replace(',', '');//การเอาคอมมาออกเพ่อให้คิดเลขได้
        total = total - Number(deleteAmount)//การเอาค่า totalอันเก่า มาลบ  Number(deleteAmount) แล้วในtotalใหม่
        totalElement.innerText = total.toLocaleString(undefined);//การโชว์ข้อมูล
        rowElement.remove();//ลบบรรทัดที่ต้องการ
        rowEditElement = rowElement

        /*
            หาnoอันที่เรากด
            ใส่ข้อมูลเข้าไปในarray
            เอาarrayมาใส่
        */
    
        income_array.splice(Number(no)-1, 1);//เอามาลบบรรทัดที่เราต้องการ Number(no)-1 (ที่ต้อง-1 เพราะในarrey น้อย1หน่อยกว่าของจริงเสมอ)
        localStorage.setItem('income_array', JSON.stringify(income_array));//การบันทึกค่าของ income_array

        reset_no();
    }

}

function reset_no() {//การสร้างฟังชั้นนี้เพื่อให้เลขเรียงใหม่ไม่เลขมันกระโดด
    no = 1;//การสร้างnoใหม่
    let tableBodyElement = document.getElementById('table-body');//การดึงค่าของ table-body
    let rowArray = tableBodyElement.children;//การหาค่าตัวลูกของ tableBodyElement แล้วได้ค่าarreyมา [tr, tr, tr}

    for(let i=0; i<rowArray.length; i++) {

        rowArray[i].children[1].innerText = no;
        no++;
    
    }
    
}

function edit_income_outcome(event) {//การแก้ไขข้อมูล
    let edit__detailElementElement = document.getElementById('my-detail');//ดึงค่าของ my-detail
    let edit__amountElementElement = document.getElementById('my-amount');//ดึงค่าของ my-amount
    let editButtonElement = event.target;//การเก็บแท็กของปุมeditที่เรากดมา
    let rowElement = editButtonElement.parentNode.parentNode;//ไปขึ้นหาตัวแม่2ลำดับ
    let editdetail = rowElement.children[2].innerText;//หาตัวลูกในช่อง3ของปุ่มeditที่เรากดมา
    let editamount = rowElement.children[3].innerText.replace(',', '');//หาตัวลูกในช่อง4 แล้วเอาคอมมาออก
    
    edit__detailElementElement.value = editdetail;//การใส่ค่าใน edit__detailElementElement.value
    edit__amountElementElement.value = editamount;//การใส่ค่าใน edit__amountElementElement.value
    rowEditElement = rowElement;//การเก็บแท็กrowของeditที่เรากดมา
    oldEditAmount = Number(editamount);//การเก็บค่าamountของปุ่มeditที่เรากดมา

}

function edit_save() {
    let edit__detailElementElement = document.getElementById('my-detail');//ดึงค่าmy-detail
    let edit__amountElementElement = document.getElementById('my-amount');//ดึงค่าmy-amount
    let totalElement = document.getElementById('total');//ดึงค่าtotal
    let no = rowEditElement.children[1].innerText;//สร้างตัวแปรเพื่อที่จะดึงค่าของลำดับของปุ่มeditที่เรากดมา
    rowEditElement.children[2].innerText = edit__detailElementElement.value;//แก้ไขค่าของ detail ของปุ่มeditที่เรากดมา
    rowEditElement.children[3].innerText = Number(edit__amountElementElement.value).toLocaleString(undefined);//แก้ไขค่าของ amount ของปุ่มeditที่เรากดมา
    total = total - oldEditAmount;//ลบค่าเก่าแล้วใส่เหมือนเดิม
    total = Number(edit__amountElementElement.value) + total;//เอาผลรวมมาบวกอันที่แก้ไขแล้วมาบวกค่าอันเราจะแก้
    totalElement.innerText = total.toLocaleString(undefined);//ผลรวมใส่คอมมาแล้วโชว์ในหน้าจอ

    income_array[Number(no)-1]["detail"] = edit__detailElementElement.value ;//การเก็บค่าของedit__detailElementElement.value แล้วมาบันทึกในarray
    income_array[Number(no)-1]["amount"] = Number(edit__amountElementElement.value);//การเก็บค่าของedit__amountElementElement.value แล้วมาบันทึกในarray
    localStorage.setItem('income_array', JSON.stringify(income_array));//การบันทึกข้อมูลในarrayที่เราแก้ไขแล้วลงlocalStorage

}
