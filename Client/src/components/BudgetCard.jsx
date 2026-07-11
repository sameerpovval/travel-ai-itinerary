import {
  FaWallet,
  FaCoins,
  FaCalculator,
} from "react-icons/fa";

function BudgetCard({
  budget,
  generateBudget,
  budgetLoading,
}) {
  return (
    <div className="card budget-card shadow-sm border-0 h-100">

      <div className="card-header bg-white border-0 py-3">

        <div className="d-flex justify-content-between align-items-center">

          <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">

            <FaWallet className="text-warning" />

            Trip Budget

          </h5>

          {!budget && (

            <button
              className="btn btn-warning"
              onClick={generateBudget}
            >

              {budgetLoading ? (

                "Generating..."

              ) : (

                <>
                  <FaCalculator className="me-2" />
                  Estimate
                </>

              )}

            </button>

          )}

        </div>

      </div>

      <div className="card-body">

        {budget ? (

          <div className="budget-box">

            <pre className="budget-text">

              {budget}

            </pre>

          </div>

        ) : (

          <div className="text-center py-5">

            <FaCoins
              size={45}
              className="text-warning mb-3"
            />

            <h6 className="fw-bold">

              No Budget Generated

            </h6>

            <p className="text-muted">

              Click the button above to let AI estimate
              your travel expenses.

            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default BudgetCard;