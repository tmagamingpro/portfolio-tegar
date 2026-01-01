import React, { useEffect, useState } from "react";
import { getAllProjects } from "../api/projectsApi.js";
import { getAllContacts } from "../api/contactsApi.js";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const proj = await getAllProjects();
    const cont = await getAllContacts();
    setProjects(proj);
    setContacts(cont);
  };

  const chartData = projects.reduce((acc, p) => {
    try {
      let techs = [];

      if (Array.isArray(p.tech)) {
        techs = p.tech;
      } else if (typeof p.tech === 'string') {
        const trimmed = p.tech.trim();
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
          // JSON-stringified array
          techs = JSON.parse(trimmed);
        } else if (trimmed === '') {
          techs = [];
        } else {
          // comma-separated string
          techs = trimmed.split(',');
        }
      }

      techs.forEach(t => {
        const name = String(t).trim();
        if (!name) return;
        const found = acc.find(c => c.name === name);
        if (found) found.count += 1;
        else acc.push({ name, count: 1 });
      });
    } catch (err) {
      console.error('Failed parsing tech for project', p, err);
    }

    return acc;
  }, []);

  const totalTech = chartData.length;

  const mostUsedTech = chartData.reduce(
    (max, cur) => (cur.count > max.count ? cur : max),
    { name: "-", count: 0 }
  );

  const latestProject = projects[projects.length - 1];
  const recentProjects = projects.slice(-3).reverse();
  const recentContacts = contacts.slice(-3).reverse();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard Home</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white shadow rounded text-center">
          <h2 className="text-xl font-semibold">Projects</h2>
          <p className="text-2xl font-bold">{projects.length}</p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <h2 className="text-xl font-semibold">Contacts</h2>
          <p className="text-2xl font-bold">{contacts.length}</p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <h2 className="text-sm font-semibold text-gray-500">Total Tech</h2>
          <p className="text-2xl font-bold">{totalTech}</p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <h2 className="text-sm font-semibold text-gray-500">Top Tech</h2>
          <p className="text-xl font-bold text-blue-600">
            {mostUsedTech.name}
          </p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <h2 className="text-sm font-semibold text-gray-500">Latest Project</h2>
          <p className="text-sm font-medium">
            {latestProject?.title || "-"}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-2">Projects by Tech</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Recent Activity */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Recent Activity</h2>

        <ul className="space-y-2 text-sm text-gray-600">
          {recentProjects.map((p, i) => (
            <li key={i}>➕ New project: {p.title}</li>
          ))}

          {recentContacts.map((c, i) => (
            <li key={i}>📩 Contact from {c.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
