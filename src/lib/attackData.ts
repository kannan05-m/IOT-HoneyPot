export interface AttackLog {
  timestamp: string;
  source_ip: string;
  attack_type: string;
  protocol: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

export async function fetchAttackLogs(): Promise<AttackLog[]> {
  try {
    const response = await fetch('/data/attack_log.jsonl');
    const text = await response.text();
    
    const logs = text
      .trim()
      .split('\n')
      .filter(line => line.length > 0)
      .map(line => JSON.parse(line) as AttackLog);
    
    return logs.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (error) {
    console.error('Error fetching attack logs:', error);
    return [];
  }
}

export function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: false 
  });
}
