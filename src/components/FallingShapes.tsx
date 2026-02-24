import { useEffect, useState } from "react";

const SHAPES = ["☽"];

interface Shape {
  id: number;
  char: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const FallingShapes = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const generated: Shape[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      char: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      size: 14 + Math.random() * 40,
      opacity: 0.15 + Math.random() * 0.25,
    }));
    setShapes(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {shapes.map((s) => (
        <span
          key={s.id}
          className="absolute animate-falling text-primary"
          style={{
            left: `${s.left}%`,
            fontSize: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
};

export default FallingShapes;
