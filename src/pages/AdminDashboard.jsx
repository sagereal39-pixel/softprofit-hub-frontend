import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { fetchAdminStats } from '../api';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAdminStats(token)
      .then((data) => setStats(data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
        { label: 'Total Posts', value: stats.posts, icon: '📝' },
        { label: 'Published', value: stats.published, icon: '✅' },
        { label: 'Drafts', value: stats.drafts, icon: '📄' },
        { label: 'Affiliates', value: stats.affiliates, icon: '🔗' },
        {
          label: 'Total Views',
          value: Number(stats.total_views || 0).toLocaleString(),
          icon: '👁️',
        },
        {
          label: 'Clicks',
          value: Number(stats.total_clicks || 0).toLocaleString(),
          icon: '🖱️',
        },
      ]
    : [];

  return (
    <div className='admin-layout'>
      <AdminSidebar />
      <div className='admin-main'>
        <div className='admin-header'>
          <div>
            <h1>Dashboard Overview</h1>
            <p>Welcome back, Admin</p>
          </div>
        </div>

        {loading ? (
          <p className='loading'>Loading stats...</p>
        ) : (
          <>
            {/* Stats Grid */}
            <div className='stats-grid'>
              {statCards.map((stat) => (
                <div className='stat-card' key={stat.label}>
                  <span className='stat-icon'>{stat.icon}</span>
                  <div>
                    <div className='stat-value'>{stat.value}</div>
                    <div className='stat-label'>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Top Posts */}
            <div className='admin-grid-2'>
              <div className='admin-card'>
                <h3>Top Posts by Views</h3>
                <table className='admin-table'>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(stats.top_posts || []).map((post) => (
                      <tr key={post.id}>
                        <td>{post.title}</td>
                        <td>{Number(post.views).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Top Affiliates */}
              <div className='admin-card'>
                <h3>Top Affiliates by Clicks</h3>
                <table className='admin-table'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Clicks</th>
                      <th>Commission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(stats.top_affiliates || []).map((aff) => (
                      <tr key={aff.id}>
                        <td>{aff.name}</td>
                        <td>{aff.clicks}</td>
                        <td>{aff.commission}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
