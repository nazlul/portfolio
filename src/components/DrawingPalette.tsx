'use client'

import { useCanvas } from '../contexts/CanvasContext'

const colors = [
  { color: '#a9170a', label: 'Red' },
  { color: '#fffde8', label: 'Cream' },
  { color: '#000000', label: 'Black' }
]

export function DrawingPalette() {
  const { selectedColor, setSelectedColor, isDesktop } = useCanvas()

  if (!isDesktop) return null

  return (
    <div className="fixed bottom-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-2 flex gap-2">
      {colors.map(({ color, label }) => (
        <button
          key={color}
          onClick={() => setSelectedColor(color)}
          className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${
            selectedColor === color ? 'border-gray-800 shadow-md scale-110' : 'border-gray-300'
          }`}
          style={{ backgroundColor: color }}
          title={`Select ${label}`}
        />
      ))}
    </div>
  )
}