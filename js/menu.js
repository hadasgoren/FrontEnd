$(document).ready(function(){
    function copyToLocalStorage(){
        for (let i=0; i<courses.length;i++){
            localStorage.setItem(courses[i].name, JSON.stringify(courses[i]));
        }
    }


    function userLogin(name){
        var urlSearch = new URLSearchParams(window.location.search);
        var user = urlSearch.get('name');
        if (user != null) {
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('managePage').style.display = 'none';
            document.getElementById('userPage').style.display = 'block';
            document.getElementById("user").innerHTML= `${user}`;
        }
    }   
    
      function addAdmin(){
        var container = document.getElementById("courses");
        var lastRow = document.getElementById("courses").lastChild;
        var child = lastRow.childElementCount;
        var col = document.createElement("div");
        col.setAttribute("class", "col-lg-4 col-md-6 col-sm-9");
        col.setAttribute("id", "placeholder");
        const addBtn = document.createElement("button");
        addBtn.setAttribute("class", "btn btn-primary");
        addBtn.setAttribute("id", "newEntry");
        addBtn.setAttribute("onclick", "newEntry()");
        addBtn.innerHTML= "Add new dish";
        col.appendChild(addBtn);
        console.log(child);
        if(child%3==0){
            var newRow = document.createElement("div");
            newRow.setAttribute("class", "row");
            newRow.appendChild(col);
            container.appendChild(newRow);
        }else{
            lastRow.appendChild(col);
        }
      }
    
//  function checkIfOpen(){
//     var timeNow = new Date();
//     var day = timeNow.getDay(); // sunday is 0
//     var hour = timeNow.getHours();
    
//     // Sunday to Thersday 
//     if ((day>=0 && day < 5) && (hour>=12 && hour<24)){
//         loadMenu();
//     }
//     // Friday, Saturday and holiday
//     else if(hour>=12 && hour<17){
//         loadMenu();
//     }
//     else{
//         alert("המסעדה סגורה כעת");
//     }
//     }
    

function createMenuContainer(){
    const menu = document.getElementById("menuColl");
    const container = document.createElement("div");
    container.setAttribute("class", "container");
    container.setAttribute("id", "courses");
    menu.appendChild(container);
}

function createUserManage(){
    var container = document.getElementById('menuColl');
    var row = document.createElement("div");
    row.setAttribute("class", "row cart-class");
    row.setAttribute("id", "orderManage");
    container.appendChild(row);
    createOrderRow();
}


function start(){  
    //checkIfOpen();
    loadMenu();
}


function loadMenu(){
    if(document.getElementById("courses")=== null)
        createMenuContainer();

    var container = document.getElementById('courses');
    for(let i= 0; i<courses.length; i++){
        if(i%3==0){
            row = document.createElement("div");
            row.setAttribute("class", "row");
            container.appendChild(row);
        }
        const col = document.createElement("div");
        col.setAttribute("class", "col-lg-4 col-md-6 col-sm-9");
        col.innerHTML =`
                    <div class="box">
                        <p>${JSON.parse(localStorage.getItem(courses[i].name)).name}</p>
                        <div class="item">
                            <div class="imgWrap">
                                <p><img class="menuPic" src="${JSON.parse(localStorage.getItem(courses[i].name)).pictureURL}" alt=${JSON.parse(localStorage.getItem(courses[i].name)).name}></p>
                                <p id="imgDesc"><br>${JSON.parse(localStorage.getItem(courses[i].name)).desciption}
                                <br>
                                price: ${JSON.parse(localStorage.getItem(courses[i].name)).price}
                                <br>
                                <span class="vip">Members pay less: ${JSON.parse(localStorage.getItem(courses[i].name)).discountPrice}</span>  
                                </p>
                            </div>`
                        ;
                        if(window.location.pathname.includes('admin')){
                            col.innerHTML += `<button type="submit" class="btn" onclick="removeTile(this)"><i class="fas fa-trash-alt"></i></button>`;
                        }else{
                            col.innerHTML += `<button class="btn" id="addBtn" value="${JSON.parse(localStorage.getItem(courses[i].name)).name}" type="submit" onclick="addItem(this)"><i class="fas fa-cart-plus"></i></button>
                            <button id="favBtn" class="btn" value="${JSON.parse(localStorage.getItem(courses[i].name)).name}" type="submit" onclick="addItem(this)"><i class="fas fa-heart"></i></button>`;
                        }
        col.innerHTML += `</div ></div>
                    <br>`;
        row.appendChild(col);
    }
}

$('#initMenu').click(()=>{
    deleteCourses();
    copyToLocalStorage();
    loadMenu();
    addAdmin();
});


function deleteCourses(){
    var courses = document.getElementById("courses");
    var child = courses.lastElementChild;
    while(child){
        courses.removeChild(child);
        child = courses.lastElementChild;
    }

    for (let i= 0; i<localStorage.length; i++){
        if((JSON.parse(localStorage.getItem(localStorage.key(i)))).category != undefined)
            localStorage.removeItem((JSON.parse(localStorage.getItem(localStorage.key(i)))).name)
    }
    
}


    copyToLocalStorage();
    start()

    if(window.location.pathname.includes('admin')){
        addAdmin();
    }
    if(window.location.pathname.includes('menu')){
        createUserManage();
    }

    var urlSearch = new URLSearchParams(window.location.search);
    var user = urlSearch.get('name');
    if(user !=null){
        userLogin(user);
        loadFav(user);
    }
});


