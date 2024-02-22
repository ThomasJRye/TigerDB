// useDrawing.js
import { useEffect } from "react";
import * as d3 from "d3";
import { useState } from "react";

const useDrawing = (svgRef, dimensions, data) => {
    const [rectangles, setRectangles] = useState([]);

    useEffect(() => {
        if (!data || !dimensions) return; // Ensure data and dimensions are defined

        d3.select(svgRef.current).select("svg").remove(); // Remove the existing SVG to avoid duplicates

        const keys = Object.keys(data);
        const spacing = 50; // Spacing between rectangles
        const newRectangles = [];
    
        const svg = d3
          .select(svgRef.current)
          .append("svg")
          .attr("width", dimensions.width)
          .attr("height", dimensions.height)
          .call(
            d3.zoom().on("zoom", (event) => {
              svg.attr("transform", event.transform);
            })
          )
          .append("g");
        var xPosition = 10;
        var rectangleWidth = 0;
    
        keys.forEach((key) => {
          console.log(data[key])
    
          if (!data[key] || !data[key].columns) return;
    
          const columns = Object.keys(data[key].columns);
          const rectangleHeight = 50 + columns.length * 20; // Fixed height for all rectangles
          xPosition = xPosition + rectangleWidth + spacing;
    
          rectangleWidth = key.length * 13; 
    
          if (rectangleWidth < 200) {
            rectangleWidth = 200;
          }
          const yPosition = 10;
    
          // get foreign keys
          var referenced_tables = [];
          for (const column in data[key].columns) {
            if (data[key].columns[column].referenced_table) {
              referenced_tables.push(data[key].columns[column].referenced_table);
            }
          }
          const newRectangle = {
            name: key,
            x: xPosition,
            y: yPosition,
            width: rectangleWidth,
            height: rectangleHeight,
            referenced_tables: referenced_tables,
            referenced_columns: columns.filter((column) => data[key].columns[column].referenced_column)
          };
    
          newRectangles.push(newRectangle);
    
    
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
    
          svg
            .append("text")
            .attr("x", xPosition + 10)
            .attr("y", yPosition + 30)
            .text(key)
            .attr("font-size", "20px")
            .attr("font-weight", "bold");
          
          // Iterate through columns to display each name and type
          columns.forEach((column, colIndex) => {
            const columnType = data[key].columns[column].type;
            // if length of column is greater than 15 only use the first 15 characters
            var useableColumnType = columnType;
    
            console.log((rectangleWidth - (column.length*20))/6)
            if (columnType.length > (rectangleWidth - 180)) {
              useableColumnType = columnType.substring(0, (rectangleWidth - (column.length*12 - 72))/12) + "...";
            }
    
            svg
              .append("text")
              .attr("x", xPosition + 10)
              .attr("y", yPosition + 50 + colIndex * 20) // Offset each line
              .text(`${column}: ${useableColumnType}`)
              .attr("font-size", "12px");
          });
        });

        setRectangles(newRectangles);

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
      }, [data, dimensions, svgRef, rectangles]);

  return { rectangles };
};

export default useDrawing;