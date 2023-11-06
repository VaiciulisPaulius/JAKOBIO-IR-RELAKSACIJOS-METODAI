let arrC = [
    [10, -1, 3, 11],
    [2, 20, 3, 45],
    [2, 1, 10, 14]
];

let arrD = [
    [0.4, -0.1, -0.1, 5],
    [-0.2, 0.8, -0.4, 2],
    [-0.1, -0.4, 0.6, 9]
]

let arrF = [
    [1, -0.95, 0, 0.05],
    [-0.95, 2, -0.95, 0.1],
    [0, -0.95, 1, 0.05]
]

let accurateSolutions;

document.querySelector("#btn").addEventListener("click", (event) => {
    let equation = [];
    let rows = document.getElementById("rows").valueAsNumber;
    rows = parseInt(rows)
    for(let i = 1; i <= rows; i++) {
        let row = [];
        for(let j = 1; j <= rows+1; j++) {
            let num = document.getElementById(`column-${i}-${j}`).valueAsNumber
            row.push(num)
        }
        equation.push(row);
    }
    let acc = document.getElementById(`paklaida`).valueAsNumber
    console.log(equation)
    console.log(acc)

    let w = document.getElementById(`wNum`)?.valueAsNumber

    accurateSolutions = jakobioMetodas(equation, 200, -1);
    document.getElementById('generatorTableContainer').innerHTML = "";
    for(let i = 0; i < accurateSolutions.length; i++) {
        accurateSolutions[i] = +accurateSolutions[i].toFixed(3);
    }
    console.log(accurateSolutions)

    let rezultatas = metodas == "JakobioMetodas" ? jakobioMetodas(equation, 1000, acc) : relaksacijosMetodas(equation, 1000, acc, w);
    document.getElementById('generatorTableContainer').innerHTML += `<p>Rezultatas:</p>`
    for(let i = 0; i < rezultatas.length; i++) {
        document.getElementById('generatorTableContainer').innerHTML += `<p>x${i+1}: ${rezultatas[i]}</p>`
    }
});

//console.log(relaksacijosMetodas(arrF, 23, -1, 1.5));

//jakobioMetodas(arrC, 5)

function jakobioMetodas(equation, itNum, accuracy) {
    let accuracyInverse = 1 / accuracy;
    arr = equation;
    let arrX = [];

    for(let i = 0; i < arr.length; i++) {
        let arrXLine = [1];
        for(let j = 0; j < arr.length; j++) {
            if(j != i) arrXLine.push(-arr[i][j] / arr[i][i])
        }
        arrXLine.push(arr[i][arr[i].length-1] / arr[i][i]);
        arrX.push(arrXLine)
    }

    //console.log(arr)
    //console.log(arrX)

    let firstIteration = []
    for(let i = 0; i < arr.length; i++) {
        firstIteration.push(0);
    }

    // let secondIteration = [];
    // for(let i = 0; i < arrX.length; i++) {
    //     let sum = 0;
    //     for(let j = 1; j < arrX.length-1; j++) {
    //         sum += arrX[i][j] * firstIteration[i]
    //     }
    //     sum += arrX[i][arrX[i].length-1]
    //     secondIteration.push(sum);
    // }

    //console.log(secondIteration)
    let iteration = firstIteration;
    let table = "<table>"
    table += `<tr>
    <th>Iteracijos num.</th>`

    let rows = document.getElementById("rows").value;
    rows = parseInt(rows)

    for(let i = 1; i <= rows; i++) {
        table += `<th>x${i}</th>`
    }
    
    table += `<th>dabartinė paklaida</th>`


    for(let it = 0; it <= itNum; it++) {
        table += `<tr>
        <td>${it}</td>`;
        if(itNum == -1) it = 0;
        let iterationTemp = [];
        for(let i = 0; i < arrX.length; i++) {
            let sum = 0;
            let counter = 0;
            for(let j = 1; j < arrX.length; j++) {
                if(i == j-1) counter = 1;
                sum += arrX[i][j] * iteration[j+counter-1]
                //console.log("sum += " + arrX[i][j] + " * " + iteration[j+counter-1])
            }
            sum += arrX[i][arrX[i].length-1]
            //console.log("sum += " + arrX[i][arrX[i].length-1])
            iterationTemp.push(sum);
        }
        for(let i = 0; i < iteration.length; i++) {
            iteration[i] = Math.round(iteration[i] * (accuracyInverse * 10)) / (accuracyInverse * 10)
            table += `<td>${iteration[i]}</td>`;
        }
        //console.log(it + "-th iteration: ")
        //console.log(iteration)
        iteration = iterationTemp;

        if(accuracy != -1) {
            let accMax = 0;

            for(let i = 0; i < iteration.length; i++) {
                let acc = Math.abs(iteration[i] - accurateSolutions[i]);
                if(acc > accMax) accMax = acc;
            }
            let accMaxRounded = Math.round(accMax * (accuracyInverse * 100)) / (accuracyInverse * 100)
           // console.log("Paklaida: " + accMax)
            table += `<td>${accMaxRounded}</td>`;
            if(accMax <= accuracy) {
                for(let i = 0; i < iteration.length; i++) {
                    iteration[i] = Math.round(iteration[i] * (accuracyInverse * 10)) / (accuracyInverse * 10)
                }
                document.getElementById('generatorTableContainer').innerHTML = table;
                return iteration;
            }
        }
        document.getElementById('generatorTableContainer').innerHTML = table;
    }
    return iteration
}

