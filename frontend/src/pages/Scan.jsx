import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { UploadCloud, Camera, Leaf, Activity, CheckCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '../components/ui/badge';

const Scan = () => {
    const [image, setImage] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState(null);
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
                startScan();
            };
            reader.readAsDataURL(file);
        }
    };

    const startScan = () => {
        setIsScanning(true);
        setResult(null);
        // Mocking API call delay
        setTimeout(() => {
            setIsScanning(false);
            setResult({
                disease: 'Bercak (Leaf Spot)',
                confidence: 92,
                severity: 'Sedang',
                recommendation: 'Apply copper-based fungicide. Ensure good air circulation and avoid overhead watering.'
            });
        }, 3000);
    };

    const triggerUpload = () => fileInputRef.current?.click();
    const triggerCamera = () => cameraInputRef.current?.click();

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Plant Scan</h1>
                <p className="text-muted-foreground mt-1">Upload a clear photo of the leaf for instant analysis.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Area */}
                <Card className="bg-card border-border clay-sm">
                    <CardHeader>
                        <CardTitle className="text-lg text-card-foreground">Upload Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div 
                            className="border-2 border-dashed border-muted-foreground/30 bg-muted/30 rounded-2xl flex flex-col items-center justify-center p-12 text-center clay-inset cursor-pointer hover:border-primary/50 transition-colors h-80 relative overflow-hidden"
                            onClick={triggerUpload}
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
                                className="w-full flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 text-foreground font-medium py-3 rounded-xl transition-all border border-border"
                            >
                                <Camera className="w-5 h-5" />
                                Take Photo with Camera
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Result Area */}
                <Card className="bg-card border-border clay-sm">
                    <CardHeader>
                        <CardTitle className="text-lg text-card-foreground">Diagnosis Result</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                        {!image && !isScanning && !result ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                                <Leaf className="w-12 h-12 mb-4 opacity-50" />
                                <p>Upload an image to see the diagnosis result here.</p>
                            </div>
                        ) : isScanning ? (
                            <div className="h-full flex flex-col items-center justify-center space-y-4">
                                <div className="space-y-4 w-full px-8 animate-pulse">
                                    <div className="h-8 bg-muted rounded-xl w-3/4 mx-auto"></div>
                                    <div className="h-4 bg-muted rounded-lg w-1/2 mx-auto"></div>
                                    <div className="h-32 bg-muted rounded-xl w-full mt-8"></div>
                                </div>
                            </div>
                        ) : result ? (
                            <div className="h-full flex flex-col animate-in fade-in zoom-in duration-500">
                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-2xl font-bold text-foreground">{result.disease}</h3>
                                            {result.disease.toLowerCase() === 'healthy' ? (
                                                <Badge className="bg-primary/20 text-primary border-0"><CheckCircle className="w-3 h-3 mr-1"/> Safe</Badge>
                                            ) : (
                                                <Badge className="bg-red-500/20 text-red-500 border-0"><AlertTriangle className="w-3 h-3 mr-1"/> Action Needed</Badge>
                                            )}
                                        </div>
                                        <p className="text-muted-foreground flex items-center gap-2">
                                            <Activity className="w-4 h-4 text-primary" />
                                            {result.confidence}% Match Confidence
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-muted/30 p-4 rounded-xl border border-border clay-inset">
                                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Severity</h4>
                                        <p className={`font-semibold ${result.severity === 'Sedang' ? 'text-amber-500' : 'text-foreground'}`}>
                                            {result.severity}
                                        </p>
                                    </div>
                                    
                                    <div className="bg-primary/10 p-5 rounded-xl border border-primary/20">
                                        <h4 className="text-sm font-medium text-primary mb-2 flex items-center gap-2">
                                            <Leaf className="w-4 h-4" />
                                            Care Recommendation
                                        </h4>
                                        <p className="text-foreground leading-relaxed">
                                            {result.recommendation}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-auto pt-6 flex gap-4">
                                    <button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-all clay-primary">
                                        Share to Community
                                    </button>
                                    <button 
                                        onClick={() => {setImage(null); setResult(null);}}
                                        className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-medium py-3 rounded-xl transition-all"
                                    >
                                        Scan Another
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Scan;
