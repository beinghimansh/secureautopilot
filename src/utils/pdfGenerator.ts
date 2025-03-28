
// Dynamic import of jspdf and related dependencies
export const downloadPolicyAsPDF = async (content: string, filename: string, title: string) => {
  try {
    // Dynamically import the required libraries
    const { default: jsPDF } = await import('jspdf');
    
    // Create a new PDF document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Set font size and styles
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    
    // Add title
    doc.text(title, 20, 20);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    // Split content into lines
    const lines = content.split('\n');
    let y = 30;
    
    // Process content lines
    for (const line of lines) {
      // Check if line is a header
      if (line.startsWith('# ')) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        y += 10;
      } else if (line.startsWith('## ')) {
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        y += 7;
      } else if (line.startsWith('### ')) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        y += 6;
      } else if (line.startsWith('- ')) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        y += 6;
      } else if (line.trim() === '') {
        y += 3;
        continue;
      } else {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        y += 6;
      }
      
      // Remove markdown characters for PDF output
      let cleanLine = line;
      if (line.startsWith('# ')) cleanLine = line.substring(2);
      else if (line.startsWith('## ')) cleanLine = line.substring(3);
      else if (line.startsWith('### ')) cleanLine = line.substring(4);
      
      // Add new page if needed
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      
      // Add text
      doc.text(cleanLine, 20, y);
    }
    
    // Save the PDF
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};
