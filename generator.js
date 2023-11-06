let metodas = "JakobioMetodas";
generateSystem()
function generateSystem() {
    document.getElementById('generatorContainer').innerHTML = "";
    let rows = document.getElementById("rows").value;
    //let place = document.getElementById("generatorContainer");
    rows = parseInt(rows)
    for(let i = 1; i <= rows; i++) {
        document.getElementById('generatorContainer').innerHTML += `<div id="container-${i}" class="container"></div>`
        for(let j = 1; j <= rows; j++) {
            document.getElementById(`container-${i}`).innerHTML += `
            <div>
                <p class="columnIndicator">x${j}</p>
                <input class="sysNum" type="number" id="column-${i}-${j}">
            </div>
            `
        }
        let a = rows + 1;
        document.getElementById(`container-${i}`).innerHTML += `
            <div>
                <p class="columnIndicator"> = </p>
                <input class="sysNum" type="number" id="column-${i}-${a}">
            </div>
        `
    }
}
document.querySelector("#rows").addEventListener("change", (event) => {
    generateSystem();
});

document.querySelector("#metodas").addEventListener("change", (event) => {
    let val = document.querySelector("#metodas").value;
    if(val == "RelaksacijosMetodas") {
        document.querySelector("#w").innerHTML = `
        <p class="columnIndicator">w:</p>
        <input type="number" id="wNum">
        `
        metodas = "RelaksacijosMetodas"
    }
    else {
        document.querySelector("#w").innerHTML = ""
        metodas = "JakobioMetodas"
    }
});