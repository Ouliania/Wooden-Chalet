import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export function ChevronLeftIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ''}`}
      {...props}
    >
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function ChevronRightIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ''}`}
      {...props}
    >
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function ChevronsLeftIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ''}`}
      {...props}
    >
      <path
        d="M11 6L5 12L11 18M18 6L12 12L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function ChevronsRightIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ''}`}
      {...props}
    >
      <path
        d="M6 6L12 12L6 18M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function ChevronDownIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ''}`}
      {...props}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function PlusIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ''}`}
      {...props}
    >
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function MinusIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ''}`}
      {...props}
    >
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function CheckIcon({ size = 14, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ''}`}
      {...props}
    >
      <path
        d="M4.912 10L0 4.834L0.706 4.093L4.912 8.517L13 0L13.5 1L4.912 10Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MenuIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ''}`}
      {...props}
    >
      <path
        d="M4 7H20M4 12H20M4 17H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function CloseIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ''}`}
      {...props}
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function ArrowSubmitIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ''}`}
      {...props}
    >
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
