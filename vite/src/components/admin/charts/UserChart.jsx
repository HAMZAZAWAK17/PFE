import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { axiosClient } from "../../api/axios";

export default function UserChart() {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosClient.get("/sante-data");
                setUserData([
                    ["Element", "Animaux", { role: "style" }],
                    ["bien", response.data.bien, "#8BFF40"],
                    ["normal", response.data.normal, "#2CFFF2"],
                    ["mal", response.data.mal, "#FF3F2C"],
                ]);
            } catch (error) {
                console.error("Error fetching orders:", error);
                // localStorage.removeItem("token");
                // navigate("/");
            }
        };
        fetchUserData();
    }, []);

    return (
        <div>
            {userData ? (
                <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height="400px"
                    data={userData}
                />
            ):(
                "loading ...."
            )}
        </div>
    );
}
