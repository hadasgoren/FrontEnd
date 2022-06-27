$(document).ready(function(){
    function loadManagersFromFile() {
        for (let i = 0; i < managers.length; i++) {
            localStorage.setItem(managers[i].adminname, JSON.stringify(managers[i]));
        }
    }
    function loadUsersFromFile() {
        for (let i = 0; i < users.length; i++) {
            localStorage.setItem(users[i].name, JSON.stringify(users[i]));
        }
    }
    $('.loginBtn').click(function(){
        $('li.active').removeClass('active');
        $(this).parent('li').addClass('active');
    });


    loadManagersFromFile();
    loadUsersFromFile();
})
