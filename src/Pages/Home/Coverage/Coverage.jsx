import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Container from "../../../Utility/Container";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
const Coverage = () => {
  const servicesCenters = useLoaderData();
  //   console.log(servicesCenters);
  const mapRef = useRef();
  const position = [23.8103, 90.4125];
  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;

    const district = servicesCenters.find((center) =>
      center.district.toLowerCase().includes(location.toLowerCase()),
    );

    if (district) {
      const cordinate = [district.latitude, district.longitude];
      //   console.log(district, cordinate);
      //   go to the location by search
      mapRef.current.flyTo(cordinate, 14);
    }
  };
  return (
    <div className="bg-base-200 min-h-screen">
      <div className="py-12">
        <Container className="pt-20 bg-base-100 p-10 space-y-8 rounded-2xl ">
          <h1 className="text-3xl font-extrabold text-secondary">
            We are available in 64 districts
          </h1>
          <form onSubmit={handleSearch} className="join">
            <input
              className="input join-item"
              placeholder="search area here"
              name="location"
            />
            <button
              type="submit"
              className="btn bg-primary join-item rounded-r-full"
            >
              Search
            </button>
          </form>
          <div>
            <MapContainer
              ref={mapRef}
              center={position}
              zoom={7}
              scrollWheelZoom={false}
              className="h-[600px]"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {servicesCenters.map((center, index) => (
                <Marker
                  key={index}
                  position={[center.latitude, center.longitude]}
                >
                  {" "}
                  <Popup>
                    <strong>{center.district}</strong> <br />
                    Services Area : {center.covered_area.join(", ")}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Coverage;
