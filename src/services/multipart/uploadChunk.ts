import { sleep } from "@/lib/utils";
import axios from "axios";

type UploadChunkParams = {
  url: string;
  chunk: Blob;
  maxRetries?: number;
};

export async function uploadChunk({
  url,
  chunk,
  maxRetries = 3,
}: UploadChunkParams) {
  try {
    const { headers } = await axios.put<null, { headers: { etag: string } }>(
      url,
      chunk
    );

    const entityTag = headers["etag"].replaceAll(/"/g, "");

    return { entityTag };
  } catch (error) {
    if (maxRetries > 0) {
      await sleep(2000);
      return uploadChunk({ url, chunk, maxRetries: maxRetries - 1 });
    }

    throw error;
  }
}
