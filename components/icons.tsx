import * as React from "react";

import { IconSvgProps } from "@/types";

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M6 30h20v-5a7.01 7.01 0 0 0-7-7h-6a7.01 7.01 0 0 0-7 7zM9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7"/></svg>
export const UserFilledIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    // fill={props.color}
    // fill="none"
    stroke="currentColor"
    // strokeWidth={0.5}
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
<path fill="currentColor" d="M6 30h20v-5a7.01 7.01 0 0 0-7-7h-6a7.01 7.01 0 0 0-7 7zM9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7"/>
  </svg>
);

export const KeyIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    // fill={props.color}
    fill="currentColor"
    stroke="currentColor"
    // strokeWidth={0.5}
    height={size || height}
    viewBox="0 0 16 16"
    width={size || width}
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const UserIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    // fill={props.color}
    // fill="none"
    stroke="currentColor"
    // strokeWidth={0.5}
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </g>
  </svg>
);

export const UploadingIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    // fill={props.color}
    // fill="none"
    stroke="currentColor"
    // strokeWidth={0.5}
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path
        strokeDasharray="20"
        strokeDashoffset="20"
        d="M12 15h2v-6h2.5l-4.5 -4.5M12 15h-2v-6h-2.5l4.5 -4.5"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="1.5s"
          values="20;0"
          repeatCount="indefinite"
        />
      </path>
      <path strokeDasharray="16" strokeDashoffset="16" d="M6 19h12">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.5s"
          dur="1s"
          values="16;0"
          // repeatCount="indefinite"
        />
      </path>
    </g>
  </svg>
);

export const PasteIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    // fill={props.color}
    // fill="none"
    stroke="currentColor"
    strokeWidth={0.5}
    height={size || height}
    viewBox="0 0 16 16"
    width={size || width}
    {...props}
  >
    <path
      fill="currentColor"
      d="M4.085 2H3.5A1.5 1.5 0 0 0 2 3.5v10A1.5 1.5 0 0 0 3.5 15h2.612v-1H3.5a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h.585A1.5 1.5 0 0 0 5.5 4h3a1.5 1.5 0 0 0 1.415-1h.585a.5.5 0 0 1 .5.5V5h1V3.5A1.5 1.5 0 0 0 10.5 2h-.585A1.5 1.5 0 0 0 8.5 1h-3a1.5 1.5 0 0 0-1.415 1M5 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M8.5 6A1.5 1.5 0 0 0 7 7.5v6A1.5 1.5 0 0 0 8.5 15h4a1.5 1.5 0 0 0 1.5-1.5v-6A1.5 1.5 0 0 0 12.5 6zM8 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5z"
    />
  </svg>
);
export const CancelIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    // fill={props.color}
    // fill="none"
    stroke="currentColor"
    height={size || height}
    viewBox="0 -960 960 960"
    width={size || width}
    {...props}
  >
    <path
      fill="currentColor"
      d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
    />
  </svg>
);

export const DeleteIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    // fill={props.color}
    fill="none"
    stroke="currentColor"
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    strokeWidth={0.1}
    {...props}
  >
    <path
      fill="currentColor"
      d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
    />
  </svg>
);

export const ErrorIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    // fill={props.color}
    fill="none"
    stroke="currentColor"
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const CheckMarkIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    stroke="currentColor"
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const InfoIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    // fill={props.color}
    fill="none"
    stroke="currentColor"
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const DownloadIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    fill={props.color}
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      fill="currentColor"
      d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
    />
  </svg>
);
{
  /* <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg> */
}
export const DelIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    fill={props.color}
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      fill="currentColor"
      d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
    />
  </svg>
);
{
  /* <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 17a3 3 0 1 0 6 0a3 3 0 1 0-6 0m10 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0m-4.85-2.15L18 4M6 4l8.85 10.85"/></svg> */
}
export const CutIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    fill={props.color}
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 17a3 3 0 1 0 6 0a3 3 0 1 0-6 0m10 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0m-4.85-2.15L18 4M6 4l8.85 10.85"
    />
  </svg>
);
{
  /* <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z"/><path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1"/></g></svg> */
}
export const CopyIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    fill={props.color}
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z" />
      <path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1" />
    </g>
  </svg>
);

