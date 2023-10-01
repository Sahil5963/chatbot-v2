import styled from "styled-components";

export const ScrollDiv = styled.div<{ color: string }>`
  /* Customize the scrollbar's track */
  &::-webkit-scrollbar {
    width: 6px; /* Set the width of the scrollbar */
  }

  /* Customize the scrollbar's thumb (the draggable part) */
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.4); /* Set the background color of the thumb */
    border-radius: 6px; /* Round the corners of the thumb */
  }

  /* Customize the scrollbar's track when hovering over it */
  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* Change the color when hovering */
  }

  /* Customize the scrollbar's track when it's in a "pressed" state */
  &::-webkit-scrollbar-thumb:active {
    background: #444; /* Change the color when clicked */
  }

  /* Customize the scrollbar's track (the empty space) */
  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Set the background color of the track */
  }

  /* Customize the scrollbar's corner (the intersection of horizontal and vertical scrollbars) */
  &::-webkit-scrollbar-corner {
    background: transparent; /* Set the corner background color */
  }
`;

/* Define the cursor blink animation */

export const CursorBlink = styled.span`
  display: inline-block;
  width: 6px; /* Adjust the cursor width as needed */
  height: 1.2em; /* Adjust the cursor height as needed */
  background-color: currentColor; /* Cursor color */
  animation: blink 0.8s infinite; /* Adjust the animation duration as needed */

  @keyframes blink {
    0% {
      opacity: 0; /* Cursor is invisible at the start */
    }
    50% {
      opacity: 0.6; /* Cursor is visible in the middle of the animation */
    }
    100% {
      opacity: 0; /* Cursor is invisible at the end */
    }
  }
`;

export const IconBtn = styled.button<{ color: string }>`
  background: ${(p) => p.color + "00"};
  color: ${(p) => p.color + "a1"};
  height: 38px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 120px;
  transition: all 0.2s;

  &:hover {
    background: ${(p) => p.color + "20"};
    color: ${(p) => p.color + "ff"};
  }
`;
