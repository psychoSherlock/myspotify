import spotifyAPI from "../../backend/spotifyAPI";

export default async function validateAPI(req, res) {
  console.log("Validating token...");

  let spotify = spotifyAPI(req);

  try {
    const data = await spotify.getMe();
    let resBody = data.body;

    console.log("Token validation successful:", resBody);

    res.status(200).json({
      id: resBody.id,
      name: resBody.display_name,
      image: resBody.images.length === 0 ? "" : resBody.images[0].url,
    });
  } catch (error) {
    console.error("Token validation failed:", error);
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    res.status(401).json("Invalid token");
  }
}
