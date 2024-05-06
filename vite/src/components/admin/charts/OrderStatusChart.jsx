import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { axiosClient } from "../../api/axios";

export default function OrderStatusChart() {
    const [orderData, setOrderData] = useState([]);
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await axiosClient.get("/orderstatus-data");
                setOrderData([
                    ["Element", "zzzz", { role: "style" }],
                    ["Accepté", response.data.accepte, "#b87333"],
                    ["Refusé", response.data.refuse, "gold"],
                    ["En attente", response.data.pending, "red"],
                ]);
            } catch (error) {
                console.error("Error fetching orders:", error);
                // localStorage.removeItem("token");
                // navigate("/");
            }
        };
        fetchOrderData();
    }, []);

    return (
        <div>
            {orderData ? (
                <Chart
                    chartType="PieChart"
                    width="100%"
                    height="400px"
                    data={orderData}
                />
            ) : (
                "loading ...."
            )}
        </div>
    );
}
