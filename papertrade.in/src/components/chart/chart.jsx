import React, { useRef, useEffect } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";

export default function CandleChart({ apiResp }) {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!apiResp || apiResp.length === 0) return;

    // Convert dates to Unix timestamps, remove duplicates, sort ascending
    const data = apiResp
      .map((item) => {
        const dateStr = item.Datetime || item.Date;
        const timestamp = dateStr ? Math.floor(new Date(dateStr).getTime() / 1000) : 0;
        return {
          time: timestamp,
          open: item.Open,
          high: item.High,
          low: item.Low,
          close: item.Close,
        };
      })
      .filter((item, index, arr) => index === 0 || item.time !== arr[index - 1].time)
      .sort((a, b) => a.time - b.time);

    // Determine Y-axis min/max for zooming
    const prices = data.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Clear previous chart
    chartContainerRef.current.innerHTML = "";

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "#000000" }, // black background
        textColor: "#ffffff", // white text
      },
      grid: {
        vertLines: { color: "#444444" },
        horzLines: { color: "#444444" },
      },
      rightPriceScale: {
        borderColor: "#555555",
        autoScale: true,
      },
      timeScale: {
        borderColor: "#555555",
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderUpColor: "#26a69a",
      borderDownColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candleSeries.setData(data);

    // Zoom to fit data
    chart.timeScale().fitContent();

    // Resize handler
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [apiResp]);

  return (
    <div
      ref={chartContainerRef}
      className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg"
    />
  );
}
