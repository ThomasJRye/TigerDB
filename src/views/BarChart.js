import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ id }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        const data = [8, 4, 6, 6, 4, 12];

        const svg = d3.select(svgRef.current)
            .append("svg")
            .attr("width", 600)
            .attr("height", 400);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => 300 - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 10)
            .attr("fill", "blue");

        // Clean up function
        return () => {
            svg.selectAll("rect").remove();
        };
    }, []);

    return <div id={id} ref={svgRef}></div>;
};

export default BarChart;