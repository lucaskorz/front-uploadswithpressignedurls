import axios from "axios";

export async function getPresignedURL(file: File) {
  const { data } = await axios.post<{ signedUrl: string }>(
    "https://d2234bia5ficab63nxucn4yffi0gycvv.lambda-url.us-east-1.on.aws/",
    {
      filename: file.name,
    }
  );

  return data.signedUrl;
}
