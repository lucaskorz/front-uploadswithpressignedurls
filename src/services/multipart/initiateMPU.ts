import axios from "axios";

type InitiateMPUParams = {
  fileName: string;
  totalChunks: number;
};

type InitiateMPUResponse = {
  key: string;
  uploadId: string;
  parts: {
    url: string;
    partNumber: number;
  }[];
};

export async function initiateMPU({
  fileName,
  totalChunks,
}: InitiateMPUParams): Promise<InitiateMPUResponse> {
  const url =
    "https://fdpx3mqu4ec2moe3eeeakwadlm0vfhtd.lambda-url.us-east-1.on.aws/";

  const { data } = await axios.post<InitiateMPUResponse>(url, {
    fileName,
    totalChunks,
  });

  return data;
}
