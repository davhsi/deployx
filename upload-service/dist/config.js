"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.redisUrl = exports.s3UploadBucket = exports.awsConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const required = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};
exports.awsConfig = {
    accessKeyId: required("AWS_ACCESS_KEY_ID"),
    secretAccessKey: required("AWS_SECRET_ACCESS_KEY"),
    region: process.env.AWS_REGION || "us-east-1",
};
exports.s3UploadBucket = required("S3_UPLOAD_BUCKET");
exports.redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
exports.port = Number(process.env.PORT || 3000);
