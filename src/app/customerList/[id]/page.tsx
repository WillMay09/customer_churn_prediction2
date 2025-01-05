"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Customer } from "@/app/page";
export default function CustomerDetails() {
  const { id } = useParams(); //grabs customerId from the url
  const [isLoading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string | null>(null);
  //console.log("Current Id",id)
  useEffect(() => {
    if (!id) {
      console.log("no customerId");
      return;
    }
    const fetchCustomerData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/readData/customerDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            //customer id present in request body
            body: JSON.stringify({ CustomerId: id }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error retrieving customer information`);
        }

        const data = await response.json();
        setCustomer(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [id]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error:{error}</div>;
  }
  return (
    <div className="w-full h-full bg-customDarkBlue text-white p-5">
      <h1 className="text-xl font-bold mb-3">Customer Details</h1>
      {customer ? (
        <div className="grid grid-cols-3 gap-4 ">
          <div className="bg-customHighlightBlue text-white border-2 border-customBorder rounded-lg pl-3 py-3">
            <h3 className="text-lg mb-2">Personal Details</h3>
            <p>
              <strong >Customer ID:</strong> {customer.CustomerId}
            </p>
            <p>
              <strong>Surname:</strong> {customer.Surname}
            </p>
            <p>
              <strong>Gender:</strong> {customer.Gender}
            </p>
            <p>
              <strong>Age:</strong> {customer.Age}
            </p>
          </div>
          <div className="bg-customHighlightBlue text-white border-2 border-customBorder rounded-lg pl-3 py-3">
            <h3 className="text-lg mb-2">Financial Details</h3>
            <p>
              <strong>Estimated Salary:</strong> ${customer.EstimatedSalary}
            </p>
            <p>
              <strong>Credit Score:</strong> {customer.CreditScore}
            </p>
            <p>
              <strong>Balance:</strong> ${customer.Balance}
            </p>
            <p>
              <strong>Number of Products:</strong> {customer.NumOfProducts}
            </p>
          </div>
          <div className="bg-customHighlightBlue text-white border-2 border-customBorder rounded-lg pl-3 py-3">
            <h3 className="text-lg mb-2">Other Details</h3>
            <p>
              <strong>Geography:</strong> {customer.Geography}
            </p>
            <p>
              <strong>Tenure:</strong> {customer.Tenure}
            </p>
            <p>
              <strong>Has Credit Card:</strong>{" "}
              {customer.HasCrCard ? "Yes" : "No"}
            </p>
            <p>
              <strong>Is Active Member:</strong>{" "}
              {customer.IsActiveMember ? "Yes" : "No"}
            </p>
          </div>
        </div>
      ) : (
        <div>No customer data found</div>
      )}
    </div>
  );
}
