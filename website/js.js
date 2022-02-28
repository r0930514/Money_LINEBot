function loading(){
    Swal.fire({
        title :"載入中",
        timerProgressBar: true,
        didOpen: ()=>{
            Swal.showLoading()
        }
    })
}
async function refresh(display = 0){
    try {
        if(!display){
            loading()
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
    }
}
async function removeitem(id){
    loading()
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
    loading()
    try {
        result = await axios.delete(`/api/data/other/all`)   
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
async function additem(){
    loading()
    try {
        result = await axios.post('/api/data', {
            name: document.getElementById("Input1").value,
            date: document.getElementById("Input2").value,
            price: document.getElementById("Input3").value
        })
    }catch (e) {
        Swal.fire({
            title: '無法新增資料',
            text: e,
            icon: 'error'
        })
        return
    }
    refresh(1);
}

async function edititem(id){
    console.log('編輯'+ id)
    loading()
    try {
        result = await axios.put('/api/data', {
            id: id,
            name: document.getElementById("Input1").value,
            date: document.getElementById("Input2").value,
            price: document.getElementById("Input3").value
        })
    }catch (e) {
        Swal.fire({
            title: '無法新增資料',
            text: e,
            icon: 'error'
        })
        return
    }
    refresh(1);
}


//Modal 初始化
let AddOrEditItemModal = document.getElementById('AddOrEditItemModal')
AddOrEditItemModal.addEventListener('show.bs.modal', (event)=>{
    document.getElementById('Input2').value = getLocalTime()
    let button = event.relatedTarget
    if(button.getAttribute('id') === null){
        document.getElementById('ModalTitle').innerText = '新增項目'
        document.getElementById('AddOrEditItemButton').innerText = '新增'
        document.getElementById('AddOrEditItemButton').addEventListener('click', additem, { once: true })
        
        return
    }
    let Id = button.getAttribute('id').split('_')[1]
    document.getElementById('ModalTitle').innerText = '修改項目'
    document.getElementById('AddOrEditItemButton').innerText = '修改'
    function editfuc(){
        edititem(Id)
    }
    document.getElementById('AddOrEditItemButton').addEventListener('click', editfuc)
    AddOrEditItemModal.addEventListener('hidden.bs.modal', function () {
        document.getElementById('AddOrEditItemButton').removeEventListener('click', editfuc)
    },{once: true})
})


function getLocalTime(UTCtime = (new Date).toISOString(), format = "yyyy-MM-dd"){
    return luxon.DateTime.fromISO(UTCtime, {zone: 'Asia/Taipei'}).toFormat(format)
}
