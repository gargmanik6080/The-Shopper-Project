window.onload = load();
function load() {
	ele = document.getElementById("product1");
	str = "";
	data = JSON.parse(localStorage.getItem("products"));
	data.forEach((element) => {
		if ( element.quantity != 0) {
			str += `
            <div class="details col-7 row">
                <div class="col-5 text-start">${element.name}</div>
                <div class="col-2">${element.price}</div>
                <div class="col-3">
                    <div class="">
                        <center>
                            <div class="input-group ">
                                    <button type="button" class="btn  rounded-start-pill align-middle bg-grey" id="quantity-left-minus" onclick="quantity(-1, ${element["index"]})">-</button>
                                    <input type="number" id="quantity${element["index"]}" size="2" step="1" class="text-center align-middle bg-grey" value="${element.quantity}" onchange="quantity(0, ${element["index"]})" />
                                    <button type="button" class="btn  rounded-end-pill align-middle bg-grey" id="quantity-right-plus " onclick="quantity(1, ${element["index"]})">+</button>
                            </div>
                        </center>
                    </div>
                </div>
                <div class="col">&#8377; ${element.price * element.quantity}</div>
                

                <div class="summary col-4"></div>
            </div>`;
		}
	});
	// console.log(ele);
	// console.log(str);
	ele.innerHTML = str;
}
// function quantity(x, index) {
// 	ele = document.getElementById(`quantity${index}`);
// 	if (ele.value == 0 && x == -1) return;
// 	ele.value = parseInt(ele.value) + x;
// 	update();
// 	// console.log(val);
// }


function quantity(x, index){
    ele = document.getElementById(`quantity${index}`);
    newVal = parseInt(ele.value)+x;
    ele.value  = newVal;
    updateQuantity(index, newVal);
    // console.log(val);
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
