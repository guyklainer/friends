import 'chart.js/auto';
import {Line} from "react-chartjs-2";

const Chart = ({data, user}) => <Line
        data={{
            labels: data.map(((y,x) => x)),
            datasets: [{
                label: user.twitterName,
                data: data.map(((y,x) => ({x:x+1, y}))),
            }],
        }} />;
export default Chart;