export const FileIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    fill={props.color}
    height={size || height}
    viewBox="0 0 20 20"
    width={size || width}
    {...props}
  >
    <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
      <path d="M5.75 11.5a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75m0 3a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75" />
      <path d="M2.5 2.5c0-1.102.898-2 2-2h6.69c.562 0 1.092.238 1.465.631l.006.007l4.312 4.702c.359.383.527.884.527 1.36v10.3c0 1.102-.898 2-2 2h-11c-1.102 0-2-.898-2-2zm8.689 0H4.5v15h11V7.192l-4.296-4.685l-.003-.001a.041.041 0 0 0-.012-.006" />
      <path d="M11.19.5a1 1 0 0 1 1 1v4.7h4.31a1 1 0 1 1 0 2h-5.31a1 1 0 0 1-1-1V1.5a1 1 0 0 1 1-1" />
    </g>
  </svg>
);

export const CreateFileIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    fill={props.color}
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      fill="currentColor"
      d="M17 14h2v3h3v2h-3v3h-2v-3h-3v-2h3zM5 3h14c1.11 0 2 .89 2 2v7.8c-.61-.35-1.28-.6-2-.72V5H5v14h7.08c.12.72.37 1.39.72 2H5c-1.11 0-2-.89-2-2V5c0-1.11.89-2 2-2m2 4h10v2H7zm0 4h10v1.08c-.85.14-1.63.46-2.32.92H7zm0 4h5v2H7z"
    />
  </svg>
);

export const FileUploadIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    fill={props.color}
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      fill="currentColor"
      d="M11 19h2v-4.175l1.6 1.6L16 15l-4-4l-4 4l1.425 1.4L11 14.825zm-5 3q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v12q0 .825-.587 1.413T18 22zm7-13V4H6v16h12V9zM6 4v5zv16z"
    />
  </svg>
);
export const FolderUploadIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    fill={props.color}
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      fill="currentColor"
      d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m0 12H4V8h16zM8 13.01l1.41 1.41L11 12.84V17h2v-4.16l1.59 1.59L16 13.01L12.01 9z"
    />
  </svg>
);

export const FolderIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    fill={props.color}
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      fill="currentColor"
      d="M20 18H4V8h16m0-2h-8l-2-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2"
    />
  </svg>
);
export const PlusIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    fill={props.color}
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      fill="currentColor"
      d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2"
    />
  </svg>
);

export const ComputerIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    fill={props.color}
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
    />
  </svg>
);

