import { h, Fragment } from "preact";

const socialIcons = {
  twitter: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="40"
      viewBox="0 0 20 16"
      {...props}
    >
      <path
        fill="#FFF"
        d="M20,1.89401681 C19.264,2.21401616 18.474,2.43401572 17.644,2.53001552 C18.492,2.03001653 19.14,1.23801814 19.448,0.29602004 C18.6399289,0.766951501 17.7582367,1.09826156 16.84,1.27601806 C16.0594051,0.457824566 14.9768223,-0.00355578108 13.846,0 C11.58,0 9.744,1.81001698 9.744,4.04001247 C9.744,4.35601183 9.78,4.66401121 9.85,4.96001061 C6.56359987,4.80395213 3.49452413,3.27232096 1.394,0.740019142 C1.02912575,1.3542195 0.837020213,2.05561062 0.838,2.77001504 C0.838,4.17001221 1.564,5.4100097 2.664,6.13200824 C2.01289035,6.11158975 1.37572057,5.93825263 0.804,5.62600926 L0.804,5.67600916 C0.816740707,7.61209391 2.19481664,9.26980043 4.096,9.63600116 C3.49071533,9.79604817 2.85738291,9.81927719 2.242,9.70400102 C2.79184831,11.3596429 4.32960827,12.4856726 6.074,12.5099953 C4.6139256,13.6351089 2.82127909,14.2429753 0.978,14.2379919 C0.648,14.2379919 0.322,14.2179919 0,14.181992 C1.88094367,15.372565 4.0619252,16.0031337 6.288,16 C13.836,16 17.962,9.84400074 17.962,4.50401153 L17.948,3.98001259 C18.7525884,3.41457467 19.4478583,2.70778623 20,1.89401681 L20,1.89401681 Z"
      />
    </svg>
  ),
  mastodon: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="#FFF"
        d="M11.19 12.195c2.016-.24 3.77-1.475 3.99-2.603.348-1.778.32-4.339.32-4.339 0-3.47-2.286-4.488-2.286-4.488C12.062.238 10.083.017 8.027 0h-.05C5.92.017 3.942.238 2.79.765c0 0-2.285 1.017-2.285 4.488l-.002.662c-.004.64-.007 1.35.011 2.091.083 3.394.626 6.74 3.78 7.57 1.454.383 2.703.463 3.709.408 1.823-.1 2.847-.647 2.847-.647l-.06-1.317s-1.303.41-2.767.36c-1.45-.05-2.98-.156-3.215-1.928a3.614 3.614 0 0 1-.033-.496s1.424.346 3.228.428c1.103.05 2.137-.064 3.188-.189zm1.613-2.47H11.13v-4.08c0-.859-.364-1.295-1.091-1.295-.804 0-1.207.517-1.207 1.541v2.233H7.168V5.89c0-1.024-.403-1.541-1.207-1.541-.727 0-1.091.436-1.091 1.296v4.079H3.197V5.522c0-.859.22-1.541.66-2.046.456-.505 1.052-.764 1.793-.764.856 0 1.504.328 1.933.983L8 4.39l.417-.695c.429-.655 1.077-.983 1.934-.983.74 0 1.336.259 1.791.764.442.505.661 1.187.661 2.046v4.203z"
      />
    </svg>
  ),
  youtube: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48.3"
      height="35.7"
      viewBox="0 0 23 17"
      {...props}
    >
      <path
        fill="#FFF"
        d="M11.6907099,0.0578178602 C12.6060128,0.0605977646 16.7071801,0.0845049419 19.5514615,0.290106667 C20.0010348,0.343730208 20.981381,0.348267917 21.8559848,1.26434354 C22.5455679,1.96230729 22.770321,3.54726604 22.770321,3.54726604 C22.770321,3.54726604 23,5.4085075 23,7.26974417 L23,7.26974417 L23,9.01466312 C23,10.8758806 22.7703258,12.7371221 22.7703258,12.7371221 C22.7703258,12.7371221 22.5455727,14.3220856 21.8559896,15.0200494 C20.9813858,15.936125 20.0010348,15.9406531 19.5514663,15.9942862 C16.5574858,16.2107047 12.1665218,16.232102 11.5684023,16.2340342 L11.4899859,16.2341208 C11.2176094,16.2315455 5.47631882,16.1754125 3.68008625,16.00317 C3.16820688,15.9071594 2.01894,15.936125 1.14401521,15.0200494 C0.4544225,14.3220904 0.230019167,12.7371221 0.230019167,12.7371221 C0.230019167,12.7371221 0,10.8758806 0,9.01466312 L0.000994600165,7.05509197 C0.0160444711,5.41104868 0.197244917,3.82302118 0.226140669,3.57945865 L0.230014375,3.54726604 C0.230014375,3.54726604 0.454417708,1.96230729 1.14401042,1.26434354 C2.01893521,0.348267917 2.99893167,0.343730208 3.44853375,0.290106667 C6.29290408,0.0845049419 10.3940069,0.0605977646 11.3092935,0.0578178602 Z M9.12446896,4.66678625 L9.12552313,11.1291777 L15.3391744,7.90924 L9.12446896,4.66678625 Z"
      />
    </svg>
  ),
  github: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="#FFF"
        fill-rule="evenodd"
        d="M10.0412667,0 C4.51857003,0 0,4.61229762 0,10.2495503 C0,14.776435 2.84502557,18.6200163 6.86153226,19.986623 C7.3635956,20.0720359 7.53095004,19.7303843 7.53095004,19.4741455 C7.53095004,19.2179067 7.53095004,18.6200163 7.53095004,17.7658871 C4.76960169,18.3637776 4.18386114,16.3992804 4.18386114,16.3992804 C3.76547502,15.2034996 3.09605724,14.8618479 3.09605724,14.8618479 C2.09193057,14.2639574 3.09605724,14.2639574 3.09605724,14.2639574 C4.10018391,14.3493704 4.60224725,15.2889125 4.60224725,15.2889125 C5.5226967,16.826345 6.94520949,16.3992804 7.53095004,16.1430417 C7.61462727,15.4597383 7.86565894,15.0326737 8.20036783,14.776435 C5.94108281,14.5201962 3.59812058,13.666067 3.59812058,9.73707275 C3.59812058,8.6267048 4.01650669,7.6871627 4.60224725,7.00385934 C4.60224725,6.66220767 4.18386114,5.63725264 4.76960169,4.27064594 C4.76960169,4.27064594 5.60637392,4.01440719 7.53095004,5.29560097 C8.36772227,5.03936221 9.2044945,4.95394929 10.0412667,4.95394929 C10.878039,4.95394929 11.7148112,5.03936221 12.5515834,5.29560097 C14.4761595,3.92899427 15.3129318,4.27064594 15.3129318,4.27064594 C15.8986723,5.72266556 15.4802862,6.74762059 15.396609,7.00385934 C16.0660268,7.6871627 16.4007357,8.6267048 16.4007357,9.73707275 C16.4007357,13.666067 14.0577734,14.5201962 11.7984884,14.776435 C12.1331973,15.1180866 12.4679062,15.7159771 12.4679062,16.6555192 C12.4679062,18.0221259 12.4679062,19.1324938 12.4679062,19.4741455 C12.4679062,19.7303843 12.6352606,20.0720359 13.137324,19.986623 C17.1538307,18.6200163 19.9988562,14.776435 19.9988562,10.2495503 C20.0825335,4.61229762 15.5639634,0 10.0412667,0 Z"
      />
    </svg>
  ),
};

export const SocialButton = ({ href, icon, content }) => {
  const Icon = socialIcons[icon];
  return (
    <a rel="me" href={href} className="flex place-items-center ">
      <div className="px-2">
        <Icon className="min-w-fit max-w-s" />
      </div>
      <span className="grow text-3xl font-bold tracking-tight text-white">
        {content}
      </span>
    </a>
  );
};
