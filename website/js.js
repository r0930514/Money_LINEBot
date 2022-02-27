async function refresh(display = 0){
    try {
        if(!display){
            Swal.fire({
                title :"載入中",
                timerProgressBar: true,
                didOpen: ()=>{
                    Swal.showLoading()
                }
            })
        }
        response = await axios.get('/api/data')
        Swal.close()
    } catch (e) {
        Swal.fire({
            title: '無法重新整裡',
            text: e,
            icon: 'error' 
        })
        return   
    }
    let el = document.querySelector('tbody') //選擇頁面的唯一的表格內容
    el.innerHTML = ''
    let templateTable = document.querySelector('#templateTable') //選擇範本
    let templateTableContent = templateTable.content.querySelectorAll('td') //選擇範本表格內的所有子格
    let templateMenu = templateTable.content.querySelectorAll('a')
    for(i in response.data){
        let id = response.data[i]['id']
        templateTableContent[0].textContent = (id-4)/10+1
        templateTableContent[1].textContent = response.data[i]['name']
        templateTableContent[2].textContent = getLocalTime(response.data[i]['date'])
        templateTableContent[3].textContent = response.data[i]['price']
        templateMenu[0].id = `Delete_${id}`
        templateMenu[1].id = `Edit_${id}`
        el.appendChild(document.importNode(templateTable.content, 1))
        document.getElementById(`Delete_${id}`).addEventListener('click', ()=>{
            removeitem(id)
        })
        document.getElementById(`Edit_${id}`).addEventListener('click', ()=>{
            edititem(id)
        })
    }
}
async function removeitem(id){
    Swal.fire({
        title :"載入中",
        timerProgressBar: true,
        didOpen: ()=>{
            Swal.showLoading()
        }
    })
    try {
        result = await axios.delete(`/api/data/${id}`)    
    } catch (e) {
        Swal.fire({
            title: '無法刪除資料',
            text: e,
            icon: 'error'
        })
        return
    }
    refresh(1);
}
async function removeallitem(){
    result = await axios.delete(`/api/data/other/all`)
    refresh(1);
}
async function additem(){
    console.log(document.getElementById("Input2").value);
    result = await axios.post('/api/data', {
        name: document.getElementById("Input1").value,
        date: document.getElementById("Input2").value,
        price: document.getElementById("Input3").value
    })
    refresh(1);
}
async function edititem(id){
    console.log("run");
    result = await axios.put('/api/data', {
        id: id,
        name: document.getElementById("EditInput1").value,
        date: document.getElementById("EditInput2").value,
        price: document.getElementById("EditInput3").value
    })
    refresh(1);
}
function getLocalTime(UTCtime){
    return luxon.DateTime.fromISO(UTCtime, {zone: 'Asia/Taipei'}).toFormat('yyyy-MM-dd')
}
function getNowTime(){
    let today = new Date();
    return today.toISOString()
}
let AddOrEditItemModal = document.getElementById('AddOrEditItemModal')
AddOrEditItemModal.addEventListener('show.bs.modal', (event)=>{
    let button = event.relatedTarget
    let recipient = button.getAttribute('data-bs-whatever')
    let buttonId = button.getAttribute('id')
    console.log(recipient + ":" + buttonId)
})