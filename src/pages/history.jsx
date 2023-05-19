import React, { useEffect, useState } from "react"

import Page from "@/web/components/Page"

import { useAppContext } from "@/web/components/AppContext"

import api from "@/web/services/api"

import { dateToFrenchFormat } from "@/utils/dateToFrenchFormat"

import { ModalDetails } from "@/web/components/modals/ModalDetails"

const History = () => {
  const {
    state: { session },
  } = useAppContext()

  const [histories, setHistories] = useState([])

  const [selectedHistory, setSelectedHistory] = useState(null)

  useEffect(() => {
    ;(async () => {
      if (!session?.userId) {
        return console.error("No session")
      }

      const { data } = await api.get(`/histories/users/${session.userId}`)

      const userHistories = data?.userHistories?.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })

      setHistories(userHistories || [])
    })()
  }, [session])

  const openModal = (history) => {
    setSelectedHistory(history)
  }

  const closeModal = () => {
    setSelectedHistory(null)
  }

  return (
    <Page className="unset">
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-700">
        <div className="my-6 rounded bg-white shadow-md">
          <table className="w-full min-w-max table-auto">
            <thead>
              <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Ip</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Detail</th>
              </tr>
            </thead>
            {!!histories?.length && (
              <tbody className="text-sm font-light text-gray-600">
                {histories.map((history, index) => (
                  <tr
                    key={`${history?.userId}-${index}`}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="whitespace-nowrap py-3 px-6 text-left">
                      {dateToFrenchFormat(history?.createdAt)}
                    </td>
                    <td className="whitespace-nowrap py-3 px-6 text-left">
                      {history?.ip}
                    </td>
                    <td className="whitespace-nowrap py-3 px-6 text-left">
                      {history?.type}
                    </td>
                    <td className="whitespace-nowrap py-3 px-6 text-left">
                      <button
                        className="active:bg-grey-600 mr-1 mb-1 rounded bg-blue-800 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                        onClick={() => openModal(history)}
                      >
                        Détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      {!!selectedHistory && (
        <ModalDetails
          onClose={closeModal}
          title="Nmap Detail"
          detail={selectedHistory?.nmapResult}
        />
      )}
    </Page>
  )
}

export default History
