import axios from "axios";

type AbortMPUParams = {
  fileKey: string;
  uploadId: string;
};

export async function abortMPU({ fileKey, uploadId }: AbortMPUParams) {
  await axios.delete(
    "https://qfc6ei2ckw4rrdlebz6fb6b4wm0gbrcp.lambda-url.us-east-1.on.aws/",
    { data: { fileKey, uploadId } }
  );
}
