import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/itinerary/history");
      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h2 className="mb-4">Itinerary History</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Travel Data</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                {item.travelData?.substring(0, 100)}...
              </td>
              <td>
                {new Date(
                  item.createdAt
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default History;