window.onload = load;
var list;
const productFile = "../assets/productList.json";


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


function renderProducts(data){
    list = data;
    ele = document.getElementById("products");
    str = "";

    data.forEach(element => {
        str+= `
                <div class="col-3 item p-4 single-product">
                    <img src="${element["img"]}" class="rounded al "><br>
                    <u>${element["name"]}</u><br>
                    Price : &nbsp;&nbsp;&nbsp;&nbsp;  <b><span> &#8377; ${element["price"]} </span></b><br>
                    <div class="quantity row">
                        <span style="margin-top:4px">Add more to cart:</span> <br>
                            <div class="input-group col-10 ">
                                <button type="button" class="btn  rounded-start-pill align-middle bg-grey" id="quantity-left-minus" onclick="quantity(-1, ${element["index"]})">-</button>
                                <input type="number" id="quantity${element["index"]}" size="2" step="1" class="text-center align-middle bg-grey mx-wid" value="${element["quantity"]}" onchange="quantity(0, ${element["index"]} )"/>
                                <button type="button" class="btn  rounded-end-pill align-middle bg-grey" id="quantity-right-plus " onclick="quantity(1, ${element["index"]})">+</button>
                            </div>
                    </div>
                </div>`
    });
    ele.innerHTML = str;
}


function quantity(x, index){
    ele = document.getElementById(`quantity${index}`);
    if(ele.value == 0 && x == -1) return ; 

    let newVal=0;
    if(ele.value < 0) newVal = 0;
    else if(ele.value == 99 && x == -1) newVal = 98;
    else if( ele.value > 98) newVal = 99;
    else newVal = parseInt(ele.value)+x;

    if(newVal == ele.value) return ;
    if(isNaN(newVal)) newVal = 0;

    console.log(newVal);
    ele.value  = newVal;
    updateQuantity(index, newVal);
}

function updateQuantity(index, newVal){
    list[index].quantity = newVal;
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(list));
}

function clearCart(){
    localStorage.clear();
    load();
}