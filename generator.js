generateSystem()
function generateSystem() {
    document.getElementById('generatorContainer').innerHTML = "";
    let rows = document.getElementById("rows").value;
    //let place = document.getElementById("generatorContainer");
    console.log(rows)
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
        document.getElementById(`container-${i}`).innerHTML += `
            <div>
                <p class="columnIndicator"> = </p>
                <input class="sysNum" type="number" id="column-${i}-${i}">
            </div>
        `
    }
}
document.querySelector("#rows").addEventListener("change", (event) => {
    generateSystem();
});