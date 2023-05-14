import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";


async function uploadFile(file) {
  
  
  const client = new S3Client({region: "eu-west-3", credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
    }
  });
  
  
  const input = {
    Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
    Key: file,
  };
  
  const command = new GetObjectCommand(input);
  
  try {
     const response = await client.send( command );
     const data = await response.Body.getReader().read();
     const blob = new Blob([data.value], { type: response.ContentType });
     return await URL.createObjectURL(blob);
  } catch (error) {
    console.log("S3 ERROR",error)
  }
}

export default uploadFile;
