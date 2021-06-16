export default function PrevPlayerBtn({ goToNextSong }) {
  return (
    <svg
      onClick={() => goToNextSong(-1)}
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
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}
