var items = [];

function init() {
    document.getElementById("title").value = "";
    document.getElementById("type").value = "service";
    document.getElementById("hour").value = 1;
    document.getElementById("rate").value = 1.0;
    document.getElementById("charge").value = 55457;
}

function newItem() {
    var title = document.getElementById("title").value;
	if ( title == "" ) {
		return
	};
	var d = new Date();
	var id = d.getTime();
	var type = document.getElementById("type").value;
	var hour = Number(document.getElementById("hour").value);
	var rate = Number(document.getElementById("rate").value);
	var charge = Number(document.getElementById("charge").value);
	var subtotal = Math.round(hour * rate * charge)
	var discount = 1.0;
	var total = discount * subtotal;
    var ul = document.getElementById("list");
    var li = document.createElement("li");
	var item = {};
	item["id"] = id;
	item["type"] = type;
	item["title"] = title;
	item["hour"] = hour;
	item["rate"] = rate;
	item["charge"] = charge;
	item["subtotal"] = subtotal;
	item["discount"] = discount;
	item["total"] = total;
	items.push(item)
	li.setAttribute("id", id);
    li.appendChild(document.createTextNode(`${type} : ${title} : ${hour} ${rate} ${charge} ${subtotal} ${discount} ${total}`));
    li.onclick = removeItem;
    ul.appendChild(li);
	init()
	updateTotal()
}

function removeItem(e) {
	id = e.target.getAttribute("id");
	// remove items
	for ( i = 0; i < items.length; i++){ 
	   	if ( items[i]["id"] == id) {
			 items.splice(i, 1); 
	   	};
	};
	updateTotal();
	// remove self
    e.target.parentElement.removeChild(e.target);
}

function updateTotal() {
	var total = 0;
	for (i = 0; i < items.length; i++) {
		total += items[i]["subtotal"];
	}
	document.getElementById("total").innerHTML = total
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
