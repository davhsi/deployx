import { S3 } from "aws-sdk";
import fs from "fs";
import { awsConfig, s3UploadBucket } from "./config";

const s3 = new S3(awsConfig);

export const uploadFile = async(fileName: string, localFilePath: string) => {
    console.log("called");
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body:fileContent,
        Bucket:s3UploadBucket,
        Key:fileName
    }).promise();
    console.log(response);
}