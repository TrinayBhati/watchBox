export const PlusIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 213.7 213.7"
    >
      {/* Plus Icon */}
      <line
        className="plus-line"
        x1="73.5"
        y1="106.8"
        x2="148.5"
        y2="106.8"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <line
        className="plus-line"
        x1="106.8"
        y1="73.5"
        x2="106.8"
        y2="148.5"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
      />

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
    </svg>
  );
};
