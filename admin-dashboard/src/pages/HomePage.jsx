import React, { useEffect, useState } from "react";
import { getAllProjects } from "../api/projectsApi.js";
import { getAllContacts } from "../api/contactsApi.js";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";

export default function HomePage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [proj, cont] = await Promise.all([getAllProjects(), getAllContacts()]);
      setProjects(Array.isArray(proj) ? proj : []);
      setContacts(Array.isArray(cont) ? cont : []);
    } catch (err) {
      console.error("Failed to load dashboard data", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const parseTechList = (tech) => {
    if (Array.isArray(tech)) return tech;
    if (typeof tech === "string") {
      const trimmed = tech.trim();
      if (!trimmed) return [];
      if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        try {
          const parsed = JSON.parse(trimmed);
          return Array.isArray(parsed) ? parsed : [];
        } catch (err) {
          return trimmed.split(",");
        }
      }
      return trimmed.split(",");
    }
    return [];
  };

  const chartData = projects.reduce((acc, p) => {
    const techs = parseTechList(p.tech);
    techs.forEach((t) => {
      const name = String(t).trim();
      if (!name) return;
      const found = acc.find((c) => c.name === name);
      if (found) found.count += 1;
      else acc.push({ name, count: 1 });
    });
    return acc;
  }, []);

  const sortedTech = [...chartData].sort((a, b) => b.count - a.count);
  const chartTop = sortedTech.slice(0, 8);
  const totalTechTags = chartData.reduce((sum, t) => sum + t.count, 0);
  const avgTechPerProject = projects.length
    ? (totalTechTags / projects.length).toFixed(1)
    : "0";

  const mostUsedTech = chartData.reduce(
    (max, cur) => (cur.count > max.count ? cur : max),
    { name: "-", count: 0 }
  );

  const getTimestamp = (item) => {
    const ts = item?.created_at || item?.createdAt;
    const time = ts ? new Date(ts).getTime() : 0;
    return Number.isNaN(time) ? 0 : time;
  };

  const sortedProjects = [...projects].sort((a, b) => getTimestamp(b) - getTimestamp(a));
  const sortedContacts = [...contacts].sort((a, b) => getTimestamp(b) - getTimestamp(a));

  const latestProject = sortedProjects[0];
  const recentProjects = sortedProjects.slice(0, 5);
  const recentContacts = sortedContacts.slice(0, 5);
  const projectsWithImages = projects.filter((p) => p.image).length;
  const projectsWithLinks = projects.filter((p) => p.githubLink).length;
  const contactsWithEmail = contacts.filter((c) => c.email).length;
  const lastUpdated = new Date().toLocaleString();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-sm text-gray-500">
            Track portfolio performance, recent activity, and key insights.
          </p>
        </div>
        <div className="text-xs text-gray-500">
          Last updated: {lastUpdated}
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow p-6">
          <Loader />
        </div>
      ) : (
        <>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow p-5">
              <h2 className="text-lg font-semibold mb-1">Quick Actions</h2>
              <p className="text-sm text-gray-500 mb-4">
                Jump to the most common admin tasks.
              </p>
              <div className="flex flex-col gap-2">
                <button
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  onClick={() => navigate("/projects")}
                >
                  Manage Projects
                </button>
                <button
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-black transition"
                  onClick={() => navigate("/contacts")}
                >
                  View Contacts
                </button>
                <button
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition"
                  onClick={fetchData}
                >
                  Refresh Data
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-5">
              <h2 className="text-lg font-semibold mb-4">Highlights</h2>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Latest project</span>
                  <span className="font-semibold text-gray-800">
                    {latestProject?.title || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Top technology</span>
                  <span className="font-semibold text-blue-600">
                    {mostUsedTech.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Average tech per project</span>
                  <span className="font-semibold text-gray-800">
                    {avgTechPerProject}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Projects with images</span>
                  <span className="font-semibold text-gray-800">
                    {projectsWithImages}/{projects.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-5">
              <h2 className="text-lg font-semibold mb-4">Health Check</h2>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Total projects</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {projects.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total contacts</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {contacts.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Contacts with email</span>
                  <span className="font-semibold text-gray-800">
                    {contactsWithEmail}/{contacts.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Projects with repo link</span>
                  <span className="font-semibold text-gray-800">
                    {projectsWithLinks}/{projects.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white shadow rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold">Projects by Tech</h2>
                <span className="text-xs text-gray-500">
                  Top 8 technologies
                </span>
              </div>
              {chartTop.length === 0 ? (
                <div className="text-sm text-gray-400 italic">
                  No project tech data yet.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={chartTop}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="bg-white shadow rounded-xl p-5">
              <h2 className="text-xl font-semibold mb-3">Recent Contacts</h2>
              {recentContacts.length === 0 ? (
                <div className="text-sm text-gray-400 italic">
                  No contacts received yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {recentContacts.map((c) => (
                    <div
                      key={c.id || `${c.name}-${c.email}`}
                      className="border border-gray-100 rounded-lg p-3"
                    >
                      <div className="text-sm font-semibold text-gray-800">
                        {c.name || "Unknown"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {c.email || "No email provided"}
                      </div>
                      <div className="text-xs text-gray-600 mt-2 line-clamp-2">
                        {c.message || "No message"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">Recent Projects</h2>
              <button
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                onClick={() => navigate("/projects")}
              >
                See all
              </button>
            </div>
            {recentProjects.length === 0 ? (
              <div className="text-sm text-gray-400 italic">
                No projects available yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-gray-500 bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">Title</th>
                      <th className="px-4 py-2 text-left font-semibold">Tech</th>
                      <th className="px-4 py-2 text-left font-semibold">Repo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentProjects.map((p) => (
                      <tr key={p.id || p.title} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800">
                          {p.title}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          <div className="flex flex-wrap gap-1">
                            {parseTechList(p.tech)
                              .slice(0, 4)
                              .map((t, i) => (
                                <span
                                  key={`${p.id || p.title}-${i}`}
                                  className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                                >
                                  {String(t).trim()}
                                </span>
                              ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {p.githubLink ? "Available" : "Not set"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
