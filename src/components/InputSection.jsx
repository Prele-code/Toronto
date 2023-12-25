const InputSection = ({ value, onChange, onKeyDown, disabled, showSubmissionWarning, handleSubmit }) => (
  <div className="input-name">
    <input
      type="text"
      placeholder={`Enter name...`}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      disabled={disabled}
    />
    {showSubmissionWarning && (
      <p className="warning-message">Time to Shine! Enter Your Solution.</p>
    )}
    <button onClick={handleSubmit} disabled={disabled}>
      Submit Response
    </button>
  </div>
);

export default InputSection;
