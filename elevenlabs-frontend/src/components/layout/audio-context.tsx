import React, { createContext, useContext, useState } from "react";
import type { AudioInfo } from "~/types/audio";
import { audioManager } from "~/utils/audio-manager";

let currentAudio: AudioInfo | null = null;
let isPlaying = false;
let isPlaybarOpen = false;
let progress = 50;
let duration = "0:00";

export function setCurrentAudio(audio: AudioInfo) {
  currentAudio = audio;
}
export function setIsPlaying(val: boolean) {
  isPlaying = val;
}
export function setIsPlaybarOpen(val: boolean) {
  isPlaybarOpen = val;
}
export function setProgress(val: number) {
  progress = val;
}
export function setDuration(val: string) {
  duration = val;
}

export function playAudio(audio: AudioInfo) {
  const audioElement = audioManager.initialize();
  if (currentAudio && currentAudio.audioUrl === audio.audioUrl) {
    togglePlayPause();
    return;
  }
  currentAudio = audio;
  isPlaybarOpen = true;
  isPlaying = true;
  if (audioElement) {
    setTimeout(() => {
      audioManager.setAudioSource(audio.audioUrl);
      audioManager.play()?.catch((err: unknown) => {
        console.error("Error playing audio: ", err);
        isPlaying = false;
      });
    }, 0);
  }
}

export function togglePlayPause() {
  const audio = audioManager.getAudio();
  if (!audio || !currentAudio) return;
  if (isPlaying) {
    audioManager.pause();
    isPlaying = false;
  } else {
    if (!audio.src && currentAudio?.audioUrl) {
      audioManager.setAudioSource(currentAudio.audioUrl);
    }
    audioManager.play()?.catch((err: unknown) => {
      console.error("Error playing audio: " + err);
    });
    isPlaying = true;
  }
}

export function togglePlaybar() {
  isPlaybarOpen = !isPlaybarOpen;
}

export function skipForward() {
  audioManager.skipForward();
}

export function skipBackward() {
  audioManager.skipBackward();
}

export function downloadAudio() {
  if (!currentAudio?.audioUrl) return;
  const link = document.createElement("a");
  link.href = currentAudio.audioUrl;
  link.download = `${currentAudio.title || "audio"}.wav`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
