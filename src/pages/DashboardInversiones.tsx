import { useAuth } from "../hooks/useAuth";
import { useReportes } from "../hooks/useReportes";
import { LoadingSpinner } from "../components/LoadingSpinner";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "../styles/pages/DashboardInversiones.module.css";

// 1. Definimos una paleta de colores Fintech sofisticada para los activos
// El orden se aplicará cíclicamente a tus criptomonedas/instrumentos
const COLORS = ["#F2A900", "#627EEA", "#00D4B2", "#FF6B6B", "#8492A6"];

export function DashboardInversiones() {

  const { user, token } = useAuth();
  const { resumenReporte, isLoadingResumen, errorResumen } = useReportes(
    token || ""
  );

  console.log("Datos de Reportes recibidos:", resumenReporte);

  // 2. Procesamos los datos para el gráfico de torta/dona
  // Calculamos el valor monetario de la tenencia (Unidades * Precio Actual)
  // Si tu backend ya envía un campo con el valor total calculado, podés usar esa propiedad directamente.
  const dataGrafico = resumenReporte?.map((item) => {
    const cantidad = item.balance_total || 0;
    const precio = item.valor_actual || 0;
    return {
      name: item.nombre,
      // Si el backend no te da el total, lo calculamos acá en tiempo de ejecución:
      value: cantidad * precio, 
      cantidadOriginal: cantidad
    };
  }) || [];

  // Formateador para que los montos en el gráfico se vean como dinero real
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "USD", // Podés cambiarlo a ARS si tu backend opera en pesos
      minimumFractionDigits: 2,
    }).format(value);
  };




  return (
    <section className={styles.contResumen}>
      <h2>RESUMEN</h2>
      {isLoadingResumen && (
        <LoadingSpinner logo="../public/assets/logo-icon.png" size={60} />
      )}
      
      {errorResumen && <p className={styles.error}>{errorResumen}</p>}
      
      {!isLoadingResumen && !errorResumen && (
        <div className={styles.dashboardGrid}>
          {/* Columna Izquierda: Lista de Tenencias */}
          <article className={styles.listaActivos}>
                <hr className={styles.lineaDivision}/>
            <h3>Tus Activos</h3>
            <ul>
              {resumenReporte?.map((item) => (
                <li key={item.id_instrumento} className={styles.elemLista}>
                  <div className={styles.contActivos}>
                    <div className={styles.contBalance}>
                       {item.balance_total}
                    </div>                    
                    <div className={styles.contNombre}>
                      {item.nombre}
                    </div>
                    <div className={styles.contSaldo}>
                       {item.saldo_instrumento<0? `-$ ${(Math.abs(item.saldo_instrumento)).toFixed(2)}`:`$ ${(item.saldo_instrumento).toFixed(2)}`}
                    </div>
                    <div className={styles.contIndicador}>
                      {item.saldo_instrumento>0?"🟩":"🟥"}
                    </div>

                  </div>
                </li>
        
              ))}
            </ul>
           <hr className={styles.lineaDivision}/>
          </article>
          {/* Columna Derecha: Gráfico de Distribución de Cartera */}
          <article className={styles.contenedorGrafico}>
            <h3>Distribución de Cartera</h3>
            {dataGrafico.length > 0 ? (
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataGrafico}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}  // Radio interno > 0 genera el efecto Dona moderno
                      outerRadius={85}  // Radio externo
                      paddingAngle={4}  // Separación sutil entre porciones
                      dataKey="value"   // Campo numérico que define el tamaño de la porción
                    >
                      {dataGrafico.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    
                    {/* Tooltip personalizado para ver los datos al pasar el mouse */}
                    <Tooltip 
                      formatter={(value: number, name: string, props: any) => [
                        `${formatCurrency(value)} (Volumen: ${props.payload.cantidadOriginal})`,
                        name
                      ]}
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        borderRadius: "8px",
                        border: "none",
                        color: "#fff"
                      }}
                    />
                    
                    {/* Leyenda interactiva inferior */}
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p>No hay tenencias operadas para mostrar en el gráfico.</p>
            )}
          </article>
        </div>
      )}
    </section>
  );
}
