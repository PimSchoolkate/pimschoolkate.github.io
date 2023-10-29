
let alphaAnna = 4;
let betaAnna = 16;

let alphaSam = 1;
let betaSam = 1;

let Y = 0;
let N = 0;

$('#N-slider').slider({
    min: 0,
    max: 1000,
    step: 1,
    slide: (event, ui) => {
        N = ui.value
        updateManual()
    }
})

$("#play-button")
    .on("click", function() {
        const button = $(this)
        if (button.text() === "Play") {
            button.text("Pause")
            interval = setInterval(step, SPEED)
        } else {
            clearInterval(interval)
            button.text("Play")
        }
    })

$('#reset-button')
    .on("click", function (){
        N = 100
        update()
    })

$('#formula-select')
    .on('change', function () {
        paramAnna($(this).val())
        initPriors()
        update()
    })

const paramAnna = function(f) {
    if (f === 'formula1') {
        alphaAnna = 4.8
        betaAnna = 19.2
    }
    if (f === 'formula3') {
        alphaAnna = 1
        betaAnna = 4
    }
    if (f === 'formula4') {
        alphaAnna = 8
        betaAnna = 32
    }
    if (f === 'formula5') {
        alphaAnna = 16
        betaAnna = 64
    }
}

function betaPDF(x, a, b) {
    // Beta probability density function implementation
    // using logarithms, no factorials involved.
    // Overcomes the problem with large integers
    return Math.exp(lnBetaPDF(x, a, b))
}
function lnBetaPDF(x, a, b) {
    // Log of the Beta Probability Density Function
    return ((a-1)*Math.log(x) + (b-1)*Math.log(1-x)) - lnBetaFunc(a,b)
}
function lnBetaFunc(a, b) {
    // Log Beta Function
    // ln(Beta(x,y))
    let foo = 0.0;

    for (i=0; i<a-2; i++) {
        foo += Math.log(a-1-i);
    }
    for (i=0; i<b-2; i++) {
        foo += Math.log(b-1-i);
    }
    for (i=0; i<a+b-2; i++) {
        foo -= Math.log(a+b-1-i);
    }
    return foo
}

const dBeta = function(x, a, b) {
    return (gammaFunction(a+b) / (gammaFunction(a)*gammaFunction(b)) * Math.pow(x, a-1) * Math.pow(1-x, b-1))
};

const gammaFunction = function(z) {
    return factorial(z-1)
};

const factorial = function(n) {
    if (n===0) {
        return 1
    }
    if (n > 2) {
        return n*factorial(n-1)
    }
    else {return n}
};

const generateData = function(obs, alpha, beta) {
    distribution = []
    for (j=0; j<obs-1; j++) {
        distribution[j] = {probability: betaPDF((j+1)/obs, alpha, beta), value: (j+1)/obs}
    }
    return distribution
};


// animation

let SPEED = 50;
let interval;

const totalWidth = 800
const totalHeight = 500
const MARGIN = {LEFT: 70, RIGHT: 20, TOP:10, BOTTOM:80}

const WIDTH = totalWidth - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = totalHeight - MARGIN.TOP - MARGIN.BOTTOM
const DURATION = 200

const g = d3.select("#chart-area")
    .append("svg")
    .attr("width", totalWidth)
    .attr("height", totalHeight)
    .append("g")
    .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

const xScale = d3.scaleLinear()
    .domain([0,1])
    .range([0, WIDTH])
