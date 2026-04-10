"use client";
import {
  useAnimations,
  useCounters,
  useGlowCards,
  useTilt,
  useDepthCards,
  useMagnetic,
  useTextScramble,
} from "@/hooks/useAnimations";

export default function ClientEffects() {
  useAnimations();
  useCounters();
  useGlowCards();
  useTilt();
  useDepthCards();
  useMagnetic();
  useTextScramble();
  return null;
}