function relaksacijosMetodas(equation, itNum, accuracy, w) {
    let accuracyInverse = 1 / accuracy;
    arr = equation;
    console.log(equation)
    console.log(w)
    let arrX = [];

    for(let i = 0; i < arr.length; i++) {
        let arrXLine = [1];
        for(let j = 0; j < arr.length; j++) {
            if(j != i) arrXLine.push(-arr[i][j] / arr[i][i])
        }
        arrXLine.push(arr[i][arr[i].length-1] / arr[i][i]);
        arrX.push(arrXLine)
    }

    //console.log(arr)
    //console.log(arrX)

    let firstIteration = []
    for(let i = 0; i < arr.length; i++) {
        firstIteration.push(0);
    }

    let table = "<table>"
    table += `<tr>
    <th>Iteracijos num.</th>`

    let rows = document.getElementById("rows").value;
    rows = parseInt(rows)

    for(let i = 1; i <= rows; i++) {
        table += `<th>x${i}</th>`
    }
    
    table += `<th>paklaida</th>`

    // let secondIteration = [];
    // for(let i = 0; i < arrX.length; i++) {
    //     let sum = 0;
    //     for(let j = 1; j < arrX.length-1; j++) {
    //         sum += arrX[i][j] * firstIteration[i]
    //     }
    //     sum += arrX[i][arrX[i].length-1]
    //     secondIteration.push(sum);
    // }

    //console.log(secondIteration)
    let iteration = firstIteration;
    for(let it = 0; it <= itNum; it++) {
        table += `<tr>
        <td>${it}</td>`;
        //if(itNum == -1) it = 0;
        //let iterationTemp = iteration;
        for(let i = 0; i < arrX.length; i++) {
            let sum = 0;
            let counter = 0;
            for(let j = 1; j < arrX.length; j++) {
                if(i == j-1) counter = 1;
                sum += arrX[i][j] * iteration[j+counter-1]
                console.log("sum += " + arrX[i][j] + " * " + iteration[j+counter-1])
            }
            sum += arrX[i][arrX[i].length-1]
            console.log("sum += " + arrX[i][arrX[i].length-1])
            iteration[i] += (sum - iteration[i]) * w;
            console.log("iteration[i] = " + sum + " * " + w)
        }

        for(let i = 0; i < iteration.length; i++) {
            iteration[i] = Math.round(iteration[i] * (accuracyInverse * 10)) / (accuracyInverse * 10)
            table += `<td>${iteration[i]}</td>`;
        }

        console.log(it + "-th iteration: ")
        console.log(iteration)

        if(accuracy != -1) {
            let accMax = 0;

            for(let i = 0; i < iteration.length; i++) {
                let acc = Math.abs(iteration[i] - accurateSolutions[i]);
                if(acc > accMax) accMax = acc;
            }
            console.log("1")
            //console.log("Paklaida: " + accMax)
            let accMaxRounded = Math.round(accMax * (accuracyInverse * 100)) / (accuracyInverse * 100)
            table += `<td>${accMaxRounded}</td>`;
            if(accMax <= accuracy) {
                for(let i = 0; i < iteration.length; i++) {
                    iteration[i] = Math.round(iteration[i] * (accuracyInverse * 10)) / (accuracyInverse * 10)
                    console.log(iteration[i]);
                }
                console.log("3")
                document.getElementById('generatorTableContainer').innerHTML = table;
                return iteration;
            }
        }
        document.getElementById('generatorTableContainer').innerHTML = table;
    }
    console.log("2")
    return iteration
}