async function action(){
    let webHtml = document.getElementById('list')
    webHtml.innerHTML=`
        <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
    `
    let response = await axios.get('/api/data')
    console.log(response.data);
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
            <th scope="row">${response.data[i]['id']}</th>
            <td>${response.data[i]['name']}</td>
            <td>${response.data[i]['date']}</td>
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
    webHtml.innerHTML=temphtml
}
async function removeitem(id){
    console.log(id);
}
        
