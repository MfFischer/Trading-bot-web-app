export function convertToHeikenAshi(candlestickData) {
    const heikenAshiData = [];
    
    candlestickData.forEach((data, index) => {
      const { open, high, low, close } = data;
  
      const haClose = (open + high + low + close) / 4;
  
      let haOpen;
      if (index === 0) {
        haOpen = (open + close) / 2;
      } else {
        haOpen = (heikenAshiData[index - 1].haOpen + heikenAshiData[index - 1].haClose) / 2;
      }
  
      const haHigh = Math.max(high, haOpen, haClose);
      const haLow = Math.min(low, haOpen, haClose);
  
      heikenAshiData.push({
        x: data.date,
        haOpen,
        haHigh,
        haLow,
        haClose,
      });
    });
  
    return heikenAshiData;
  }
  