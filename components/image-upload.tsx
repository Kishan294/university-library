"use client";

import { useToast } from "@/hooks/use-toast";
import { config } from "@/lib/config";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import {
  IKUploadResponse,
  UploadError,
} from "imagekitio-next/dist/types/components/IKUpload/props";
import Image from "next/image";
import { useRef, useState } from "react";

const {
  imagekit: { publicKey, urlEndpoint },
} = config.env;

const authenticator = async () => {
  try {
    const response = await fetch(
      `${process.env.NODE_ENV === "development" ? config.env.apiEndpoint : config.env.prodApiEndpoint}/api/auth/imagekit`
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed  with the status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

export const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const { toast } = useToast();
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: UploadError) => {
    console.log(error);
    toast({
      title: "Image upload failed",
      description: `Image upload failed: ${error.message}`,
      variant: "destructive",
    });
  };

  const onSuccess = (res: IKUploadResponse) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: "Image uploaded successfully",
      description: `Image uploaded successfully to ${res.filePath}`,
    });
  };
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        className="hidden"
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />
      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src={"/icons/upload.svg"}
          alt="upload icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a File</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  );
};
