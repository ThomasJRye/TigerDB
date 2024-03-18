// useDataFetching.js
import { useState, useEffect } from "react";
import ApiService from '../../services/ApiService';

const useDataFetching = (match, getAccessTokenSilently, data, setData, loading, setLoading) => {
  const id = match.params.id;

  useEffect(() => {
    const json = {
      access_tokens: {
        count: 140,
        columns: {
          id: {
            type: "bigint unsigned",
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
          },
        },
      },
      products: {
        count: 50,
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
          price: {
            type: "decimal(10,2)",
            primary_key: false,
            foreign_key: false,
            referenced_table: null,
          },
        },
      },
      orders: {
        count: 200,
        columns: {
          id: {
            type: "bigint unsigned",
            primary_key: true,
            foreign_key: false,
            referenced_table: null,
          },
          user_id: {
            type: "varchar(255)",
            primary_key: false,
            foreign_key: true,
            referenced_table: "users",
          },
          created_at: {
            type: "datetime",
            primary_key: false,
            foreign_key: false,
            referenced_table: null,
          },
        },
      },
      order_items: {
        count: 450,
        columns: {
          order_id: {
            type: "bigint unsigned",
            primary_key: false,
            foreign_key: true,
            referenced_table: "orders",
          },
          product_id: {
            type: "bigint unsigned",
            primary_key: false,
            foreign_key: true,
            referenced_table: "products",
          },
          quantity: {
            type: "int",
            primary_key: false,
            foreign_key: false,
            referenced_table: null,
          },
        },
      },
      cars: {
        count: 450,
        columns: {
          id: {
            type: "bigint unsigned",
            primary_key: true,
            foreign_key: false,
            referenced_table: null,
          },
          model: {
            type: "bigint unsigned",
            primary_key: false,
            foreign_key: false,
            referenced_table: null,
          },
          quantity: {
            type: "int",
            primary_key: false,
            foreign_key: false,
            referenced_table: null,
          },
        },
      },
    };
  
    setData(json);
  }, []);
  
  
  useEffect(() => {
    const cachedData = localStorage.getItem("cachedData");
    if (cachedData) {
      setData(JSON.parse(cachedData));
      console.log("fetched data from cache")
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ApiService.getDB(getAccessTokenSilently, id);
        if (!response.data) return;
        setData(response.data);
        localStorage.setItem("cachedData", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getAccessTokenSilently, id, setData, setLoading]);

};

export default useDataFetching;
