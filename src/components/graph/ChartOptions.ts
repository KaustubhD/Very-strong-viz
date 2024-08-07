export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        callback: function (val: any, index: number): string {
          // Hide every 3rd tick label
          // @ts-ignore
          return index % 3 === 0 ? this.getLabelForValue(val) : '';
        }
      }
    },
    y: {
      ticks: {
        callback: function (val: any): string {
          return val + ' kg';
        }
      }
    }
  }
};