export const CyberpunkIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    fill={props.color}
    // fill="#black"
    height={size || height}
    viewBox="0 0 512 512"
    width={size || width}
    {...props}
  >
    <path
      fill="currentColor"
      d="M255.565 30.643c-81.598 0-152.721 46.707-189.777 115.92h50.29l16.74-33.481h115.865c2.055-4.234 5.416-7.771 9.246-10.324c6.302-4.201 14.192-6.414 22.748-6.414c8.555 0 16.446 2.213 22.748 6.414s11.361 11.054 11.361 19.324s-5.06 15.123-11.361 19.324s-14.193 6.414-22.748 6.414s-16.446-2.213-22.748-6.414c-3.83-2.553-7.193-6.09-9.248-10.326H143.94l-7.74 15.482h52.402v17.999H57.143a229 229 0 0 0-5.96 15.48h36.974v17.998H45.802c-4.006 15.707-6.415 32.092-7.051 48.963h109.883l16.742-50.22h39.967v17.997h-26.996l-10.743 32.223h47.594c2.056-4.235 5.418-7.773 9.248-10.326c6.302-4.201 14.193-6.414 22.748-6.414s16.446 2.213 22.748 6.414S281.306 247.73 281.306 256s-5.062 15.123-11.364 19.324s-14.192 6.414-22.748 6.414c-8.555 0-16.446-2.213-22.748-6.414c-3.83-2.553-7.192-6.09-9.248-10.326h-95.74l24.482 48.963h78.143v17.998h-89.266l-33.482-66.961H38.751c1.614 42.826 14.69 82.527 36.129 115.922h90.096c2.055-4.235 5.42-7.773 9.25-10.326c6.302-4.201 14.19-6.414 22.746-6.414s16.446 2.213 22.748 6.414s11.363 11.054 11.363 19.324s-5.061 15.123-11.363 19.324s-14.193 6.414-22.748 6.414s-16.444-2.213-22.746-6.414c-3.83-2.553-7.193-6.09-9.248-10.324h-9.784l21.483 32.22h73.328l16.74-33.48h39.043v17.998h-27.92l-7.742 15.483h52.402v17.998H167.046l-33.483-50.219H87.716c39.81 50.37 100.234 82.44 167.85 82.44c92.336 0 171.262-59.806 202.581-144.358c-4.882 10.507-10.77 19.344-17.916 25.893c-7.212 6.609-16.06 10.914-25.628 10.914s-18.417-4.305-25.63-10.914c-7.212-6.61-13.145-15.546-18.054-26.182c-9.818-21.272-15.537-49.542-15.537-80.711s5.719-59.44 15.537-80.71c4.91-10.637 10.842-19.573 18.055-26.183s16.06-10.914 25.629-10.914c9.568 0 18.416 4.305 25.628 10.914c7.146 6.549 13.034 15.386 17.916 25.893C426.828 90.448 347.902 30.643 255.565 30.643m25.112 83.699c-5.313 0-9.98 1.533-12.766 3.39s-3.348 3.375-3.348 4.35s.562 2.492 3.348 4.35c2.787 1.857 7.453 3.39 12.766 3.39s9.979-1.533 12.765-3.39s3.346-3.375 3.346-4.35s-.56-2.492-3.346-4.35s-7.452-3.39-12.765-3.39m159.037 83.44c-11.598 0-20.097 8.806-25.37 19.35s-8.163 24.04-8.163 38.868s2.891 28.323 8.164 38.867c5.272 10.545 13.77 19.352 25.369 19.352s20.098-8.807 25.371-19.352s8.164-24.038 8.164-38.867s-2.891-28.323-8.164-38.867c-5.273-10.545-13.773-19.352-25.371-19.352zm4.613 20.157c1.556 1.497 3.261 3.769 4.93 7.106c3.662 7.324 6.299 18.517 6.299 30.955s-2.637 23.63-6.3 30.955s-7.506 9.57-9.542 9.57s-5.88-2.246-9.543-9.57s-6.297-18.517-6.297-30.955c0-.253.008-.502.01-.754a16.458 24.686 0 0 0 7.604 2.81a16.458 24.686 0 0 0 16.457-24.685a16.458 24.686 0 0 0-3.618-15.432m-197.133 30.32c-5.313 0-9.977 1.534-12.763 3.391c-2.787 1.858-3.348 3.375-3.348 4.35s.561 2.492 3.348 4.35s7.45 3.39 12.763 3.39c5.314 0 9.98-1.533 12.766-3.39s3.348-3.375 3.348-4.35s-.562-2.492-3.348-4.35s-7.452-3.39-12.766-3.39zm-50.222 133.919c-5.314 0-9.978 1.533-12.764 3.39s-3.348 3.375-3.348 4.35s.562 2.492 3.348 4.35s7.45 3.39 12.764 3.39s9.979-1.533 12.765-3.39s3.348-3.375 3.348-4.35s-.561-2.492-3.348-4.35s-7.452-3.39-12.765-3.39"
    />
  </svg>
);

