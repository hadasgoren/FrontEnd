$(document).ready(function () {
    $('#loginU').click(()=>{
        var name = $('#username').val();
        var password = $('#upassword').val();
        var user = { "name": name,
                    "password": password};
        console.log(user);
        if(checkUser(user)){
            //welcome
            window.location.href = `./menu.html?name=${user.name}`;
        }else{
            showRegister();
            $('#loginModal').modal('show');
        }
    })


    function checkUser(user){
        for(let i=0; i<localStorage.length;i++){
            if(user.name === JSON.parse(localStorage.getItem(localStorage.key(i))).name && user.password === JSON.parse(localStorage.getItem(localStorage.key(i))).password){
                return true;
            }     
        }
        return false;
    }


    $('#loginA').click(()=>{
        console.log("in admin click");
        var name = $('#adminName').val();
        var password = $('#apassword').val();
        var admin = { "name": name,
                    "password": password};
        console.log(admin);
        if(checkAdmin(admin)){
            //welcome
            window.location.href = `./admin.html?admin=${admin.name}`;
        }else{
            alert("Not authorized!");
        }
    })
    
    
    function checkAdmin(admin){
        for (let i = 0; i < localStorage.length; i++){
            console.log(i);
            if(admin.name === (JSON.parse(localStorage.getItem(localStorage.key(i)))).adminname && admin.password === (JSON.parse(localStorage.getItem(localStorage.key(i)))).password){
                return true;
            }     
        }
        return false;
    }


    $('#newuser').click(()=>{
        var name = $('#nuser').val();
        var password = $('#password1').val();
        var password2 = $('#password2').val();
        if(password != password2){
            alert("Passwords don't match, try again!");
            return false;
        }
        var newuser = {"name": name,
                        "password": password,
                    "favorites":[]};
        for(let i=0;i<localStorage.length;i++){
            if(newuser.name === JSON.parse(localStorage.getItem(localStorage.key(i))).name){
                alert("User name already taken, try again!");
            }else{
                localStorage.setItem(newuser.name, newuser);
                window.location.href = `./menu.html?name=${newuser.name}`;
            }
        }
    })



})


function changeFunc(value){
    if(value === "logout")
        window.location.href = './home.html';
}


/* function enterUser(){
    removeButtons();
    const div = document.createElement("div");
    div.innerHTML=`
        <label for="username">חבר מועדון</label>
        <input type="text" placeholder="חבר מועדון" name="username" maxlength="20">
        <label for="password">סיסמא</label>
        <input type="password" placeholder="הקלד סיסמא" name="password" maxlength="20">
        <button type="submit" onclick="login()">התחברות</button>
                <label>
                    <input type="checkbox" checked="checked" name="remember"> חברים טובים זוכרים
                </label>`;
    document.getElementById("register").appendChild(div);
    
}

function newUser(){
    removeButtons();
    const div = document.createElement("div");
    div.innerHTML=`
        <label for="username">חבר מועדון</label>
        <input type="text" placeholder="חבר מועדון" name="username" maxlength="20">
        <label for="password">סיסמא</label>
        <input type="password" placeholder="הקלד סיסמא" name="password" maxlength="20">
        <label for="password">סיסמא</label>
        <input type="password" placeholder="הקלד סיסמא" name="password" maxlength="20">
        <button type="submit" onclick="createNewUser()">צרפו אותי!</button>`;
    document.getElementById("register").appendChild(div);
} */
/*
function createNewUser(){
    localStorage.

}
*/

function showRegister(){
    var login = document.getElementById("login");
    login.style.display = "none";
    var register = document.getElementById("register");
    register.style.display = "block";
}

function showLogin(){
    var register = document.getElementById("register");
    register.style.display = "none";
    var login = document.getElementById("login");
    login.style.display = "block";
}

/*
function adminLogin(){
    console.log("in admin click");
    var name = $('#adminName').val();
    var password = $('#apassword').val();
    var admin = { "name": name,
                "password": password};
    console.log(admin);
    if(checkAdmin(admin)){
        //welcome
        window.location.href = `./admin.html?name=${admin.name}`;
    }else{
        //please register
    }
}


function checkAdmin(admin){
    for(let i=0; i<managers.length;i++){
        if(admin.name === managers[i].username){
            if(admin.password === managers[i].password)
                return true;
        }     
    }
    return false;
}

/*
$(document).ready(function() { 
    $('#loginModal').modal('show');
    $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
});
*/