var enrtyProperties = ["name", "desciption", "price", "discountPrice", "pictureURL", "catagory","special"];
var placeholders = ["Name", "Description", "Price", "Members price", "picture URL", "catagory","Special"];
var ids = ["dishName", "desc", "price", "viprice", "pic","cat", "spcl"];

function addAdmin(){
    var container = document.getElementById("courses");
    var lastRow = document.getElementById("courses").lastChild;
    var child = lastRow.childElementCount;
    var col = document.createElement("div");
    col.setAttribute("class", "col-lg-4 col-md-6 col-sm-9");
    col.setAttribute("id", "placeholder");
    const addBtn = document.createElement("button");
    addBtn.setAttribute("class", "btn btn-primary");
    addBtn.setAttribute("id", "newEntry");
    addBtn.setAttribute("onclick", "newEntry()");
    addBtn.innerHTML= "Add new dish";
    col.appendChild(addBtn);
    if(child%3==0){
        var newRow = document.createElement("div");
        newRow.setAttribute("class", "row");
        newRow.appendChild(col);
        container.appendChild(newRow);
    }else{
        lastRow.appendChild(col);
    }
  }


function newEntry(){
    var placeholder = document.getElementById("placeholder");
    var parent = placeholder.parentNode;
    placeholder.remove();
    var container = document.getElementById("courses");
    var lastRow = document.getElementById("courses").lastChild;
    var child = lastRow.childElementCount;
    var div = document.createElement("div");   
    var col = document.createElement("div");
    col.setAttribute("class", "col-4");
    col.setAttribute("id", "newDish");
    for (let i=0; i<enrtyProperties.length;i++){
        col.innerHTML += `<input type="text" placeholder="${placeholders[i]}" id="${ids[i]}"</input><br>`;
    }
    col.innerHTML += `<button class="btn btn-primary" value="Add Entry" onclick="addEntry()"></button>`;
    
    parent.appendChild(col);

  }


  function addNewDish(newDish){
    var container = document.getElementById("courses");
    var lastRow = document.getElementById("courses").lastChild;
    console.log(lastRow);
    var child = lastRow.childElementCount;
    console.log(child);
    if(child%3==0){
        var row = document.createElement("div");
        row.setAttribute("class", "row");
    }
    
    const col = document.createElement("div");
    col.setAttribute("class", "col-lg-4 col-md-6 col-sm-9");
    col.innerHTML =`
                <div class="box">
                    <p>${newDish.name}</p>
                    <div class="item">
                        <div class="imgWrap">
                            <p><img class="menuPic" src="${newDish.pictureURL}" alt=${newDish.name}></p>
                            <p id="imgDesc"><br>${newDish.desciption}
                            <br>
                            price: ${newDish.price}
                            <br>
                            <span class="vip">Members pay less: ${newDish.discountPrice}</span>  
                            </p>
                        </div>`
                    ;
                    if(window.location.pathname.includes('admin')){
                        col.innerHTML += `<button type="submit" class="btn" onclick="removeTile(this)"><i class="fas fa-trash-alt"></i></button>`;
                    }else{
                        col.innerHTML += `<button class="btn" id="addBtn" value="${newDish.name}" type="submit" onclick="addItem(this)"><i class="fas fa-cart-plus"></i></button>
                        <button id="favBtn" class="btn" value="${newDish.name}" type="submit" onclick="addItem(this)"><i class="fas fa-heart"></i></button>`;
                    }
    col.innerHTML += `</div ></div>
                <br>`;
    if(child%3==0){
        container.appendChild(row);
        row.appendChild(col);
    }
    else{
        lastRow.appendChild(col);
    }
  }


  function addEntry(){
    var name = document.getElementById("dishName").value;
    var desc = document.getElementById("desc").value;
    var price = document.getElementById("price").value;
    var viprice = document.getElementById("viprice").value;
    var pic = document.getElementById("pic").value;
    var cat = document.getElementById("cat").value;
    var spcl = document.getElementById("spcl").value;
    var newDish = {
        "name": name,
        "desc" : desc,
        "price" : price,
        "viprice" :viprice,
        "pic" : pic,
        "cat": cat,
        "spcl" : spcl
    }
    localStorage.setItem(newDish.name ,JSON.stringify(newDish));
    addNewDish(newDish);
    removeTile(document.getElementById("newDish"));
    addAdmin();
}


function loadFav(user){
    var userFav = (JSON.parse(localStorage.getItem(user))).favorites;
    for (let i = 0; i < userFav.length;i++){
        addItem(userFav[i]);       
    }
}