export const CupcakeIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    // fill="none"
    // fill="#black"
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      // stroke-linecap="round"
      // stroke-linejoin="round"
      strokeWidth="2"
      d="m19 14l-.804 5.626c-.07.487-.104.731-.222.915a1 1 0 0 1-.426.369c-.197.09-.443.09-.933.09H14m5-7h-5m5 0c1.303-.604 2-2.236 2-3.666c0-1.536-1.03-2.85-2.49-3.397a.787.787 0 0 1-.51-.729c0-1.265-1.12-2.291-2.5-2.291c-.226 0-.445.027-.654.079c-.432.107-.915.083-1.287-.145A5.833 5.833 0 0 0 10.5 3C7.462 3 5 5.257 5 8.042c0 .352-.23.674-.557.857C3.578 9.38 3 10.254 3 11.25c0 1.277.712 2.44 2 2.75m0 0l.804 5.626v.002c.07.486.104.73.222.913a1 1 0 0 0 .426.369c.197.09.443.09.933.09H10m-5-7h5m0 0h4m-4 0v7m4-7v7m0 0h-4"
    />
  </svg>
);

export const SunsetIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    fill={props.color}
    // fill="#black"
    height={size || height}
    viewBox="0 -960 960 960"
    width={size || width}
    {...props}
  >
    <path d="m734-556-56-58 86-84 56 56-86 86ZM80-160v-80h800v80H80Zm360-520v-120h80v120h-80ZM226-558l-84-86 56-56 86 86-58 56Zm71 158h366q-23-54-72-87t-111-33q-62 0-111 33t-72 87Zm-97 80q0-117 81.5-198.5T480-600q117 0 198.5 81.5T760-320H200Zm280-80Z" />
  </svg>
);
export const DropUpIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    fill={props.color}
    height={size || height}
    viewBox="0 0 2048 2048"
    width={size || width}
    {...props}
  >
    <path d="M249 1699l-242-241 1017-1017 1017 1017-242 241-775-775-775 775z"></path>
  </svg>
);

export const DropdownIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    fill={props.color}
    height={size || height}
    viewBox="0 0 2048 2048"
    width={size || width}
    {...props}
  >
    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
  </svg>
);
export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const EyeFilledIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
        fill="currentColor"
      />
      <path
        d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EyeSlashFilledIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
        fill="currentColor"
      />
      <path
        d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
        fill="currentColor"
      />
      <path
        d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
        fill="currentColor"
      />
      <path
        d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
        fill="currentColor"
      />
      <path
        d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const DiscordIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const TwitterIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
        fill="currentColor"
      />
    </svg>
  );
};

