"use client";
import Image from "next/image";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

import React, { useState, useEffect } from "react";
export interface Customer {
  CustomerId: number;
  Surname: string;
  CreditScore: number;
  Geography: string;
  Gender: String;
  Age: number;
  Tenure: number;
  Balance: number;
  NumOfProducts: number;
  HasCrCard: number;
  IsActiveMember: number;
  EstimatedSalary: number;
  Exited: number;
}
import Link from "next/link";
export default function Home() {
  //customerData array of Customer[] objects
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //function runs everytime there is a rerender(data changes)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/api`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        //extract data
        //const data = await response.json();
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        const NestedCustomerData: Customer[] = data.data;
        console.log("DataArray", NestedCustomerData);
        const flattenData = NestedCustomerData.flat();

        setCustomerData(flattenData);
      } catch (error) {
        console.error(`Error fetching data:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <main className="mx-12 min-h-screen flex items-center justify-center">
      <div className="w-full h-full border-2 box-border">
        {isLoading ? (
          <p>Loading...</p>
        ) : customerData?.length ? (
          customerData.map((customer) => (
            <div
              key={customer.CustomerId}
              className="bg-blue-100 border border-blue-500 rounded-lg p-4 text-center hover:bg-blue-800 text-blue-700 hover:text-white"
            >
              <Link href={`/customerList/${customer.CustomerId}`}>
                <ul>
                  <li className="font-medium">{customer.Surname}</li>
                </ul>
              </Link>
            </div>
          ))
        ) : (
          <p>No customer data found.</p>
        )}
        {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 */}
        {/* check if this is actually an array */}
      </div>
    </main>
  );
}
