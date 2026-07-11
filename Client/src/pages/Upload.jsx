import { useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { toast } from "react-toastify";
import "../styles/upload.css";
import UploadCard from "../components/UploadCard";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("document", file);

      const res = await api.post("/itinerary/upload", formData);
      toast.success("Itinerary Generated!");

      navigate(`/itinerary/${res.data._id}`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate itinerary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="upload-header text-center mb-5">
          <span className="upload-eyebrow">Travel AI</span>
          <h1 className="fw-bold">Create Your AI Travel Itinerary</h1>
          <p className="text-muted fs-5">
            Upload your travel document and let AI generate a complete
            travel itinerary in seconds.
          </p>
        </div>

        <UploadCard
          file={file}
          setFile={setFile}
          handleUpload={handleUpload}
          loading={loading}
        />

        <div className="how-it-works">
          <div className="how-step">
            <div className="how-step-num">1</div>
            <h6>Upload your document</h6>
            <p>PDF, JPG or PNG of your booking, ticket, or plan</p>
          </div>
          <div className="how-step-divider" />
          <div className="how-step">
            <div className="how-step-num">2</div>
            <h6>AI reads the details</h6>
            <p>Dates, destinations and stops are extracted automatically</p>
          </div>
          <div className="how-step-divider" />
          <div className="how-step">
            <div className="how-step-num">3</div>
            <h6>Get your itinerary</h6>
            <p>A day-by-day plan, ready to edit, share, or export</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Upload;