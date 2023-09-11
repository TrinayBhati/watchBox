export const TickIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 213.7 213.7"
    >
      {/* Circle */}
      <circle
        className="circle"
        cx="106.8"
        cy="106.8"
        r="103.3"
        fill="none"
        strokeWidth="7"
        strokeLinecap="round"
        stroke="white"
      />

      {/* Tick Mark */}
      <path
        className="tick"
        d="M78.1,119.1l17.6,17.6l37.7-37.7"
        fill="none"
        strokeWidth="7"
        strokeLinecap="round"
        stroke="white"
      />
    </svg>
  );
};
