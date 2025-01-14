import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import ImageKit from "imagekit";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndPoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;
    return { token, signature, expire };
  } catch (error: any) {
    throw new Error(`Authentication failed :${error.message}`);
  }
};
const FileUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikuploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.log("error", error);
    toast({
      title: "Image uploaded failed",
      description: "Your image could not be uploaded",
      variant: "destructive",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: "Image uploaded successfully",
      description: `${res.filePath} uploaded successfully`,
    });
  };
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikuploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      ></IKUpload>

      <button
        className={cn("upload-btn")}
        onClick={(e) => {
          e.preventDefault();

          if (ikuploadRef.current) {
            // @ts-ignore
            ikuploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          width={20}
          height={20}
          alt="upload-btn"
          className="object-contain"
        ></Image>
        <p className="text-base text-light-100">Upload a file</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        ></IKImage>
      )}
    </ImageKitProvider>
  );
};

export default FileUpload;
