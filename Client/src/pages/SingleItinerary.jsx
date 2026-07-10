import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Layout from "../components/Layout";
import ItineraryCard from "../components/ItitneraryCard";
import AIChat from "../components/AiChat";
import api from "../services/api";
import Swal from "sweetalert2";

function SingleItinerary() {

    const { id } = useParams();

    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [chatLoading, setChatLoading] = useState(false);

    useEffect(() => {
        fetchTrip();
    }, []);

    const fetchTrip = async () => {

        try {

            const res = await api.get(`/itinerary/${id}`);

            setTrip(res.data);
            setMessages(res.data.messages || []);

        } catch (error) {
            toast.error("Failed to load itinerary");

        } finally {
            setLoading(false);
        }

    };

    const askAI = async () => {

        if (!question.trim()) {
            toast.error("Please enter a question");
            return;
        }
        try {

            setChatLoading(true);

            const res = await api.post("/chat", {
                itineraryId: trip._id,
                question,
            });

            setMessages(res.data.messages);

            setQuestion("");
        } catch (error) {
            toast.error("Failed to get AI response");
        } finally {

            setChatLoading(false);

        }

    };

    const copyItinerary = async () => {

        try {

            await navigator.clipboard.writeText(
                trip.itinerary
            );

            toast.success("Copied!");

        } catch {

            toast.error("Copy Failed");

        }

    };

    const shareWhatsApp = () => {

        window.open(
            "https://wa.me/?text=" +
            encodeURIComponent(trip.itinerary),
            "_blank"
        );

    };

    const renameTrip = async () => {
        const { value: title } = await Swal.fire({
            title: "Rename Trip",
            input: "text",
            inputLabel: "Trip Title",
            inputValue: trip.title,
            inputPlaceholder: "Enter trip name",
            showCancelButton: true,
            confirmButtonText: "Save",
        });

        if (!title) return;

        try {

            const res = await api.patch(
                `/itinerary/${trip._id}`,
                {
                    title,
                }
            );

            setTrip(res.data);

            toast.success("Trip renamed!");

        } catch (error) {

            toast.error("Rename failed");

        }
    };

    if (loading) {
        return (
            <Layout>
                <h3 className="text-center mt-5">
                    Loading...
                </h3>
            </Layout>
        );
    }

    return (

        <Layout>

            <div className="row">

                <div className="col-lg-7 mb-4">

                    <ItineraryCard
                        title={trip.title}
                        renameTrip={renameTrip}
                        itinerary={trip.itinerary}
                        copyItinerary={copyItinerary}
                        shareWhatsApp={shareWhatsApp}
                    />

                </div>

                <div className="col-lg-5">

                    <AIChat
                        question={question}
                        setQuestion={setQuestion}
                        askAI={askAI}
                        chatLoading={chatLoading}
                        messages={messages}
                    />

                </div>

            </div>

        </Layout>

    );

}

export default SingleItinerary;