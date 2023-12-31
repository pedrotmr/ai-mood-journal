import { deleteEntry } from '@/utils/api'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import Spinner from './spinner'

type DeleteModalProps = {
  isOpen: boolean
  closeModal: () => void
  id: string
}

const DeleteModal = ({ isOpen, closeModal, id }: DeleteModalProps) => {
  const router = useRouter()
  const [isLoading, serIsLoading] = useState(false)

  const handleDelete = async () => {
    serIsLoading(true)
    await deleteEntry(id)
    router.push('/journal')
    serIsLoading(false)
    closeModal()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Delete Entry
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this journal entry?
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200"
                    onClick={handleDelete}
                  >
                    {isLoading ? (
                      <>
                        <Spinner className="mr-2" /> Deleting...
                      </>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default DeleteModal
