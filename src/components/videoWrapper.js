import { h } from "preact";
import { Suspense, lazy } from "preact/compat";
import { useState, useRef } from "preact/hooks";
import { Helmet } from "react-helmet";
import Unfurl from "./unfurl.js";

import ReactPlayer from "react-player";
export default (props) => {
  const playerRef = useRef();
  const [playerState, setPlayerState] = useState({});

  return (
    <div class="relative py-16 grow">
      <Helmet>
        <title>Jacob Bolda | {props.children.props.title}</title>
        <meta property="og:type" content="article" />
      </Helmet>
      <Unfurl
        title={props.children.props.title}
        subtitle={props.children.props.description}
      />
      {!globalThis.window ? null : (
        <Suspense fallback={<div>loading...</div>}>
          <ReactPlayer
            url={props.children.props.video}
            controls={true}
            onReady={() => console.log("onReady")}
            onStart={() => console.log("onStart")}
            onProgress={setPlayerState}
            ref={playerRef}
          />
        </Suspense>
      )}
      {/* <div>{JSON.stringify(playerState, null, 2)}</div> */}
      <article class="mt-6 text-gray-500 grid grid-col-1 gap-y-3 justify-items-center">
        {props.children}
      </article>
    </div>
  );
};
