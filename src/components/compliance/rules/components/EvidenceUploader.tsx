
import React, { useState, useRef } from 'react';
import Button from '@/components/common/Button';
import { Upload, File, X } from 'lucide-react';
import { toast } from 'sonner';

const EvidenceUploader: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const submitFiles = async () => {
    if (selectedFiles.length === 0) {
      toast.info('Please select files to upload first');
      return;
    }

    setUploading(true);

    try {
      // Simulate file upload process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would upload to Supabase storage or another service
      // const { data, error } = await supabase.storage
      //   .from('evidence-documents')
      //   .upload('file-path', file);

      toast.success(`${selectedFiles.length} document(s) uploaded successfully`);
      setSelectedFiles([]);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload documents. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded p-4">
      <p className="text-sm text-gray-500 mb-3">Upload documents as evidence for this requirement</p>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
      />
      
      <div className="flex flex-wrap gap-2 mb-3">
        {selectedFiles.map((file, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 bg-white border rounded px-2 py-1 text-sm"
          >
            <File size={14} className="text-gray-500" />
            <span className="truncate max-w-[150px]">{file.name}</span>
            <button 
              onClick={() => removeFile(index)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          leftIcon={<Upload size={16} />}
          onClick={handleUploadClick}
        >
          Select Files
        </Button>
        
        {selectedFiles.length > 0 && (
          <Button 
            size="sm"
            onClick={submitFiles}
            isLoading={uploading}
          >
            Upload ({selectedFiles.length})
          </Button>
        )}
      </div>
    </div>
  );
};

export default EvidenceUploader;
