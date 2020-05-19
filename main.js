let movies = null;
let attributeX = "budget";
let attributeY = "revenue";
let width = document.body.clientWidth;
let height = 800;
let radius = 5;
let margin = ({ top: 25, right: 20, bottom: 35, left: 80 });
let backgroundColor = "#ECEFF1";

d3.csv("movies.csv", d3.autoType).then(function (data) {
    movies = data;
    drawCanvasScatterplot();
    drawSVGScatterplot();
});

function drawCanvasScatterplot() {
    var canvas = d3.select("#scatterplot-canvas")
        .append("canvas")
        .attr("width", width)
        .attr("height", height);
    var context = canvas.node().getContext("2d");

    let domainX = d3.extent(movies, d => d[attributeX]);
    let domainY = d3.extent(movies, d => d[attributeY]);

    function mapX(value) {
        // TODO
        return value;
    }

    function mapY(value) {
        // TODO
        return value;
    }

    function draw() {
        context.clearRect(0, 0, width, height);
        context.fillStyle = backgroundColor;
        context.fillRect(
            margin.left,
            margin.top,
            width - margin.left - margin.right,
            height - margin.top - margin.bottom
        );
        context.fillStyle = "#263238";
        movies.forEach(item => {
            context.beginPath();
            context.arc(
                mapX(item[attributeX]),
                mapY(item[attributeY]),
                radius,
                0,
                2 * Math.PI
            );
            context.fill();
        });
    }

    draw();
}

function drawSVGScatterplot() {
    let x = d3
        .scaleLinear()
        .domain(d3.extent(movies, d => d[attributeX]))
        .nice()
        .range([margin.left, width - margin.right]);
    let y = d3
        .scaleLinear()
        .domain(d3.extent(movies, d => d[attributeY]))
        .nice()
        .range([height - margin.bottom, margin.top]);

    const svg = d3.select("#scatterplot-d3").append("svg").attr("viewBox", [0, 0, width, height]);

    svg
        .append("rect")
        .attr("x", margin.left)
        .attr("y", margin.top)
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top - margin.bottom)
        .attr("fill", backgroundColor);
    svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 160))
        .call(g =>
            g
                .append("text")
                .attr("x", width)
                .attr("y", margin.bottom - 4)
                .attr("fill", "currentColor")
                .attr("text-anchor", "end")
                .text(attributeX)
        );
    svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g =>
            g
                .append("text")
                .attr("x", -margin.left)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text(attributeY)
        );

    // TODO: draw the circles for the data items
}

