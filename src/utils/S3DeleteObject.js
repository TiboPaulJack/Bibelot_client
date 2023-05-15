import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


async function getFile( file) {
  
  const client = new S3Client({region: "eu-west-3", credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
    }
  });
  const input = {
    Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
    Key: file,
    label: "original"
  };
  const command = new DeleteObjectCommand(input);
  
  try {
    return await client.send(command)
  } catch (error) {
    console.log("S3 err",error)
  }
}

export default getFile;
