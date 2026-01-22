
import React from 'react';
import { Discipline } from '../types';
import { DISCIPLINES } from '../constants';

interface DisciplineWheelProps {
  selectedDisciplines: string[];
  onToggleDiscipline: (id: string) => void;
}

const DisciplineWheel: React.FC<DisciplineWheelProps> = ({ selectedDisciplines, onToggleDiscipline }) => {
  const radius = 160;
  const centerX = 200;
  const centerY = 200;
  const count = DISCIPLINES.length;

  return (
    <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] mx-auto mt-8 flex items-center justify-center">
      {/* Central Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-12 text-center">
        <span className="text-lg md:text-xl font-bold leading-tight">Choose one or more viewpoint</span>
      </div>

      <svg viewBox="0 0 400 400" className="w-full h-full -rotate-90">
        {DISCIPLINES.map((discipline, index) => {
          const startAngle = (index * 360) / count;
          const endAngle = ((index + 1) * 360) / count;
          const isSelected = selectedDisciplines.includes(discipline.id);

          const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
            const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
            return {
              x: centerX + radius * Math.cos(angleInRadians),
              y: centerY + radius * Math.sin(angleInRadians)
            };
          };

          const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
            const start = polarToCartesian(x, y, radius, endAngle);
            const end = polarToCartesian(x, y, radius, startAngle);
            const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
            return [
              "M", start.x, start.y,
              "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
              "L", x, y,
              "Z"
            ].join(" ");
          };

          const innerRadius = 80;
          const outerRadius = 180;
          const midRadius = (innerRadius + outerRadius) / 2;
          const midAngle = (startAngle + endAngle) / 2;
          const labelPos = polarToCartesian(centerX, centerY, midRadius, midAngle);

          return (
            <g 
              key={discipline.id} 
              className="cursor-pointer group"
              onClick={() => onToggleDiscipline(discipline.id)}
            >
              <path
                d={describeArc(centerX, centerY, outerRadius, startAngle + 2, endAngle - 2)}
                fill={isSelected ? discipline.color : 'white'}
                stroke={discipline.color}
                strokeWidth="2"
                className="transition-all duration-300 hover:opacity-90"
              />
              <path
                d={describeArc(centerX, centerY, innerRadius, startAngle, endAngle)}
                fill="#f0ece9"
              />
              <foreignObject
                x={labelPos.x - 45}
                y={labelPos.y - 30}
                width="90"
                height="60"
                transform={`rotate(90 ${labelPos.x} ${labelPos.y})`}
                className="pointer-events-none"
              >
                <div className="h-full w-full flex items-center justify-center p-1">
                  <span 
                    className="text-[10px] md:text-[11px] font-bold text-center leading-[1.1]"
                    style={{ color: isSelected ? 'white' : discipline.textColor }}
                  >
                    {discipline.label}
                  </span>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default DisciplineWheel;
