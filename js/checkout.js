
    function completeOrder(){
        alert("We are already working on it!\n Be there soon...");
        var order = document.getElementById("placeOrder");
        var child = order.lastElementChild;
        while(child){
            order.removeChild(child);
            child = order.lastElementChild;
        }
        order.innerHTML = `Your order is been created by the best ingredients...`;
    }

    function creditCard(){
        var payment = document.getElementById("payment");
        var creditCardinfo = document.createElement("div");
        creditCardinfo.setAttribute("class", "col-md-12 text-center");
        creditCardinfo.setAttribute("id", "cardDetails");
        creditCardinfo.innerHTML = `<input type="text" placeholder="Card number">
                                    <input type="number" placeholder="ID number">`;
        payment.appendChild(creditCardinfo);
    }


    function noCreditCard(){
        var cardDetails = document.getElementById("cardDetails");
        if(cardDetails!= null)
            cardDetails.remove();
    }


    function sendOrder(){
        if(document.getElementById("orderBtn")===null){
            var payment = document.getElementById("placeOrder");
            var order = document.createElement("div");
            order.setAttribute("class", "row");
            order.setAttribute("id","orderBtn");
            order.innerHTML = `<div class="col-md-12 text-center">`;
            var orderBtn = document.createElement("button");
            orderBtn.setAttribute("onclick","completeOrder()");
            orderBtn.innerHTML= `Finish Payment`;
            order.innerHTML+= `</div>`;
            order.appendChild(orderBtn);
            payment.appendChild(order);
        }
        
    }


