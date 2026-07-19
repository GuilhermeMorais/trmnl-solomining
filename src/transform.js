function formatHashrate(value) {
  const numeric = Number(value) || 0;

  if (numeric >= 1_000_000_000_000) return `${(numeric / 1_000_000_000_000).toFixed(2)} TH/s`;
  if (numeric >= 1_000_000_000) return `${(numeric / 1_000_000_000).toFixed(2)} GH/s`;
  if (numeric >= 1_000_000) return `${(numeric / 1_000_000).toFixed(2)} MH/s`;
  if (numeric >= 1_000) return `${(numeric / 1_000).toFixed(2)} kH/s`;

  return `${numeric.toFixed(2)} H/s`;
}

function formatRelative(seconds) {
  if (seconds < 10) return "Just Now";
  if (seconds < 60) {
    const value = Math.max(1, Math.floor(seconds));
    return `${value} second${value === 1 ? "" : "s"} ago`;
  }
  if (seconds < 3600) {
    const value = Math.max(1, Math.floor(seconds / 60));
    return `${value} minute${value === 1 ? "" : "s"} ago`;
  }
  if (seconds < 86400) {
    const value = Math.max(1, Math.floor(seconds / 3600));
    return `${value} hour${value === 1 ? "" : "s"} ago`;
  }

  const value = Math.max(1, Math.floor(seconds / 86400));
  return `${value} day${value === 1 ? "" : "s"} ago`;
}

function formatCompactNumber(value) {
  const numeric = Number(value) || 0;
  const abs = Math.abs(numeric);

  if (abs >= 1000000000000) return (numeric / 1000000000000).toFixed(2) + "T";
  if (abs >= 1000000000) return (numeric / 1000000000).toFixed(2) + "B";
  if (abs >= 1000000) return (numeric / 1000000).toFixed(2) + "M";
  if (abs >= 1000) return (numeric / 1000).toFixed(2) + "k";

  return numeric.toFixed(2);
}

function formatUptime(startIso, nowEpoch) {
  if (!startIso) return "N/A";

  const startEpoch = Math.floor(new Date(startIso).getTime() / 1000);
  if (!Number.isFinite(startEpoch)) return "N/A";

  const uptimeSeconds = Math.max(0, nowEpoch - startEpoch);
  const days = Math.floor(uptimeSeconds / 86400);
  const hours = Math.floor((uptimeSeconds % 86400) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function transform(input) {
  const root = input && typeof input === "object" ? input : {};
  const source = root.data && typeof root.data === "object" && !Array.isArray(root.data)
    ? root.data
    : root;

  const workers = Array.isArray(source.workers) ? source.workers : [];
  const worker = workers[0] || null;
  const rawHashrate = worker ? Number(worker.hashRate) || 0 : 0;
  const bestDifficulty = worker ? Number(worker.bestDifficulty) || 0 : 0;

  const nowEpoch = Math.floor(Date.now() / 1000);

  let lastSeenLabel = "N/A";
  if (worker && worker.lastSeen) {
    const seenEpoch = Math.floor(new Date(worker.lastSeen).getTime() / 1000);
    if (Number.isFinite(seenEpoch)) {
      const delta = Math.max(0, nowEpoch - seenEpoch);
      lastSeenLabel = formatRelative(delta);
    }
  }

  return {
    ...source,
    hashrate_display: formatHashrate(rawHashrate),
    best_difficulty_display: formatCompactNumber(bestDifficulty),
    uptime_label_display: formatUptime(worker ? worker.startTime : null, nowEpoch),
    last_seen_label_display: lastSeenLabel
  };
}
