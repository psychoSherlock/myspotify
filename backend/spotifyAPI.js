import SpotifyWebApi from "spotify-web-api-node";
import { parseCookies } from "nookies";

export default function spotifyAPI(req) {
  const cookies = parseCookies({ req });

  let spotifyAPI = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL,
  });

  const token = cookies["ms-user-code"];
  console.log("Access token set in Spotify API:", token);

  spotifyAPI.setAccessToken(token || "");
  return spotifyAPI;
}
