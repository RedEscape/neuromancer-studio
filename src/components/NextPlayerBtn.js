export default function NextPlayerBtn({ goToNextSong }) {
  return (
    <svg
      onClick={() => goToNextSong(1)}
      className="playerBtn"
      fill="none"
      stroke="rgb(221, 73, 73)"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      ></path>
    </svg>
  );
}
