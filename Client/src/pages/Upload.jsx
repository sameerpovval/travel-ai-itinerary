import { useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { toast } from "react-toastify";

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("document", file);

      const res = await api.post(
        "/itinerary/upload",
        formData
      );

      setItinerary(res.data.itinerary);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const copyItinerary = async () => {
    try {
      await navigator.clipboard.writeText(itinerary);
      toast.success("Itinerary copied!");
    } catch (error) {
      toast.error("Copy failed");
    }
  };

  const shareWhatsApp = () => {
    const url =
      "https://wa.me/?text=" +
      encodeURIComponent(itinerary);

    window.open(url, "_blank");
  };

  return (
    <Layout>
      <div className="card shadow-sm">
        <div className="card-body">

          <h3 className="mb-3">
            Upload Travel Document
          </h3>

          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          <button
            className="btn btn-primary"
            onClick={handleUpload}
          >
            {loading
              ? "Generating..."
              : "Generate Itinerary"}
          </button>

        </div>
      </div>

      {itinerary && (
        <div className="card shadow-sm mt-4">
          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Generated Itinerary</h4>

              <div>
                <button
                  className="btn btn-success me-2"
                  onClick={copyItinerary}
                >
                  Copy
                </button>

                <button
                  className="btn btn-success"
                  onClick={shareWhatsApp}
                >
                  WhatsApp
                </button>
              </div>
            </div>

            <pre
              style={{
                whiteSpace: "pre-wrap",
              }}
            >
              {itinerary}
            </pre>

          </div>
        </div>
      )}
    </Layout>
  );
}

export default Upload;