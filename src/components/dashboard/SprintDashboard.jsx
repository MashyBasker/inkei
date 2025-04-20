import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent } from '../ui/card';

const SprintDashboard = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateSprint = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/v1/sprint/generate', {
        sources: ['https://github.com/vercel/next.js'], // Replace with your own inputs
        duration: 10,
        team_size: 5
      });
      setResult(res.data);
    } catch (error) {
      console.error('Sprint generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      <button
        onClick={generateSprint}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        {loading ? 'Generating...' : 'Generate Sprint'}
      </button>

      {result && (
        <Card className="bg-white/10 backdrop-blur-lg border border-indigo-300 shadow-xl rounded-xl text-white">
          <CardHeader className="p-6 border-b border-indigo-200">
            <h2 className="text-xl font-bold">Sprint ID: {result.sprint_id}</h2>
            <p className="text-sm text-indigo-200">Estimated Completion: {result.estimated_completion}</p>
          </CardHeader>

          <CardContent className="p-6 space-y-6">

            {/* Features */}
            <section>
              <h3 className="text-lg font-semibold mb-2">📌 Features</h3>
              <ul className="list-disc pl-5 text-indigo-100">
                {result.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </section>

            {/* Tech Stack */}
            <section>
              <h3 className="text-lg font-semibold mb-2">🛠️ Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {result.tech_stack.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-indigo-600/30 px-3 py-1 rounded-full text-sm font-medium border border-indigo-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Suggestions */}
            {!result.is_suitable && result.suggestions.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mb-2 text-yellow-300">⚠️ Improvement Suggestions</h3>
                <ul className="list-disc pl-5 text-yellow-200">
                  {result.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Tasks */}
            <section>
              <h3 className="text-lg font-semibold mb-2">✅ Tasks Breakdown</h3>
              <div className="space-y-4">
                {result.tasks.map((task, i) => (
                  <div
                    key={i}
                    className="p-4 bg-slate-900/60 rounded-md border border-slate-700"
                  >
                    <p className="text-indigo-300 text-sm mb-1">Feature: <strong>{task.feature}</strong></p>
                    <p className="text-white font-semibold">{task.title}</p>
                    <p className="text-sm text-green-400">Story Points: {task.points}</p>
                    <p className="text-sm text-slate-300 italic">{task.reason}</p>
                  </div>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SprintDashboard;