export const GithubIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const HeartFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const NextUILogo: React.FC<IconSvgProps> = (props) => {
  const { width, height = 40 } = props;

  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 161 32"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="fill-black dark:fill-white"
        d="M55.6827 5V26.6275H53.7794L41.1235 8.51665H40.9563V26.6275H39V5H40.89L53.5911 23.1323H53.7555V5H55.6827ZM67.4831 26.9663C66.1109 27.0019 64.7581 26.6329 63.5903 25.9044C62.4852 25.185 61.6054 24.1633 61.0537 22.9582C60.4354 21.5961 60.1298 20.1106 60.1598 18.6126C60.132 17.1113 60.4375 15.6228 61.0537 14.2563C61.5954 13.0511 62.4525 12.0179 63.5326 11.268C64.6166 10.5379 65.8958 10.16 67.1986 10.1852C68.0611 10.1837 68.9162 10.3468 69.7187 10.666C70.5398 10.9946 71.2829 11.4948 71.8992 12.1337C72.5764 12.8435 73.0985 13.6889 73.4318 14.6152C73.8311 15.7483 74.0226 16.9455 73.9968 18.1479V19.0773H63.2262V17.4194H72.0935C72.1083 16.4456 71.8952 15.4821 71.4714 14.6072C71.083 13.803 70.4874 13.1191 69.7472 12.6272C68.9887 12.1348 68.1022 11.8812 67.2006 11.8987C66.2411 11.8807 65.3005 12.1689 64.5128 12.7223C63.7332 13.2783 63.1083 14.0275 62.6984 14.8978C62.2582 15.8199 62.0314 16.831 62.0352 17.8546V18.8476C62.009 20.0078 62.2354 21.1595 62.6984 22.2217C63.1005 23.1349 63.7564 23.9108 64.5864 24.4554C65.4554 24.9973 66.4621 25.2717 67.4831 25.2448C68.1676 25.2588 68.848 25.1368 69.4859 24.8859C70.0301 24.6666 70.5242 24.3376 70.9382 23.919C71.3183 23.5345 71.6217 23.0799 71.8322 22.5799L73.5995 23.1604C73.3388 23.8697 72.9304 24.5143 72.4019 25.0506C71.8132 25.6529 71.1086 26.1269 70.3314 26.4434C69.4258 26.8068 68.4575 26.9846 67.4831 26.9663V26.9663ZM78.8233 10.4075L82.9655 17.325L87.1076 10.4075H89.2683L84.1008 18.5175L89.2683 26.6275H87.103L82.9608 19.9317L78.8193 26.6275H76.6647L81.7711 18.5169L76.6647 10.4062L78.8233 10.4075ZM99.5142 10.4075V12.0447H91.8413V10.4075H99.5142ZM94.2427 6.52397H96.1148V22.3931C96.086 22.9446 96.2051 23.4938 96.4597 23.9827C96.6652 24.344 96.9805 24.629 97.3589 24.7955C97.7328 24.9548 98.1349 25.0357 98.5407 25.0332C98.7508 25.0359 98.9607 25.02 99.168 24.9857C99.3422 24.954 99.4956 24.9205 99.6283 24.8853L100.026 26.5853C99.8062 26.6672 99.5805 26.7327 99.3511 26.7815C99.0274 26.847 98.6977 26.8771 98.3676 26.8712C97.6854 26.871 97.0119 26.7156 96.3973 26.4166C95.7683 26.1156 95.2317 25.6485 94.8442 25.0647C94.4214 24.4018 94.2097 23.6242 94.2374 22.8363L94.2427 6.52397ZM118.398 5H120.354V19.3204C120.376 20.7052 120.022 22.0697 119.328 23.2649C118.644 24.4235 117.658 25.3698 116.477 26.0001C115.168 26.6879 113.708 27.0311 112.232 26.9978C110.759 27.029 109.302 26.6835 107.996 25.9934C106.815 25.362 105.827 24.4161 105.141 23.2582C104.447 22.0651 104.092 20.7022 104.115 19.319V5H106.08V19.1831C106.061 20.2559 106.324 21.3147 106.843 22.2511C107.349 23.1459 108.094 23.8795 108.992 24.3683C109.993 24.9011 111.111 25.1664 112.242 25.139C113.373 25.1656 114.493 24.9003 115.495 24.3683C116.395 23.8815 117.14 23.1475 117.644 22.2511C118.16 21.3136 118.421 20.2553 118.402 19.1831L118.398 5ZM128 5V26.6275H126.041V5H128Z"
      />
      <path
        className="fill-black dark:fill-white"
        d="M23.5294 0H8.47059C3.79241 0 0 3.79241 0 8.47059V23.5294C0 28.2076 3.79241 32 8.47059 32H23.5294C28.2076 32 32 28.2076 32 23.5294V8.47059C32 3.79241 28.2076 0 23.5294 0Z"
      />
      <path
        className="fill-white dark:fill-black"
        d="M17.5667 9.21729H18.8111V18.2403C18.8255 19.1128 18.6 19.9726 18.159 20.7256C17.7241 21.4555 17.0968 22.0518 16.3458 22.4491C15.5717 22.8683 14.6722 23.0779 13.6473 23.0779C12.627 23.0779 11.7286 22.8672 10.9521 22.4457C10.2007 22.0478 9.5727 21.4518 9.13602 20.7223C8.6948 19.9705 8.4692 19.1118 8.48396 18.2403V9.21729H9.72854V18.1538C9.71656 18.8298 9.88417 19.4968 10.2143 20.0868C10.5362 20.6506 11.0099 21.1129 11.5814 21.421C12.1689 21.7448 12.8576 21.9067 13.6475 21.9067C14.4374 21.9067 15.1272 21.7448 15.7169 21.421C16.2895 21.1142 16.7635 20.6516 17.0844 20.0868C17.4124 19.4961 17.5788 18.8293 17.5667 18.1538V9.21729ZM23.6753 9.21729V22.845H22.4309V9.21729H23.6753Z"
      />
    </svg>
  );
};
