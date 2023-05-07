export function getImage(type: string): any {
  switch (type) {
    case "temp":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M307.72 302.27a8 8 0 01-3.72-6.75V80a48 48 0 00-48-48h0a48 48 0 00-48 48v215.52a8 8 0 01-3.71 6.74 97.51 97.51 0 00-44.19 86.07A96 96 0 00352 384a97.49 97.49 0 00-44.28-81.73zM256"
            fill="none"
            stroke="white"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="32"
          />
        </svg>
      );
    case "sun":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="none"
            stroke="white"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="32"
            d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"
          />
          <circle cx="256" cy="256" r="80" fill="none" stroke="white" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" />
        </svg>
      );
    case "weather":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="none"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M120 352l-24 48M136 432l-16 32M400 352l-24 48M416 432l-16 32M208 304l-16 96h48v80l80-112h-48l16-64M404.33 152.89H392.2C384.71 84.85 326.14 32 256 32a136.39 136.39 0 00-128.63 90.67h-4.57c-49.94 0-90.8 40.8-90.8 90.66h0C32 263.2 72.86 304 122.8 304h281.53C446 304 480 270 480 228.44h0c0-41.55-34-75.55-75.67-75.55z"
          />
        </svg>
      );
  }
  return "huy";
}
