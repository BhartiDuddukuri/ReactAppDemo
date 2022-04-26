import React, { useEffect } from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart,Pie} from 'recharts';

function Population() {
    const [populationData, setPopulationData] = React.useState(null);    
    const [filterParam, setFilterParam] = React.useState("Nation");
    const [loading, setLoading] = React.useState(false);

    useEffect( () => {
        const fetchData = () => {
            setLoading(true);
            fetch(`/api/population?filterParam=${filterParam}`)
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setPopulationData(data.data.data);
            }
            );
        };
        fetchData();
    },[filterParam]);
    
    return (
      <div className="container">
          <div className="row">
              <select onChange={(e) => setFilterParam(e.target.value) }>
                  <option value="Nation">Nation</option>
                  <option value="State">State</option>
              </select>
          </div>
          <div className="row">
              {loading ? "Loading..." : (
                  populationData ? (
                      filterParam === "Nation" ? 
                      <div>
                      <h3>Nation wise population data</h3>
                 <ResponsiveContainer width={800} height={500}>
                    <LineChart width={500} height={300} data={populationData} margin={{top:5, right:30, left:20, bottom:5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="Year" />
                        <YAxis />
                        <Tooltip/>
                        <Legend/>
                        <Line type="monotone" dataKey="Population" stroke="#8884d8"/>                  
                    </LineChart>
                 </ResponsiveContainer>
                 </div>
                 : 
                 <div>
                     <h3>Latest Year State wise population data</h3>
                 <ResponsiveContainer width={800} height={500}>
                 <PieChart width={500} height={300}  margin={{top:5, right:30, left:20, bottom:5}}>
                     <Pie
                      dataKey="Population"
                      startAngle={360}
                      endAngle={0}
                      data={populationData}
                        cx="50%"
                        cy="50%"
                        outerRadius={200}
                        fill="#8884d8"
                      >
                         </Pie>                
                 </PieChart>
              </ResponsiveContainer>
                 </div>
                  ) : "No Data Found"
              )}
          </div>
      </div>
    );
  }
  
  export default Population;