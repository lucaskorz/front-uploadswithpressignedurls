import axios from "axios";

type CompleteMPUParams = {
  fileKey: string;
  uploadId: string;
  parts: {
    partNumber: number;
    entityTag: string;
  }[];
};

export async function completeMPU({
  fileKey,
  parts,
  uploadId,
}: CompleteMPUParams) {
  const url =
    "https://6kxxaiba7cfierxr4jphd2vov40jpedh.lambda-url.us-east-1.on.aws/";

  await axios.post(url, {
    fileKey,
    parts,
    uploadId,
  });
}
