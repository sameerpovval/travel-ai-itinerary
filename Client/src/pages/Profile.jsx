import Layout from "../components/Layout";
import { FaUserCircle, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

function Profile() {

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    

    return (

        <Layout>

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-6">

                        <div className="card shadow-lg border-0 rounded-4">

                            <div className="card-body p-5 text-center">

                                <FaUserCircle
                                    size={90}
                                    className="text-primary mb-3"
                                />

                                <h2 className="fw-bold">
                                    {user?.name}
                                </h2>

                                <p className="text-muted">
                                    Travel AI Member
                                </p>

                                <hr className="my-4" />

                                <div className="text-start">

                                    <div className="d-flex align-items-center mb-4">

                                        <FaUserCircle
                                            className="me-3 text-primary"
                                            size={22}
                                        />

                                        <div>
                                            <small className="text-muted">
                                                Full Name
                                            </small>

                                            <h6 className="mb-0">
                                                {user?.name}
                                            </h6>
                                        </div>

                                    </div>

                                    <div className="d-flex align-items-center mb-4">

                                        <FaEnvelope
                                            className="me-3 text-success"
                                            size={20}
                                        />

                                        <div>
                                            <small className="text-muted">
                                                Email Address
                                            </small>

                                            <h6 className="mb-0">
                                                {user?.email}
                                            </h6>
                                        </div>

                                    </div>

                                    <div className="d-flex align-items-center">

                                        <FaCalendarAlt
                                            className="me-3 text-warning"
                                            size={20}
                                        />

                                        <div>
                                            <small className="text-muted">
                                                Account Status
                                            </small>

                                            <h6 className="mb-0 text-success">
                                                Active
                                            </h6>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Profile;