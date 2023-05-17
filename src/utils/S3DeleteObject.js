import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";


async function deleteFile(file) {

  const client = new S3Client({region: "eu-west-3", credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
    }
  });
  const input = {
    Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
    Key: file,
  };
  const command = new DeleteObjectCommand(input);

  try {
    const response = await client.send(command)
    console.log("S3 response",response)
  } catch (error){
    console.log("S3 err",error)
  }
}

export default deleteFile;
