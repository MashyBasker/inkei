import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent } from '../ui/card';
import Button from '../ui/button';

const ApiEndpoints = () => {
  const [sprintData, setSprintData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateSprint = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/v1/sprint/generate', {
        repository_id: 'zenith-ai-lab',
        duration: 14,
        team_size: 4
      });
      setSprintData(response.data);
    } catch (error) {
      console.error('Error generating sprint:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 mt-10">

      {/* Trigger Card */}
      <Card className="bg-white/10 border border-indigo-400 backdrop-blur-md shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="p-5 border-b border-indigo-300">
          <h3 className="text-lg font-semibold text-indigo-100 font-mono">
            /api/v1/sprint/generate
          </h3>
          <p className="text-sm text-indigo-200 mt-1">
            Generate a sprint plan based on repository analysis
          </p>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          <div>
            <Button
              className="bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={handleGenerateSprint}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Sprint'}
            </Button>
          </div>
          <div>
            <h4 className="text-sm text-indigo-200 font-medium mb-2">Response Example</h4>
            <pre className="bg-slate-900 text-green-400 p-4 rounded-md text-sm whitespace-pre-wrap">
              {`{ "sprint_id": "ghi789", "tasks": [ ... ], "estimated_completion": "2023-12-31" }`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Result Renderer */}
      {sprintData && (
        <Card className="bg-white/10 border border-emerald-400 backdrop-blur-md shadow-xl rounded-xl overflow-hidden">
          <CardHeader className="p-5 border-b border-emerald-300">
            <h3 className="text-lg font-semibold text-emerald-100 font-mono">
              Sprint ID: {sprintData.sprint_id}
            </h3>
            <p className="text-sm text-emerald-200 mt-1">
              Estimated Completion: {sprintData.estimated_completion}
            </p>
          </CardHeader>
          <CardContent className="p-5 space-y-6">

            {/* Features */}
            {sprintData.features && (
              <div>
                <h4 className="text-sm text-emerald-300 font-medium mb-2">Features</h4>
                <ul className="list-disc ml-6 text-emerald-100 text-sm">
                  {sprintData.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tasks */}
            {sprintData.tasks && (
              <div>
                <h4 className="text-sm text-emerald-300 font-medium mb-2">Subtasks</h4>
                <ul className="space-y-2">
                  {sprintData.tasks.map((task, idx) => (
                    <li key={idx} className="bg-slate-900 text-slate-200 p-3 rounded-md text-sm">
                      <div className="font-semibold text-white mb-1">{task.title}</div>
                      <div className="text-slate-400">Story Points: {task.points}</div>
                      {task.reason && (
                        <div className="text-slate-400 text-sm mt-1 italic">Reason: {task.reason}</div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            {sprintData.tech_stack?.length > 0 && (
              <div>
                <h4 className="text-sm text-emerald-300 font-medium mb-2">Detected Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {sprintData.tech_stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-3 py-1 bg-emerald-600/20 text-emerald-100 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {sprintData.suggestions?.length > 0 && (
              <div>
                <h4 className="text-sm text-yellow-300 font-medium mb-2">Suggestions</h4>
                <ul className="list-disc ml-6 text-yellow-100 text-sm">
                  {sprintData.suggestions.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApiEndpoints;
