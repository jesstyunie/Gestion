document.addEventListener('DOMContentLoaded', function () {
    const dailyButton = document.getElementById("daily");
    const weeklyButton = document.getElementById("weekly");
    const monthlyButton = document.getElementById("monthly");
    const yearlyButton = document.getElementById("yearly");
    const ctx = document.getElementById('salesChart').getContext('2d');
  
    let salesChart;
  
    const generateChart = (labels, data) => {
      if (salesChart) {
        salesChart.destroy();
      }
  
      salesChart = new Chart(ctx, {
        type: 'line', // Puedes cambiarlo a 'bar' o 'pie' si prefieres otro tipo de gráfico
        data: {
          labels: labels,
          datasets: [{
            label: 'Ventas',
            data: data,
            borderColor: '#120442',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            fill: true,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { 
              title: {
                display: true,
                text: 'Tiempo'
              }
            },
            y: { 
              title: {
                display: true,
                text: 'Monto'
              },
              beginAtZero: true
            }
          }
        }
      });
    };
  
    // Simulación de datos
    const dailyData = { labels: ["1", "2", "3", "4", "5", "6", "7"], data: [150, 200, 250, 300, 150, 400, 100] };
    const weeklyData = { labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"], data: [1200, 1500, 1800, 1700] };
    const monthlyData = { labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"], data: [5000, 6000, 4500, 5500, 6200, 7000] };
    const yearlyData = { labels: ["2020", "2021", "2022", "2023"], data: [60000, 70000, 80000, 75000] };
  
    dailyButton.addEventListener('click', () => generateChart(dailyData.labels, dailyData.data));
    weeklyButton.addEventListener('click', () => generateChart(weeklyData.labels, weeklyData.data));
    monthlyButton.addEventListener('click', () => generateChart(monthlyData.labels, monthlyData.data));
    yearlyButton.addEventListener('click', () => generateChart(yearlyData.labels, yearlyData.data));
  
    // Cargar gráfico por defecto
    generateChart(dailyData.labels, dailyData.data);
  });
   // Definir la función que actualiza la fecha y la hora
function updateDateTime() {
    const dateElement = document.getElementById("date");
    const timeElement = document.getElementById("time");
  
    // Obtener la fecha y hora actuales
    const now = new Date();
    const date = now.toLocaleDateString("es-ES");  // Fecha en formato español (dd/mm/yyyy)
    const time = now.toLocaleTimeString("es-ES");  // Hora en formato español (hh:mm:ss)
  
    // Actualizar los elementos de fecha y hora
    dateElement.textContent = "Fecha: " + date;
    timeElement.textContent = "Hora: " + time;
  }
  
  // Llamar a la función cada segundo para actualizar la hora en tiempo real
  setInterval(updateDateTime, 1000);
  
  // Llamar a la función una vez al cargar la página para mostrar la fecha y hora inicial
  updateDateTime();
  
  