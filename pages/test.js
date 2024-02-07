import { useState } from "react";

export default function Upload() {
  const [imageUrl, setImageUrl] = useState();

  const uploadPhoto = async (e) => {
    const file = e.target.files?.[0];

    const filestr = file.name;
    console.log("filestr", filestr);
    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);

    const res = await fetch(
      `/api/upload?file=${filename}&fileType=${fileType}`
    );
    const { url, fields } = await res.json();
    setImageUrl(url + "/" + fields.key);
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (upload.ok) {
      console.log("Uploaded successfully!");
    } else {
      console.error("Upload failed.");
    }
  };

  return (
    <>
      <p>Upload a .png or .jpg image (max 1MB).</p>
      <input
        onChange={uploadPhoto}
        type="file"
        accept="image/png, image/jpeg"
      />
      {imageUrl && <div>imageUrl:{imageUrl}</div>}
    </>
  );
}
