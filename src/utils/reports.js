// Función para obtener el total de ventas por día
export async function fetchTotalSalesByDay() {
  const response = await fetch(
    "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/reports/daily"
  );
  const data = await response.json();
  const value = data[0].total_por_dia;
  return data !== null ? value : 0;
}

// Función para obtener el total de ventas por mes
export async function fetchTotalSalesByMonth() {
  const response = await fetch(
    "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/reports/monthly"
  );
  const data = await response.json();
  const value = data[0].total_por_mes;
  return data !== null ? value : 0;
}

// Función para obtener el total de ventas por año
export async function fetchTotalSalesByYear() {
  const response = await fetch(
    "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/reports/yearly"
  );
  const data = await response.json();
  const value = data[0].total_por_anio;
  return data !== null ? value : 0;
}

// Función para obtener el historial completo de ventas
export async function fetchHistoricalSales() {
  const response = await fetch(
    "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/reports/historical"
  );
  const data = await response.json();
  const monthlyData = data.map((item) => {
    return {
      x: Number(item.mes),
      y: (item.total_por_mes),
    };
  });
  console.log(monthlyData);
  return monthlyData;
}

/* Function to get the total of sales */
export async function fetchTotalSales() {
  const response = await fetch(
    "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/reports/total"
  );
  const data = await response.json();
  const value = data[0].sum;
  return value;
}

