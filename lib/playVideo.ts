"use client";
export function playBackgroundVideo(id = "background-video") {
  const video = document.getElementById(id) as HTMLVideoElement | null;
  if (video) {
    video.play().catch(() => {});
  }
}
