import React, { useState } from "react"

import Page from "@/web/components/Page"

import api from "@/web/services/api"

import { useAppContext } from "@/web/components/AppContext"

import { nmapOptions } from "@/utils/nmapOptions"

const IndexPage = () => {
  const {
    state: { session },
  } = useAppContext()

  const [ipAddress, setIpAddress] = useState("")

  const [scanType, setScanType] = useState(nmapOptions[0])

  const [nmapResult, setNmapResult] = useState({})

  const [isLoading, setIsLoading] = useState(false)

  const handleIpChange = (event) => {
    setIpAddress(event.target.value)
  }

  const handleScanTypeChange = (event) => {
    setScanType(event.target.value)
  }

  const onScan = async () => {
    if (!ipAddress) {
      return alert("Please enter an IP address")
    }

    setIsLoading(true)

    try {
      const { data } = await api.post("/nmap", { ipAddress, option: scanType })

      if (session?.userId && data.results.nmapResult) {
        await api.post("/history", {
          ip: ipAddress,
          type: scanType,
          nmapResult: data.results.nmapResult,
        })
      }

      setNmapResult(data.results)
    } catch (err) {
      if (err.response.data) {
        return alert(err.response.data)
      }

      console.error(err)
    }

    setIsLoading(false)
  }

  return (
    <Page className={"unset"}>
      <div className="flex min-h-screen flex-col items-center justify-center  bg-gray-700">
        <h1
          className={`${
            isLoading && "animate-bounce"
          } mb-8 transform  from-indigo-500 via-purple-500 to-pink-500 text-7xl font-extrabold text-green-50 transition duration-300 hover:scale-110 hover:animate-pulse hover:cursor-grab hover:bg-gradient-to-r`}
        >
          Netmapper .
        </h1>
        <div className="rounded-3xl bg-white p-16">
          <div className="mb-4">
            <label
              className="mb-2 block font-bold text-gray-700"
              htmlFor="ip-address"
            >
              IP Address:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
              id="ip-address"
              type="text"
              placeholder="Enter IP address"
              value={ipAddress}
              onChange={handleIpChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block font-bold text-gray-700"
              htmlFor="scan-type"
            >
              Scan Type:
            </label>
            <div className="relative inline-block w-full">
              <select
                className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none cursor-pointer"
                id="scan-type"
                value={scanType}
                onChange={handleScanTypeChange}
              >
                {nmapOptions.map((option, index) => (
                  <option value={option} key={`${option} - ${index}`}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M17.293 6.293a1 1 0 00-1.414 0L10 12.586 4.707 7.293a1 1 0 00-1.414 1.414l5.999 5.999a1 1 0 001.414 0l6-6a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div></div>
          <button
            onClick={onScan}
            className={`${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none`}
            disabled={isLoading}
          >
            Scan
          </button>
        </div>
        {!!nmapResult?.tableData?.length && (
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Port</th>
                  <th className="py-3 px-6 text-left">State</th>
                  <th className="py-3 px-6 text-left">Service</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {nmapResult.tableData.map((portInfo, index) => {
                  if (!portInfo?.port || portInfo?.port === "Nmap") {
                    return null
                  }

                  return (
                    <tr
                      key={`${portInfo?.port} - ${index}`}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {portInfo?.port}
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {portInfo?.state}
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {portInfo?.service}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Page>
  )
}

export default IndexPage
