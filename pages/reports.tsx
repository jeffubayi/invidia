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

      <div
        role="status"
        className="p-4 max-w-sm rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700"
      >
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
        <div className="mb-10 w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="flex items-baseline mt-4 space-x-6">
          <div className="w-full h-72 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full h-56 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full h-72 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full h-80 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full h-72 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full h-80 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
export default Reports;
