// Component for chess pieces
<template>
  <g class="chesspiece">
    <svg
      v-if="props.name == 'kingB'"
      :x="props.x"
      :y="props.y"
      :width="props.width"
      :height="props.height"
      viewBox="14 5 17 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style="
          fill: none;
          fill-opacity: 1;
          fill-rule: evenodd;
          stroke: #000000;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
      >
        <path
          d="M 22.5,11.63 L 22.5,6"
          style="fill: none; stroke: #000000; stroke-linejoin: miter"
          id="path6570"
        />
        <path
          d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"
          style="
            fill: #000000;
            fill-opacity: 1;
            stroke-linecap: butt;
            stroke-linejoin: miter;
          "
        />
        <path
          d="M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37"
          style="fill: #000000; stroke: #000000"
        />
        <path
          d="M 20,8 L 25,8"
          style="fill: none; stroke: #000000; stroke-linejoin: miter"
        />
        <path
          d="M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.5,26.6 L 22.5,24.5 C 20,18 10.85,14 6.97,19.85 C 4.5,25.5 13,29.5 13,29.5"
          style="fill: none; stroke: #ffffff"
        />
        <path
          d="M 12.5,30 C 18,27 27,27 32.5,30 M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5 M 12.5,37 C 18,34 27,34 32.5,37"
          style="fill: none; stroke: #ffffff"
        />
      </g>
    </svg>
    <svg
      v-if="props.name == 'queenB'"
      :x="props.x"
      :y="props.y"
      :width="props.width"
      :height="props.height"
      viewBox="14 5 17 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style="
          fill: #000000;
          stroke: #000000;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        "
      >
        <path
          d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"
          style="stroke-linecap: butt; fill: #000000"
        />
        <path
          d="m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1,2.5 -1,2.5 -1.5,1.5 0,2.5 0,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0,-2.5 0,0 0.5,-1.5 -1,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z"
        />
        <path d="M 11.5,30 C 15,29 30,29 33.5,30" />
        <path d="m 12,33.5 c 6,-1 15,-1 21,0" />
        <circle cx="6" cy="12" r="2" />
        <circle cx="14" cy="9" r="2" />
        <circle cx="22.5" cy="8" r="2" />
        <circle cx="31" cy="9" r="2" />
        <circle cx="39" cy="12" r="2" />
        <path
          d="M 11,38.5 A 35,35 1 0 0 34,38.5"
          style="fill: none; stroke: #000000; stroke-linecap: butt"
        />
        <g style="fill: none; stroke: #ffffff">
          <path d="M 11,29 A 35,35 1 0 1 34,29" />
          <path d="M 12.5,31.5 L 32.5,31.5" />
          <path d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5" />
          <path d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5" />
        </g>
      </g>
    </svg>
    <svg
      v-if="props.name == 'bishopB'"
      :x="props.x"
      :y="props.y"
      :width="props.width"
      :height="props.height"
      viewBox="14 5 17 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style="
          opacity: 1;
          fill: none;
          fill-rule: evenodd;
          fill-opacity: 1;
          stroke: #000000;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
        transform="translate(0,0.6)"
      >
        <g style="fill: #000000; stroke: #000000; stroke-linecap: butt">
          <path
            d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z"
          />
          <path
            d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"
          />
          <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />
        </g>
        <path
          d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"
          style="fill: none; stroke: #ffffff; stroke-linejoin: miter"
        />
      </g>
    </svg>
    <svg
      v-if="props.name == 'pawnB'"
      :x="props.x"
      :y="props.y"
      :width="props.width"
      :height="props.height"
      viewBox="14 5 17 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z"
        style="
          opacity: 1;
          fill: #000000;
          fill-opacity: 1;
          fill-rule: nonzero;
          stroke: #000000;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: miter;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
      />
    </svg>
    <svg
      v-if="props.name == 'rookB'"
      :x="props.x"
      :y="props.y"
      :width="props.width"
      :height="props.height"
      viewBox="14 5 17 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style="
          opacity: 1;
          fill: #000000;
          fill-opacity: 1;
          fill-rule: evenodd;
          stroke: #000000;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
        transform="translate(0,0.3)"
      >
        <path
          d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
          style="stroke-linecap: butt"
        />
        <path
          d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z "
          style="stroke-linecap: butt"
        />
        <path
          d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
          style="stroke-linecap: butt"
        />
        <path
          d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z "
          style="stroke-linecap: butt; stroke-linejoin: miter"
        />
        <path
          d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z "
          style="stroke-linecap: butt"
        />
        <path
          d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z "
          style="stroke-linecap: butt"
        />
        <path
          d="M 12,35.5 L 33,35.5 L 33,35.5"
          style="
            fill: none;
            stroke: #ffffff;
            stroke-width: 1;
            stroke-linejoin: miter;
          "
        />
        <path
          d="M 13,31.5 L 32,31.5"
          style="
            fill: none;
            stroke: #ffffff;
            stroke-width: 1;
            stroke-linejoin: miter;
          "
        />
        <path
          d="M 14,29.5 L 31,29.5"
          style="
            fill: none;
            stroke: #ffffff;
            stroke-width: 1;
            stroke-linejoin: miter;
          "
        />
        <path
          d="M 14,16.5 L 31,16.5"
          style="
            fill: none;
            stroke: #ffffff;
            stroke-width: 1;
            stroke-linejoin: miter;
          "
        />
        <path
          d="M 11,14 L 34,14"
          style="
            fill: none;
            stroke: #ffffff;
            stroke-width: 1;
            stroke-linejoin: miter;
          "
        />
      </g>
    </svg>
    <svg
      v-if="props.name == 'knightB'"
      :x="props.x"
      :y="props.y"
      :width="props.width"
      :height="props.height"
      viewBox="14 5 17 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style="
          opacity: 1;
          fill: none;
          fill-opacity: 1;
          fill-rule: evenodd;
          stroke: #000000;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
        transform="translate(0,0.3)"
      >
        <path
          d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
          style="fill: #000000; stroke: #000000"
        />
        <path
          d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
          style="fill: #000000; stroke: #000000"
        />
        <path
          d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"
          style="fill: #ffffff; stroke: #ffffff"
        />
        <path
          d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"
          transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
          style="fill: #ffffff; stroke: #ffffff"
        />
        <path
          d="M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z "
          style="fill: #ffffff; stroke: none"
        />
      </g>
    </svg>
    <!-- ####################### white ############################## -->
    <svg
      v-if="props.name == 'kingW'"
      :x="props.x"
      :y="props.y"
      :width="props.width"
      :height="props.height"
      viewBox="14 5 17 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        fill-rule="evenodd"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      >
        <path stroke-linejoin="miter" d="M22.5 11.63V6M20 8h5" />
        <path
          fill="#fff"
          stroke-linecap="butt"
          stroke-linejoin="miter"
          d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"
        />
        <path
          fill="#fff"
          d="M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7"
        />
        <path
          d="M12.5 30c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0"
        />
      </g>
    </svg>
    <svg
      v-if="props.name == 'queenW'"
      :x="props.x"
      :y="props.y"
      :width="props.width"
      :height="props.height"
      viewBox="14 4 17 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style="
          fill: #ffffff;
          stroke: #000000;
          stroke-width: 1.5;
          stroke-linejoin: round;
        "
      >
        <path
          d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"
        />
        <path
          d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"
        />
        <path d="M 11.5,30 C 15,29 30,29 33.5,30" style="fill: none" />
        <path d="M 12,33.5 C 18,32.5 27,32.5 33,33.5" style="fill: none" />
        <circle cx="6" cy="12" r="2" />
        <circle cx="14" cy="9" r="2" />
        <circle cx="22.5" cy="8" r="2" />
        <circle cx="31" cy="9" r="2" />
        <circle cx="39" cy="12" r="2" />
      </g>
    </svg>
    <svg
      v-if="props.name == 'bishopW'"
      :x="props.x"
      :y="props.y"
      :width="props.width"
      :height="props.height"
      viewBox="14 5 17 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style="
          opacity: 1;
          fill: none;
          fill-rule: evenodd;
          fill-opacity: 1;
          stroke: #000000;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
        transform="translate(0,0.6)"
      >
        <g style="fill: #ffffff; stroke: #000000; stroke-linecap: butt">
          <path
            d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z"
          />
          <path
            d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"
          />
          <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />
        </g>
        <path
          d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"
          style="fill: none; stroke: #000000; stroke-linejoin: miter"
        />
      </g>
    </svg>
    <svg
      v-if="props.name == 'pawnW'"
      :x="props.x"
      :y="props.y"
      :width="props.width"
      :height="props.height"
      class="top"
      viewBox="14 5 17 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z"
        style="
          opacity: 1;
          fill: #ffffff;
          fill-opacity: 1;
          fill-rule: nonzero;
          stroke: #000000;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: miter;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
      />
    </svg>
    <svg
      v-if="props.name == 'rookW'"
      :x="props.x"
      :y="props.y + 10"
      :width="props.width"
      :height="props.height"
      viewBox="14 9 17 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style="
          opacity: 1;
          fill: #ffffff;
          fill-opacity: 1;
          fill-rule: evenodd;
          stroke: #000000;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
        transform="translate(0,0.3)"
      >
        <path
          d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
          style="stroke-linecap: butt"
        />
        <path
          d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
          style="stroke-linecap: butt"
        />
        <path
          d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"
          style="stroke-linecap: butt"
        />
        <path d="M 34,14 L 31,17 L 14,17 L 11,14" />
        <path
          d="M 31,17 L 31,29.5 L 14,29.5 L 14,17"
          style="stroke-linecap: butt; stroke-linejoin: miter"
        />
        <path d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />
        <path
          d="M 11,14 L 34,14"
          style="fill: none; stroke: #000000; stroke-linejoin: miter"
        />
      </g>
    </svg>
    <svg
      v-if="props.name == 'knightW'"
      :x="props.x"
      :y="props.y"
      :width="props.width"
      :height="props.height"
      viewBox="14 5 17 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style="
          opacity: 1;
          fill: none;
          fill-opacity: 1;
          fill-rule: evenodd;
          stroke: #000000;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
        transform="translate(0,0.3)"
      >
        <path
          d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
          style="fill: #ffffff; stroke: #000000"
        />
        <path
          d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
          style="fill: #ffffff; stroke: #000000"
        />
        <path
          d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"
          style="fill: #000000; stroke: #000000"
        />
        <path
          d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"
          transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
          style="fill: #000000; stroke: #000000"
        />
      </g>
    </svg>
    <!-- ### kosz ### -->
    <svg
      v-if="props.name == 'trash'"
      :x="props.x"
      :y="props.y"
      :width="props.width"
      :height="props.height"
      viewBox="0 0 443 443"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <rect x="61.785" y="128" width="60" height="290" />
        <path
          d="M211.785,250.65V128h-60v290h44.172c-14.861-21.067-23.602-46.746-23.602-74.43
		C172.356,307.145,187.486,274.193,211.785,250.65z"
        />
        <path
          d="M301.785,214.141l0-86.141h-60v100.918C259.731,219.488,280.144,214.141,301.785,214.141z"
        />
        <path
          d="M321.785,38h-83.384V0H125.169v38H41.785v60h280V38z M155.169,30h53.232v8h-53.232V30z"
        />
        <path
          d="M301.785,244.141c-54.826,0-99.429,44.604-99.429,99.429S246.959,443,301.785,443s99.43-44.604,99.43-99.43
		S356.611,244.141,301.785,244.141z M355.961,376.533l-21.213,21.213l-32.963-32.963l-32.963,32.963l-21.213-21.213l32.963-32.963
		l-32.963-32.963l21.213-21.213l32.963,32.963l32.963-32.963l21.213,21.213l-32.963,32.963L355.961,376.533z"
        />
      </g>
    </svg>
    <!-- ### palec ### -->
    <svg
      v-if="props.name == 'finger'"
      :x="props.x"
      :y="props.y"
      :width="props.width"
      :height="props.height"
      viewBox="0 0 297 297"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M244.279,91.662c-4.198,0-8.195,0.876-11.825,2.45c-4.413-11.152-15.238-19.058-27.869-19.058
          c-4.692,0-9.136,1.092-13.094,3.034c-5.009-9.657-15.048-16.27-26.598-16.27c-3.395,0-6.655,0.579-9.701,1.632V30.201
          C155.193,13.549,141.738,0,125.198,0C108.66,0,95.206,13.549,95.206,30.201v119.643L73.604,125.13
          c-0.151-0.169-0.305-0.335-0.465-0.494c-5.672-5.676-13.221-8.823-21.256-8.862c-0.052,0-0.101,0-0.153,0
          c-8.016,0-15.521,3.095-21.146,8.724c-9.918,9.921-10.467,24.647-1.502,40.408c11.605,20.39,24.22,39.616,35.351,56.581
          c8.134,12.398,15.818,24.108,21.435,33.79c4.871,8.402,17.801,35.651,17.933,35.926c1.678,3.541,5.247,5.798,9.163,5.798h128.27
          c4.407,0,8.308-2.843,9.659-7.035c2.392-7.439,23.379-73.398,23.379-98.871v-69.229C274.27,105.21,260.817,91.662,244.279,91.662z
          M234.579,121.865c0-5.468,4.352-9.916,9.7-9.916c5.351,0,9.703,4.448,9.703,9.916v69.229c0,16.928-13.01,62.437-20.189,85.618
          H119.361c-4.206-8.752-12.089-24.964-15.944-31.613c-5.897-10.168-13.73-22.105-22.022-34.744
          c-10.966-16.71-23.393-35.652-34.681-55.482c-2.946-5.181-5.646-12.166-1.78-16.032c1.803-1.807,4.231-2.751,6.851-2.779
          c2.557,0.013,4.962,0.977,6.805,2.721l39.124,44.755c2.78,3.183,7.248,4.306,11.202,2.821c3.958-1.486,6.579-5.271,6.579-9.497
          V30.201c0-5.467,4.353-9.913,9.704-9.913c5.352,0,9.706,4.446,9.706,9.913v94.711c0,5.602,4.543,10.144,10.144,10.144
          c5.601,0,10.144-4.542,10.144-10.144V92.016c0-5.464,4.352-9.909,9.701-9.909c5.351,0,9.703,4.445,9.703,9.909v46.127
          c0,5.605,4.542,10.145,10.143,10.145c5.602,0,10.145-4.539,10.145-10.145v-32.888c0-5.467,4.352-9.914,9.701-9.914
          c5.352,0,9.706,4.447,9.706,9.914v46.13c0,5.601,4.542,10.145,10.144,10.145c5.603,0,10.145-4.544,10.145-10.145V121.865z"
      />
    </svg>
    <!-- #######################  end  ############################## -->
  </g>
</template>
<script setup>
/*eslint no-undef: "off"*/
const props = defineProps({
  color: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});
</script>
