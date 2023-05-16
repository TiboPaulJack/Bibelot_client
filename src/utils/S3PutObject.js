import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';


async function uploadFile(file) {
  
  const client = new S3Client({region: "eu-west-3", credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
    }
  });
  
  const fileExtension = file.name.split('.').pop(); // Obtenir l'extension du fichier
  const randomName = `${uuidv4()}.${fileExtension}`; // Concaténer l'extension avec le nom de fichier généré aléatoirement
  
  const formData = new FormData();
  formData.append('file', file);
  
  const input = {
    Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
    Key: randomName,
    Body: formData.get('file'),
    label: file.name,
  };
  
  const command = new PutObjectCommand(input);
  
  try {
    await client.send(command);
    return input.Key;
  } catch (error) {
    console.log(error)
  } finally {
  }
}

export default uploadFile;
