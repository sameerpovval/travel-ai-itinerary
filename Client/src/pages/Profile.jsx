import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import {
    FaUserCircle,
    FaEnvelope,
    FaCamera,
    FaLock,
    FaPen,
    FaCheck,
    FaTimes,
    FaEye,
    FaEyeSlash,
    FaShieldAlt,
} from "react-icons/fa";
import api from "../services/api";
import { toast } from "react-toastify";
import "../styles/profile.css";

function Profile() {

    const [user, setUser] = useState(null);

    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const [photoLoading, setPhotoLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await api.get("/profile");
            setUser(res.data);
            setName(res.data.name);
        } catch {
            toast.error("Failed to load profile");
        }
    };

    const saveProfile = async () => {
        try {
            const res = await api.patch("/profile", { name });

            setUser(res.data);

            const updatedUser = {
                id: res.data._id,
                name: res.data.name,
                email: res.data.email,
                profileImage: res.data.profileImage,
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));
            window.dispatchEvent(new Event("userUpdated"));

            toast.success("Profile Updated");
            setEditing(false);
        } catch {
            toast.error("Update Failed");
        }
    };

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("photo", file);

        try {
            setPhotoLoading(true);
            const res = await api.patch("/profile/photo", formData);

            setUser(res.data);

            const updatedUser = {
                id: res.data._id,
                name: res.data.name,
                email: res.data.email,
                profileImage: res.data.profileImage,
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));
            window.dispatchEvent(new Event("userUpdated"));

            toast.success("Photo Updated");
        } catch {
            toast.error("Upload Failed");
        } finally {
            setPhotoLoading(false);
        }
    };

    const changePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setPasswordLoading(true);

            await api.patch("/profile/password", {
                currentPassword,
                newPassword,
            });

            toast.success("Password Changed");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed");
        } finally {
            setPasswordLoading(false);
        }
    };

    if (!user) {
        return (
            <Layout>
                <h3 className="text-center mt-5">Loading...</h3>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container profile-page">

                {/* Header */}

                <div className="profile-header-card">

                    <div className="profile-cover"></div>

                    <div className="profile-header-body">

                        <div className="profile-avatar-wrap">

                            {user.profileImage ? (
                                <img
                                    src={`http://localhost:5000/${user.profileImage}`}
                                    alt=""
                                    className="profile-avatar-img"
                                />
                            ) : (
                                <FaUserCircle className="profile-avatar-fallback" />
                            )}

                            <button
                                className="profile-avatar-edit"
                                onClick={() => fileInputRef.current.click()}
                                disabled={photoLoading}
                                title="Change photo"
                            >
                                {photoLoading ? (
                                    <span className="spinner-border spinner-border-sm" />
                                ) : (
                                    <FaCamera />
                                )}
                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handlePhotoChange}
                            />

                        </div>

                        <div className="profile-header-info">

                            {editing ? (
                                <div className="profile-name-edit">
                                    <input
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoFocus
                                    />
                                    <button
                                        className="profile-icon-btn profile-icon-btn-save"
                                        onClick={saveProfile}
                                        title="Save"
                                    >
                                        <FaCheck />
                                    </button>
                                    <button
                                        className="profile-icon-btn profile-icon-btn-cancel"
                                        onClick={() => {
                                            setEditing(false);
                                            setName(user.name);
                                        }}
                                        title="Cancel"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            ) : (
                                <div className="profile-name-row">
                                    <h3>{user.name}</h3>
                                    <button
                                        className="profile-icon-btn"
                                        onClick={() => setEditing(true)}
                                        title="Edit name"
                                    >
                                        <FaPen />
                                    </button>
                                </div>
                            )}

                            <p className="profile-email">
                                <FaEnvelope /> {user.email}
                            </p>

                            <span className="profile-status-badge">
                                <span className="profile-status-dot" /> Active
                            </span>

                        </div>

                    </div>

                </div>

                {/* Sections */}

                <div className="row">

                    <div className="col-lg-6 mb-4">

                        <div className="profile-section-card">

                            <div className="profile-section-title">
                                <div className="profile-section-icon profile-section-icon-blue">
                                    <FaLock />
                                </div>
                                <div>
                                    <h5>Change Password</h5>
                                    <small>Update your account password</small>
                                </div>
                            </div>

                            <div className="profile-field">
                                <label>Current Password</label>
                                <div className="profile-input-group">
                                    <input
                                        type={showCurrent ? "text" : "password"}
                                        placeholder="Enter current password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrent(!showCurrent)}
                                        tabIndex={-1}
                                    >
                                        {showCurrent ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div className="profile-field">
                                <label>New Password</label>
                                <div className="profile-input-group">
                                    <input
                                        type={showNew ? "text" : "password"}
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNew(!showNew)}
                                        tabIndex={-1}
                                    >
                                        {showNew ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div className="profile-field">
                                <label>Confirm New Password</label>
                                <div className="profile-input-group">
                                    <input
                                        type={showNew ? "text" : "password"}
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                className="btn btn-primary w-100 mt-2"
                                onClick={changePassword}
                                disabled={passwordLoading}
                            >
                                {passwordLoading ? "Updating..." : "Update Password"}
                            </button>

                        </div>

                    </div>

                    <div className="col-lg-6 mb-4">

                        <div className="profile-section-card">

                            <div className="profile-section-title">
                                <div className="profile-section-icon profile-section-icon-green">
                                    <FaShieldAlt />
                                </div>
                                <div>
                                    <h5>Account Information</h5>
                                    <small>Your account details</small>
                                </div>
                            </div>

                            <div className="profile-detail-row">
                                <span>Full Name</span>
                                <strong>{user.name}</strong>
                            </div>

                            <div className="profile-detail-row">
                                <span>Email Address</span>
                                <strong>{user.email}</strong>
                            </div>

                            <div className="profile-detail-row">
                                <span>Account Status</span>
                                <span className="badge bg-success">Active</span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </Layout>
    );
}

export default Profile;