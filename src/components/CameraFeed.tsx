"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './CameraFeed.module.css';
import * as faceapi from 'face-api.js';

export default function CameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState('');
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [metrics, setMetrics] = useState({
    mood: 'Neutral',
    focus: 0,
    clarity: 0
  });

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);
        setModelsLoaded(true);
      } catch (err) {
        console.error("Failed to load models:", err);
        setError("Failed to load AI models. Please refresh.");
      }
    };
    loadModels();
  }, []);

  const startCamera = async () => {
    if (!modelsLoaded) {
      setError("Models loading... please wait.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          aspectRatio: 4/3,
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
        setError('');
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please allow permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsActive(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && videoRef.current && canvasRef.current) {
      interval = setInterval(async () => {
        if (videoRef.current && videoRef.current.readyState === 4) {
          const detections = await faceapi.detectAllFaces(
            videoRef.current, 
            new faceapi.TinyFaceDetectorOptions()
          ).withFaceLandmarks(true).withFaceExpressions();

          if (detections.length > 0) {
            const detection = detections[0];
            const expressions = detection.expressions;
            
            // Determine dominant mood
            const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
            const dominant = sorted[0];
            
            // Calculate Focus (based on neutral expression and detection confidence)
            const focusScore = Math.min(100, Math.round((expressions.neutral + detection.detection.score) * 50));
            
            // Calculate Clarity (based on detection score)
            const clarityScore = Math.min(100, Math.round(detection.detection.score * 100));

            setMetrics({
              mood: dominant[0].charAt(0).toUpperCase() + dominant[0].slice(1),
              focus: focusScore,
              clarity: clarityScore
            });
          }
        }
      }, 500); // Run every 500ms to save performance
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h3>Confidence Monitor</h3>
          <span className={styles.badge}>AI Powered</span>
        </div>
        <button 
          className={`${styles.toggleBtn} ${isActive ? styles.active : ''}`}
          onClick={isActive ? stopCamera : startCamera}
          disabled={!modelsLoaded}
        >
          {!modelsLoaded ? 'Loading Models...' : isActive ? 'Stop Monitoring' : 'Start Monitoring'}
        </button>
      </div>

      <div className={styles.videoWrapper}>
        {error ? (
          <div className={styles.placeholder}>
            <span className={styles.errorIcon}>🚫</span>
            <p>{error}</p>
          </div>
        ) : !isActive ? (
          <div className={styles.placeholder}>
            <span className={styles.icon}>📷</span>
            <p>Camera is off. Start monitoring to analyze confidence.</p>
          </div>
        ) : null}
        
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className={styles.video} 
          style={{ display: isActive ? 'block' : 'none' }}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        
        {isActive && (
          <div className={styles.overlay}>
            <div className={styles.status}>
              <span className={styles.dot}></span>
              Mood: <strong>{metrics.mood}</strong>
            </div>
            <div className={styles.metrics}>
              <div className={styles.metric}>
                <span>Focus</span>
                <div className={styles.bar}><div style={{ width: `${metrics.focus}%`, backgroundColor: metrics.focus > 70 ? '#28a745' : metrics.focus > 40 ? '#ffc107' : '#dc3545' }}></div></div>
              </div>
              <div className={styles.metric}>
                <span>Clarity</span>
                <div className={styles.bar}><div style={{ width: `${metrics.clarity}%` }}></div></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
