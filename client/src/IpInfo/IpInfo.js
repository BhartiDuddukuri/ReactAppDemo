import React from "react"

function IpInfo() {
    const [ipInfo, setIpInfo] = React.useState(null);    
    const [ip, setIp] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const getIpInfo = () => {
        setLoading(true);
        fetch(`/api/ipinfo?ip=${ip}`)
        .then((res) => res.json())
        .then((data) => {
            setLoading(false);
                setIpInfo(data.data);
        }
        );
    }
    return (
      <div className="container">
          <div className="row">
            <input type="text" id="txtIp" placeholder="enter ip..." onChange={e => setIp(e.target.value)}/>
            <button onClick={getIpInfo}>Get Info</button>
          </div>
          <div className="row">
              {loading ? "Loading..." : (
                  ipInfo ? (
                  <div>
                    <h2>IP Details</h2>
                    <ul>
                        <li>{ipInfo.city}</li>
                        <li>{ipInfo.country}</li>
                        <li>{ipInfo.timezone}</li>
                    </ul>
                  </div>
                  ) : ""
              )}
          </div>
      </div>
    );
  }
  
  export default IpInfo;