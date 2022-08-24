import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import toast from "react-hot-toast";
import { Label, TextInput, Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { AiFillTwitterCircle } from "react-icons/ai";
import { GoMarkGithub } from "react-icons/go";

const Reports = () => {


  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Reports
        </h5>
        <Dropdown label="Filter" placement="left-start">
          <Dropdown.Item>Day</Dropdown.Item>
          <Dropdown.Item>Month</Dropdown.Item>
          <Dropdown.Item>Year</Dropdown.Item>
        </Dropdown>
      </div>

      <div className="shadow-lg rounded-lg overflow-hidden">
        <div className="py-3 px-5 bg-gray-50 dark:bg-gray-600">Line chart</div>
        <canvas className="p-10" id="chartLine"></canvas>
      </div>
      <div className="shadow-lg rounded-lg overflow-hidden">
        <div className="py-3 px-5 bg-gray-50 dark:bg-gray-600">Bar graph</div>
        <canvas className="p-10" id="chartLine"></canvas>
      </div>
      <div className="shadow-lg rounded-lg overflow-hidden">
        <div className="py-3 px-5 bg-gray-50 dark:bg-gray-600 ">Pie chart</div>
        <canvas className="p-10" id="chartLine"></canvas>
      </div>
    </div>
  );
};
export default Reports;
