import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { PresignDto } from "./dto/presign.dto";

@Injectable()
export class MediaService {
  private readonly s3: S3Client;
  private readonly bucket: string;
  private readonly publicUrl: string;

  constructor(private readonly config: ConfigService) {
    this.bucket = config.getOrThrow("R2_BUCKET");
    this.publicUrl = config.getOrThrow("R2_PUBLIC_URL");

    this.s3 = new S3Client({
      region: "auto",
      endpoint: config.getOrThrow("R2_ENDPOINT"),
      credentials: {
        accessKeyId: config.getOrThrow("R2_ACCESS_KEY_ID"),
        secretAccessKey: config.getOrThrow("R2_SECRET_ACCESS_KEY"),
      },
    });
  }

  async getPresignedUrl(userId: string, dto: PresignDto) {
    const ext = dto.filename.split(".").pop();
    const key = `${userId}/${randomUUID()}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: dto.contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 300 });
    const publicFileUrl = `${this.publicUrl}/${key}`;

    return { uploadUrl, publicFileUrl, key };
  }
}
