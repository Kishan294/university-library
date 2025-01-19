import React from "react";

const TooFast = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
        Whoa, Slow Down There Speedy
      </h1>
      <p className="mt-3 text-center max-w-xl text-light-400">
        Looks like you&apos;re going too fast. Slow down and try again.
      </p>
    </main>
  );
};

export default TooFast;
