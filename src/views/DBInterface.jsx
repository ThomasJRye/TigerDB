import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import ApiService from "../services/ApiService";
import { useAuth0 } from "@auth0/auth0-react";

const DBInterface = ({ match }) => {
  const svgRef = useRef(null);
  const [data, setData] = useState(null);
  const id = match.params.id;
  const { getAccessTokenSilently } = useAuth0();

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // storage of table representation
  const [rectangles, setRectangles] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.getDB(getAccessTokenSilently, id);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getAccessTokenSilently, id]);


  useEffect(() => {
    const json = {
      access_tokens: {
        count: 140,
        columns: {
          id: {
            type: "bigint unsigned asdfasd fasdfasdfasdfasdfasdfasdfsd",
            primary_key: true,
            foreign_key: false,
            referenced_table: null,
          },
          tenant_id: {
            type: "bigint",
            primary_key: false,
            foreign_key: true,
            referenced_table: "tenant",
          },
          user_id: {
            type: "varchar(255)",
            primary_key: false,
            foreign_key: true,
            referenced_table: "users",
          },
        },
      },
      tenants: {
        count: 10,
        columns: {
          id: {
            type: "bigint unsigned",
            primary_key: true,
            foreign_key: false,
            referenced_table: null,
          },
          name: {
            type: "varchar(255)",
            primary_key: false,
            foreign_key: false,
            referenced_table: null,
          },
          user_id: {
            type: "varchar(255)",
            primary_key: false,
            foreign_key: true,
            referenced_table: "users",
        },
      },
      users: {
        count: 100,
        columns: {
          id: {
            type: "varchar(255)",
            primary_key: true,
            foreign_key: false,
            referenced_table: null,
          },
          name: {
            type: "varchar(255)",
            primary_key: false,
            foreign_key: false,
            referenced_table: null,
          }
        }
      }
      },
    };

    setData(json);
  }, []);
  
  useEffect(() => {
    if (!data) return; // Guard clause to ensure data is not null

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
      const newRectangle = {
        name: key,
        x: xPosition,
        y: yPosition,
        width: rectangleWidth,
        height: rectangleHeight,
        foerign_keys: columns.filter((column) => data[key].columns[column].foreign_key),
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
        .attr("ry", 10)
        ;

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

    setRectangles(newRectangles)
  }, [data, dimensions]);

  console.log(rectangles);

  return <div ref={svgRef}></div>;
};

export default DBInterface;