function removeTile(elem){
    var course = elem.parentNode;
    var name = ""+course.children[0].children[0].innerHTML; // get Name of course
    var element = elem.closest(".col-lg-4");
    if(elem.id =="newDish" ){
        elem.remove();
        (document.getElementById("placeholder")).remove();
    }
    else if (confirm("Are you sure you want to remove dish?")) {
        localStorage.removeItem(name);
        element.remove();
    }
        
}

var cartArray = [];
var favArray = [];

function addItem(elem){
    var div;
    if (elem.id !=undefined && elem.id.includes('addBtn')){
        div = document.getElementById("items");
    } else if (elem.id ===undefined || elem.id.includes('favBtn')) {
        if (favArray.indexOf(elem.value) != -1) {
            return;
        }
        div = document.getElementById("favs");
    }
    
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    var item = document.createElement("div");
    item.setAttribute("class", "col-md-5");
    if(elem.id === undefined){
        item.innerHTML = `<p>${elem}</p>`;
    }else{
        item.innerHTML = `<p>${elem.value}</p>`;
    }
    
    row.appendChild(item);
    div.appendChild(row);
    var price = document.createElement("div");
    price.setAttribute("class", "col-md-3");
    if (elem.id !=undefined && elem.id.includes('addBtn')){
        if (window.location.search.substring(1).includes('name')) {
            price.innerHTML = `<p>${(JSON.parse(localStorage.getItem(elem.value))).discountPrice}</p>`;
        } else {
            price.innerHTML = `<p>${(JSON.parse(localStorage.getItem(elem.value))).price}</p>`;
        }
        row.appendChild(price);
    }
    var btn = document.createElement("div");
    btn.setAttribute("class", "col-md-4");

    if (elem.id != undefined && elem.id.includes('addBtn')){
        btn.innerHTML = `<button type="button" id="removeItem" class="btn" onclick="removeFormList(this)"><i class="fas fa-trash-alt"></i></button>`;        
    } else if (elem.id === undefined || elem.id.includes('favBtn')) {
        btn.innerHTML = `<button type="button" id="removeFav" class="btn" onclick="removeFormList(this)"><i class="fas fa-trash-alt"></i></button>`;
    }
    
    row.appendChild(btn);
    div.appendChild(row);

    if (elem.id != undefined && elem.id.includes('addBtn')) {
        var notesRow = document.createElement("div");
        notesRow.setAttribute("class", "col-md-12");
        notesRow.innerHTML = `
                            <input type="text" placeholder="Add notes to item..." size="20">`;
        div.appendChild(notesRow);
    }
    if (elem.id === undefined)
        favArray.push(elem);
    else if (elem.id.includes('addBtn')){
        cartArray.push(elem.value);
        if (cartArray.length === 1) {
            addOrderBtn();
        }
    } else if (elem.id.includes('favBtn')){
        favArray.push(elem.value);        
    }
    
}

function removeFormList(elem){
    var divParent = elem.parentNode.parentNode;
    var dishName = divParent.firstChild.children[0].innerHTML;
    divParent.remove();
    if (elem.id.includes('removeItem')){
        const index = cartArray.indexOf(dishName);
        if (index > -1) {
            cartArray.splice(index, 1);
        }
        checkCartEmpty();
    } else if (elem.id.includes('removeFav')){
        const index = favArray.indexOf(dishName);
        if (index > -1) {
            favArray.splice(index, 1);
        }
    }
    
    
}


function checkCartEmpty(){
    if(cartArray.length=== 0){
        removeOrderBtn();
    }
}

function addOrderBtn(){
    var row = document.getElementById("menuColl");
    var orderDiv = document.createElement("div");
    orderDiv.setAttribute("id", "orderBtn");
    var col = document.createElement("div");
    var total = document.createElement("div");
    col.setAttribute("class", "col-md-6");
    var btn = document.createElement("button");
    btn.setAttribute("class", "btn");
    btn.setAttribute("type", "submit");
    btn.setAttribute("onclick","placeOrder()");
    btn.innerHTML = `Place Order`;
    col.appendChild(btn);
    orderDiv.appendChild(col);
    row.appendChild(orderDiv);
}

function calculate(){
    var total = 0;
    var urlSearch = new URLSearchParams(window.location.search);
    var user = urlSearch.get('name');
    for(let i= 0; i<cartArray.length;i++){
        if(user === null)
            total += (JSON.parse(localStorage.getItem(cartArray[i])).price);
        else 
            total += (JSON.parse(localStorage.getItem(cartArray[i])).viprice);
    }
    return total;
}


function removeOrderBtn(){
    var btn = document.getElementById("orderBtn");
    btn.remove();
}

function removeFavBtn() {
    var btn = document.getElementById("favBtn");
    btn.remove();
}

function createOrderRow() {
    for(let i=0; i<2; i++){
        var row = document.getElementById("orderManage");
        var div = document.createElement("div");
        div.setAttribute("class", "col-md-6");
        if(i==0){
            div.setAttribute("id", "items");
            div.innerHTML = `<h3>Add Items to Cart</h3>`;
        } else{
            div.setAttribute("id", "favs");
            div.innerHTML = `<h3>Add Items to Fav</h3>`;
        }
        row.appendChild(div);
    }
}

function placeOrder(){
    window.location.href = "./checkout.html";
}