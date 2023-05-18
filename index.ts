import { ISanityDocument } from "./typing";

export const SanityUploader = async (file: File, url: string, Sanity_Token: string): Promise<ISanityDocument> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const arrayBuffer = reader.result;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": file.type,
          Authorization: `Bearer ${Sanity_Token}`,
        },
        body: arrayBuffer,
      });
      const { document } = await response.json();

      resolve(document);
    };
  });
};
