async function refresh(){
    console.log('refresh')
    document.getElementById("Input1").value = '';
    document.getElementById("Input2").value = getNowTime();
    document.getElementById("Input3").value = '';
    let webHtml = document.getElementById('list')
    let formatter = new Intl.DateTimeFormat('en-US', {timeZone: "America/Denver"})
    webHtml.innerHTML=`
        <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
    `
    let response = await axios.get('/api/data')
        .catch(e=>{
            alert("請重新整理再試一次")
            webHtml.innerHTML=`
            <p>${e}<p/>
            `
            return
        })
    var temphtml='';
    temphtml=`
        <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">項目</th>
                <th scope="col">日期</th>
                <th scope="col">花費</th>
                <th scope="col">動作</th>
            </tr>
        </thead>
        <tbody>
    `
    for(i in response.data){
        temphtml+=`
        <tr>
            <th scope="row">${(response.data[i]['id']-4)/10+1}</th>
            <td>${response.data[i]['name']}</td>
            <td>${getLocalTime(response.data[i]['date'])}
            <td>${response.data[i]['price']}</td>
            <td>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        動作
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <a class="dropdown-item" onclick="removeitem(${response.data[i]['id']})">刪除</a>
                        </li>
                        <li><a class="dropdown-item" onclick="">修改</a></li>
                    </ul>
                </div>   
            <td/>
        </tr>
        `;
    }
    temphtml+=`
        </tbody>
    </table>
    `
    console.log(response.data)
    webHtml.innerHTML=temphtml
}
async function removeitem(id){
    result = await axios.delete(`/api/data/${id}`)
    refresh();
}
async function removeallitem(){
    result = await axios.delete(`/api/data/other/all`)
    refresh();
}
async function additem(){
    result = await axios.post('/api/data', {
        name: document.getElementById("Input1").value,
        date: document.getElementById("Input2").value,
        price: document.getElementById("Input3").value
    })
    refresh();
}
function getLocalTime(UTCtime){
    let UTCtimeObj = new Date(UTCtime)
    return UTCtimeObj.toLocaleDateString();
}
function getNowTime(){
    var today = new Date();
    return today.toISOString().substring(0,10)
}