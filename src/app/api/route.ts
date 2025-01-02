import { NextResponse } from "next/server";

const url = 'http://127.0.0.1:5000/readData'
interface Customer{
    CustomerId: number;
    Surname: string;
    CreditScore: number;
    Geography: string;
    Gender:String;
    Age: number;
    Tenure: number;
    Balance: number;
    NumOfProducts: number;
    HasCrCard: number;
    IsActiveMember: number;
    EstimatedSalary: number;
    Exited: number;
  
  }
export async function GET(request: Request){
    
    try{
        

        // const generateURL = new URL(url);

        const response = await fetch(url,{
            method: "GET",
            headers:{
                Accept: "json"

            }

        })
        if(!response.ok){
            throw new Error(
                `HTTP error! status: ${response.status}`
              );
        }
        const data: Customer[] = await response.json();

        return NextResponse.json({success:true, data})
    }catch(error){
        //serverside error
        return NextResponse.json(
            {success:false, error: "Failed to process request"},
            {status: 500}
        )
    }



}

