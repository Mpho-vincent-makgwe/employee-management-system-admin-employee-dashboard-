import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart({ data, options }) {
  const donutOptions = {
    ...options,
    cutout: '60%', // you can adjust this value for a thicker/thinner ring
  };

  return <Pie data={data} options={donutOptions} />;
}
