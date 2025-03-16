import React, { useState, useRef, useEffect } from 'react';
import { Image, Upload, X, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PhotoUploadProps {
  onImageUpload?: (imageDataUrl: string | null) => void;
  currentImage?: string | null;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onImageUpload, currentImage }) => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (currentImage !== undefined) {
      setUploadedImage(currentImage);
    }
  }, [currentImage]);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (file: File) => {
    if (!file.type.match('image.*')) {
      toast({
        title: "Formato inválido",
        description: "Por favor, envie apenas arquivos de imagem.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Read the file as data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const imageDataUrl = e.target.result as string;
        
        // Simulate upload delay
        setTimeout(() => {
          setUploadedImage(imageDataUrl);
          if (onImageUpload) {
            onImageUpload(imageDataUrl);
          }
          setIsUploading(false);
          
          toast({
            title: "Imagem enviada!",
            description: "Sua foto foi adicionada com sucesso!",
          });
        }, 1500);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const removeImage = () => {
    setUploadedImage(null);
    if (onImageUpload) {
      onImageUpload(null);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        accept="image/*"
        className="hidden"
      />
      
      {!uploadedImage ? (
        <div
          className={`border-2 border-dashed rounded-lg transition-all duration-200 ${
            isDragging 
              ? 'border-blaze-blue bg-blue-50' 
              : 'border-gray-300 bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <div className="flex flex-col items-center justify-center py-8 px-4 cursor-pointer">
            {isUploading ? (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blaze-blue border-t-transparent mb-4"></div>
                <p className="text-gray-600">Enviando imagem...</p>
              </div>
            ) : (
              <>
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <Image className="h-8 w-8 text-blaze-blue" />
                </div>
                <p className="text-lg font-medium text-blaze-dark mb-1">Clique ou arraste para enviar</p>
                <p className="text-sm text-gray-500 text-center">
                  Adicione uma foto à sua mensagem
                </p>
                <button 
                  className="mt-4 button-3d bg-blaze-blue text-white rounded-full py-2 px-4 flex items-center font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerFileInput();
                  }}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Escolher arquivo
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="relative">
          <img 
            src={uploadedImage} 
            alt="Uploaded preview" 
            className="w-full object-contain max-h-64"
          />
          <div className="absolute top-0 right-0 p-2 flex space-x-2">
            <button
              onClick={removeImage}
              className="bg-white/80 backdrop-blur-sm hover:bg-red-100 p-2 rounded-full text-red-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="bg-green-100 p-3 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">Imagem adicionada com sucesso!</span>
          </div>
        </div>
      )}
    </div>
  );
};

PhotoUpload.defaultProps = {
  onImageUpload: undefined,
  currentImage: null,
};

export default PhotoUpload;
