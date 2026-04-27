"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { RobProjection } from "@/lib/types/abps";

export function RobChart({ projections }: { projections: RobProjection[] }) {
  return (
    <div className="panel p-6">
      <div className="mb-5">
        <p className="pill bg-[#dbf7ef] text-tide">ROB forecast</p>
        <h2 className="mt-3 text-xl font-semibold">Arrival reserve profile</h2>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={projections}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d8ddd8" />
            <XAxis dataKey="nominationId" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="arrivalRobMt" fill="#136f63" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
