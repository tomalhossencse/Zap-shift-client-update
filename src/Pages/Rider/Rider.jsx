import React, { useEffect, useMemo } from "react";
import Container from "../../Utility/Container";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useLoaderData } from "react-router";
import riderimg from "../../assets/agent-pending.png";

const Rider = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const serviceCenters = useLoaderData();
  console.log(serviceCenters);

  //   const regionsDuplicate = serviceCenters.map((c) => c.region);

  //   const regions = [...new Set(regionsDuplicate)];
  //   console.log("regions", regions);

  const regions = useMemo(() => {
    return [...new Set(serviceCenters.map((c) => c.region))];
  }, [serviceCenters]);

  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const districtByRegion = (region) => {
    const regionDistricts = serviceCenters.filter(
      (service) => service.region === region,
    );
    const districts = regionDistricts.map((r) => r.district);
    console.log(districts);
    return districts;
  };

  // sender warhouse
  useEffect(() => {
    if (senderRegion) {
      const districts = districtByRegion(senderRegion);

      if (districts.length > 0) {
        setValue("picupWarhouse", districts[0]);
      }
    }
  }, [senderRegion]);
  // reciever warhouse
  useEffect(() => {
    if (receiverRegion) {
      const districts = districtByRegion(receiverRegion);

      if (districts.length > 0) {
        setValue("receiverWarhouse", districts[0]);
      }
    }
  }, [receiverRegion]);

  const { user } = useAuth();
  const handleCreateRider = () => {};
  return (
    <div>
      <Container className={"my-6 p-4 min-h-screen bg-base-100 rounded-2xl"}>
        <form
          onSubmit={handleSubmit(handleCreateRider)}
          className="py-12 px-16 "
        >
          <fieldset className="fieldset">
            <h1 className="font-extrabold text-5xl text-secondary">
              Be A Rider
            </h1>

            {/* divider */}
            <div className="divider"></div>

            <h3 className="font-extrabold text-2xl text-secondary">
              Tell About Your Self
            </h3>
            <div className="flex items-center justify-between gap-10 ">
              {/* rider Details */}

              <div className="flex-3">
                <div className="flex gap-6">
                  {/* your name */}
                  <div className="flex-1">
                    <legend className="fieldset-legend">Your Name</legend>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Your Name"
                      {...register("name", { required: true })}
                    />
                    {errors.name?.type === "required" && (
                      <p className="text-red-500 py-2">Name Required!</p>
                    )}
                  </div>

                  <div className="flex-1">
                    {/* Age */}
                    <legend className="fieldset-legend">Your Age</legend>
                    <input
                      type="number"
                      className="input w-full"
                      placeholder="Your age"
                      {...register("age", { required: true })}
                    />
                    {errors.age?.type === "required" && (
                      <p className="text-red-500 py-2">age Required!</p>
                    )}
                  </div>
                </div>

                {/* email */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <legend className="fieldset-legend">Email</legend>
                    <input
                      type="email"
                      className="input w-full"
                      placeholder="Sender Email"
                      value={user?.email}
                      {...register("email", { required: true })}
                    />
                    {errors.email?.type === "required" && (
                      <p className="text-red-500 py-2">Email Required!</p>
                    )}
                  </div>
                  <div>
                    <legend className="fieldset-legend">Your Region</legend>
                    <select
                      className="select w-full"
                      {...register("senderRegion", { required: true })}
                    >
                      <option value={""} disabled>
                        Select Your Region
                      </option>
                      {regions.map((region, index) => (
                        <option key={index}>{region}</option>
                      ))}
                    </select>

                    {errors.senderRegion?.type === "required" && (
                      <p className="text-red-500 py-2">
                        Sender Region Required!
                      </p>
                    )}
                  </div>
                  {/* nid no */}
                  <div>
                    <legend className="fieldset-legend">Nid No.</legend>
                    <input
                      type="number"
                      className="input w-full"
                      placeholder="Nid No."
                      {...register("nidNo", { required: true })}
                    />
                    {errors.nidNo?.type === "required" && (
                      <p className="text-red-500 py-2">Nid No. Required!</p>
                    )}
                  </div>
                  {/* contact no */}
                  <div>
                    <legend className="fieldset-legend">Contact No.</legend>
                    <input
                      type="number"
                      className="input w-full"
                      placeholder="Contact No."
                      {...register("number", { required: true })}
                    />
                    {errors.number?.type === "required" && (
                      <p className="text-red-500 py-2">Contact No. Required!</p>
                    )}
                  </div>

                  <div className="col-span-2">
                    {/* select warhouse */}
                    <div>
                      <legend className="fieldset-legend">
                        Rider Pickup Wire house
                      </legend>
                      <select
                        defaultValue={""}
                        className="select w-full"
                        {...register("picupWarhouse", { required: true })}
                      >
                        <option value={""} disabled>
                          Select Rider Wire house
                        </option>
                        {senderRegion &&
                          districtByRegion(senderRegion).map(
                            (district, index) => (
                              <option value={district} key={index}>
                                {district}
                              </option>
                            ),
                          )}
                      </select>
                      {errors.picupWarhouse?.type === "required" && (
                        <p className="text-red-500 py-2">Wirehouse Required!</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* button */}

                <div className="py-4">
                  <button type="submit" className="btn btn-primary w-full">
                    Submit
                  </button>
                </div>
              </div>
              {/* img */}
              <div className="flex-2">
                <img src={riderimg} alt="" />
              </div>
            </div>
          </fieldset>
        </form>
      </Container>
    </div>
  );
};

export default Rider;
