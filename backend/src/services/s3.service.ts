/**
 * Mock S3 Service for file uploads
 * In production, this would use @aws-sdk/client-s3
 */

export class S3Service {
    /**
     * Upload a file to "S3" (Mocking with local storage or simply returning a dummy URL)
     */
    async uploadFile(file: any, folder: string): Promise<string> {
        console.log(`[Mock S3] Uploading file to ${folder}/${file.name || 'document.pdf'}`);

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Return a mock URL
        return `https://eufsi-dpp-assets.s3.eu-central-1.amazonaws.com/${folder}/${Date.now()}-${file.name || 'document.pdf'}`;
    }

    /**
     * Delete a file
     */
    async deleteFile(url: string): Promise<void> {
        console.log(`[Mock S3] Deleting file at ${url}`);
    }
}

export const s3Service = new S3Service();
