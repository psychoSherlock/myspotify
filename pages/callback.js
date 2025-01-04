import { useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import axios from "axios";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.substr(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");

    console.log("Token received:", token);

    if (token) {
      setCookie(null, "ms-user-code", token, {
        path: "/",
        maxAge: 3600,
      });

      console.log("Token set in cookie");

      // Validate the token before redirecting
      axios
        .get("/api/validate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(
          (response) => {
            console.log("Token validation successful:", response.data);
            router.push("/you/tracks"); // Redirect to the desired page after validation
          },
          (error) => {
            console.error("Token validation failed:", error);
            router.push("/"); // Redirect to home if validation fails
          }
        );
    } else {
      console.error("No token found in URL");
      router.push("/"); // Redirect to home if no token is found
    }
  }, [router]);

  return (
    <div className="text-center mt-4">
      <h1 className="font-display font-bold text-xl">Processing...</h1>
    </div>
  );
}
