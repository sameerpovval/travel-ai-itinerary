function AIChat({
  question,
  setQuestion,
  askAI,
  chatLoading,
  messages,
}) {
  return (
    <div className="card chat-card shadow-sm h-100">

      <div className="card-body">

        <h4>
          🤖 AI Travel Assistant
        </h4>

        <input
          className="form-control my-3"
          placeholder="Ask anything..."
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
        />

        <button
          className="btn btn-dark w-100"
          onClick={askAI}
        >
          {chatLoading
            ? "Thinking..."
            : "Ask AI"}
        </button>

        <hr />

        <div className="chat-box">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={
                msg.role === "user"
                  ? "user-msg"
                  : "ai-msg"
              }
            >

              <strong>

                {msg.role === "user"
                  ? "🙂 You"
                  : "🤖 AI"}

              </strong>

              <br />

              {msg.text}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AIChat;