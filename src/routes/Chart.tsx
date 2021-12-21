import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";
import {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {isDarkAtom} from "../atoms";

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
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId)
    );
    const isDark = useRecoilValue(isDarkAtom);
    const [priceArray, setPriceArray] = useState<IPrice[]>([]);
    const tempArray: IPrice[] = [];
    useEffect(() => {
        data?.forEach(item => {
            tempArray.push(
                {
                    x: item.time_close,
                    y: [item.open, item.high, item.low, item.close],
                }
            )
        });
        setPriceArray(tempArray);
    }, [data]);

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
                theme: {
                  mode: isDark ? "light" : "dark"
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
                },
            }}

        />
    }</div>
}

export default Chart;
