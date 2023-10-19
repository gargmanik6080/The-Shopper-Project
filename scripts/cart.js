const productFile = "../assets/productList.json";
window.onload = load();


function load() {
    if(localStorage.getItem("products") == null ){
        fetch(productFile).then( (res) => {
            return res.json();
        }).then( (data) => {
            localStorage.setItem("products", JSON.stringify(data["products"]));
            renderProducts(data["products"]);
        });
    }
    else renderProducts( JSON.parse(localStorage.getItem("products")) );
}

function renderProducts(data) {
	ele = document.getElementById("product1");
	str = "";
	// data = JSON.parse(localStorage.getItem("products"));
    total = 0;
    num = 0;
	data.forEach((element) => {
		if ( element.quantity != 0) {
            num++;
            total += element.price * element.quantity;
			str += `
            <div class="row p-2 row col details" >
                <div class=" col-11 border-bottom row ">
                    <div class="col-5 text-start name">${element.name}</div>
                    <div class="col-2  price">&#8377; ${element.price}</div>
                    <div class="col-3 ">
                        <div class="">
                            <center>
                                <div class="input-group mb-2 ">
                                        <button type="button" class="btn  rounded-start-pill align-middle bg-grey" id="quantity-left-minus" onclick="quantity(-1, ${element["index"]})">-</button>
                                        <input type="number" id="quantity${element["index"]}" size="2" step="1" class="text-center align-middle bg-grey" value="${element.quantity}" onchange="quantity(0, ${element["index"]})" />
                                        <button type="button" class="btn  rounded-end-pill align-middle bg-grey" id="quantity-right-plus " onclick="quantity(1, ${element["index"]})">+</button>
                                </div>
                            </center>
                        </div>
                    </div>
                    <div class="col-2 total">&#8377; ${element.price * element.quantity}</div>
                    
                </div>
                <button class="bg-grey del ml-3 col-1" id="del${element.index}" onclick="delt(${element.index})"> x </button>
            </div>
`;
		}
	});
;
	ele.innerHTML = str;
    document.getElementById("grand-total").innerHTML = ": &#8377; " + total;
    document.getElementById("sub-total").innerHTML = ": &#8377; " + total;
    document.getElementById("item-num").innerHTML = ": " + num;
    if(num == 0){
        ele.innerHTML = `

                <div class="empty mt-4 mt-4"> 
                    There is no item in your cart!!!<br>
                    Add items to shop <br>
                    <a href="./products.html" > Continue Shopping... </a>

        `;
    }
}


function quantity(x, index){
    ele = document.getElementById(`quantity${index}`);
    newVal = parseInt(ele.value)+x;
    if(newVal < 0) newVal = 0 ; 
    else if( newVal > 99 ) newVal = 99;
    // else if( ele.value > 98 ) newVal = 99;
    // else 
    ele.value  = newVal;
    updateQuantity(index, newVal);
}

function updateQuantity(index, newVal){
    list = JSON.parse(localStorage.getItem("products"));
    list[index].quantity = newVal;
    // console.log(localStorage.getItem("products"));
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(list));
    load();
    // console.log(localStorage.getItem("products"));
}


function delt(index){
    ele = document.getElementById(`quantity${index}`);
    quantity(ele.value*(-1), index);
}
function clearCart(){
    localStorage.clear();
    load();
}