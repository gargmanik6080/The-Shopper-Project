

function quantity(x){
    ele = document.getElementById("quantity");
    ele.value  =  parseInt(ele.value)+x ;
    if(ele.value == 0) removeItem();
    else update();

    // console.log(val);
}