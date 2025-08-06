/* eslint-disable @typescript-eslint/no-explicit-any */
import PDFDocument from "pdfkit";
import AppError from "../errorHelpers/AppError";

export interface IInvoiceData {
  transactionId: string;
  bookingDate: Date;
  userName: string;
  tourTitle: string;
  guestCount: number;
  totalAmount: number;
}

export const generatePdf = async (invoiceData: IInvoiceData): Promise<Buffer> => {
  try {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const buffer: Uint8Array[] = [];

      doc.on("data", (chunk) => buffer.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffer)));
      doc.on("error", (err) => reject(err));

      // === A4 Dimensions ===
    
      const SAFE_FOOTER_START = 740; // Avoid printing below this to prevent page break

      // === HEADER ===
      doc.rect(0, 0, doc.page.width, 70).fill("#0F172A");
      doc.fillColor("white")
        .font("Helvetica-Bold")
        .fontSize(20)
        .text("TRAVEL HERO", 50, 25)
        .fontSize(10)
        .text("www.travelhero.com", 50, 45)
        .fontSize(22)
        .text("INVOICE", 0, 30, { align: "right" });

      // === INVOICE META BOXES ===
      doc
        .fillColor("#0F172A")
        .roundedRect(50, 90, 220, 25, 5).fill("#E0F2FE")
        .fontSize(9)
        .font("Helvetica-Bold")
        .fillColor("#0F172A")
        .text(`Invoice ID: ${invoiceData.transactionId}`, 60, 97);

      doc
        .fillColor("#0F172A")
        .roundedRect(300, 90, 220, 25, 5).fill("#DBEAFE")
        .fontSize(9)
        .font("Helvetica-Bold")
        .text(`Date: ${invoiceData.bookingDate.toDateString()}`, 310, 97);

      // === CUSTOMER INFO ===
      const customerY = 130;
      doc.fillColor("black")
        .font("Helvetica-Bold")
        .fontSize(11)
        .text("Invoice To:", 50, customerY);

      doc.font("Helvetica")
        .fontSize(10)
        .text(invoiceData.userName, 50, customerY + 14)
        .text("Jl Ciracas KDW No 27", 50, customerY + 28)
        .text("Location, Country", 50, customerY + 42);

      // === DIVIDER ===
      const dividerY = customerY + 60;
      doc.moveTo(50, dividerY).lineTo(550, dividerY).strokeColor("#E2E8F0").stroke();

      // === BOOKING DETAILS ===
      const detailY = dividerY + 15;
      doc.font("Helvetica-Bold")
        .fontSize(12)
        .fillColor("#2563EB")
        .text("Booking Details", 50, detailY);

      doc.font("Helvetica")
        .fontSize(10)
        .fillColor("black")
        .text(`Tour Title: ${invoiceData.tourTitle}`, 50, detailY + 18)
        .text(`Guest Count: ${invoiceData.guestCount}`, 50, detailY + 32)
        .text(`Total Amount: $${invoiceData.totalAmount.toFixed(2)}`, 50, detailY + 46);

      // === TERMS & SIGNATURE ===
      const footerY = detailY + 70;
      doc.moveTo(50, footerY).lineTo(550, footerY).strokeColor("#CBD5E1").stroke();

      doc.font("Helvetica-Bold")
        .fontSize(10)
        .fillColor("gray")
        .text("Terms & Conditions", 50, footerY + 10)
        .font("Helvetica")
        .text(
          "This invoice is system generated. All bookings are final. For questions, contact support.",
          50,
          footerY + 22,
          { width: 500 }
        );

      doc.font("Helvetica-Bold")
        .fillColor("black")
        .text("Zhevanka R", 50, footerY + 58)
        .font("Helvetica")
        .text("Director", 50, footerY + 70);

      // === FOOTER STRIP (SAFE POSITION) ===
      const bottomY = SAFE_FOOTER_START;
      doc.rect(0, bottomY, doc.page.width, 60).fill("#0F172A");

      doc.fillColor("white")
        .fontSize(9)
        .text("Your Address Here", 50, bottomY + 10)
        .text("+022 343 855 4545", 50, bottomY + 22)
        .text("www.travelhero.com", 50, bottomY + 34);

      // === DEBUG (Optional) ===
      console.log("✅ Final Y position before doc.end():", doc.y);

      // === END DOCUMENT ===
      doc.end();
    });
  } catch (error: any) {
    console.error(error);
    throw new AppError(401, `PDF creation error: ${error.message}`);
  }
};
