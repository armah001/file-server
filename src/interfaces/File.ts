
interface File {
    id: number;
    filename: string;
    fileType: string;
    data: string; // Represented as Base64 encoded string
  }

export default File;