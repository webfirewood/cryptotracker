import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps {
    coinId?: string;
}

interface IPrice {
    x: string,
    y: object,
}

function Chart({coinId} : ChartProps) {
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),{
        refetchInterval: 1000000,
    })
    const priceArray: IPrice[] = [];
    data?.forEach(item => {
        priceArray.push(
            {
                x: item.time_close,
                y: [item.open, item.high, item.low, item.close],
            }
        )
    });

    console.log(priceArray)

    return <div>{isLoading ? "Loading chart..." :
        <ApexChart
            type="candlestick"
            series={[{
                data: priceArray
            }]}
            options={{
                chart: {
                    height: 350
                },
                tooltip: {
                    enabled: false,
                    x: {
                        show: false,
                        format: 'dd MMM',
                        formatter: undefined,
                    },
                    y: {
                        formatter: undefined,
                        title: {
                            formatter: (seriesName) => seriesName,
                        },
                    },
                    fixed: {
                        enabled: false
                    }
                },
                title: {
                    text: 'CandleStick Chart',
                    align: 'left'
                },
                xaxis: {
                    type: 'datetime',
                    labels: {
                        show: true,
                        rotate: -45,
                        rotateAlways: false,
                        hideOverlappingLabels: true,
                        showDuplicates: false,
                        trim: false,
                        minHeight: undefined,
                        maxHeight: 120,
                        style: {
                            colors: ["white"],
                            fontSize: '12px',
                        },
                    },
                },
                yaxis: {
                    tooltip: {
                        enabled: false
                    },
                    labels: {
                        show: true,
                        align: 'right',
                        minWidth: 0,
                        maxWidth: 160,
                        style: {
                            colors: ["white"],
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            cssClass: 'apexcharts-yaxis-label',
                        },
                        offsetX: 0,
                        offsetY: 0,
                        rotate: 0,
                        formatter: (value) => { return value.toFixed(2) },
                    },
                    axisBorder: {
                        show: true,
                        color: '#78909C',
                        offsetX: 0,
                        offsetY: 0
                    },
                },
            }}

        />
    }</div>
}

export default Chart;
