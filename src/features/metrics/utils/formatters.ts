export const formatPercentage = (
    value: number
  ) => {
    return `${value.toFixed(1)}%`;
  };
  
  export const formatInteger = (
    value: number
  ) => {
    return value.toLocaleString();
  };
  
  export const formatMinutes = (
    value: number
  ) => {
    return `${value.toFixed(1)} min`;
  };