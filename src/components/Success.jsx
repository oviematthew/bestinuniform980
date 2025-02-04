import React, { useState, useEffect } from "react";
import successVideo from "../assets/success.webm";

export default function Success() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className=" w-[100%] h-screen flex justify-center items-center">
      <div>
        <div>
          <video src={successVideo} autoPlay loop muted className="w-full" />
        </div>

        <div>
          <p className="mt-5 text-center font-bold text-2xl">Vote Successful</p>
          <p className="mt-1 mb-3 text-center">
            Taking you back home in {countdown}
          </p>
        </div>
      </div>
    </div>
  );
}
