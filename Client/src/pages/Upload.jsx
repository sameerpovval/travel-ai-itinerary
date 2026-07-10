import { useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { toast } from "react-toastify";
import "../styles/upload.css";
import UploadCard from "../components/UploadCard"
import ItineraryCard from "../components/ItitneraryCard"
import AIChat from "../components/AiChat"
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

      <UploadCard
        file={file}
        setFile={setFile}
        handleUpload={handleUpload}
        loading={loading}
      />

    </Layout>
  );
}

export default Upload;