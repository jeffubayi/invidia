import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import Image from "next/image";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { Tooltip } from "flowbite-react";

interface Upload {
  url: string | undefined;
  size: number;
  onUpload: (url: string) => void;
}

export default function Avatar({ url, size, onUpload }: Upload) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>();
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data!);
      setAvatarUrl(url);
    } catch (error) {
      error instanceof Error &&
        console.log("Error downloading image: ", error.message);
    }
  }

  async function uploadAvatar(event: any) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      error instanceof Error && alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center  mb-2 ">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="Avatar"
          height={size}
          width={size}
          className="mb-3 rounded-full border-2 border-gray-300"
        />
      ) : (
        <div
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      )}
      <div className="mb-6">
        <Tooltip content="Upload profile picture">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col justify-center items-center w-ful bg-gray-50 rounded-lg border-2 border-gray-300  cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <HiOutlineCloudUpload />
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={uploadAvatar}
              disabled={uploading}
            />
          </label>
        </Tooltip>
      </div>
    </div>
  );
}
