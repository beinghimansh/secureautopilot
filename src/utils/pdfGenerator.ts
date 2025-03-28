
// This utility handles PDF generation from policy documents
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Add the missing properties to the jsPDF type
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

// Convert a markdown string to a PDF document
export const generatePolicyPDF = (
  markdownContent: string, 
  title: string = 'Policy Document'
): Blob => {
  const doc = new jsPDF();
  
  // Set document properties
  doc.setProperties({
    title: title,
    subject: 'Compliance Policy Document',
    creator: 'Compliance Manager',
    keywords: 'policy, compliance, document'
  });
  
  // Parse the markdown and convert to PDF content
  const lines = markdownContent.split('\n');
  let yPos = 20;
  let pageWidth = doc.internal.pageSize.getWidth();
  
  // Add title
  doc.setFontSize(18);
  doc.setTextColor(0, 51, 102);
  doc.text(title, pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;
  
  // Add date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  
  // Process each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if we need a new page
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    
    // Handle headings
    if (line.startsWith('# ')) {
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(line.substring(2), 10, yPos);
      yPos += 10;
      
    } else if (line.startsWith('## ')) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(line.substring(3), 10, yPos);
      yPos += 8;
      
    } else if (line.startsWith('### ')) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(line.substring(4), 10, yPos);
      yPos += 7;
      
    } else if (line.startsWith('**')) {
      // Handle bold text
      doc.setFont('helvetica', 'bold');
      const text = line.replace(/\*\*/g, '');
      doc.text(text, 10, yPos);
      yPos += 7;
      
    } else if (line.trim() === '') {
      // Empty line
      yPos += 5;
      
    } else {
      // Regular text
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      // Split long lines to fit page width
      const textWidth = doc.getStringUnitWidth(line) * 10 / doc.internal.scaleFactor;
      if (textWidth > pageWidth - 20) {
        const splitText = doc.splitTextToSize(line, pageWidth - 20);
        doc.text(splitText, 10, yPos);
        yPos += splitText.length * 6;
      } else {
        doc.text(line, 10, yPos);
        yPos += 6;
      }
    }
  }
  
  // Generate and return PDF blob
  return doc.output('blob');
};

export const downloadPolicyAsPDF = (
  markdownContent: string, 
  filename: string = 'policy-document.pdf',
  title: string = 'Policy Document'
) => {
  const pdfBlob = generatePolicyPDF(markdownContent, title);
  const blobUrl = URL.createObjectURL(pdfBlob);
  
  // Create a link element to trigger the download
  const downloadLink = document.createElement('a');
  downloadLink.href = blobUrl;
  downloadLink.download = filename;
  
  // Trigger the download
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  
  // Clean up the blob URL
  setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
  }, 100);
};
