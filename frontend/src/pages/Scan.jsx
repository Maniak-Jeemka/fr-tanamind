import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { UploadCloud, Camera, Leaf } from 'lucide-react';
import { uploadScan } from '../services/scanService';
import { useNavigate } from 'react-router-dom';

const Scan = () => {
    const [image, setImage] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
                startScan(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const startScan = async (fileToUpload) => {
        if (!fileToUpload) return;
        
        setIsScanning(true);
        
        const formData = new FormData();
        formData.append('image', fileToUpload);

        try {
            const response = await uploadScan(formData);
            if (response.status === 'success' && response.data?.id) {
                navigate(`/scan/${response.data.id}`);
            } else {
                alert(response.message || 'Terjadi kesalahan saat memproses gambar.');
                setImage(null);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Gagal menghubungi server. Pastikan API berjalan.');
            setImage(null);
        } finally {
            setIsScanning(false);
        }
    };

    const triggerUpload = () => fileInputRef.current?.click();
    const triggerCamera = () => cameraInputRef.current?.click();

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Plant Scan</h1>
                <p className="text-muted-foreground mt-1">Upload a clear photo of the leaf for instant analysis.</p>
            </div>

            <Card className="bg-card border-border clay-sm">
                <CardHeader>
                    <CardTitle className="text-lg text-card-foreground">Upload Image</CardTitle>
                </CardHeader>
                <CardContent>
                    <div 
                        className={`border-2 border-dashed border-muted-foreground/30 bg-muted/30 rounded-2xl flex flex-col items-center justify-center p-12 text-center clay-inset ${!isScanning ? 'cursor-pointer hover:border-primary/50' : ''} transition-colors h-80 relative overflow-hidden`}
                        onClick={!isScanning ? triggerUpload : undefined}
                    >
                        {image ? (
                            <>
                                <img src={image} alt="Uploaded leaf" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                {isScanning && (
                                    <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center z-10 backdrop-blur-sm">
                                        <div className="w-16 h-16 border-4 border-muted border-t-primary rounded-full animate-spin mb-4"></div>
                                        <p className="text-primary font-medium animate-pulse">Analyzing with AI...</p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="bg-background p-4 rounded-full text-muted-foreground mb-4">
                                    <UploadCloud className="w-8 h-8" />
                                </div>
                                <p className="text-foreground font-medium mb-1">Tap or drag to upload a photo</p>
                                <p className="text-muted-foreground text-sm">PNG or JPG, max 5MB</p>
                            </>
                        )}
                    </div>

                    {/* Hidden Inputs */}
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                    <input type="file" accept="image/*" capture="environment" className="hidden" ref={cameraInputRef} onChange={handleFileChange} />

                    {/* Camera Button for Mobile */}
                    <div className="mt-6">
                        <button 
                            onClick={triggerCamera}
                            disabled={isScanning}
                            className="w-full flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 disabled:opacity-50 text-foreground font-medium py-3 rounded-xl transition-all border border-border"
                        >
                            <Camera className="w-5 h-5" />
                            Take Photo with Camera
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Scan;
