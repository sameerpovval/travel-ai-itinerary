import { useEffect, useRef, useState } from "react";
import {
  FaRobot,
  FaUserCircle,
  FaPaperPlane,
  FaComments,
  FaTimes,
} from "react-icons/fa";

function AIChat({
  question,
  setQuestion,
  askAI,
  chatLoading,
  messages,
}) {
  const bottomRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [lastSeenCount, setLastSeenCount] = useState(0);

  // Proactive nudge bubble — shows once, a couple seconds after mount
  useEffect(() => {
    const seen = sessionStorage.getItem("aiChatNudgeSeen");
    if (!seen) {
      const timer = setTimeout(() => setShowNudge(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setLastSeenCount(messages.length);
      setShowNudge(false);
    }
  }, [messages, isOpen]);

  const hasUnread = !isOpen && messages.length > lastSeenCount;

  const dismissNudge = () => {
    setShowNudge(false);
    sessionStorage.setItem("aiChatNudgeSeen", "1");
  };

  const openChat = () => {
    setIsOpen(true);
    dismissNudge();
  };

  return (
    <div className="ai-widget">

      {/* Proactive nudge bubble */}
      {showNudge && !isOpen && (
        <div className="ai-nudge shadow">
          <button
            className="ai-nudge-close"
            onClick={dismissNudge}
            aria-label="Dismiss"
          >
            <FaTimes />
          </button>
          <div className="ai-nudge-title">
            <FaRobot /> Trip Assistant
          </div>
          <p className="mb-0">
            Have a question about your itinerary? Ask me anything — timings,
            swaps, budget, whatever you need. ✨
          </p>
        </div>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="ai-panel shadow-lg">

          <div className="ai-panel-header">
            <div className="d-flex align-items-center gap-2">
              <div className="ai-avatar">
                <FaRobot />
              </div>
              <div>
                <div className="ai-panel-title">Trip Assistant</div>
                <div className="ai-panel-status">
                  <span className="ai-status-dot" /> Online
                </div>
              </div>
            </div>
            <button
              className="ai-panel-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>

          <div className="chat-box flex-grow-1">

            {messages.length === 0 && (
              <div className="text-center text-muted mt-5 px-3">
                <FaRobot size={36} className="mb-3 text-primary" />
                <p className="fw-semibold mb-1">Ask about your trip</p>
                <p className="small">
                  Try "What should I pack for day 2?" or "Suggest a cheaper
                  hotel option."
                </p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.role === "user" ? "user-container" : "ai-container"
                }
              >
                <div
                  className={msg.role === "user" ? "user-msg" : "ai-msg"}
                >
                  <div className="fw-bold mb-2 d-flex align-items-center gap-2">
                    {msg.role === "user" ? (
                      <>
                        <FaUserCircle />
                        You
                      </>
                    ) : (
                      <>
                        <FaRobot />
                        AI
                      </>
                    )}
                  </div>
                  {msg.text}
                </div>
              </div>
            ))}

            <div ref={bottomRef}></div>
          </div>

          <div className="ai-panel-input">
            <div className="input-group">
              <input
                className="form-control"
                placeholder="Ask anything about your itinerary..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && askAI()}
                autoFocus
              />
              <button className="btn btn-primary" onClick={askAI}>
                {chatLoading ? "..." : <FaPaperPlane />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Launcher button */}
      <button
        className="ai-launcher"
        onClick={() => (isOpen ? setIsOpen(false) : openChat())}
        aria-label="Toggle trip assistant chat"
      >
        {!isOpen && <span className="ai-launcher-ping" />}
        {isOpen ? <FaTimes /> : <FaComments />}
        {hasUnread && <span className="ai-launcher-badge" />}
      </button>
    </div>
  );
}

export default AIChat;