import styled from "styled-components";

const SVG = styled.svg`
  width: 40px;
  height: 40px;
`;

function TaskIcon({ className }: { className?: string }) {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        d="M14 9q-.425 0-.713-.288T13 8q0-.425.288-.713T14 7h7q.425 0 .713.288T22 8q0 .425-.288.713T21 9h-7zm0 8q-.425 0-.713-.288T13 16q0-.425.288-.713T14 15h7q.425 0 .713.288T22 16q0 .425-.288.713T21 17h-7zm-9.15-6.7L2.7 8.15q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l1.425 1.425 3.55-3.55q.3-.3.7-.288t.7.313q.275.3.275.7t-.275.7L6.25 10.3q-.3.3-.7.3t-.7-.3zm0 8L2.7 16.15q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l1.425 1.425 3.55-3.55q.3-.3.7-.287t.7.312q.275.3.275.7t-.275.7L6.25 18.3q-.3.3-.7.3t-.7-.3z"
      ></path>
    </SVG>
  );
}

export default TaskIcon;
