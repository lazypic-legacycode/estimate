var items = [];

function init() {
    document.getElementById("title").value = "";
    document.getElementById("type").value = "service";
    document.getElementById("hour").value = 1;
    document.getElementById("pers").value = "4";
    document.getElementById("charge").value = 55457;
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
	var pers = Number(document.getElementById("pers").value);
	var charge = Number(document.getElementById("charge").value);
	var sar = 1.0
	if ( pers > 4 ) {
		sar = 1.0 + (pers * 0.05)
	}
	var subtotal = Math.round(hour * sar * charge);
	var discount = 1.0;
	var total = discount * subtotal;
    var ul = document.getElementById("list");
    var li = document.createElement("li");
	var item = {};
	item["id"] = id;
	item["type"] = type;
	item["title"] = title;
	item["hour"] = hour;
	item["pers"] = pers;
	item["charge"] = charge;
	item["subtotal"] = subtotal;
	item["discount"] = discount;
	item["total"] = total;
	items.push(item)
	li.setAttribute("id", id);
	li.setAttribute("class","item")
	var chargeWithCommas = numberWithCommas(charge);
	var subTotalWithCommas = numberWithCommas(subtotal);
	var totalWithCommas = numberWithCommas(total);
    li.appendChild(document.createTextNode(`${type} : ${title} : ${hour} ${pers} ${sar} ${chargeWithCommas} ${subTotalWithCommas} ${discount} ${totalWithCommas}`));
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
	document.getElementById("total").innerHTML = numberWithCommas(total)
	document.getElementById("vat").innerHTML = numberWithCommas(Math.round(total * 0.1))
	document.getElementById("withholdingTax").innerHTML = numberWithCommas(Math.round(total * 0.033))
	document.getElementById("company").innerHTML = numberWithCommas(total + Math.round(total * 0.1))
	document.getElementById("personal").innerHTML = numberWithCommas(total - Math.round(total * 0.033))
}

function inputMode() {
	var inputForm = document.getElementById('itemInput');
	inputForm.style.display='block';
	var issue = document.getElementById('issue');
	issue.style.display='block';
}

function printMode() {
	var inputForm = document.getElementById('itemInput');
	inputForm.style.display='none';
	var issue = document.getElementById('issue');
	issue.style.display='none';

	window.print();
}

// enter를 치거나 add버튼을 클릭한다면 아이템이 보여야 한다.
document.body.onkeyup = function(e) {
    if (e.keyCode == 13) {
        newItem();
    }
};
document.getElementById('add').addEventListener('click',newItem);
