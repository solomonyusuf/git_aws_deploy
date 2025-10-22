import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: process.env.AWS_REGION || "eu-north-1" });

export const handler = async (event) => {
  const bucketName = "my-lambda-website-bucket";

  try {
    const isBase64 = event.isBase64Encoded || false;
    const body = isBase64 ? Buffer.from(event.body, "base64") : event.body;

    const data = JSON.parse(body);
    const fileName = data.fileName || "upload.txt";
    const fileBuffer = Buffer.from(data.fileContent, "base64");

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileBuffer,
      ContentType: data.contentType || "application/octet-stream",
    };

    await s3.send(new PutObjectCommand(params));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `File '${fileName}' uploaded successfully to ${bucketName}`,
        fileUrl: `https://${bucketName}.s3.${process.env.AWS_REGION || "eu-north-1"}.amazonaws.com/${fileName}`,
      }),
    };
  } catch (err) {
    console.error("Upload error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Failed to upload file", error: err.message }),
    };
  }
};