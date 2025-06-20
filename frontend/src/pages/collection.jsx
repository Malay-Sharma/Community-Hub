import { AppSidebar } from '@/components/app-sidebar'
import { useAuth } from '@/context/authContext';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react'

const items = [
  { id: 1, media: "/waifu.jpeg", width: 1920, height: 1080 },
  { id: 2, media: "/luffy_chibi.jpeg", width: 1280, height: 720 },
  { id: 3, media: "/bear.jpg", width: 800, height: 600 },
  { id: 4, media: "/girl.jpg", width: 1024, height: 768 },
  { id: 5, media: "/waifu.jpeg", width: 640, height: 480 },
  { id: 6, media: "/luffy_chibi.jpeg", width: 1920, height: 1080 },
  { id: 7, media: "/bear.jpg", width: 1280, height: 720 },
  { id: 8, media: "/luffy_chibi.jpeg", width: 2048, height: 1152 },
  { id: 9, media: "/waifu.jpeg", width: 1600, height: 900 },
  { id: 10, media: "/bear.jpg", width: 1366, height: 768 },
  { id: 11, media: "/luffy_chibi.jpeg", width: 2560, height: 1440 },
  { id: 12, media: "/waifu.jpeg", width: 3840, height: 2160 },
  { id: 13, media: "/girl.jpg", width: 1920, height: 1080 },
  { id: 14, media: "/luffy_chibi.jpeg", width: 1024, height: 1024 },
  { id: 15, media: "/bear.jpg", width: 720, height: 1280 },
  { id: 16, media: "/waifu.jpeg", width: 1920, height: 800 },
  { id: 17, media: "/luffy_chibi.jpeg", width: 600, height: 600 },
  { id: 18, media: "/girl.jpg", width: 2560, height: 1600 },
  { id: 19, media: "/luffy_chibi.jpeg", width: 1440, height: 1080 },
  { id: 20, media: "/waifu.jpeg", width: 1200, height: 900 },
];

const Collection = () => {

  // const info = useLocation();
  // const user = info.state?.user;

  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Touch support
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >Collections</div>
   )
}

export default Collection