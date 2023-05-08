function createText(content, x, y, anchor = "middle") {
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.textContent = content;
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("text-anchor", anchor);
    return text;
}

function createRect(x, y, width, height, fill) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("fill", fill);
    return rect;
}

var data = [
    ["Group 1", 60, 40, 70, 30],
    ["Group 2", 40, 60, 65, 35],
    ["Group 3", 80, 20, 45, 55],
    ["Group 4", 50, 50, 30, 70]
];

var margin = { top: 40, right: 20, bottom: 80, left: 80 },
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    barHeight = height / data.length;

var currentChartType = "appleVsWindows";

function toggleChart() {
    currentChartType = currentChartType === "appleVsWindows" ? "netflixVsHulu" : "appleVsWindows";
    drawChart();
}

function drawChart() {
    var chartContainer = document.getElementById("chart-container");
    chartContainer.innerHTML = "";
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "600");
    svg.setAttribute("height", "600");
    chartContainer.appendChild(svg);

    // Title
    var titleText =
        currentChartType === "appleVsWindows"
            ? "College Students' Preferences for Apple vs Windows Computers"
            : "College Students' Preferences for Netflix vs Hulu";
    svg.appendChild(createText(titleText, width / 2 + margin.left, margin.top / 2));

    // X-axis label
    svg.appendChild(createText("Preference Percentage", width / 2 + margin.left, height + margin.top + 50));

    data.forEach((item, index) => {
        var yPos = margin.top + index * barHeight;
        var barWidth1 = (item[currentChartType === "appleVsWindows" ? 1 : 3] / 100) * (width / 2);
        var barWidth2 = (item[currentChartType === "appleVsWindows" ? 2 : 4] / 100) * (width / 2);
        var barColor1 = currentChartType === "appleVsWindows" ? "blue" : "green";
        var barColor2 = currentChartType === "appleVsWindows" ? "red" : "purple";

        // First preference bar
        svg.appendChild(createRect(margin.left + width / 2 - barWidth1, yPos, barWidth1, barHeight / 2, barColor1));

        // Second preference bar
        svg.appendChild(createRect(margin.left + width / 2, yPos, barWidth2, barHeight / 2, barColor2));

                // Group label
        svg.appendChild(createText(item[0], margin.left - 5, yPos + barHeight / 4, "end"));

        // First percentage label
        svg.appendChild(createText(item[currentChartType === "appleVsWindows" ? 1 : 3] + "%", margin.left + width / 2 - barWidth1 / 2, yPos + barHeight / 4));

        // Second percentage label
        svg.appendChild(createText(item[currentChartType === "appleVsWindows" ? 2 : 4] + "%", margin.left + width / 2 + barWidth2 / 2, yPos + barHeight / 4));
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var toggleButton = document.getElementById("toggleButton");
    toggleButton.addEventListener("click", toggleChart);
    drawChart();
});
