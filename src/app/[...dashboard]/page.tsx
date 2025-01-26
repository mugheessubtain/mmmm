"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { BASE_URL } from "@/constant/constant";

interface LoanApplication {
  _id: string;
  status: "pending" | "submitted" | "approved" | "rejected";
  loanDetails: {
    category: string;
    subcategory: string;
    amount: number;
    period: number;
  };
}

interface Slip {
  tokenNumber: string;
  qrCode: string;
  appointmentDate: string;
  officeLocation: string;
}

export default function Dashboard({
  params,
}: {
  params: { email: string };
}) {
  const [loanApplication, setLoanApplication] = useState<LoanApplication | null>(null);
  const [slip, setSlip] = useState<Slip | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchLoanApplication();
  }, []);

  const fetchLoanApplication = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}api/loan/mugheessubtain+99@gmail.com`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response);
      
      if (!response.ok) {
        throw new Error("Failed to fetch loan application");
      }
      const data = await response.json();
      console.log(data.loanApplication);
      
      setLoanApplication(data.loanApplication);
    } catch (error) {
      console.error("Error fetching loan application:", error);
      toast({
        title: "Error",
        description: "Failed to fetch loan application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      {loanApplication ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Loan Application Status</CardTitle>
          </CardHeader>
          <CardContent>

            <p>
              <strong>Category:</strong> {loanApplication.loanDetails.category}
            </p>
            <p>
              <strong>Subcategory:</strong> {loanApplication.loanDetails.subcategory}
            </p>
            <p>
              <strong>Amount:</strong> PKR {loanApplication.loanDetails.amount.toFixed(2)}
            </p>
            <p>
              <strong>Period:</strong> {loanApplication.loanDetails.period} years
            </p>
          </CardContent>
        </Card>
      ) : (
        <p>No loan application found.</p>
      )}       
    </div>
  );
}
