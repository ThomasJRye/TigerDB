import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { useAuth0 } from "@auth0/auth0-react";
import useResize from "../query/hooks/useResize";
import useDataFetching from "../query/hooks/useDataFetching";
import { TablePlacer } from "../utils/TablePlacer";

const DBInterface = ({ match }) => {
  const svgRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const { dimensions } = useResize();
  const [rectangles, setRectangles] = useState([]);

  useEffect(() => {
    const cachedData = localStorage.getItem("cachedData");
    if (cachedData) {
      setData(JSON.parse(cachedData));
    }
  }, []);

  useDataFetching(match, getAccessTokenSilently, data, setData, loading, setLoading);

  useEffect(() => {
    if (!data) return;

    d3.select(svgRef.current).select("svg").remove();
    
    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight)
      .call(d3.zoom().on("zoom", (event) => {
        svg.attr("transform", event.transform);
      }))
      .append("g");

        
    createRectangles(data, svg);
  }, [data]);

  // Draw rectangles function
  const createRectangles = (data, svg) => {
    const keys = Object.keys(data);
    let rectangleWidth = 0;
    const newRectangles = [];

    keys.forEach((key) => {
      if (!data[key] || !data[key].columns) return;

      const columns = Object.keys(data[key].columns);
      const rectangleHeight = 50 + columns.length * 20;
      const xPosition = Math.floor(Math.random() * 100);
      const yPosition = Math.floor(Math.random() * 100);

      rectangleWidth = Math.max(key.length * 13, 200);

      var referenced_tables = [];
      columns.forEach((column) => {
        if (data[key].columns[column].referenced_table) {
          referenced_tables.push(data[key].columns[column].referenced_table);
        }
      });

      const newRectangle = {
        name: key,
        x: xPosition,
        y: yPosition,
        width: rectangleWidth,
        height: rectangleHeight,
        referenced_tables: referenced_tables,
        referenced_columns: columns.filter((column) => data[key].columns[column].referenced_column),
        columns: columns,
      };
      newRectangles.push(newRectangle);

    });

    setRectangles(newRectangles);

    drawRectangles(svg, newRectangles);
  };
  
  const drawRectangles = (svg, rectangles, time) => {
    // console.log("Before physics:", rectangles.map(r => ({ x: r.x, y: r.y })));
    const movedRectangles = TablePlacer(rectangles, 200);
    // const movedRectangles = rectangles;
    // console.log("After physics:", movedRectangles.map(r => ({ x: r.x, y: r.y })));
    for (let i = 0; i < movedRectangles.length; i++) {
      const rectangle = movedRectangles[i];
      const xPosition = rectangle.x;
      const yPosition = rectangle.y;
      const rectangleWidth = rectangle.width;
      const rectangleHeight = rectangle.height;
      const key = rectangle.name;
      const columns = rectangle.columns


      // Drawing rectangle
      svg
      .append("rect")
      .attr("x", xPosition)
      .attr("y", yPosition)
      .attr("width", rectangleWidth)
      .attr("height", rectangleHeight)
      .attr("fill", "lightgray")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("rx", 10)
      .attr("ry", 10);

    // Drawing text
    svg
      .append("text")
      .attr("x", xPosition + 10)
      .attr("y", yPosition + 30)
      .text(key)
      .attr("font-size", "20px")
      .attr("font-weight", "bold");

    columns.forEach((column, colIndex) => {
      const columnType = data[key].columns[column].type;
      let displayColumnType = columnType.length > 15 ? `${columnType.substring(0, 15)}...` : columnType;

      svg
        .append("text")
        .attr("x", xPosition + 10)
        .attr("y", yPosition + 50 + colIndex * 20)
        .text(`${column}: ${displayColumnType}`)
        .attr("font-size", "12px");
    });
    }
    
  };

  // draw lines for referenced tables
  useEffect(() => {
    if (!data || !rectangles.length) return;


    const svg = d3.select(svgRef.current).select("svg").select("g");

    // Function to draw lines
    const drawLines = (source, target, svg) => {
      svg.insert("line", ":first-child")
        .attr("x1", source.x + source.width)
        .attr("y1", source.y + source.height / 2)
        .attr("x2", target.x)
        .attr("y2", target.y + target.height / 2)
        .attr("stroke", "black")
        .attr("stroke-width", 2);
    };

    // Iterate through each rectangle
    rectangles.forEach(rectangle => {
      // Iterate through referenced tables
      rectangle.referenced_tables.forEach(referencedTable => {
        // Find the referenced table rectangle
        const referencedRectangle = rectangles.find(rect => rect.name === referencedTable);
        if (referencedRectangle) {
          drawLines(rectangle, referencedRectangle, svg);
        }
      });
    });
  }, [data, rectangles]);

  console.log(rectangles);

   // A function to manually trigger the redrawing of rectangles
   const redrawRectangles = () => {
    if (!data) {
      console.log("No data available to redraw rectangles.");
      return;
    }

    // Assuming createRectangles does the job of redrawing,
    // you might need to ensure the svg is cleared or reset if needed.
    d3.select(svgRef.current).select("svg").select("g").selectAll("*").remove();

    // Then, call the function to recreate the rectangles.
    // You might need to pass the same svg element to it if it doesn't handle it already.
    const svg = d3.select(svgRef.current).select("svg").select("g");
    createRectangles(data, svg);
  };


  return (
    <>
      {loading ? <div>Loading...</div> : null} 

      {/* dont include in prod */}
      <button onClick={redrawRectangles}>Redraw Rectangles</button> 

      <div ref={svgRef}></div>
    </>
  );
};

export default DBInterface;
