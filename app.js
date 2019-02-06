function init() {
    document.getElementById("title").value = "";
    document.getElementById("type").value = "service";
    document.getElementById("hour").value = "1";
    document.getElementById("rate").value = "1.00";
    document.getElementById("charge").value = "55457";
}

function newItem() {
    var item = document.getElementById("title").value;
	if ( item == "" ) {
		return
	};
	var d = new Date();
	var id = d.getTime();
	var type = document.getElementById("type").value;
	var hour = document.getElementById("hour").value;
	var rate = document.getElementById("rate").value;
	var charge = document.getElementById("charge").value;
	var currentTotal = Math.round(Number(hour) * Number(rate) * Number(charge))
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(`${id} ${type} : ${item} : ${hour}x${rate}x${charge}=${currentTotal}`));
    ul.appendChild(li);
    li.onclick = removeItem;
	init()
	// update total
	var total = document.getElementById("total").innerHTML;
	document.getElementById("total").innerHTML = Number(total) + currentTotal
}


function removeItem(e) {
    e.target.parentElement.removeChild(e.target);
	var total = Number(document.getElementById("total").innerHTML);
	subValue = Number(e.target.innerHTML.split("=")[1])
	//console.log(subValue)
	document.getElementById("total").innerHTML = total - subValue

}

function printPage() {
	window.print();
}

// enter를 치거나 add버튼을 클릭한다면 아이템이 보여야 한다.
document.body.onkeyup = function(e) {
    if (e.keyCode == 13) {
        newItem();
    }
};
document.getElementById('add').addEventListener('click',newItem);
