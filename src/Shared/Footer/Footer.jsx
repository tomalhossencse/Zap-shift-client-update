import React from "react";
import { FaSquareXTwitter, FaLinkedin } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import Container from "../../Utility/Container";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-secondary text-base-100">
      <Container>
        <div className="py-8">
          <div className="grid grid-cols-2  lg:grid-cols-7 justify-between py-16 gap-10 text-sm p-6">
            <div className="col-span-3">
              <div className="flex">
                <div
                  onClick={() => navigate("/")}
                  className="text-xl font-medium pb-6 cursor-pointer"
                >
                  <div className="flex items-end">
                    <img src={logo} alt="" />
                    <h3 className="text-3xl font-extrabold text-base-100 -ms-2.5">
                      ZapShift
                    </h3>
                  </div>
                </div>
              </div>
              <p className="">
                At Zap-Shift-WEBAPP,it helps users report and track local issues
                like garbage, illegal construction, broken public property, and
                road damage. It allows contributors to support cleanup efforts
                through donations, while providing a transparent view of ongoing
                and resolved issues in the community.
              </p>
            </div>
            <div className=" col-span-1">
              <h1 className="text-xl font-medium pb-6">Company</h1>
              <ul className="flex flex-col gap-4">
                <a className="" href="#">
                  About Us
                </a>
                <a className="" href="#">
                  Our Mission
                </a>
                <a className="" href="#">
                  Contact Saled
                </a>
              </ul>
            </div>
            <div className=" col-span-1">
              <h1 className="text-xl font-medium pb-6">Services</h1>
              <ul className="flex flex-col gap-4">
                <a className="" href="#">
                  Issues & Services
                </a>
                <a className="" href="#">
                  volunteer Stories
                </a>
                <a className="" href="#">
                  Solved Issues
                </a>
              </ul>
            </div>
            <div className=" col-span-1">
              <h1 className="text-xl font-medium pb-6">Information</h1>
              <ul className="flex flex-col gap-4">
                <a className="" href="#">
                  Privacy Policy
                </a>
                <a className="" href="#">
                  Terms & Conditions
                </a>
                <a className="" href="#">
                  Join Us
                </a>
              </ul>
            </div>
            <div className=" col-span-1">
              <h1 className="text-xl font-medium pb-6">Social Links</h1>
              <ul className="flex flex-col gap-4">
                <li className="flex gap-2 items-center">
                  <FaSquareXTwitter className=" text-xl" />
                  <a className="" href="#">
                    @Zap-Shift
                  </a>
                </li>
                <li className="flex gap-2 items-center">
                  <FaLinkedin className=" text-xl" />
                  <a className="" href="#">
                    @Zap-Shift
                  </a>
                </li>
                <li className="flex gap-2 items-center">
                  <FaFacebookSquare className=" text-xl" />
                  <a className="" href="#">
                    @Zap-Shift
                  </a>
                </li>
                <li className="flex gap-2 items-center">
                  <IoMdMail size={20} className=" text-xl" />
                  <a className="" href="#">
                    zapshift@cst.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            © 2025 Zap-shift. All rights reserved.
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
