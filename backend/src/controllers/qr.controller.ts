import { Request, Response } from 'express';
import QRCode from 'qrcode';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * Generate QR Code
 * 
 * GET /api/v1/qr/generate/:gtin?batch=:batch
 */
export const generateQr = asyncHandler(async (req: Request, res: Response) => {
    const { gtin } = req.params;
    const { batch, size = '300' } = req.query;

    // Validate GTIN
    if (!/^\d{13,14}$/.test(gtin)) {
        res.status(400);
        throw new Error('Invalid GTIN format');
    }

    // Build the GS1 Digital Link URL
    // This points to our resolver endpoint on the current host
    const host = req.get('host');
    const protocol = req.protocol;
    let resolverUrl = `${protocol}://${host}/resolve/${gtin}`;

    if (batch) {
        resolverUrl += `?batch=${batch}`;
    }

    try {
        // Generate QR code as Data URL
        const qrDataUrl = await QRCode.toDataURL(resolverUrl, {
            width: parseInt(size as string),
            margin: 2,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        });

        // Check if user wants raw image or JSON
        const accept = req.get('Accept');

        if (accept?.includes('application/json')) {
            res.json({
                gtin,
                batch: batch || null,
                url: resolverUrl,
                qrCode: qrDataUrl
            });
        } else {
            // Return HTML with image for easy testing
            res.send(`
        <html>
          <body style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif;">
            <h2>EUFSI DPP QR Code</h2>
            <img src="${qrDataUrl}" alt="QR Code" style="border:1px solid #ccc; padding:10px;" />
            <p>GTIN: ${gtin}</p>
            <p>Batch: ${batch || 'N/A'}</p>
            <p style="font-size:12px; color:#666;">Target: ${resolverUrl}</p>
            <a href="${qrDataUrl}" download="qr-${gtin}.png" style="margin-top:20px; padding:10px 20px; background:#000; color:#fff; text-decoration:none; border-radius:5px;">Download PNG</a>
          </body>
        </html>
      `);
        }
    } catch (err) {
        res.status(500);
        throw new Error('Failed to generate QR code');
    }
});
