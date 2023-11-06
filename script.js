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

let accurateSolutions = jakobioMetodas(arrF, 200, -1);
for(let i = 0; i < accurateSolutions.length; i++) {
    accurateSolutions[i] = +accurateSolutions[i].toFixed(3);
}
console.log(accurateSolutions)

console.log(relaksacijosMetodas(arrF, 23, -1, 1.5));

//jakobioMetodas(arrC, 5)

function jakobioMetodas(equation, itNum, accuracy) {
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
    for(let it = 0; it <= itNum; it++) {
        //if(itNum == -1) it = 0;
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
        //console.log(it + "-th iteration: ")
        //console.log(iteration)
        iteration = iterationTemp;

        if(accuracy != -1) {
            let accMax = 0;

            for(let i = 0; i < iteration.length; i++) {
                let acc = Math.abs(iteration[i] - accurateSolutions[i]);
                if(acc > accMax) accMax = acc;
            }
            console.log("Paklaida: " + accMax)
            if(accMax <= accuracy) {
                let accuracyInverse = 1 / accuracy;
                for(let i = 0; i < iteration.length; i++) {
                    iteration[i] = Math.round(iteration[i] * accuracyInverse) / accuracyInverse
                }
                return iteration;
            }
        }
    }
    return iteration
}

function relaksacijosMetodas(equation, itNum, accuracy, w) {
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
    for(let it = 0; it <= itNum; it++) {
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
        console.log(it + "-th iteration: ")
        console.log(iteration)

        if(accuracy != -1) {
            let accMax = 0;

            for(let i = 0; i < iteration.length; i++) {
                let acc = Math.abs(iteration[i] - accurateSolutions[i]);
                if(acc > accMax) accMax = acc;
            }
            //console.log("Paklaida: " + accMax)
            if(accMax <= accuracy) {
                let accuracyInverse = 1 / accuracy;
                for(let i = 0; i < iteration.length; i++) {
                    iteration[i] = Math.round(iteration[i] * accuracyInverse) / accuracyInverse
                }
                return iteration;
            }
        }
    }
    return iteration
}