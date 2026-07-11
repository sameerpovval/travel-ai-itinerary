import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import {
    FaPlaneDeparture,
    FaCalendarAlt,
    FaEdit,
    FaCopy,
    FaWhatsapp,
    FaFilePdf,
    FaMapMarkerAlt,
    FaRobot,
    FaWallet,
} from "react-icons/fa";

import Layout from "../components/Layout";
import ItineraryCard from "../components/ItitneraryCard";
import PlacesCard from "../components/PlaceCard";
import AIChat from "../components/AiChat";
import BudgetCard from "../components/BudgetCard";
import TripHeader from "../components/TripHeader"
import api from "../services/api";

import "../styles/singleItnerary.css";

function SingleItinerary() {
    const { id } = useParams();

    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [chatLoading, setChatLoading] = useState(false);

    const [places, setPlaces] = useState([]);
    const [placesLoading, setPlacesLoading] = useState(false);

    const [budget, setBudget] = useState("");
    const [budgetLoading, setBudgetLoading] = useState(false);

    useEffect(() => {
        fetchTrip();
        fetchPlaces();
    }, []);

    const fetchTrip = async () => {
        try {
            const res = await api.get(`/itinerary/${id}`);

            setTrip(res.data);
            setBudget(res.data.budget || "");
            setMessages(res.data.messages || []);
        } catch (error) {
            toast.error("Failed to load itinerary");
        } finally {
            setLoading(false);
        }
    };

    const fetchPlaces = async () => {
        try {
            setPlacesLoading(true);

            const res = await api.get(`/places/${id}`);

            setPlaces(res.data);
        } catch (error) {
            toast.error("Failed to load places");
        } finally {
            setPlacesLoading(false);
        }
    };

    const openGoogleMap = (place) => {
        window.open(
            `https://www.google.com/maps/search/${encodeURIComponent(place)}`,
            "_blank"
        );
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
            await navigator.clipboard.writeText(trip.itinerary);

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

    const generateBudget = async () => {
        try {
            setBudgetLoading(true);

            const res = await api.post("/budget", {
                itineraryId: trip._id,
            });

            setBudget(res.data.budget);

            toast.success("Budget Generated!");
        } catch {
            toast.error("Failed to generate budget");
        } finally {
            setBudgetLoading(false);
        }
    };

    const renameTrip = async () => {
        const { value: title } = await Swal.fire({
            title: "Rename Trip",
            input: "text",
            inputValue: trip.title,
            showCancelButton: true,
            confirmButtonText: "Save",
        });

        if (!title) return;

        try {
            const res = await api.patch(`/itinerary/${trip._id}`, {
                title,
            });

            setTrip(res.data);

            toast.success("Trip renamed!");
        } catch {
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

            {/* Header */}

            <TripHeader
                trip={trip}
                renameTrip={renameTrip}
            />

            {/* Statistics */}

            <div className="row mb-4">

                <div className="col-md-4 mb-3">

                    <div className="card stat-card border-0 shadow-sm">

                        <div className="card-body text-center">

                            <FaMapMarkerAlt
                                className="display-6 text-primary mb-3"
                            />

                            <h6 className="text-muted">
                                Places
                            </h6>

                            <h2>{places.length}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card stat-card border-0 shadow-sm">

                        <div className="card-body text-center">

                            <FaRobot
                                className="display-6 text-success mb-3"
                            />

                            <h6 className="text-muted">
                                AI Chats
                            </h6>

                            <h2>{messages.length}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card stat-card border-0 shadow-sm">

                        <div className="card-body text-center">

                            <FaWallet
                                className="display-6 text-warning mb-3"
                            />

                            <h6 className="text-muted">
                                Budget
                            </h6>

                            <h2>

                                {budget ? "Ready" : "--"}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            {/* Main */}

            <div className="row">

                <div className="col-12 mb-4">

                    <ItineraryCard
                        title={trip.title}
                        itinerary={trip.itinerary}
                        copyItinerary={copyItinerary}
                        shareWhatsApp={shareWhatsApp}
                    />

                </div>

            </div>


            {/* Bottom */}

            <div className="row">

                <div className="col-lg-6 mb-4">
                    <PlacesCard
                        places={places}
                        placesLoading={placesLoading}
                        openGoogleMap={openGoogleMap}
                    />
                </div>

                <div className="col-lg-6 mb-4">
                    <BudgetCard
                        budget={budget}
                        generateBudget={generateBudget}
                        budgetLoading={budgetLoading}
                    />
                </div>

            </div>

            <AIChat
                question={question}
                setQuestion={setQuestion}
                askAI={askAI}
                chatLoading={chatLoading}
                messages={messages}
            />


        </Layout>
    );

}

export default SingleItinerary;