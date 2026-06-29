import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartProps = {
  type: "bar" | "line" | "pie";
  title: string;
  data: any[];
  xKey?: string;
  yKey?: string;
};

export default function Chart({
  type,
  title,
  data,
  xKey = "name",
  yKey = "value",
}: ChartProps) {
  return (
    <div className="rounded-xl bg-slate-800 p-5">
      <h2 className="mb-4 text-xl font-bold text-white">{title}</h2>

      {data.length === 0 ? (
        <div className="flex h-72 items-center justify-center text-gray-400">
          No chart data yet.
        </div>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            {type === "line" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey={yKey} strokeWidth={3} />
              </LineChart>
            ) : type === "bar" ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis />
                <Tooltip />
                <Bar dataKey={yKey} radius={[8, 8, 0, 0]} />
              </BarChart>
            ) : (
              <PieChart>
                <Tooltip />
                <Pie
                  data={data}
                  dataKey={yKey}
                  nameKey={xKey}
                  outerRadius={95}
                  label
                >
                  {data.map((_, index) => (
                    <Cell key={index} />
                  ))}
                </Pie>
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
