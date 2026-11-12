import { useRef, useEffect } from "react";
// Adapt the bundled Chart wrapper to this HUICharts version: setResize/uninstall,
// not resize/dispose. Disable HUI's second resize pass so native mixed-series
// options supplied by the story are retained on viewport changes.
export default function StoryChart({ name, option, onChartRendered }) {
 const container=useRef(null),ready=useRef(onChartRendered);ready.current=onChartRendered;
 useEffect(()=>{
  const chart=new window.HUICharts();
  chart.init(container.current,{renderer:"svg",domResize:false,windowResize:false});
  chart.setSimpleOption(name,{theme:"hdesign-light",...option});chart.render();
  ready.current?.(chart);
  const observer=new ResizeObserver(()=>{const ec=chart.getEchartsInstance();if(ec&&!ec.isDisposed()){ec.resize();ready.current?.(chart);}});observer.observe(container.current);
  return()=>{observer.disconnect();chart.uninstall();};
 },[name,JSON.stringify(option)]);
 return <div ref={container} style={{width:"100%",height:"100%"}}/>;
}
