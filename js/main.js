function createChart() {
    let json = JSON.parse(this.responseText);
    let labels = [];
    let data = [];
    json.forEach(element => {
        labels.push(element.timestamp);
        data.push(element.value);
    })
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        options: {
            scales: {
                xAxes: [{
                    display: false
                }]
            }
        },
        data: {
            labels: labels,
            datasets: [{
                label: 'Decibel (dB)',
                data: data,
                backgroundColor: "rgba(153,255,51,0.6)"
            }]
        }
    })
}

function xhrSuccess() {
    this.callback.apply(this, this.arguments);
}

function xhrError() {
    console.error(this.statusText);
}

function getRecords(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.callback = callback;
    xhr.arguments = Array.prototype.slice.call(arguments, 2);
    xhr.onload = xhrSuccess;
    xhr.onerror = xhrError;
    xhr.open("GET", url, true);
    xhr.send(null);
}

function createTable() {
    let htmlContent = ""
    let records = JSON.parse(this.responseText);
    records.forEach(record => {
        htmlContent = htmlContent + "<tr>";
        htmlContent = htmlContent + " <th scope='row'>" + record._id + "</th>";
        htmlContent = htmlContent + " <td>" + record.timestamp + "</td>";
        htmlContent = htmlContent + " <td>" + record.value + "</td>";
        htmlContent = htmlContent + " <td> <button type='button' class='btn btn-outline-dark' data-toggle='modal' data-target='#editRecord'>Edit</button><button type='button' class='btn btn-outline-danger' data-toggle='modal' data-target='#removeRecord'>Remove</button></td>";
        htmlContent = htmlContent + "<tr>";
        htmlContent = htmlContent + "<tr>";
        htmlContent = htmlContent + "<tr>";
    });
    document.getElementById("records").innerHTML = htmlContent;
}

function orderToCreateTable() {
    getRecords("http://localhost:3000/records", createTable);
}

function orderToCreateChart() {
    getRecords("http://localhost:3000/records", createChart);
}