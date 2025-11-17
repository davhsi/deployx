import { config as loadEnv } from "dotenv";

loadEnv();

const required = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};

export const awsConfig = {
  accessKeyId: required("AWS_ACCESS_KEY_ID"),
  secretAccessKey: required("AWS_SECRET_ACCESS_KEY"),
  region: process.env.AWS_REGION || "us-east-1",
};

export const s3BuildBucket = required("S3_BUILD_BUCKET");
export const port = Number(process.env.PORT || 3001);

