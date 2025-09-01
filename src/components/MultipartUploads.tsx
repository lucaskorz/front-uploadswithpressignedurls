import { mbToBytes } from '@/lib/utils';
import { abortMPU } from '@/services/multipart/abortMPU';
import { completeMPU } from '@/services/multipart/completeMPU';
import { initiateMPU } from '@/services/multipart/initiateMPU';
import { uploadChunk } from '@/services/multipart/uploadChunk';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';

function MultipartUploads() {
  const [file, setFile] = useState<File>();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      return;
    }

    const chunkSize = mbToBytes(5);
    const totalChunks = Math.ceil(file.size / chunkSize);

    const { key, parts, uploadId } = await initiateMPU({ fileName: file.name, totalChunks });

    try {
      const uploadedParts = await Promise.all(parts.map(async ({ url, partNumber }, index) => {
        const chunkStart = index * chunkSize;
        const chunkEnd = Math.min(chunkStart + chunkSize, file.size);

        const fileChunk = file.slice(chunkStart, chunkEnd);

        const { entityTag } = await uploadChunk({ url, chunk: fileChunk })

        return {
          partNumber,
          entityTag
        }
      }));

      await completeMPU({ fileKey: key, uploadId, parts: uploadedParts });

      toast.success('Arquivo enviado com sucesso!');
    } catch {
      await abortMPU({ fileKey: key, uploadId });

      toast.error('Ocorreu um erro ao fazer o upload do arquivo!')
    }
  }

  return (
    <>
      <Toaster />

      <div className="w-full min-h-screen grid place-items-center">
        <div className="w-full max-w-lg">
          <h1 className="text-4xl font-semibold tracking-tighter mb-10">
            Selecione um arquivo
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="file"
              onChange={event => setFile(event.target.files?.[0])}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={!file}
            >
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default MultipartUploads;