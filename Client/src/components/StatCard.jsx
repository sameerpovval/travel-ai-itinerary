import React from "react";

function StatCard({
    icon,
    title,
    value,
    color,
}) {
    return (
        <div className="card dashboard-card shadow-sm border-0 h-100">
            <div className="card-body">

                <div
                    className="icon-circle mb-3"
                    style={{
                        backgroundColor: color,
                    }}
                >
                    {icon}
                </div>

                <h6 className="text-muted">
                    {title}
                </h6>

                <h2 className="fw-bold">
                    {value}
                </h2>

            </div>
        </div>
    );
}

export default StatCard;