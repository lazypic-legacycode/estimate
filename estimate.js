var doc = {
	title:"",
	num:"",
	writedate:"",
	unit:"￦",
	items:[],
};

function initItem() {
    document.getElementById("doctitleInput").value = "";
    document.getElementById("title").value = "";
    document.getElementById("type").value = "Service";
    document.getElementById("hour").value = 1;
    document.getElementById("pers").value = 4;
    document.getElementById("charge").value = 55000;
}

function numberWithCommas(n) {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function newTitle() {
    var title = document.getElementById("doctitleInput").value;
	if ( title == "" ) {
		return
	};
	document.getElementById("doctitle").innerHTML = "Title : " + title;
	// init doc title
    document.getElementById("doctitleInput").value = "";
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
    var tbody = document.getElementById("list");
    var tr = document.createElement("tr");
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
	doc.items.push(item)
	tr.setAttribute("id", id);
	tr.setAttribute("class","item")
	var chargeWithCommas = doc.unit + " " + numberWithCommas(charge);
	var subTotalWithCommas = doc.unit + " " + numberWithCommas(subtotal);
	var totalWithCommas = doc.unit + " " + numberWithCommas(total);
    var iType = document.createElement("td");
	iType.appendChild(document.createTextNode(type))
    var iTitle = document.createElement("td");
	iTitle.appendChild(document.createTextNode(title))
    var iHour = document.createElement("td");
	iHour.appendChild(document.createTextNode(hour))
    var iPers = document.createElement("td");
	iPers.appendChild(document.createTextNode(pers))
    var iSar = document.createElement("td");
	iSar.appendChild(document.createTextNode(sar))
    var iCharge = document.createElement("td");
	iCharge.appendChild(document.createTextNode(chargeWithCommas))
    var iSubTotal = document.createElement("td");
	iSubTotal.appendChild(document.createTextNode(subTotalWithCommas))
    var iDiscount = document.createElement("td");
	iDiscount.appendChild(document.createTextNode(discount))
    var iTotal = document.createElement("td");
	iTotal.appendChild(document.createTextNode(totalWithCommas))

	tr.appendChild(iType)
	tr.appendChild(iTitle)
	tr.appendChild(iHour)
	tr.appendChild(iPers)
	tr.appendChild(iSar)
	tr.appendChild(iCharge)
	tr.appendChild(iSubTotal)
	tr.appendChild(iDiscount)
	tr.appendChild(iTotal)
    tr.onclick = removeItem;
    tbody.appendChild(tr);
	initItem()
	updateTotal()
}

function removeItem(e) {
	id = e.target.parentElement.getAttribute("id");

	// remove items
	for ( i = 0; i < doc.items.length; i++){ 
	   	if ( doc.items[i]["id"] == id) {
			 doc.items.splice(i, 1); 
	   	};
	};
	// remove self
    e.target.parentElement.remove(e.target);
	updateTotal();
}

function updateTotal() {
	var total = 0;
	for (i = 0; i < doc.items.length; i++) {
		total += doc.items[i]["total"];
	}
	document.getElementById("total").innerHTML = doc.unit + " " + numberWithCommas(total)
	document.getElementById("withholdingTax").innerHTML = doc.unit + " " + numberWithCommas(Math.round(total * 0.033))
	document.getElementById("personal").innerHTML = doc.unit + " " + numberWithCommas(total - Math.round(total * 0.033))
	// document.getElementById("vat").innerHTML = doc.unit + numberWithCommas(Math.round(total * 0.1))
	// document.getElementById("company").innerHTML = doc.unit + numberWithCommas(total + Math.round(total * 0.1))
}

function inputMode() {
	var inputTitleForm = document.getElementById('doctitleInput');
	inputTitleForm.style.display='block';
	var inputItemForm = document.getElementById('itemInput');
	inputItemForm.style.display='block';
	var link = document.getElementById('link');
	link.style.display='block';
}

function printMode() {
	var inputTitleForm = document.getElementById('doctitleInput');
	inputTitleForm.style.display='none';
	var inputItemForm = document.getElementById('itemInput');
	inputItemForm.style.display='none';
	var link = document.getElementById('link');
	link.style.display='none';

	window.print();
}

function writeDate() {
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	doc.writedate = `작성일 : ${y}. ${m}. ${d}`;
	document.getElementById("writeDate").innerHTML = doc.writedate;
}

function docNum() {
	var d = new Date();
	var year = d.getFullYear();
	var month = (d.getMonth() + 1).toString();
	var day = d.getDate().toString();
	var hour = d.getHours().toString();
	if (month.length === 1) {
		month = "0" + month;
	}
	if (day.length === 1) {
		day = "0" + day;
	}
	if (hour.length === 1) {
		hour = "0" + hour;
	}
	doc.num = "No. " + year + month + day + hour;
	document.getElementById("docnum").innerHTML = doc.num;
}

// enter를 치거나 add버튼을 클릭한다면 아이템이 보여야 한다.
document.body.onkeyup = function(e) {
    if (e.keyCode == 13) {
        newItem();
		newTitle();
    }
};
document.getElementById('add').addEventListener('click',newItem);

// auto load
window.onload=writeDate()
window.onload=docNum()
