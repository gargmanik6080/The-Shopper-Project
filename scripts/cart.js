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
                                    <button type="button" class="btn  rounded-start-pill align-middle bg-grey" id="quantity-left-minus" onclick="quantity(-1)">-</button>
                                    <input type="number" id="quantity" size="2" step="1" class="text-center align-middle bg-grey" value="${element.quantity}" max="99" />
                                    <button type="button" class="btn  rounded-end-pill align-middle bg-grey" id="quantity-right-plus " onclick="quantity(1)">+</button>
                            </div>
                        </center>
                    </div>
                </div>
                <div class="col">&#8377; ${element.price * element.quantity}</div>
                <div class="col-1"></div>

                <div class="summary col-4"></div>
            </div>`;
		}
	});
	// console.log(ele);
	// console.log(str);
	ele.innerHTML = str;
}
function quantity(x, index) {
	ele = document.getElementById(`quantity${index}`);
	if (ele.value == 0 && x == -1) return;
	ele.value = parseInt(ele.value) + x;
	update();
	// console.log(val);
}
