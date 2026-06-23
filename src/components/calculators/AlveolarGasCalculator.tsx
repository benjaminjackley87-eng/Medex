import React, { useState, useEffect } from 'react';

export const AlveolarGasCalculator: React.FC = () => {
  const [fio2, setFio2] = useState<string>('21');
  const [patm, setPatm] = useState<string>('760');
  const [ph2o, setPh2o] = useState<string>('47');
  const [paco2, setPaco2] = useState<string>('40');
  const [rq, setRq] = useState<string>('0.8');
  const [pao2, setPao2] = useState<string>('');

  const [pao2Result, setPao2Result] = useState<number | null>(null);
  const [gradient, setGradient] = useState<number | null>(null);

  useEffect(() => {
    const f = parseFloat(fio2) / 100;
    const pat = parseFloat(patm);
    const ph = parseFloat(ph2o);
    const pac = parseFloat(paco2);
    const r = parseFloat(rq);

    if (!isNaN(f) && !isNaN(pat) && !isNaN(ph) && !isNaN(pac) && !isNaN(r) && r > 0) {
      const pAO2Val = f * (pat - ph) - pac / r;
      setPao2Result(pAO2Val);

      const pa = parseFloat(pao2);
      if (!isNaN(pa)) {
        setGradient(pAO2Val - pa);
      } else {
        setGradient(null);
      }
    } else {
      setPao2Result(null);
      setGradient(null);
    }
  }, [fio2, patm, ph2o, paco2, rq, pao2]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Inspired O2 (FiO2 %)
          </label>
          <input
            type="number"
            value={fio2}
            onChange={(e) => setFio2(e.target.value)}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-4 text-lg font-black focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="e.g. 21"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Arterial CO2 (PaCO2 mmHg)
          </label>
          <input
            type="number"
            value={paco2}
            onChange={(e) => setPaco2(e.target.value)}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-4 text-lg font-black focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="e.g. 40"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Barometric Pressure (Patm mmHg)
          </label>
          <input
            type="number"
            value={patm}
            onChange={(e) => setPatm(e.target.value)}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-4 text-lg font-black focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="e.g. 760"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Water Vapor Pressure (PH2O mmHg)
          </label>
          <input
            type="number"
            value={ph2o}
            onChange={(e) => setPh2o(e.target.value)}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-4 text-lg font-black focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="e.g. 47"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Respiratory Quotient (R)
          </label>
          <input
            type="number"
            value={rq}
            onChange={(e) => setRq(e.target.value)}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-4 text-lg font-black focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="e.g. 0.8"
            step="0.1"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Optional: Arterial O2 (PaO2 mmHg)
          </label>
          <input
            type="number"
            value={pao2}
            onChange={(e) => setPao2(e.target.value)}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-4 text-lg font-black focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="For A-a Gradient, e.g. 90"
          />
        </div>
      </div>

      {pao2Result !== null && (
        <div className="space-y-4">
          <div className="p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-950/40 animate-in zoom-in-95 duration-300">
            <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">
              Alveolar Oxygen Tension (PAO2)
            </div>
            <div className="text-5xl font-black mb-2">
              {pao2Result.toFixed(1)} <span className="text-xl opacity-60">mmHg</span>
            </div>
            <div className="text-sm font-medium opacity-90">
              Expected partial pressure of oxygen in the alveoli.
            </div>
          </div>

          {gradient !== null && (
            <div className="p-8 bg-purple-600 rounded-3xl text-white shadow-xl shadow-purple-950/40 animate-in zoom-in-95 duration-300">
              <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">
                A-a Gradient (PAO2 - PaO2)
              </div>
              <div className="text-5xl font-black mb-2">
                {gradient.toFixed(1)} <span className="text-xl opacity-60">mmHg</span>
              </div>
              <div className="text-sm font-medium opacity-90">
                {gradient > 15
                  ? 'Elevated A-a Gradient (suggests V/Q mismatch or shunt)'
                  : 'Normal A-a Gradient'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