const xAxis = g.append('g')
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${HEIGHT})`)
const xAxisCall = d3.axisBottom(xScale)

const yScale = d3.scaleLinear()
    .range([HEIGHT, 0])
    .domain([0, 30])
const yAxis = g.append('g')
    .attr("class", "y axis")
    .attr("transform", `translate(0, 0)`)
const yAxisCall = d3.axisLeft(yScale)

xAxis.call(xAxisCall.scale(xScale))
    .selectAll("text")
    .attr("y", "10")
    .attr("text-anchor", "middle")

yAxis.call(yAxisCall.scale(yScale))

g.append("text")
    .attr("class", "x axis-label")
    .attr("x", WIDTH/2)
    .attr("y", HEIGHT + 40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Value")

g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - HEIGHT / 2)
    .attr("y", - 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr('transform', "rotate(-90)")
    .text("Probability")

// const legendLine = d3.line()
//     .x(d => d.x)
//     .y(d => d.y)
//
// console.log(legendLine([{x:1},{y:2}, {x:3, y:5}]))
//
// const legend = g.append("g")
//     .attr('transform', `translate(${WIDTH - 10}, ${HEIGHT - 125})`)
//
// legend.append("g")
//     .attr("transform", `translate(0, ${20})`)
//     // .append("path")
//     // .attr('d', legendLine([{x:1},{y:2}, {x:3, y:5}]))
//     .append("text")
//     .attr("x", -10)
//     .attr("y", 10)
//     .attr("text-anchor", "end")
//     .attr("text-transform", "capitalize")
//     .text('Prior Anna')


// continents.forEach((continent, i) => {
//     const legendRow = legend.append("g")
//         .attr("transform", `translate(0, ${i * 20})`)
//
//     legendRow.append("rect")
//         .attr("width", 10)
//         .attr("height", 10)
//         .attr("fill", colorScale(continent))
//
//     legendRow.append("text")
//         .attr("x", -10)
//         .attr("y", 10)
//         .attr("text-anchor", "end")
//         .attr("text-transform", "capitalize")
//         .text(continent)
// })

// add line path to group
g.append("path")
    .attr("class", "linePriorAnna")
    .attr("fill", "none")
    .attr("stroke", "grey")
    .attr("stroke-width", "3px")

g.append("path")
    .attr("class", "linePriorSam")
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", "3px")

g.append("path")
    .attr("class", "linePosteriorAnna")
    .attr("fill", "none")
    .attr("stroke", "grey")
    .attr("stroke-width", "3px")
    .style("stroke-dasharray", ("3, 3"))

g.append("path")
    .attr("class", "linePosteriorSam")
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", "3px")
    .style("stroke-dasharray", ("3, 3"))

const line = d3.line()
    .x(d => xScale(d.value))
    .y(d => yScale(d.probability))

const initPriors = function () {
    let priorDistributionAnna = generateData(100, alphaAnna, betaAnna)
    let priorDistributionSam = generateData(100, alphaSam, betaSam)

    g.select('.linePriorAnna').transition().duration(DURATION).attr("d", line(priorDistributionAnna))
    g.select('.linePriorSam').transition().duration(DURATION).attr("d", line(priorDistributionSam))
}

const update = function () {
    Y = Math.round(0.26 * N)

    let posteriorDistributionAnna = generateData(300, alphaAnna + Y, betaAnna + N - Y)
    let posteriorDistributionSam = generateData(300, alphaSam + Y, betaSam + N - Y)

    g.select('.linePosteriorAnna').attr("d", line(posteriorDistributionAnna))
    g.select('.linePosteriorSam').attr("d", line(posteriorDistributionSam))

    $('#N')[0].innerHTML = String(N)
    $('#Ytext')[0].innerHTML = String(Y)
    $("#N-slider").slider("value", Number(N))
}

const updateManual = function () {
    Y = Math.round(0.26 * N)

    let posteriorDistributionAnna = generateData(300, alphaAnna + Y, betaAnna + N - Y)
    let posteriorDistributionSam = generateData(300, alphaSam + Y, betaSam + N - Y)

    g.select('.linePosteriorAnna').transition().duration(DURATION).attr("d", line(posteriorDistributionAnna))
    g.select('.linePosteriorSam').transition().duration(DURATION).attr("d", line(posteriorDistributionSam))

    $('#N')[0].innerHTML = String(N)
    $('#Ytext')[0].innerHTML = String(Y)
    $("#N-slider").slider("value", Number(N))
}

function step() {
    N = (N < 1000 ? N + 10: 0)
    update()
}

const onLoad = function() {
    initPriors()
    update()
    // interval = d3.interval(() => {
    //     step()
    // }, SPEED)
}

onLoad()

