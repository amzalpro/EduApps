import React, { useState } from 'react';
import { User } from 'lucide-react';

interface Seat {
  row: number;
  col: number;
  studentId?: string;
  studentName?: string;
}

const ClassRoom: React.FC = () => {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(6);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  
  // Générer la grille de sièges
  const generateSeats = () => {
    const newSeats: Seat[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        newSeats.push({ row: r, col: c });
      }
    }
    setSeats(newSeats);
  };
  
  const handleSeatClick = (seat: Seat) => {
    setSelectedSeat(seat);
  };
  
  React.useEffect(() => {
    generateSeats();
  }, [rows, cols]);
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Plan de classe interactif</h2>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Rangées:</label>
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="w-16 px-2 py-1 border border-gray-300 rounded"
              min="1"
              max="10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Colonnes:</label>
            <input
              type="number"
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              className="w-16 px-2 py-1 border border-gray-300 rounded"
              min="1"
              max="10"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plan de classe */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="mb-4 text-center">
            <div className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold">
              TABLEAU
            </div>
          </div>
          
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {seats.map((seat, index) => (
              <button
                key={index}
                onClick={() => handleSeatClick(seat)}
                className={`
                  aspect-square border-2 rounded-lg p-2 transition-all hover:scale-105
                  ${selectedSeat?.row === seat.row && selectedSeat?.col === seat.col
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                  }
                  ${seat.studentName ? 'bg-blue-100' : ''}
                `}
              >
                {seat.studentName ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <User size={20} className="text-blue-600 mb-1" />
                    <span className="text-xs font-medium text-center">{seat.studentName}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <User size={20} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Panneau de saisie */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Actions élève</h3>
          
          {selectedSeat ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">
                  Position: Rangée {selectedSeat.row + 1}, Place {selectedSeat.col + 1}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedSeat.studentName || 'Aucun élève'}
                </p>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Saisir un événement:</h4>
                
                <div className="space-y-2">
                  <button className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-2 rounded-lg transition-colors">
                    Retard
                  </button>
                  <button className="w-full bg-red-100 hover:bg-red-200 text-red-800 py-2 rounded-lg transition-colors">
                    Absence
                  </button>
                  <button className="w-full bg-orange-100 hover:bg-orange-200 text-orange-800 py-2 rounded-lg transition-colors">
                    Bavardage
                  </button>
                  <button className="w-full bg-purple-100 hover:bg-purple-200 text-purple-800 py-2 rounded-lg transition-colors">
                    Comportement
                  </button>
                  <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 rounded-lg transition-colors">
                    Oubli
                  </button>
                  <button className="w-full bg-pink-100 hover:bg-pink-200 text-pink-800 py-2 rounded-lg transition-colors">
                    Manque de travail
                  </button>
                  <button className="w-full bg-green-100 hover:bg-green-200 text-green-800 py-2 rounded-lg transition-colors">
                    ✓ Participation positive
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Cliquez sur une place pour sélectionner un élève
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassRoom;
